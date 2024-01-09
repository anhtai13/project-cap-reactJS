/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router";
import Header from "../Header/Header";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  deleteOrder,
  getDetailOrders,
  getDetailOrdersById,
  updateOrder,
} from "../../Service/orderAPI";
import Pagination from "../../common/pagination/Pagination";

function ManageOrderDetail() {
  const [listOrder, setListOrder] = useState([]);
  const idUser = useParams();
  const [isChanged, setIsChanged] = useState(false);
  const [id, setId] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentOrder, setCurrentOrder] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [serialNumber, setSerialNumber] = useState();
  const [name_service, setNameService] = useState();
  const [orderUpdate, setOrderUpdate] = useState([]);
  const [quantity, setQuantity] = useState();
  const [unitPrice, setUnitPrice] = useState();
  const [userId, setUserId] = useState();
  const [orderAt, setOrderAt] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [status, setStatus] = useState();
  const [note, setNote] = useState();
  const [createAt, setCreateAt] = useState();
  const [createById, setCreatedById] = useState();
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const navigate = useNavigate();
  const [orderInfo, setOrderInfo] = useState({});
  let selectedProduct = [];

  const localStorageUser = JSON.parse(localStorage.getItem("admin"));

  //Kiểm tra token login còn tồn tại hay không
  if (!localStorageUser) {
    navigate("/login");
  }

  useEffect(() => {
    getListOrderDetail(Number(idUser.id));
  }, [isChanged]);

  //xử lí pagination chia số lượng item
  useEffect(() => {
    const dataPaging = listOrder.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentOrder(dataPaging);
  }, [currentPage, listOrder]);

  //xử lí search order
  useEffect(() => {
    if (searchTerm !== "") {
      const results = listOrder.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchItems(results);
      const dataPaging = results.slice(indexOfFirstItem, indexOfLastItem);
      setCurrentOrder(dataPaging);
    } else {
      const dataPaging = listOrder.slice(indexOfFirstItem, indexOfLastItem);
      setCurrentOrder(dataPaging);
    }
  }, [searchTerm, listOrder, currentPage]);

  const getListOrderDetail = async (id) => {
    try {
      const order = await getDetailOrders(id);
      setListOrder(order);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProduct = async (id) => {
    setIsChanged(!isChanged);
    if (window.confirm("Are you sure to delete this order?")) {
      try {
        await deleteOrder(id);
        toast.success(`Deleted successfully`);
        getListOrderDetail(idUser.id);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChooseIdToDelete = (event) => {
    let userId = Number(event.target.value);
    if (event.target.checked) {
      selectedProduct.push(userId);
    } else {
      let index = selectedProduct.indexOf(userId);
      selectedProduct.splice(index, 1);
    }
  };

  const handleEdit = async (id) => {
    try {
      const order = await getDetailOrdersById(id);
      setOrderUpdate(order);
      setOrderInfo(order[0]);
      setQuantity(order[0].quantity);
      setTotalPrice(order[0].total_price);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAll = () => {
    if (
      window.confirm("Are you sure you want to delete all of these orders?")
    ) {
      selectedProduct.forEach(async (productId) => {
        try {
          await deleteOrder(productId);
          setIsChanged(!isChanged);
        } catch (error) {
          console.log(error);
        }
      });
      toast.success("Delete all orders chosen successfully");
      selectedProduct = [];
    }
  };

  const handleSaveEdit = async () => {
    const orderUpdated = {
      id: orderInfo.order_detail_id,
      order_id: orderInfo.order_id,
      serial_number: orderInfo.serial_number,
      user_id: orderInfo.user_id,
      order_at: orderInfo.order_at,
      quantity: quantity ? Number(quantity) : orderInfo.quantity,
      total_price: totalPrice
        ? quantity * orderInfo.unit_price
        : orderInfo.total_price,
      status: orderInfo.status_id,
      note: note ? note : orderInfo.note,
      created_at: createAt ? createAt : orderInfo.created_at,
      created_by_id: createById ? createById : orderInfo.created_by_id,
      updated_at: new Date(),
      updated_by_id: localStorageUser.id,
    };
    try {
      await updateOrder(orderUpdated);
      toast.success(
        `Cập nhật sản phẩm có id là ${orderInfo.order_id} thành công`
      );
      setIsChanged(!isChanged);
      setOrderUpdate([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleChangeQuantity = (e) => {
    setQuantity(e.target.value);
    setTotalPrice(quantity * orderInfo.unit_price);
  };
  return (
    <>
      <Header />
      <h1 className="text-center mt-5 mb-5">User Order Detail</h1>
      <div style={{ padding: "0 100px" }}>
        <table id="customers">
          <tr>
            <th>Serial Number</th>
            <th>User Id</th>
            <th>Order At</th>
            <th>Total Price</th>
            <th>Note</th>
            <th>Created At</th>
            <th>Created By ID</th>
            <th>Actions</th>
            <th>
              <button className="btn btn-primary" onClick={handleDeleteAll}>
                Delete All
              </button>
            </th>
          </tr>
          <tbody>
            {currentOrder
              ? currentOrder.map((item, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td>{item.serial_number}</td>
                        <td>{item.user_id}</td>
                        <td>{item.order_at}</td>
                        <td>{item.total_price.toLocaleString()}đ</td>
                        <td>{item.note}</td>
                        <td>{item.created_at}</td>
                        <td>{item.created_by_id}</td>
                        <td>
                          <button
                            className="btn btn-warning me-2 mb-2"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => handleEdit(item.order_id)}
                          >
                            Detail
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteProduct(item.order_id)}
                          >
                            Delete
                          </button>
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            value={item.order_id}
                            onChange={(e) => handleChooseIdToDelete(e)}
                          />
                        </td>
                      </tr>
                    </>
                  );
                })
              : ""}
          </tbody>
        </table>
        {/* Hiển thị các nút phân trang */}
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={searchTerm == "" ? listOrder.length : searchItems.length}
          currentPage={currentPage}
          paginate={paginate}
        />
        <div className="text-center">
          <button
            onClick={() => navigate("/order")}
            className="btn btn-primary mt-5"
          >
            Trở về
          </button>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Order
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label for="order_at" className="col-form-label">
                    Mã đơn hàng
                  </label>
                  <input
                    type="text"
                    readOnly
                    className="form-control"
                    id="order_at"
                    defaultValue={orderInfo.serial_number}
                    disabled
                    onChange={(e) => setSerialNumber(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label for="order_at" className="col-form-label">
                    Tên dịch vụ
                  </label>
                  <input
                    type="text"
                    readOnly
                    className="form-control"
                    id="order_at"
                    value={orderInfo.name_service}
                    disabled
                    onChange={(e) => setNameService(e.target.value)}
                  />
                </div>
                <div>
                  <label for="quantity" className="col-form-label">
                    Số lượng (tính theo kg)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="quantity"
                    defaultValue={orderInfo.quantity}
                    onChange={(e) => handleChangeQuantity(e)}
                  />
                </div>
                <div>
                  <label for="unit_price" className="col-form-label">
                    Đơn giá dịch vụ (tính theo kg)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="unit_price"
                    defaultValue={orderInfo.unit_price}
                    disabled
                    onChange={(e) => setUnitPrice(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label for="total_price" className="col-form-label">
                    Tổng tiền đơn hàng:
                  </label>
                  <input
                    type="text"
                    readOnly
                    className="form-control"
                    id="total_price"
                    value={totalPrice}
                    disabled
                    onChange={(e) => setTotalPrice(e.target.value)}
                  />
                </div>
                <div>
                  <label for="note" className="col-form-label">
                    Ghi chú
                  </label>
                  <textarea
                    type="text"
                    readOnly
                    className="form-control"
                    id="note"
                    defaultValue={orderInfo.note}
                    onChange={(e) => setNote(e.target.value)}
                  ></textarea>
                </div>
                <div>
                  <label for="created_at" className="col-form-label">
                    Thời gian đơn hàng được tạo:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="created_at"
                    defaultValue={orderInfo.created_at}
                    disabled
                    onChange={(e) => setCreateAt(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={handleSaveEdit}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageOrderDetail;

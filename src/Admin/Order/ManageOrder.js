import Header from "../Header/Header";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import Pagination from "../../common/pagination/Pagination";
import {
  getDetailOrdersById,
  getTotalPriceOrder,
  updateOrder,
} from "../../Service/orderAPI";

function ManageOrder() {
  const [isChanged, setIsChanged] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentOrder, setCurrentOrder] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [listOrderAPI, setListOrderAPI] = useState([]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const navigate = useNavigate();
  const localStorageUser = JSON.parse(localStorage.getItem("admin"));
  const [status, setStatus] = useState();
  const [orderEdit, setOrderEdit] = useState({});
  if (!localStorageUser) {
    navigate("/login");
  }
  useEffect(() => {
    getListOrderAPI();
  }, [isChanged]);

  useEffect(() => {
    const dataPaging = listOrderAPI.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentOrder(dataPaging);
  }, [currentPage, listOrderAPI]);

  useEffect(() => {
    if (searchTerm !== "") {
      const results = listOrderAPI.filter((item) =>
        item.serial_number.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchItems(results);
      const dataPaging = results.slice(indexOfFirstItem, indexOfLastItem);
      setCurrentOrder(dataPaging);
    } else {
      const dataPaging = listOrderAPI.slice(indexOfFirstItem, indexOfLastItem);
      setCurrentOrder(dataPaging);
    }
  }, [searchTerm, listOrderAPI, currentPage]);

  const getListOrderAPI = async () => {
    try {
      const orders = await getTotalPriceOrder(-1);
      setListOrderAPI(orders);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleChooseOrder = async (id) => {
    try {
      const order = await getDetailOrdersById(id);
      setOrderEdit(order[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveEdit = async () => {
    const orderSaveEdit = { ...orderEdit };
    orderSaveEdit.status_id = Number(status);
    try {
      await updateOrder(orderSaveEdit);
      toast.success("Success!");
      setIsChanged(!isChanged);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header />
      <h1 className="text-center mt-3">Manager Orders</h1>
      <div style={{ marginLeft: "44%" }} className="mt-3 mb-3">
        <input
          className="input-group-text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search"
          type="number"
          min={1}
        />
      </div>
      <div style={{ padding: "0 100px" }}>
        <table id="customers" className="text-center">
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>User Id</th>
              <th>Order At</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Note</th>
              <th>Created At</th>
              <th>Created By ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrder
              ? currentOrder.map((item, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td>{item.serial_number}</td>
                        <td>{item.user_id}</td>
                        <td>{item.order_at}</td>
                        <td>{item.total_price_user.toLocaleString()}đ</td>
                        <td>
                          <select
                            value={item.status_id ? item.status_id : 1}
                            type="text"
                            disabled
                            className="form-control"
                          >
                            <option value={1}>Chờ xác nhận</option>
                            <option value={2}>Đã xác nhận</option>
                            <option value={3}>Đã giặt hoàn tất</option>
                            <option value={4}>Đã giao hàng</option>
                          </select>
                        </td>
                        <td>{item.note}</td>
                        <td>{item.created_at}</td>
                        <td>{item.created_by_id}</td>
                        <td style={{ width: "200px" }}>
                          <button
                            className="btn btn-warning me-2"
                            onClick={() =>
                              navigate(`/order_user/${item.user_id}`)
                            }
                          >
                            Detail
                          </button>
                          <button
                            className="btn btn-success"
                            onClick={() => handleChooseOrder(item.order_id)}
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            Edit Status
                          </button>
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
          totalItems={
            searchTerm == "" ? listOrderAPI.length : searchItems.length
          }
          currentPage={currentPage}
          paginate={paginate}
        />
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
                      disabled
                      defaultValue={orderEdit.serial_number}
                    />
                  </div>
                  <div className="mb-3">
                    <label for="order_at" className="col-form-label">
                      Đặt hàng vào lúc
                    </label>
                    <input
                      type="text"
                      readOnly
                      className="form-control"
                      id="order_at"
                      disabled
                      value={orderEdit.order_at}
                    />
                  </div>
                  <div className="mb-3">
                    <label for="order_at" className="col-form-label">
                      Tổng tiền tạm tính
                    </label>
                    <input
                      type="text"
                      readOnly
                      className="form-control"
                      id="order_at"
                      disabled
                      value={orderEdit.total_price}
                    />
                  </div>
                  <div className="mb-3">
                    <label for="order_at" className="col-form-label me-3">
                      Trạng thái đơn hàng
                    </label>
                    <select
                      className="form-select"
                      defaultValue={orderEdit.status_id}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value={1}>Chờ xác nhận</option>
                      <option value={2}>Đã xác nhận</option>
                      <option value={3}>Đã giặt hoàn tất</option>
                      <option value={4}>Đã giao hàng</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={handleSaveEdit}
                >
                  Edit Order
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ManageOrder;

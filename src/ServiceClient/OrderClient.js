import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import Pagination from "../common/pagination/Pagination";
import Header from "../Client/Header/Header";
import Footer from "../Client/Footer/Footer";
import { getTotalPriceOrder } from "../Service/orderAPI";
import { getListOrdersDetail } from "../Service/orderDetailAPI";

function OrderClient() {
  const [isChanged, setIsChanged] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentOrder, setCurrentOrder] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [listOrderAPI, setListOrderAPI] = useState([]);
  const [listOrderDetail, setListOrderDetail] = useState([]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const navigate = useNavigate();
  const localStorageUser = JSON.parse(localStorage.getItem("admin"));
  const userId = JSON.parse(localStorage.getItem("userId"));

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
      const orders = await getTotalPriceOrder(userId);
      setListOrderAPI(orders);
    } catch (error) {
      toast.error(error.response.data.errMessage);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleGetOrderDetail = async (id) => {
    try {
      let listOrderDetail = await getListOrdersDetail(id);
      setListOrderDetail(listOrderDetail);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setListOrderDetail([]);
  };
  return (
    <>
      <Header />
      <h1 className="text-center mt-3">Đơn hàng của bạn</h1>
      <div style={{ marginLeft: "44%" }} className="mt-3 mb-3">
        <input
          className="input-group-text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search"
          type="number"
        />
      </div>
      <div style={{ padding: "0 200px" }}>
        <table id="customers" className="text-center">
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Email người đặt</th>
              <th>Thời gian tạo đơn hàng</th>
              <th>Tổng tiền tạm tính</th>
              <th>Trạng thái</th>
              <th>Ghi chú</th>
              {/* <th>Người tạo đơn hàng</th> */}
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentOrder
              ? currentOrder.map((item, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td>{item.serial_number}</td>
                        <td>{item.email}</td>
                        <td>{item.order_at}</td>
                        <td>
                          {Number(item.total_price_user).toLocaleString()}đ
                        </td>
                        <td>
                          <select
                            value={item.status_id}
                            disabled
                            type="text"
                            className="form-control"
                          >
                            <option value={1}>Wait for confirmation</option>
                            <option value={2}>Confirmed</option>
                            <option value={3}>Delivering</option>
                            <option value={4}>Delivered</option>
                            <option value={5}>Refuse</option>
                            <option value={6}>Finished washing</option>
                          </select>
                        </td>
                        <td>{item.note}</td>
                        {/* <td>{item.created_by_id}</td> */}
                        <td>
                          <button
                            className="btn btn-warning me-2"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => handleGetOrderDetail(item.user_id)}
                          >
                            Chi tiết
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
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Thông tin đặt dịch vụ
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {listOrderDetail.map((item, index) => {
                return (
                  <>
                    <div className="mb-3">
                      <div className="mb-3 text-center">
                        <img
                          src="https://giatui247.vn/web/image/1459-32ad2657/Call-247-LaunDry.png"
                          alt=""
                        />
                      </div>
                      <div className="mb-3">
                        <h5>Mã đơn hàng: {item.serial_number}</h5>
                      </div>
                      <div className="mb-3">
                        <h5>
                          Đơn giá dịch vụ (tính theo kg):{" "}
                          {Number(item.unit_price).toLocaleString()} đ
                        </h5>
                      </div>
                      <div className="mb-3">
                        <h5>Số lượng: {item.quantity} kg</h5>
                      </div>
                      <div className="mb-3">
                        <h5>
                          Tổng tiền tạm tính:{" "}
                          {Number(item.sub_total_price).toLocaleString()} đ
                        </h5>
                      </div>
                      <div className="mb-3">
                        <h5>Địa chỉ giao hàng: {item.address_order}</h5>
                      </div>
                      <div className="mb-3">
                        <h5>Ngày hẹn giao nhận: {item.date_receive}</h5>
                      </div>
                      <div className="mb-3 text-center">
                        <img
                          src="https://giatui247.vn/web/image/1459-32ad2657/Call-247-LaunDry.png"
                          alt=""
                        />
                      </div>
                      <hr />
                    </div>
                  </>
                );
              })}
            </div>
            <div
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={handleCloseModal}
            >
              Close
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default OrderClient;

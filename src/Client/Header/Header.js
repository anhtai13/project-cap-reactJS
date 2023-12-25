import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const isLogin = JSON.parse(localStorage.getItem("admin"));

  if (!isLogin) {
    navigate("/userlogin");
  }

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/userlogin");
  };
  return (
    <>
      <div style={{ padding: "0 100px" }} className="bg-light">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <Link to="/" className="nav-link">
              <img
                src="https://giatui247.vn/web/image/website/1/logo/Gi%E1%BA%B7t%20%E1%BB%A7i%20247?unique=14cb38c"
                alt=""
              />
            </Link>
            <div
              className="collapse navbar-collapse ms-4"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Trang chủ
                  </Link>
                </li>
                <li className="nav-item dropdown me-3">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDarkDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Dịch vụ
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-dark"
                    aria-labelledby="navbarDarkDropdownMenuLink"
                  >
                    <li>
                      <Link to="/premium" className="dropdown-item">
                        Giặt ủi cao cấp
                      </Link>
                    </li>
                    <li>
                      <Link to="/fast" className="dropdown-item">
                        Giặt sấy lấy liền
                      </Link>
                    </li>
                    <li>
                      <Link to="/dry" className="dropdown-item">
                        Giặt hấp - Giặt khô
                      </Link>
                    </li>
                    <li>
                      <Link to="/hotel" className="dropdown-item">
                        Giặt ủi khách sạn
                      </Link>
                    </li>
                    <li>
                      <Link to="/uniform" className="dropdown-item">
                        Giặt ủi đồng phục
                      </Link>
                    </li>
                    <li>
                      <Link to="/uniform" className="dropdown-item">
                        Giặt khăn spa
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item me-2">
                  <Link to="/bookingdemo" className="nav-link">
                    Đặt dịch vụ
                  </Link>
                </li>
                <li className="nav-item me-2">
                  <Link to="/discount" className="nav-link">
                    Khuyến mãi/Event
                  </Link>
                </li>
                <li className="nav-item me-2">
                  <Link to="/orderclient" className="nav-link">
                    Đơn hàng của bạn
                  </Link>
                </li>
                <li className="nav-item me-2">
                  <a role="menuitem" href="#" className="nav-link ">
                    <span>Tin tức</span>
                  </a>
                </li>
                <li className="nav-item me-2">
                  <Link to="/about" className="nav-link">
                    Giới thiệu
                  </Link>
                </li>
                <div className="mt-2 ms-5">
                  <img
                    src="https://giatui247.vn/web/image/1459-32ad2657/Call-247-LaunDry.png"
                    alt=""
                  />
                </div>
              </ul>
              <div className="d-flex">
                {isLogin ? (
                  <>
                    <h2 className="text-success me-4">Welcome User!</h2>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleLogout()}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-primary me-3"
                      onClick={() => navigate("/userlogin")}
                    >
                      Đăng nhập
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => navigate("/userregister")}
                    >
                      Đăng kí
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
export default Header;

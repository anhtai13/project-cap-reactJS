import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getDetaiUser } from "../../Service/userAPI";
import { toast } from "react-toastify";
// function header
function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const isLogin = JSON.parse(localStorage.getItem("admin"));
  const userId = JSON.parse(localStorage.getItem("userId"));
  // if (!isLogin) {
  //   navigate("/userlogin");
  // }

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/userlogin");
  };

  const handleGetUser = async () => {
    try {
      const userDetail = await getDetaiUser(userId);
      setUser(userDetail);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  useEffect(() => {
    if (isLogin) {
      handleGetUser();
    }
  }, []);
  return (
    <>
      <div style={{ padding: "0 100px" ,fontFamily:"Arial"}} className="bg-light">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <Link to="/" className="nav-link">
              <img
                src="https://th.bing.com/th/id/OIG.MBDpBri6Cxu4Qek0DfkD?pid=ImgGn"
                alt=""
                style={{width: "100px", height: "80px",}}
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
              </ul>
              <div className="d-flex">
                {isLogin && user ? (
                  <>
                    {/* <h2 className="text-success me-4">Welcome User!</h2>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleLogout()}
                    >
                      Logout
                    </button> */}
                    <ul class="nav nav-tabs">
                      <li class="nav-item dropdown">
                        <a
                          class="nav-link dropdown-toggle"
                          href="#"
                          id="navbarDropdownMenuLink"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          style={{ borderColor: "#F8F9FA" }}
                        >
                          <Image
                            style={{
                              width: 40,
                              height: 40,
                            }}
                            src={
                              user[0].avatar === "" || user[0].avatar === null
                                ? "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
                                : user[0].avatar
                            }
                            roundedCircle
                          />
                        </a>
                        <ul class="dropdown-menu">
                          <li>
                            <a class="dropdown-item" href="/userprofile">
                              Hồ sơ cá nhân
                            </a>
                          </li>
                          <li>
                            <a class="dropdown-item" href="/orderclient">
                              Đơn hàng
                            </a>
                          </li>

                          <li>
                            <a
                              class="dropdown-item"
                              href=""
                              onClick={() => handleLogout()}
                            >
                              Đăng xuất
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
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

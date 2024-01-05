import { useNavigate } from "react-router";
import "./Header.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutAPI } from "../../Service/authenAPI";
import { useEffect, useState } from "react";
import { getDetaiUser } from "../../Service/userAPI";
import { Image } from "react-bootstrap";

function Header() {
  const localStorageToken = JSON.parse(localStorage.getItem("admin"));
  const adminId = JSON.parse(localStorage.getItem("userId"));
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  if (!localStorageToken) {
    navigate("/login");
  }

  const handleLogout = async () => {
    try {
      const status = await logoutAPI({ key: localStorageToken });
      localStorage.removeItem("admin");
      localStorage.removeItem("userId");
      toast.success(status);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetUser = async () => {
    try {
      const userDetail = await getDetaiUser(adminId);
      setUser(userDetail);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
  useEffect(() => {
    if (localStorageToken) {
      handleGetUser();
    }
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Home
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item active text-center">
                <Link to="/home" className="nav-link">
                  Manager Users
                </Link>
              </li>
              <li className="nav-item text-center">
                <Link to="/services" className="nav-link">
                  Manager Services
                </Link>
              </li>
              <li className="nav-item text-center">
                <Link to="/order" className="nav-link">
                  Manager Orders
                </Link>
              </li>
              {/* <li className="nav-item text-center">
                                <Link to="/contact" className="nav-link">Manager Contacts</Link>
                            </li> */}
            </ul>
            {/* <h3 className="text-primary me-3">
              {localStorageToken ? `Hello Admin!` : navigate("/login")}
            </h3>
            <button className="btn btn-success me-5" onClick={handleLogout}>
              Logout
            </button> */}
            <div className="d-flex " style={{ marginRight: 70 }}>
              {user && (
                <>
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
                          <a class="dropdown-item" href="/adminprofile">
                            Hồ sơ cá nhân
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
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;

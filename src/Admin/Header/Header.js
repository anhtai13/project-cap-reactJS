import { useNavigate } from "react-router";
import "./Header.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutAPI } from "../../Service/authenAPI";

function Header() {
  const localStorageToken = JSON.parse(localStorage.getItem("admin"));
  const navigate = useNavigate();

  if (!localStorageToken) {
    navigate("/login");
  }

  const handleLogout = async () => {
    try {
      const status = await logoutAPI({ key: localStorageToken });
      localStorage.removeItem("admin");
      toast.success(status);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
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
            <h3 className="text-primary me-3">
              {localStorageToken ? `Hello Admin!` : navigate("/login")}
            </h3>
            <button className="btn btn-success me-5" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;

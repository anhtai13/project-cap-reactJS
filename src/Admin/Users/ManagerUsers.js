import { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./ManagerUsers.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import Pagination from "../../common/pagination/Pagination";
import {
  deleteUser,
  getListUsers,
  getListUsersSortedLastName,
  getListUsersSortedRole,
  getListUsersSortedUserName,
  updateUser,
} from "../../Service/userAPI";

function ManagerUsers() {
  const [id, setId] = useState();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [avatar, setAvatar] = useState();
  const [createdAt, setCreatedAt] = useState();
  const [updatedAt, setUpdatedAt] = useState();
  const [createdById, setCreatedById] = useState();
  const [updatedById, setUpdatedById] = useState();
  const [role, setRole] = useState(2);
  const [password, setPassword] = useState();
  const [repassword, setRePassword] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const [listUser, setListUsers] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, setCurrentUser] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [isSorted, setIsSorted] = useState(true);
  let selectedUsers = [];
  const localStorageUser = JSON.parse(localStorage.getItem("admin"));

  if (!localStorageUser) {
    navigate("/login");
  }

  useEffect(() => {
    getListUsersFormAPI();
  }, [isChanged]);

  useEffect(() => {
    // Kiểm tra search input có giá trị hay không
    if (searchTerm !== "") {
      // Thực thi filter list danh sách User có Username chứa các kí tự hoặc chuỗi của searchTerm
      const results = listUser.filter((item) =>
        item.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      // gán list danh sách user sau khi filter cho biến SearchItems
      setSearchItems(results);
      // Tính toán số trang phân ra
      const dataPaging = results.slice(indexOfFirstItem, indexOfLastItem);
      setCurrentUser(dataPaging);
    } else {
      const dataPaging = listUser.slice(indexOfFirstItem, indexOfLastItem);
      setCurrentUser(dataPaging);
    }
  }, [searchTerm, listUser, currentPage]);

  useEffect(() => {
    if (listUser.length > 0) {
      const dataPaging = listUser.slice(indexOfFirstItem, indexOfLastItem);
      setCurrentUser(dataPaging);
    }
  }, [currentPage, listUser]);

  const getListUsersFormAPI = async () => {
    try {
      const users = await getListUsers();
      setListUsers(users);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleEdit = (item) => {
    setIsEdit(!isEdit);
    setUserName(item.username);
    setEmail(item.email);
    setPassword(item.password);
    setFirstName(item.first_name);
    setLastName(item.last_name);
    setAvatar(item.avatar);
    setCreatedAt(item.created_at);
    setRole(item.role);
    setId(item.user_id);
    setCreatedById(item.created_by_id);
    setUpdatedAt(item.updated_at);
    setUpdatedById(item.updated_by_id);
  };

  const handleSave = async () => {
    const formDataUpdate = {
      id: id,
      username: userName,
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName,
      role: role,
      avatar: avatar,
      created_at: createdAt,
      updated_at: new Date(),
      created_by_id: localStorageUser.user_id,
      updated_by_id: localStorageUser.user_id,
    };
    try {
      //Gọi API thêm mới user
      await updateUser(formDataUpdate);
      toast.success(
        `Update account id information ${formDataUpdate.id} Success!`
      );
      setIsChanged(!isChanged);
    } catch (error) {
      toast.error(error.response.data.error);
    }
    setIsChanged(!isChanged);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        toast.success(`Delete account id information ${id} Success!`);
        setIsChanged(!isChanged);
      } catch (error) {
        toast.error(error.response.data.error);
      }
    }
  };

  const handleDeleteAll = () => {
    if (window.confirm("Are you sure you want to delete all of these users?")) {
      selectedUsers.forEach(async (userId) => {
        try {
          await deleteUser(userId);
        } catch (error) {
          toast.error(error.response.data.error);
        }
      });
    }
    toast.success(`Delete selected account information successfully!`);
    selectedUsers = [];
    setIsChanged(!isChanged);
  };

  const handleChooseIdToDelete = (event) => {
    const userId = Number(event.target.value);
    if (event.target.checked) {
      selectedUsers.push(userId);
    } else {
      let index = selectedUsers.indexOf(userId);
      selectedUsers.splice(index, 1);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortUserName = async () => {
    setIsSorted(!isSorted);
    try {
      const listUserSort = isSorted
        ? await getListUsersSortedUserName("ASC")
        : await getListUsersSortedUserName("DESC");
      setListUsers(listUserSort);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleSortRole = async () => {
    setIsSorted(!isSorted);
    try {
      const listUserSort = isSorted
        ? await getListUsersSortedRole("ASC")
        : await getListUsersSortedRole("DESC");
      setListUsers(listUserSort);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleSortLastName = async () => {
    setIsSorted(!isSorted);
    try {
      const listUserSort = isSorted
        ? await getListUsersSortedLastName("ASC")
        : await getListUsersSortedLastName("DESC");
      setListUsers(listUserSort);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };
  return (
    <>
      <Header />
      <div style={{ padding: "0 100px" }} className="content">
        <h1 className="text-center">Manager User</h1>
        <div className="text-center mt-3">
          <button
            className="btn btn-primary me-2 mb-2"
            onClick={() => navigate("/register")}
          >
            Add User
          </button>
        </div>
        <div style={{ marginLeft: "44%", position: "relative", top: "70px" }}>
          <input
            className="input-group-text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search"
            type="text"
          />
        </div>
        <table
          id="customers"
          className="text-center"
          style={{ marginTop: "100px" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>
                Username{" "}
                <span>
                  <i
                    style={{ cursor: "pointer" }}
                    onClick={handleSortUserName}
                    class="fa-solid fa-sort"
                  ></i>
                </span>
              </th>
              <th>Email</th>
              <th>First Name</th>
              <th>
                Last Name{" "}
                <span>
                  <i
                    style={{ cursor: "pointer" }}
                    onClick={handleSortLastName}
                    class="fa-solid fa-sort"
                  ></i>
                </span>
              </th>
              <th>Avatar</th>
              <th>
                Role{" "}
                <span>
                  <i
                    style={{ cursor: "pointer" }}
                    onClick={handleSortRole}
                    class="fa-solid fa-sort"
                  ></i>
                </span>
              </th>
              <th>Created At</th>
              <th>Actions</th>
              <th>
                <button className="btn btn-primary" onClick={handleDeleteAll}>
                  Delete All
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUser
              ? currentUser.map((item, index) => {
                  return (
                    <>
                      <tr key={item.user_id}>
                        <td>{item.user_id}</td>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        <td>{item.first_name}</td>
                        <td>{item.last_name}</td>
                        <td>
                          <img
                            src={item.avatar}
                            alt="Ảnh của bạn"
                            height={120}
                            width={200}
                          />
                        </td>
                        <td>
                          <select
                            defaultValue={item.role}
                            disabled
                            type="text"
                            className="form-control"
                          >
                            <option value={1}>Admin</option>
                            <option value={2}>User</option>
                          </select>
                        </td>
                        <td>{item.created_at}</td>
                        <td>
                          {item.role == 1 ? (
                            ""
                          ) : (
                            <>
                              <button
                                className="btn btn-warning me-2"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                                onClick={() => handleEdit(item)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-secondary"
                                onClick={() => handleDelete(item.user_id)}
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            value={item.id}
                            onChange={(e) => handleChooseIdToDelete(e)}
                          />
                        </td>
                      </tr>
                    </>
                  );
                })
              : []}
          </tbody>
        </table>
        {/* Hiển thị các nút phân trang */}
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={searchTerm == "" ? listUser.length : searchItems.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Edit User
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body row" style={{ padding: "0 50px" }}>
              <label className="form-label mt-2">Username</label>
              <input
                type="text"
                className="form-control"
                defaultValue={userName}
                disabled
                onChange={(e) => setUserName(e.target.value)}
              />
              <label className="form-label mt-2">Email</label>
              <input
                type="text"
                className="form-control"
                defaultValue={email}
                disabled
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="form-label mt-2">First Name</label>
              <input
                type="text"
                className="form-control"
                defaultValue={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label className="form-label mt-2">Last Name</label>
              <input
                type="text"
                className="form-control"
                defaultValue={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <label className="form-label mt-2">Role</label>
              <select
                defaultValue={role}
                type="text"
                className="form-control"
                disabled
                onChange={(e) => setRole(e.target.value)}
              >
                <option value={1}>Admin</option>
                <option value={2}>User</option>
              </select>
              <label className="form-label mt-2">Password</label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="form-label mt-2">Retype Password</label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setRePassword(e.target.value)}
              />
              <label className="form-label mt-2">Avatar</label>
              <input
                type="text"
                className="form-control"
                defaultValue={avatar}
                onChange={(e) => setAvatar(e.target.value)}
              />

              <label className="form-label mt-2">Created At</label>
              <input
                type="text"
                className="form-control"
                defaultValue={createdAt}
                disabled
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={handleSave}
              >
                Save
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
export default ManagerUsers;

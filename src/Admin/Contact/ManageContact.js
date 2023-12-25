import Header from "../Header/Header"
import { useEffect, useState } from "react"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";
import Pagination from "../../common/pagination/Pagination";
import { deleteContact, getDetailContact, getListContact, updateContact } from "../../Service/contactAPI";

function ManageContact() {
    const [isChanged, setIsChanged] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');
    const [currentContact, setCurrentContact] = useState([])
    const [searchItems, setSearchItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [listContact, setListContact] = useState([]);
    const [detailContact, setDetailContact] = useState({});
    const [fullName, setFullName] = useState()
    const [email, setEmail] = useState()
    const [content, setContent] = useState()
    const [status, setStatus] = useState()
    const [id, setId] = useState()
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const navigate = useNavigate()
    const localStorageUser = JSON.parse(localStorage.getItem('admin'))

    if (!localStorageUser) {
        navigate("/login")
    }
    useEffect(() => {
        getListContactAPI()
    }, [isChanged])

    useEffect(() => {
        const dataPaging = listContact.slice(indexOfFirstItem, indexOfLastItem);
        setCurrentContact(dataPaging);
    }, [currentPage, listContact])

    useEffect(() => {
        if (searchTerm !== '') {
            const results = listContact.filter((item) =>
                item.full_name.toLowerCase().includes(searchTerm.toLowerCase()));
            setSearchItems(results)
            const dataPaging = results.slice(indexOfFirstItem, indexOfLastItem);
            setCurrentContact(dataPaging)
        } else {
            const dataPaging = listContact.slice(indexOfFirstItem, indexOfLastItem);
            setCurrentContact(dataPaging);
        }
    }, [searchTerm, listContact, currentPage]);

    const getListContactAPI = async () => {
        try {
            const contacts = await getListContact()
            setListContact(contacts)
        } catch (error) {
            toast.error("Something went wrong!")
        }
    }

    const handleEdit = async (id) => {
        try {
            const detailContact = await getDetailContact(id)
            setDetailContact(detailContact)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSaveEdit = async () => {
        const updateContactData = {
            id: detailContact.id,
            full_name: fullName ? fullName : detailContact.full_name,
            email: email ? email : detailContact.email,
            content: content ? content : detailContact.content,
            status: status ? status : detailContact.status,
            created_at: detailContact.created_at,
            created_by_id: detailContact.created_by_id,
            updated_at: new Date(),
            updated_by_id: 1
        }
        try {
            await updateContact(updateContactData)
            toast.success("Successfully updated contact!")
            setIsChanged(!isChanged)
        } catch (error) {
            console.log(error)
        }
    }
    const handleDelete = async (id) => {
        try {
            await deleteContact(id)
            toast.success("Deleted successfully!")
            setIsChanged(!isChanged)
        } catch (error) {
            console.log(error)
        }
    }
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <>
            <Header />
            <h1 className="text-center mt-3">Manager Contact</h1>
            <div style={{ marginLeft: "44%" }} className="mt-3 mb-3" >
                <input className="input-group-text" value={searchTerm} onChange={handleSearch} placeholder="Search" type="text" />
            </div>
            <div style={{ padding: "0 200px" }}>
                <table id="customers" className="text-center" >
                    <thead >
                        <tr >
                            <th>ID</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Content</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Created By ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody >
                        {currentContact ?
                            currentContact.map((item, index) => {
                                return (
                                    <>
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.full_name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.content}</td>
                                            <td>
                                                <select value={item.status} disabled type="text" className="form-control">
                                                    <option value={0}>Từ chối</option>
                                                    <option value={1}>Chờ xác nhận</option>
                                                    <option value={2}>Đã xác nhận</option>
                                                    <option value={3}>Đã hoàn thành</option>
                                                </select>
                                            </td>
                                            <td>{item.created_at}</td>
                                            <td>{item.created_by_id}</td>
                                            <td><button className="btn btn-warning me-2"
                                                data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                onClick={() => handleEdit(item.id)}
                                            >
                                                Edit
                                            </button>
                                                <button className="btn btn-danger me-2"
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                            : ""}
                    </tbody>
                </table>
                {/* Hiển thị các nút phân trang */}
                <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={searchTerm == '' ? listContact.length : searchItems.length}
                    currentPage={currentPage}
                    paginate={paginate}
                />
            </div>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Chi tiết phản hồi</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <label className="form-label mt-2">Họ và tên</label>
                            <input type="text" className="form-control" defaultValue={detailContact.full_name ? detailContact.full_name : ""}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                            <label className="form-label mt-2">Email</label>
                            <input type="text" className="form-control" value={detailContact.email ? detailContact.email : ""}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className="form-label mt-2">Nội dung phản hồi</label>
                            <input type="text" className="form-control" value={detailContact.content ? detailContact.content : ""}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            <label className="form-label mt-2">Trạng thái</label>
                            <select defaultValue={detailContact.status} type="text" className="form-control"
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value={0}>Từ chối</option>
                                <option value={1}>Chờ xác nhận</option>
                                <option value={2}>Đã xác nhận</option>
                                <option value={3}>Đã hoàn thành</option>
                            </select>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary"
                                onClick={handleSaveEdit}
                                data-bs-dismiss="modal">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ManageContact
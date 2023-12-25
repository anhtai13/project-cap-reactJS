import Header from "../Header/Header"
import "./ManagerProducts.css"
import { useState, useEffect } from "react"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router"
import Pagination from "../../common/pagination/Pagination";
import { addProduct, deleteProduct, getListProducts, updateProduct } from "../../Service/productAPI";

function ManagerProducts() {
    const [productName, setProductName] = useState()
    const [price, setPrice] = useState()
    const [imgUrl, setImgUrl] = useState()
    const [description, setDescription] = useState()
    const navigate = useNavigate()
    const [isChanged, setIsChanged] = useState(false)
    const [id, setId] = useState()
    const [isEdit, setIsEdit] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const [currentItems, setCurrentItems] = useState([])
    const [searchItems, setSearchItems] = useState([])
    const [listProducts, setListProducts] = useState([])
    const [createAt, setCreateAt] = useState()
    let selectedProduct = []
    let errorResponse = ""
    const localStorageUser = JSON.parse(localStorage.getItem('admin'))

    if (!localStorageUser) {
        navigate("/login")
    }

    useEffect(() => {
        getListProductsAPI()
    }, [isChanged])

    useEffect(() => {
        const dataPaging = listProducts.slice(indexOfFirstItem, indexOfLastItem);
        setCurrentItems(dataPaging);
    }, [currentPage, listProducts])

    useEffect(() => {
        if (searchTerm !== '') {
            const results = listProducts.filter((item) =>
                item.name_service.toLowerCase().includes(searchTerm.toLowerCase()));
            setSearchItems(results)
            const dataPaging = results.slice(indexOfFirstItem, indexOfLastItem);
            setCurrentItems(dataPaging)
        } else {
            const dataPaging = listProducts.slice(indexOfFirstItem, indexOfLastItem);
            setCurrentItems(dataPaging);
        }
    }, [searchTerm, listProducts, currentPage]);

    const getListProductsAPI = async () => {
        try {
            const products = await getListProducts()
            setListProducts(products)
        } catch (error) {
            toast.error("Something went wrong!")
        }
    }

    const handleAdd = async () => {
        const formData = {
            name: productName,
            price: +price,
            description: description,
            image: imgUrl,
            created_at: new Date(),
            created_by_id: 1,
            updated_at: new Date(),
            updated_by_id: ""
        }
        try {
            await addProduct(formData)
            toast.success(`Thêm dịch vụ ${productName} thành công!`)
            document.getElementById("form").reset()
            setProductName("")
            setPrice("")
            setDescription("")
            setImgUrl("")
            setIsChanged(!isChanged)
        } catch (error) {
            errorResponse = error.response.data.errMessage
            toast.error(error.response.data.errMessage)
        }
    }

    const handleEdit = (id) => {
        setIsEdit(!isEdit)
        listProducts.map(item => {
            if (item.service_id === id) {
                console.log(item)
                setProductName(item.name_service)
                setPrice(item.unit_price)
                setDescription(item.description)
                setImgUrl(item.image)
                setId(item.service_id)
            }
        })
    }

    const handleSaveEdit = async () => {
        const formDataUpdate = {
            "id": id,
            "name": productName,
            "price": +price,
            "description": description,
            "image": imgUrl,
            "created_at": createAt,
            "created_by_id": localStorageUser.id,
            "updated_at": new Date(),
            "updated_by_id": localStorageUser.id
        }
        try {
            await updateProduct(formDataUpdate)
            toast.success(`Cập nhật dịch vụ ${productName} thành công!`)
            document.getElementById("form").reset()
            setProductName("")
            setPrice("")
            setDescription("")
            setImgUrl("")
            setIsEdit(!isEdit)
            setIsChanged(!isChanged)
        } catch (error) {
            errorResponse = error.response.data.message
            toast.error(error.response.data.message)
        }
    }

    const handleDeleteProduct = async (id) => {
        if (window.confirm("Bạn có chắc chắn xóa dịch vụ này không?")) {
            try {
                await deleteProduct(id)
                toast.success(`Xóa dịch vụ thành công!`)
                setIsChanged(!isChanged)
            } catch (error) {
                errorResponse = error.response.data.error
                toast.error(error.response.data.error)
            }
        }
    }

    const handleDeleteAll = () => {
        if (window.confirm("Bạn có chắc chắn muốn xóa tất cả dịch vụ này không?")) {
            selectedProduct.forEach(async (productId) => {
                try {
                    await deleteProduct(productId);
                    setIsChanged(!isChanged)
                } catch (error) {
                    console.log(error);
                }
            })
            toast.success("Delete all product chosen successfully")
        }
        selectedProduct = []
    }

    const handleChooseIdToDelete = (event) => {
        let userId = Number(event.target.value);
        if (event.target.checked) {
            selectedProduct.push(userId);
        } else {
            let index = selectedProduct.indexOf(userId)
            selectedProduct.splice(index, 1);
        }
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
            <Header />
            <h1 className="text-center mt-3">Manager Services</h1>
            <div className="text-center mt-3">
                <button className="btn btn-primary me-2 mb-2"
                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                >
                    Add Service
                </button>
            </div>
            <div style={{ marginLeft: "44%" }} className="mb-2">
                <input className="input-group-text" value={searchTerm} onChange={handleSearch} placeholder="Search" type="text" />
            </div>
            <div style={{ padding: "0 100px" }}>
                <table id="customers" className="text-center" >
                    <thead >
                        <tr >
                            <th>ID</th>
                            <th>Tên dịch vụ</th>
                            <th>Đơn giá dịch vụ</th>
                            <th>Mô tả dịch vụ</th>
                            <th>Ảnh minh họa</th>
                            <th>Thời điểm có dịch vụ</th>
                            <th>Dịch vụ được tạo bởi</th>
                            <th>Hành động</th>
                            <th>
                                <button className="btn btn-primary"
                                    onClick={handleDeleteAll}
                                >Delete All</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody >
                        {currentItems ?
                            currentItems.map((item, index) => {
                                return (
                                    <>
                                        <tr key={index}>
                                            <td>{item.service_id}</td>
                                            <td>{item.name_service}</td>
                                            <td>{(item.unit_price).toLocaleString()} đ</td>
                                            <td>{item.description}</td>
                                            <td>
                                                <img src={item.image} alt="Ảnh bị hư rồi" height={120} width={200} />
                                            </td>
                                            <td>{item.created_at}</td>
                                            <td>Admin</td>
                                            <td><button className="btn btn-warning me-2" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                onClick={() => handleEdit(item.service_id)}
                                            >
                                                Edit
                                            </button>
                                                <button className="btn btn-danger"
                                                    onClick={() => handleDeleteProduct(item.service_id)}
                                                >Delete</button>
                                            </td>
                                            <td>
                                                <input type="checkbox"
                                                    value={item.id}
                                                    onChange={(e) => handleChooseIdToDelete(e)}
                                                />
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                            :
                            ""
                        }
                    </tbody>
                </table>
                {/* Hiển thị các nút phân trang */}
                <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={searchTerm == '' ? listProducts.length : searchItems.length}
                    currentPage={currentPage}
                    paginate={paginate}
                />
            </div>


            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabindex="-1" data-bs-backdrop="static"
                data-bs-keyboard="false"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{isEdit ? "Cập nhật dịch vụ" : "Thêm loại dịch vụ"}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="form">
                                <div className="mb-3">
                                    <label for="product-name" className="col-form-label">Tên dịch vụ:</label>
                                    <input type="text" className="form-control" id="product-name" defaultValue={isEdit ? productName : ''}
                                        onChange={(e) => setProductName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="price" className="col-form-label">Đơn giá dịch vụ:</label>
                                    <input type="number" min={10000} className="form-control" id="price" defaultValue={isEdit ? price : 10000}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label for="description" className="col-form-label">Mô tả:</label>
                                    <textarea type="text" className="form-control" id="description" defaultValue={isEdit ? description : ''}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label for="image" className="col-form-label">Hình ảnh dịch vụ:</label>
                                    <input type="text" className="form-control" id="image" defaultValue={isEdit ? imgUrl : ''}
                                        onChange={(e) => setImgUrl(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3 text-center">
                                    <img src={imgUrl} height={200} width={200} alt="Thiếu ảnh rồi" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            {isEdit ?
                                <>
                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                        onClick={handleSaveEdit}
                                    >Edit Service</button>
                                    <button onClick={() => setIsEdit(!isEdit)} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                </>
                                :
                                <>
                                    <button type="button" className="btn btn-primary" data-bs-dismiss={errorResponse !== "" ? "" : 'modal'}
                                        onClick={handleAdd}
                                    >Add Service</button><button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ManagerProducts
import Footer from "../Footer/Footer"
import Header from "../Header/Header"
import "./HomePage.css"
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getListProducts } from "../../Service/productAPI";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Pagination from '../../common/pagination/Pagination'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addOrder } from "../../Service/orderAPI";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HomePage() {
    const [listProducts, setListProducts] = useState([])
    const navigate = useNavigate()
    const isLogin = JSON.parse(localStorage.getItem('admin'));
    let userId = JSON.parse(localStorage.getItem('userId'));
    const [currentProduct, setCurrentProduct] = useState([])
    const [searchItems, setSearchItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState();
    const [serviceUnitPrice, setServiceUnitPrice] = useState();
    const [quantity, setQuantity] = useState(1);
    const [subTotalPrice, setSubTotalPrice] = useState();
    const [note, setNote] = useState();
    const [serviceImgChoosen, setServiceImgChoosen] = useState();
    const [addressOrder, setAddressOrder] = useState();
    const [serviceChoosenId, setServiceChoosenId] = useState();

    let serviceChoosen = {};
    if (!isLogin) {
        navigate("/userlogin")
    }

    useEffect(() => {
        getListProductsFromAPI()
    }, [])

    useEffect(() => {
        const dataPaging = listProducts.slice(indexOfFirstItem, indexOfLastItem);
        setCurrentProduct(dataPaging);
    }, [currentPage, listProducts])

    useEffect(() => {
        if (searchTerm !== '') {
            const results = listProducts.filter((item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()));
            setSearchItems(results)
            const dataPaging = results.slice(indexOfFirstItem, indexOfLastItem);
            setCurrentProduct(dataPaging)
        } else {
            const dataPaging = listProducts.slice(indexOfFirstItem, indexOfLastItem);
            setCurrentProduct(dataPaging);
        }
    }, [searchTerm, listProducts, currentPage]);

    const getListProductsFromAPI = async () => {
        try {
            const products = await getListProducts()
            setListProducts(products)
        } catch (error) {
            console.log(error)
        }
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleChooseService = (item) => {
        Object.assign(serviceChoosen, item)
        setServiceUnitPrice(serviceChoosen.unit_price)
        setServiceImgChoosen(serviceChoosen.image)
        setServiceChoosenId(serviceChoosen.service_id)
    }

    const handleDateChange = (date) => {
        setSelectedDate(date)
    }

    const handleSubmitService = async () => {
        const serviceBookingInfo = {
            serial_number: Math.floor(Math.random() * 1000),
            user_id: userId,
            order_at: new Date(),
            total_price: serviceUnitPrice * Number(quantity),
            note: note ? note : "",
            created_by_id: userId,
            status_id: 1,
            service_id: serviceChoosenId,
            unit_price: serviceUnitPrice,
            quantity: quantity,
            subTotalPrice: serviceUnitPrice * Number(quantity),
            address_order: addressOrder ? addressOrder : "",
            date_receive: selectedDate ? selectedDate : ""
        }
        try {
            await addOrder(serviceBookingInfo)
            toast.success("Đặt lịch giặt thành công!")
            if (!window.confirm("Bạn có muốn tiếp tục đặt dịch vụ không?")) {
                navigate("/orderclient")
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <div style={{ position: "fixed", zIndex: "1000", width: "100%" }}>
                <Header />
            </div>
            <div className="banner pt-5">
                <Carousel data-bs-theme="dark" style={{
                    height: "700px",
                    backgroundColor: "#AFEEEE"
                }}>
                    <Carousel.Item style={{ padding: "0 300px" }}>
                        <img
                            className="d-block w-100"
                            src="https://giatui247.vn/web/image/2402-b139a314/giat-ui-khach-san.png"
                            alt="First slide"
                            height="700px"
                        />
                        <Carousel.Caption style={{ color: "black", paddingBottom: "250px" }}>
                            <p style={{ fontSize: "50px", fontWeight: "bold" }}>Giặt Ủi 247</p>
                            <p style={{ fontSize: "40px" }}>Giặt ủi đồng phục cho khách sạn tại Đà Nẵng.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item style={{ padding: "0 300px" }}>
                        <img
                            className="d-block w-100"
                            src="https://giatui247.vn/web/image/2589-bc1b6afd/dic-vu-giat-ui-cao-cap-247.png"
                            alt="Second slide"
                            height="700px"
                        />
                        <Carousel.Caption style={{ color: "red", paddingBottom: "250px" }}>
                            <h3 style={{ fontSize: "50px" }}>Đặt dịch vụ trực tuyến dễ dàng - Giao nhận tận nơi nhanh chóng ở Đà Nẵng.</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item style={{ padding: "0 300px" }}>
                        <img
                            className="d-block w-100"
                            src="https://giatui247.vn/web/image/2503-eb472909/giat-say-quan-ao%202.png"
                            alt="Third slide"
                            height="700px"
                        />
                        <Carousel.Caption style={{ color: "yellow", paddingBottom: "250px" }}>
                            <h3 style={{ fontSize: "50px" }}>Đa dạng dịch vụ từ giặt sấy cơ bản đến giặt ủi cao cấp.</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className="row align-items-center body-content">
                <div className="col-lg-8 offset-lg-2 o_colored_level mt-3" >
                    <h2 style={{ textAlign: "center", fontSize: "40px" }} className="text-primary" data-text="Đa dạng dịch vụ giặt ủi - giặt sấy cho bạn">Đa dạng dịch vụ giặt ủi - giặt sấy cho bạn</h2>
                    <blockquote>Giặt ủi 247 cung cấp đa dạng chuyên nghiệp các dịch vụ giặt ủi - làm sạch quần áo đồ vải cho bạn, từ Giặt sấy cơ bản đến Giặt ủi cao cấp. Đáp ứng nhu cầu Giặt sấy lấy liền, Giặt ủi cao cấp, Giặt hấp - giặt khô... đảm bảo Nhanh gọn - Sạch sẽ - Gọn gàng - Phẳng phiu - Thơm dịu và tạo tính thẩm mỹ cho quần áo của bạn. Giặt ủi 247 tạo dựng niềm tin và uy tín với khách hàng bởi chất lượng, sự tiện lợi của các dịch vụ mà chúng tôi đang cung cấp dưới đây. </blockquote>
                    <p style={{ textAlign: "center" }}>
                        <img loading="lazy" data-resize-width="523" aria-describedby="tooltip97785" data-bs-original-title="Giặt ủi 247 cung cấp dịch vụ giặt ủi cao cấp và chuyên nghiệp" data-mimetype="image/png" data-original-src="/web/image/2359-9f948fcd/mission-247Laundry.png" data-original-id="2359" className="img img-fluid o_we_custom_image mx-auto d-block shadow" src="https://giatui247.vn/web/image/2361-aee295d7/mission-247Laundry.png" alt="Giặt ủi 247 - Dịch vụ giặt ủi cao cấp chuyên nghiệp tại Đà Nẵng" title="Giặt ủi 247 - Dịch vụ giặt ủi cao cấp chuyên nghiệp tại Đà Nẵng" />
                        <span style={{ fontSize: "12px", textAlign: "center" }}>247 cung cấp dịch vụ giặt ủi cao cấp và chuyên nghiệp tại Đà Nẵng.</span>
                    </p>
                    <p style={{ textAlign: "center" }}>
                        <a className="btn btn-custom text-white btn-sm" href="/ve-chung-toi" title="Về Giặt ủi 247" style={{ borderWidth: "0px", borderStyle: "solid", backgroundImage: "linear-gradient(135deg, rgb(203, 94, 238) 0%, rgb(75, 225, 236) 100%)" }}><span className="fa fa-long-arrow-right" data-bs-original-title="Giặt ủi 247 giới thiệu" title="Giặt ủi 247 giới thiệu" aria-describedby="tooltip902191" style={{ padding: "2px !important" }}></span>Về Chúng Tôi</a>
                    </p>
                </div>
                <div className="pt16 pb16 o_colored_level col-lg-4">
                    <div className="s_card card w-100" title="Dịch vụ giặt ủi cao cấp" data-name="Card">
                        <div className="card-body">
                            <h3 style={{ textAlign: "center" }} data-text="Dịch vụ giặt ủi cao cấp">Dịch vụ giặt ủi cao cấp</h3>
                            <p>Giặt ủi cao cấp là dịch vụ làm sạch và chăm sóc quần áo với chất lượng cao nhất tại Giặt ủi 247 như: Giặt ủi Quần Tây - Áo Sơ Mi công sở, giặt ủi Đầm Váy dự tiệc, áo Vest, Áo thun...với sự tỉ mỉ và chuyên nghiệp nhất của 247.</p>
                            <p>
                                <img src="https://giatui247.vn/web/image/2589-bc1b6afd/dic-vu-giat-ui-cao-cap-247.png" alt="Dịch vụ giặt ủi cao cấp" className="img img-fluid o_we_custom_image mx-auto d-block rounded shadow" data-original-id="2588" data-original-src="/web/image/2588-28b7a2cb/dic-vu-giat-ui-cao-cap-247.png" data-mimetype="image/png" data-resize-width="962" data-bs-original-title="" title="Dịch vụ giặt ủi cao cấp" aria-describedby="tooltip206427" loading="lazy" />
                            </p>
                            <ul>
                                <li>Dịch vụ được thực hiện với tay nghề cao cùng kinh nghiệm dày dặn trong việc xử lý, giặt giũ quần áo thời trang cao cấp cho khách hàng của công nhân viên 247.</li>
                                <li>Chính vì giá giặt ủi hợp lý, chất lượng cao cùng phương pháp chăm sóc bảo quản tốt nhất cho quần áo của khách hàng tại Giặt ủi 247, vì vậy khi cần giặt sạch và ủi phẳng phiu những bộ đồ đi làm, đi học...thì giặt ủi tại các tiệm gần nhất của 247 là sự lựa chọn tốt nhất cho bạn.</li>
                                <li>Đặt lịch giặt ủi trực tuyến trải nghiệm chất lượng và tỉ mỉ tận tâm phục vụ tại các tiệm giặt ủi của 247.</li>
                            </ul>
                            <p style={{ textAlign: "center" }}>
                                <a className="btn btn-custom text-white btn-sm" href="/dich-vu-giat-ui" title="Chi tiết dịch vụ giặt ủi cao cấp tại 247" style={{ borderWidth: "0px", borderStyle: "solid", backgroundImage: "linear-gradient(135deg, rgb(203, 94, 238) 0%, rgb(75, 225, 236) 100%)" }}><span className="fa fa-long-arrow-right" title="Chi tiết dịch vụ giặt ủi tại 247" aria-describedby="tooltip902191" style={{ padding: "2px !important" }}></span>Chi tiết dịch vụ giặt ủi tại 247</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="pt16 pb16 o_colored_level col-lg-4 border rounded shadow o_we_force_no_transition center-box" style={{ borderWidth: "1px !important", borderRadius: "5px !important", borderColor: "rgb(206, 212, 218) !important", boxShadow: "rgb(206, 212, 218) 2px 2px 7px 1px !important" }}>
                    <div className="s_card card w-100 o_we_force_no_transition" data-name="Card">
                        <div className="card-body" title="Dịch vụ giặt sấy lấy liền">
                            <h3 style={{ textAlign: "center" }} data-text="Dịch vụ giặt sấy lấy liền">Dịch vụ giặt sấy lấy liền</h3>
                            <p>Giặt sấy là dịch vụ tiện ích cung cấp bởi Giặt ủi 247 trong việc giặt sạch - sấy khô nhanh chóng cho quần áo và các sản phẩm đồ vải của khách hàng như: Giặt sấy quần áo thường ngày, Giặt sấy chăn mền, Giặt Màn cửa tận nhà, Gấu bông cỡ lớn, Túi xách... vô cùng nhanh chóng tại các Tiệm giặt sấy của 247</p>
                            <p>
                                <img src="https://giatui247.vn/web/image/2503-eb472909/giat-say-quan-ao%202.png" alt="Dịch vụ giặt sấy lấy liền tại Giặt ủi 247" className="img img-fluid o_we_custom_image mx-auto d-block" data-original-id="2501" data-original-src="/web/image/2501-9240b7ff/giat-say-quan-ao%202.png" data-mimetype="image/png" data-resize-width="476" title="Dịch vụ giặt sấy lấy liền tại Giặt ủi 247" aria-describedby="tooltip773447" loading="lazy" />
                            </p>
                            <ul>
                                <li>Quần áo và trang phục của khách hàng sẽ được 247 Giặt sạch sẽ, sấy nhanh lẹ, xếp gọn gàng, hương thơm dịu trong thời gian nhanh nhất mang lại sự tiện lợi cho khách hàng khi giặt sấy tại 247.</li>
                                <li>Chính vì lợi ích mang lại to lớn của dịch vụ giặt sấy lấy liền giúp các gia đình, cá nhân tiết kiệm được rất nhiều công sức trong việc giặt giũ dọn dẹp nhà cửa, để có thêm nhiều thời gian làm những công việc yêu thích.</li>
                                <li>Để đáp ứng nhu cầu ngày càng cao, 247 đã triển khai dịch vụ Giặt sấy lấy liền tại các cửa hàng giặt ủi của 247 gần các khu dân cư nhất và có giao tận nhà khách hàng, sẵn sàng cung cấp dịch vụ một cách nhanh chóng và tiện lợi hơn cho khách hàng.</li>
                            </ul>
                            <p style={{ textAlign: "center" }}>
                                <Link className="btn btn-custom text-white btn-sm" to="/fast" title="Xem chi tiết dịch vụ giặt sấy lấy liền" style={{ borderWidth: "0px", borderStyle: "solid", backgroundImage: "linear-gradient(135deg, rgb(203, 94, 238) 0%, rgb(75, 225, 236) 100%)" }}><span className="fa fa-long-arrow-right" title="Chi tiết dịch vụ giặt sấy của Giặt ủi 247" aria-describedby="tooltip902191" style={{ padding: "2px !important" }}></span>Chi tiết dịch vụ giặt sấy lấy liền</Link>
                            </p>
                        </div>
                    </div>
                    <div className="s_card card w-100 o_we_force_no_transition" data-name="Card">
                        <div className="card-body" title="Dịch vụ giặt hấp (Giặt khô - là hơi)">
                            <h3 style={{ textAlign: "center" }} data-text="Dịch vụ giặt hấp (Giặt khô - là hơi)">Dịch vụ giặt hấp (Giặt khô - là hơi)</h3>
                            <p>Giặt hấp (giặt khô) là dịch vụ làm sạch, chăm sóc, vệ sinh các sản phẩm thời trang có kiểu dáng, chất liệu cao cấp đặc biệt cần sự tỉ mỉ, tận tâm, chuyên nghiệp cùng nguyên liệu - thiết bị máy móc giặt ủi chuyên biệt tại 247.</p>
                            <ul>
                                <li>Giặt hấp - giặt khô tại 247 sử dụng nguyên liệu, dung môi làm sạch nhập khẩu cùng với thiết bị cùng máy móc hiện đại trong nghành giặt ủi - giặt là cao cấp.</li>
                                <li>Nhân viên 247 có kinh nghiệm lâu năm được đào tạo tập huấn kỹ lưỡng với phương pháp phù hợp nhất cho chất liệu quần áo cao cấp của khách hàng.</li>
                            </ul>
                            <p style={{ textAlign: "center" }}>
                                <a className="btn btn-custom text-white btn-sm" href="/dich-vu-giat-hap" title="Dịch vụ giặt hấp - giặt khô" style={{ borderWidth: "0px", borderStyle: "solid", backgroundImage: "linear-gradient(135deg, rgb(203, 94, 238) 0%, rgb(75, 225, 236) 100%)" }}><span className="fa fa-long-arrow-right" title="Chi tiết dịch vụ giặt hấp - giặt khô của Giặt ủi 247" aria-describedby="tooltip902191" style={{ padding: "2px !important" }}></span>Xem chi tiết dịch vụ giặt hấp - giặt khô</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="pt16 pb16 o_colored_level col-lg-4 o_we_force_no_transition">
                    <div className="s_card card w-100 o_we_force_no_transition" data-name="Card">
                        <div className="card-body" title="Giặt ủi cho khách sạn - nhà hàng">
                            <h3 style={{ textAlign: "center" }} data-text="Giặt ủi cho Khách sạn - Nhà hàng">Giặt ủi cho Khách sạn - Nhà hàng</h3>
                            <p>Giặt ủi 247 cung cấp dịch vụ giặt ủi chuyên nghiệp cho dành riêng cho các khách sạn - nhà nghỉ....bảo đảm tốt nhiệm vụ vệ sinh, làm sạch các sản phẩm đồ vải (linen) chăn ga, mền gối, khăn tắm khăn măt... được trang bị cho phòng khách sạn.</p>
                            <p>
                                <img src="https://giatui247.vn/web/image/2402-b139a314/giat-ui-khach-san.png" className="img img-fluid o_we_custom_image mx-auto d-block shadow" data-original-id="2202" data-original-src="/web/image/2202-fd506028/giat-ui-khach-san.png" data-mimetype="image/png" data-resize-width="690" title="Dịch vụ giặt ủi cho khách sạn - nhà hàng" aria-describedby="tooltip982471" loading="lazy" alt="Dịch vụ giặt ủi cho khách sạn - nhà hàng" />
                            </p>
                            <ul>
                                <li>Với hệ thống máy móc công suất lớn (quy mô công nghiệp) và các công cụ, thiết bị giặt ủi hiện đại được sử dụng trong các khâu Giặt - Sấy - Ủi chăn, ga, gối, nệm của khách sạn... nên bảo đảm đúng tiến độ cùng chất lượng giặt ủi vượt trội.</li>
                                <li>Ngoài nhiệm vụ đảm bảo tốt tiến độ, chất lượng của dịch vụ cung cấp, Giặt ủi 247 đã hoàn thiện và số hóa các quy trình, nghiệp vụ khi cung cấp dịch vụ giặt ủi cho khách sạn.</li>
                                <li>Bên cạnh đó, 247 kết hợp một cách chặt chẽ - ăn khớp với các bộ phận buồng phòng của khách sạn qua đó đẩy nhanh được công việc giảm nhân sự mà vẫn bảo đảm việc kiểm soát, hạn chế mát hư hỏng - kéo dài thời gian sử dụng cho đồ vải của khách sạn.</li>
                            </ul>
                            <p style={{ textAlign: "center" }}>
                                <a className="btn btn-custom text-white btn-sm" href="/dich-vu-giat-ui-cho-khach-san" data-bs-original-title="" title="Xem chi tiết dịch vụ Giặt ủi cho khách sạn" style={{ borderWidth: "0px", borderStyle: "solid", backgroundImage: "linear-gradient(135deg, rgb(203, 94, 238) 0%, rgb(75, 225, 236) 100%)" }}><span className="fa fa-long-arrow-right" title="Chi tiết dịch vụ giặt ủi khách sạn - nhà hàng" aria-describedby="tooltip902191" style={{ padding: "2px !important" }}></span>Dịch vụ giặt ủi cho khách sạn</a>
                            </p>
                        </div>
                    </div>
                    <div className="s_card card w-100 o_we_force_no_transition" data-name="Card">
                        <div className="card-body" title="Giặt khăn spa - Giặt ủi đồng phục">
                            <h3 style={{ textAlign: "center" }} data-text="Dịch vụ giặt khăn Spa - Giặt ủi đồng phục">Giặt khăn Spa - Giặt ủi đồng phục</h3>
                            <p>Khi giặt khăn (các loại khăn tắm, khăn mặt) tại 247, chúng tôi bảo đảm khử sạch mùi tinh dầu, hóa chất mỹ phẩm dính trên khăn đã dùng của Spa, một đặc thù trong nghành.</p>
                            <ul>
                                <li>Với đội ngũ nhân viên giàu kinh nghiệm, khăn của Spa sau khi được giặt sấy tại 247 bảo đảm luôn bông xốp thấm hút tốt, và đặc biệt khử tới 90% mùi tinh dầu tạo hương dịu nhẹ cho chất liệu Cotton.</li>
                                <li>Hơn nữa giặt ủi 247 còn nhận tẩy trắng - làm mới khăn Spa, khăn tắm, khăn mặt của khách sạn, cơ sở thẩm mỹ và các loại vật dụng đồ vải, đồng phục cơ quan - tổ chức mang lại sự tươi mới tăng tính thẩm mỹ cho sản phẩm.</li>
                            </ul>
                            <p style={{ textAlign: "center" }}>
                                <a className="btn btn-custom text-white btn-sm" href="/shop/category/co-quan-to-chuc-6" data-bs-original-title="" title="Xem chi tiêt dịch vụ Giặt khăn Spa - Giặt ủi đồng phục tại Giặt ủi 247" style={{ borderWidth: "0px", borderStyle: "solid", backgroundImage: "linear-gradient(135deg, rgb(203, 94, 238) 0%, rgb(75, 225, 236) 100%)" }}><span className="fa fa-long-arrow-right" title="Xem chi tiết dịch vụ giặt khăn Spa - Đồng phục công ty tại Giặt ủi 247" aria-describedby="tooltip902191" style={{ padding: "2px !important" }}></span>Chi tiết dịch vụ Giặt khăn spa</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-5 row">
                    <h2 className="text-center">
                        <font className="text-gradient" style={{ backgroundImage: "linear-gradient(135deg, rgb(47, 128, 237) 0%, rgb(178, 255, 218) 100%)" }}>Giặt ủi với chất lượng dịch vụ luôn được đảm bảo</font>
                    </h2>
                    <p style={{ textAlign: "center" }}>Nhanh hơn tiện lợi hơn cho khách hàng cùng với những khác biệt về chất lượng dịch vụ khi lựa chọn giặt ủi tại 247</p>
                    <div className="row g-0 s_col_no_resize s_col_no_bgcolor s_nb_column_fixed">
                        <div className="col-lg text-lg-end">
                            <div className="row">
                                <div className="col-lg-12 pt24 pb24 o_colored_level" data-name="Block">
                                    <div className="s_showcase_title d-flex flex-lg-row-reverse mb-2">
                                        <span className="fa fa-openid s_showcase_icon fa-2x text-secondary me-3 me-lg-0 ms-lg-3"></span>
                                        <h3>Đặt lịch dịch vụ dễ dàng</h3>
                                    </div>
                                    <p>Dễ dàng đặt lịch giặt ủi cho quần áo - trang phục của bạn tại Giặt ủi 247</p>
                                </div>
                                <div className="col-lg-12 pt24 pb24 o_colored_level" data-name="Block" >
                                    <div className="s_showcase_title d-flex flex-lg-row-reverse mb-2">
                                        <span className="fa fa-sort-alpha-asc s_showcase_icon fa-2x text-secondary me-3 me-lg-0 ms-lg-3"></span>
                                        <h3>Cung cấp dịch vụ da dạng</h3>
                                    </div>
                                    <p>Giặt ủi 247 đang cung cấp các dịch vụ giặt ủi, giặt sấy, tẩy điểm, giặt ủi công nghiệp... đáp ứng mọi nhu cầu của khách hàng với chất lượng cao nhất</p>
                                </div>
                                <div className="col-lg-12 pt24 pb24 o_colored_level" data-name="Block" >
                                    <div className="s_showcase_title d-flex flex-lg-row-reverse mb-2">
                                        <span className="fa fa-street-view s_showcase_icon text-secondary me-3 me-lg-0 ms-lg-3 fa-2x"></span>
                                        <h3>Nhân viên nhiều kinh nghiệm</h3>
                                    </div>
                                    <p>Nhân viên tại 247 được đào tạo, tập huấn bài bản, nhiều năm kinh nghiệm trong từng nghiệp vụ giặt, ủi, chăm sóc vệ sinh quần áo của khách hàng với sự tậm tâm và tỉ mỉ nhất.</p>
                                </div>
                                <div className="col-lg-12 pt24 pb24 o_colored_level o_we_force_no_transition" data-name="Block" >
                                    <div className="s_showcase_title d-flex flex-lg-row-reverse mb-2">
                                        <span className="fa fa-gift s_showcase_icon text-secondary me-3 me-lg-0 ms-lg-3 fa-2x"></span>
                                        <h3>Trải nghiệm vượt trội</h3>
                                    </div>
                                    <p>Trải nghiệm vượt trội trước và sau khi sử dụng dịch vụ giặt ủi với những chương trình ưu đãi khuyến mại chỉ có tại 247.</p>
                                </div>
                            </div>
                        </div>
                        <div style={{ alignSelf: "center" }} className="col-lg-3">
                            <img src="https://giatui247.vn/web/image/2535-4b23155a/247-Laundry-guideline.png" alt="Giặt ủi với chất lượng dịch vụ tốt nhất tại 247" className="img img-fluid o_we_custom_image mx-auto d-block" data-original-id="2534" data-original-src="/web/image/2534-e2071bb7/247-Laundry-guideline.png" data-mimetype="image/png" data-resize-width="undefined" data-bs-original-title="" title="Giặt ủi với chất lượng dịch vụ tốt nhất tại 247" aria-describedby="tooltip178242" loading="lazy" />
                        </div>
                        <div className="col-lg">
                            <div className="row">
                                <div className="col-lg-12 pt24 pb24 o_colored_level o_we_force_no_transition" data-name="Block" >
                                    <div className="s_showcase_title d-flex mb-2">
                                        <span className="fa fa-gears s_showcase_icon text-secondary me-3 fa-2x"></span>
                                        <h3>Quy trình giặt ủi chặt chẽ</h3>
                                    </div>
                                    <p>Quy trình xử lý giặt ủi - làm sạch chặt chẽ hạn chế sai sót trong quá trình cung cấp dịch vụ.</p>
                                </div>
                                <div className="col-lg-12 pt24 pb24 o_colored_level" data-name="Block" >
                                    <div className="s_showcase_title d-flex mb-2">
                                        <span className="fa fa-truck s_showcase_icon text-secondary me-3 fa-2x"></span>
                                        <h3>Giao nhận tận nơi nhanh chóng</h3>
                                    </div>
                                    <p>Tiện lợi hơn, nhanh hơn nữa với dịch vụ giặt ủi giao nhận tận nhà! Đặt lịch giặt ủi trực tuyến giao nhận tận nhà cho bạn chỉ với vài click!</p>
                                </div>
                                <div className="col-lg-12 pt24 pb24 o_colored_level" data-name="Block" >
                                    <div className="s_showcase_title d-flex mb-2">
                                        <span className="fa fa-envira s_showcase_icon text-secondary me-3 fa-2x"></span>
                                        <h3>Nguyên liệu - máy móc hiện đại</h3>
                                    </div>
                                    <p>Giặt ủi với máy móc hiện đại nhất được 247 trang bị cho các tiệm giặt ủi và xưởng giặt cùng nguyên liệu thân thiện với môi trường và sức khỏe.</p>
                                </div>
                                <div className="col-lg-12 pt24 pb24 o_colored_level" data-name="Block">
                                    <div className="s_showcase_title d-flex mb-2">
                                        <span className="fa fa-file-text s_showcase_icon text-secondary me-3 fa-2x"></span>
                                        <h3>Chính sách dịch vụ rõ ràng</h3>
                                    </div>
                                    <p>247 luôn tạo dựng uy tín và niềm tin tới khách hàng với những chính sách cụ thể và rõ ràng nhất, bảo vệ quyền lợi tuyệt đối cho khách hàng khi giặt ủi tại 247. Đây chính là giá trị cốt lõi gắn bó lâu dài giữa khách hàng và 247.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="s_text_image o_cc o_cc2 o_colored_level pt0 pb0 mt-5" data-name="Text - Image" style={{ backgroundImage: "none" }}>
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col-lg-6 pt16 pb16 o_colored_level">
                                <img src="https://giatui247.vn/web_editor/shape/illustration/online-shopping-svg-594?c1=%23637BBE&unique=ea83d576" alt="Đặt giặt ủi trực tuyến - Book lịch giặt ủi tại 247" className="img img-fluid o_we_custom_image mx-auto d-block" data-original-id="594" data-original-src="/web_editor/shape/illustration/online-shopping-svg-594?c1=%23637BBE&amp;unique=ea83d576" data-mimetype="image/svg+xml" data-resize-width="undefined" title="Đặt giặt ủi trực tuyến - Book lịch giặt ủi tại 247" loading="lazy" />
                            </div>
                            <div className="col-lg-6 pt16 pb16 o_colored_level">
                                <h2 style={{ textAlign: "center" }}>Đặt Dịch Vụ - Lên Lịch Giặt Ủi Online</h2>
                                <p>Thảnh thơi nghỉ ngơi việc giặt ủi cứ để 247 lo! Đặt giặt ủi trực tuyến dễ dàng hay book lịch giặt ủi cho bất kỳ sản phẩm quần áo thời trang nào của bạn ngay tại nhà với chỉ một vài click.</p>
                                <ul>
                                    <li>Tùy chọn dịch vụ từ cơ bản tới nâng cao ứng với mỗi chất liệu và kiểu dáng quần áo của bạn khi đặt dịch vụ trực tuyến.</li>
                                    <li>Đặt lịch giặt ủi với 247 giúp bạn tùy chọn thời gian nhận và trả đồ cho bạn bất cứ khi nào!</li>
                                    <li>Yêu cầu dịch vụ của bạn đồng bộ tức thời với Tiệm giặt ủi 247 gần bạn nhất!</li>
                                </ul>
                                <p style={{ textAlign: "center" }}>
                                    <button className="btn btn-primary" title="Đặt dịch vụ giặt ủi" aria-describedby="popover669045">Đặt Dịch Vụ Ngay</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="s_product_catalog oe_custom_bg o_colored_level o_cc o_cc2 pb0 pt8 mt-5" style={{ backgroundPosition: "50% 0%", backgroundImage: "none" }} data-vcss="001" data-snippet="s_product_catalog" data-name="Pricelist" data-bs-original-title="" title="" aria-describedby="tooltip561251">
                    <div className="container-fluid">
                        <h2 className="text-center" data-bs-original-title="Bảng giá giặt ủi" title="Bảng giá giặt ủi" aria-describedby="tooltip522293">Giá Giặt Ủi Công Khai - Minh Bạch</h2>
                        <p className="text-center">Dễ dàng tra cứu đơn giá dịch vụ cụ thể ứng với từng sản phẩm - từng loại hay chất liệu quần áo, báo giá và đặt dịch vụ giặt ủi trực quan và nhanh chóng tại 247</p>
                        <div className="row" style={{ padding: "0 300px" }}>
                            {currentProduct.map(item => {
                                return (
                                    <>
                                        <Card className="col-4 mb-3 mt-3" style={{ padding: "0 20px" }}>
                                            <Card.Img variant="top" src={item.image} height="300px" width="100px" />
                                            <Card.Body>
                                                <div className="text-center">
                                                    <Card.Title style={{ fontSize: "40px", fontWeight: "bold", height: "200px" }}>{item.name_service}</Card.Title>
                                                </div>
                                                <div className="text-center">
                                                    <Card.Title style={{ fontSize: "20px", fontWeight: "bold", height: "100px" }}>{item.name_service}</Card.Title>
                                                </div>
                                                <div className="text-center">
                                                    <Card.Text style={{ fontSize: "20px", color: "red", fontWeight: "bold" }}>
                                                        {(item.unit_price).toLocaleString()} đ
                                                    </Card.Text>
                                                </div>
                                                <div className="text-center">
                                                    <Button variant="primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                        onClick={() => handleChooseService(item)}
                                                    >Đặt dịch vụ</Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </>
                                )
                            })}
                            <Pagination
                                itemsPerPage={itemsPerPage}
                                totalItems={searchTerm == '' ? listProducts.length : searchItems.length}
                                currentPage={currentPage}
                                paginate={paginate}
                            />
                        </div>
                        {/* Modal */}
                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Thông tin đặt dịch vụ</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <label for="exampleFormControlInput1" className="form-label">Địa chỉ giao hàng</label>
                                            <input type="email" className="form-control" id="exampleFormControlInput1"
                                                onChange={(e) => setAddressOrder(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label for="exampleFormControlInput1" className="form-label me-3">Chọn ngày nhận hàng</label>
                                            <DatePicker
                                                className="input-group"
                                                selected={selectedDate}
                                                onChange={handleDateChange}
                                                dateFormat="dd/MM/yyyy"
                                                isClearable
                                                placeholderText="Chọn ngày"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label for="exampleFormControlInput1" className="form-label">Đơn giá dịch vụ (tính theo kg)</label>
                                            <input type="number" className="form-control" defaultValue={serviceUnitPrice} disabled />
                                        </div>
                                        <div className="mb-3">
                                            <label for="exampleFormControlInput1" className="form-label">Số lượng (tính theo kg)</label>
                                            <input type="number" className="form-control" defaultValue={1}
                                                onChange={(e) => setQuantity(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label for="exampleFormControlInput1" className="form-label">Tổng số tiền tạm tính</label>
                                            <input type="number" className="form-control" value={serviceUnitPrice * Number(quantity)}
                                                onChange={() => setSubTotalPrice(serviceUnitPrice * Number(quantity))} disabled />
                                        </div>
                                        <div className="mb-3">
                                            <label for="exampleFormControlInput1" className="form-label">Ghi chú</label>
                                            <input type="text" className="form-control" placeholder="Ví dụ: Giặt tay áo sơ mi còn lại giặt máy, cần giặt gấp,..."
                                                onChange={(e) => setNote(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3 text-center">
                                            <img src={serviceImgChoosen} height={200} width={300} />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                            onClick={handleSubmitService}
                                        >Đặt dịch vụ</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <section className="s_searchbar o_colored_level o_cc o_cc2 pb24 pt4" data-snippet="s_searchbar" data-name="Search" style={{ backgroundImage: "none" }}>
                            <div className="">
                                <div className="row">
                                    <div className="col-lg-8 offset-lg-2 o_colored_level">
                                        <h3 style={{ textAlign: "center", fontSize: "40px" }}>Tìm dịch vụ và sản phẩm</h3>
                                        <p style={{ textAlign: "center" }}>
                                            <span style={{ fontSize: "14px" }}>Sử dụng chức năng tìm kiếm mạnh mẽ tại 247 khi bạn muốn tìm thông tin dịch vụ, đơn giá - bảng giá giặt ủi mới nhất, mẹo giặt ủi hay và tình huống - câu hỏi thường gặp.... VD: "Giá giặt hấp Áo Vest" ....</span>
                                        </p>
                                        <form method="get" data-snippet="s_searchbar_input" className="o_searchbar_form s_searchbar_input" action="/website/search" data-name="Search">
                                            <div role="search" className="input-group mb-3">
                                                <input type="search" name="search" className="search-query form-control oe_search_box None" placeholder="Tìm thông tin dịch vụ" data-search-type="all" data-limit="20" data-display-image="true" data-display-description="true" data-display-extra-link="true" data-display-detail="true" data-order-by="name asc" autocomplete="off" />
                                                <button type="submit" aria-label="Tìm thông tin Giặt ủi" title="Tìm thông tin Giặt ủi" className="btn oe_search_button btn-primary">
                                                    <i className="oi oi-search"></i>
                                                </button>
                                            </div>
                                            <input name="order" type="hidden" className="o_search_order_by" value="name asc" />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className="row">
                            <div className="col-lg-6 pt16 pb16 o_colored_level">
                                <table style={{ verticalAlign: "middle", textAlign: "center", height: "632.953px", marginTop: "0.875px" }} className="table table-bordered">
                                    <tbody>
                                        <tr style={{ height: "71.3906px" }}>
                                            <td colspan="3">
                                                <h3 style={{ textAlign: "center" }}>Giá Giặt Ủi</h3>
                                            </td>
                                        </tr>
                                        <tr style={{ height: "100px" }}>
                                            <td>
                                                <a href="https://giatui247.vn/shop/dvc-01-giat-ui-ao-so-mi-11" title="Giặt ủi áo Sơ Mi">
                                                    <img width="75" height="75" src="https://giatui247.vn/web/image/product.template/11/image_512/%5BDVC-01%5D%20Giặt%20ủi%20áo%20Sơ%20Mi?unique=2ec5755" className="img img-fluid o_we_custom_image rounded-circle shadow mx-auto d-block" data-original-id="1034" data-original-src="/web/image/1034-cc1d38f1/giat-say-cato.png" data-mimetype="image/png" data-resize-width="50" loading="lazy" style={{ padding: "1px !important", minHeight: "1px" }} data-bs-original-title="" title="Giặt ủi áo Sơ Mi" aria-describedby="tooltip795850" alt="Giặt ủi áo Sơ Mi" data-lazy-loading-initial-min-height="" />
                                                </a>
                                            </td>
                                            <td>
                                                Giặt ủi Áo Sơ Mi
                                            </td>
                                            <td>
                                                30.000đ/Cái
                                            </td>
                                        </tr>
                                        <tr style={{ height: "114.938px" }}>
                                            <td>
                                                <a href="https://giatui247.vn/shop/dvc-02-giat-ui-quan-au-quan-tay-16" title="Giặt ủi Quần Âu (Quần Tây)">
                                                    <img width="75" height="75" src="https://giatui247.vn/web/image/product.product/42/image_1024/%5BDVH-09%5D%20Giặt%20hấp%20quần%20Âu?unique=783ec59" className="img img-fluid o_we_custom_image rounded-circle shadow mx-auto d-block" data-original-id="1034" data-mimetype="image/png" data-resize-width="50" loading="lazy" style={{ padding: "1px !important", minHeight: "1px" }} title="Giặt ủi Quần Tây/(Âu)" alt="Giặt ủi Quần Tây/(Âu)" data-lazy-loading-initial-min-height="" />
                                                </a>
                                            </td>
                                            <td>
                                                Giặt ủi Quần Âu (Quần Tây)
                                            </td>
                                            <td>
                                                30.000đ/Cái
                                            </td>
                                        </tr>
                                        <tr style={{ height: "107.031px" }}>
                                            <td>
                                                <a href="https://giatui247.vn/shop/dvc-03-giat-ui-ao-vest-17" title="" data-bs-original-title="Giặt ủi áo Vest">
                                                    <img width="75" height="75" src="https://giatui247.vn/web/image/product.product/17/image_1024/%5BDVC-03%5D%20Giặt%20ủi%20áo%20Vest?unique=6f02ccd" className="img img-fluid o_we_custom_image rounded-circle shadow mx-auto d-block" data-original-id="1034" data-mimetype="image/png" data-resize-width="50" loading="lazy" style={{ padding: "1px !important", minHeight: "1px" }} title="Giặt ủi Áo Vest" alt="Giặt ủi Áo Vest" data-lazy-loading-initial-min-height="" />
                                                </a>
                                            </td>
                                            <td>Giặt ủi áo Vest</td>
                                            <td>45.000đ/Cái</td>
                                        </tr>
                                        <tr style={{ height: "107.031px" }}>
                                            <td>
                                                <a href="https://giatui247.vn/shop/dvc-07-giat-ui-ao-thun-22" title="Giặt ủi áo Thun">
                                                    <img width="75" height="75" src="https://giatui247.vn/web/image/product.product/22/image_1024/%5BDVC-07%5D%20Giặt%20ủi%20áo%20Thun?unique=5041589" className="img img-fluid o_we_custom_image rounded-circle shadow mx-auto d-block" data-original-id="1034" data-mimetype="image/png" data-resize-width="50" loading="lazy" style={{ padding: "1px !important", minHeight: "1px" }} title="Giặt ủi áo Thun" alt="Giặt ủi áo Thun" data-lazy-loading-initial-min-height="" />
                                                </a>
                                            </td>
                                            <td>Giặt ủi Áo Thun</td>
                                            <td>25.500đ/Cái</td>
                                        </tr>
                                        <tr style={{ height: "131.562px" }}>
                                            <td>
                                                <a href="https://giatui247.vn/shop/dvc-04-giat-ui-am-vay-18" title="Giặt ủi Đầm/Váy">
                                                    <img width="60" height="60" src="https://giatui247.vn/web/image/product.product/18/image_1024/%5BDVC-04%5D%20Giặt%20ủi%20Đầm%20Váy?unique=972acfb" className="img img-fluid o_we_custom_image rounded-circle shadow mx-auto d-block" data-original-id="1034" data-mimetype="image/png" data-resize-width="50" loading="lazy" style={{ padding: "1px !important", minHeight: "1px" }} title="Giặt ủi Đầm/Váy" alt="Giặt ủi Đầm/Váy" data-lazy-loading-initial-min-height="" />
                                                </a>
                                            </td>
                                            <td>
                                                Giặt ủi Đầm (Váy)
                                            </td>
                                            <td>
                                                40.000đ/Cái
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-lg-6 pt16 pb16 o_colored_level" >
                                <table style={{ textAlign: "center", verticalAlign: "middle" }} className="table table-bordered">
                                    <tbody>
                                        <tr style={{ height: "71.3906px" }}>
                                            <td colspan="3">
                                                <h3 style={{ textAlign: "center" }}>Giá Giặt Hấp (Giặt Khô)</h3>
                                            </td>
                                        </tr>
                                        <tr style={{ height: "100px" }}>
                                            <td>
                                                <a href="https://giatui247.vn/shop/dvh-08-giat-hap-ao-so-mi-41" title="Giặt hấp áo Sơ Mi">
                                                    <img width="75" height="75" src="https://giatui247.vn/web/image/product.product/41/image_1024/%5BDVH-08%5D%20Gi%E1%BA%B7t%20h%E1%BA%A5p%20%C3%A1o%20S%C6%A1%20Mi?unique=229a026" className="img img-fluid o_we_custom_image rounded-circle shadow mx-auto d-block" data-mimetype="image/png" data-resize-width="50" loading="lazy" style={{ padding: "1px !important", minHeight: "1px" }} data-bs-original-title="" title="Giặt hấp áo Sơ Mi" aria-describedby="tooltip795850" alt="Giặt hấp áo Sơ Mi" data-lazy-loading-initial-min-height="" />
                                                </a>
                                            </td>
                                            <td>
                                                Giặt hấp Áo Sơ Mi
                                            </td>
                                            <td>
                                                45.000đ/Cái
                                            </td>
                                        </tr>
                                        <tr style={{ height: "114.938px" }}>
                                            <td>
                                                <a href="https://giatui247.vn/shop/dvh-09-giat-hap-quan-au-42" title="Giặt hấp quần Âu (Quần Tây)">
                                                    <img width="75" height="75" src="https://giatui247.vn/web/image/product.product/42/image_1024/%5BDVH-09%5D%20Gi%E1%BA%B7t%20h%E1%BA%A5p%20qu%E1%BA%A7n%20%C3%82u?unique=783ec59" className="img img-fluid o_we_custom_image rounded-circle shadow mx-auto d-block" data-mimetype="image/png" data-resize-width="50" loading="lazy" style={{ padding: "1px !important", minHeight: "1px" }} title="Giặt hấp Quần Âu (Quần Tây)" alt="Giặt hấp Quần Âu (Quần Tây)" data-lazy-loading-initial-min-height="" />
                                                </a>
                                            </td>
                                            <td>
                                                Giặt hấp Quần Âu (Quần Tây)
                                            </td>
                                            <td>
                                                45.000đ/Cái
                                            </td>
                                        </tr>
                                        <tr style={{ height: "107.031px" }}>
                                            <td>
                                                <a href="https://giatui247.vn/shop/dvh-01-giat-hap-ao-vest-39" title="Giặt hấp áo Vest">
                                                    <img width="75" height="75" src="https://giatui247.vn/web/image/product.product/39/image_1024/%5BDVH-01%5D%20Gi%E1%BA%B7t%20h%E1%BA%A5p%20%C3%A1o%20Vest?unique=e87a720" className="img img-fluid o_we_custom_image rounded-circle shadow mx-auto d-block" data-mimetype="image/png" data-resize-width="50" loading="lazy" style={{ padding: "1px !important", minHeight: "1px" }} title="Giặt hấp Áo Vest" alt="Giặt hấp Áo Vest" data-lazy-loading-initial-min-height="" />
                                                </a>
                                            </td>
                                            <td>
                                                Giặt hấp Áo Vest
                                            </td>
                                            <td>
                                                89.000đ/Cái
                                            </td>
                                        </tr>
                                        <tr style={{ height: "107.031px" }}>
                                            <td>
                                                <a href="https://giatui247.vn/shop/dvh-03-giat-hap-am-vay-37" title="Giặt hấp Đầm (Váy)">
                                                    <img width="75" height="75" src="https://giatui247.vn/web/image/product.product/37/image_1024/%5BDVH-03%5D%20Gi%E1%BA%B7t%20h%E1%BA%A5p%20%C4%90%E1%BA%A7m%20V%C3%A1y?unique=e0d8cbc" className="img img-fluid o_we_custom_image rounded-circle shadow mx-auto d-block" data-mimetype="image/png" data-resize-width="50" loading="lazy" style={{ padding: "1px !important", minHeight: "1px" }} title="Giặt hấp Đầm (Váy)" alt="Giặt hấp Đầm (Váy)" data-lazy-loading-initial-min-height="" />
                                                </a>
                                            </td>
                                            <td>Giặt hấp Đầm (Váy)</td>
                                            <td>75.000đ/Cái</td>
                                        </tr>
                                        <tr style={{ height: "131.562px" }}>
                                            <td>
                                                <a href="https://giatui247.vn/shop/dvh-02-giat-hap-ao-cuoi-vay-cuoi-35" title="Giặt hấp Áo Cưới (Váy Cưới)">
                                                    <img width="75" height="75" src="https://giatui247.vn/web/image/product.product/35/image_1024/%5BDVH-02%5D%20Gi%E1%BA%B7t%20h%E1%BA%A5p%20%C3%81o%20C%C6%B0%E1%BB%9Bi%20%28V%C3%A1y%20C%C6%B0%E1%BB%9Bi%29?unique=1507b65" className="img img-fluid o_we_custom_image rounded-circle shadow mx-auto d-block" data-mimetype="image/png" data-resize-width="50" loading="lazy" style={{ padding: "1px !important", minHeight: "1px" }} title="Giặt hấp Áo Cưới (Váy Cưới)" alt="Giặt hấp Áo Cưới (Váy Cưới)" data-lazy-loading-initial-min-height="" />
                                                </a>
                                            </td>
                                            <td>Giặt hấp Áo Cưới (Váy Cưới)</td>
                                            <td>
                                                Chỉ từ 150.000đ/Cái*
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section >
                <section className="s_text_image o_cc o_cc2 o_colored_level pt0 pb0 mt-5" data-snippet="s_image_text" data-name="Image - Text" style={{ backgroundImage: "none" }}>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 pt16 pb16 o_colored_level" >
                                <img src="https://giatui247.vn/web_editor/shape/illustration/credit-card-svg-601?c1=%23637BBE&unique=e28488e3" alt="Khuyến mãi ưu đãi dịch vụ giặt ủi tại 247" className="img img-fluid mx-auto o_we_custom_image" style={{ padding: "32px !important" }} data-original-id="601" data-original-src="/web_editor/shape/illustration/credit-card-svg-601?c1=%23637BBE&amp;unique=e28488e3" data-mimetype="image/svg+xml" data-resize-width="undefined" title="Khuyến mãi ưu đãi dịch vụ giặt ủi tại 247" loading="lazy" />
                            </div>
                            <div className="col-lg-6 pt16 pb16 o_colored_level" data-bs-original-title="Chương trình khuyến mãi giặt ủi" title="Chương trình khuyến mãi giặt ủi" aria-describedby="tooltip936458" >
                                <h2>Giặt ủi với Khuyến mãi chỉ có tại 247</h2>
                                <p>Dịch vụ giặt ủi 247 luôn tối đa lợi ích cho khách hàng bằng những ưu đãi đặc quyền, khuyến mãi vượt trội.</p>
                                <ul>
                                    <li>Mã giảm giá dịch vụ lên tới 75% (Tủy từng chương trình).</li>
                                    <li>Tích điểm và nhận Thẻ quà tặng có giá trị từ 50.000đ trở lên hàng tháng.</li>
                                    <li>Code CouPon, mã Voucher dành riêng cho khách hàng thân thiết...</li>
                                </ul>
                                <p style={{ textAlign: "center" }}>
                                    <a href="/event" className="mb-2 btn btn-primary" data-bs-original-title="" title="Xem những khuyến mãi giặt ủi đang diễn ra">Khám phá ngay</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="s_picture o_cc o_cc2 o_colored_level pt0 pb0 mt-5" data-snippet="s_picture" data-name="Picture" style={{ backgroundImage: "none" }}>
                    <div className="container">
                        <div className="row s_nb_column_fixed">
                            <div className="col-lg-10 offset-lg-1 o_colored_level pb0" style={{ textAlign: "center" }}>
                                <figure className="figure">
                                    <img src="https://giatui247.vn/web/image/1984-3102a48f/dich-vu-giat-ui-tai247.png" className="figure-img img-thumbnail padding-large img img-fluid o_we_custom_image shadow rounded" data-original-id="1982" data-original-src="/web/image/1982-f3d7aad3/dich-vu-giat-ui-tai247.png" data-mimetype="image/png" data-resize-width="724" data-bs-original-title="" title="Nhanh hơn - Tiện lợi hơn khi giặt ủi tại các Tiệm của 247" aria-describedby="tooltip605849" loading="lazy" alt="Nhanh hơn - Tiện lợi hơn khi giặt ủi tại các Tiệm của 247" />
                                    <figcaption className="figure-caption text-muted py-3">"Nhanh hơn - Tiện lợi hơn khi giặt ủi tại các Tiệm của 247"</figcaption>
                                </figure>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="s_text_image o_cc o_cc2 o_colored_level pt0 pb0 mt-5" data-snippet="s_text_image" data-name="Text - Image" style={{ backgroundImage: "none" }}>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 o_colored_level pt0 pb0" >
                                <img src="https://giatui247.vn/web_editor/shape/illustration/on-the-way-svg-1402?c1=%23637BBE&unique=30725581" alt="Dịch vụ giặt ủi giao nhận tận nơi" className="img img-fluid o_we_custom_image mx-auto d-block" style={{ padding: "32px !important" }} data-original-id="1402" data-original-src="/web_editor/shape/illustration/on-the-way-svg-1402?c1=%23637BBE&amp;unique=30725581" data-mimetype="image/svg+xml" data-resize-width="undefined" title="Dịch vụ giặt ủi giao nhận tận nơi" loading="lazy" />
                            </div>
                            <div className="col-lg-6 o_colored_level pb0 pt0" data-bs-original-title="Giặt ủi giao nhận tận nơi" title="Giặt ủi giao nhận tận nhà" aria-describedby="tooltip3985">
                                <h2 style={{ textAlign: "center" }}>Dịch vụ giao tận nơi</h2>
                                <p style={{ textAlign: "center" }}>
                                    <em>
                                        <span style={{ fontSize: "14px" }}>Dịch vụ giặt ủi giao nhận tận nơi - tới tận cửa nhà bạn!</span>
                                    </em>
                                </p>
                                <ul>
                                    <li>Đặt <a href="/shop">lịch giặt ủi</a> trực tuyến cho quần áo của bạn - Ngay tại nhà bạn có thể dễ dàng lên danh sách sản phẩm tùy chọn dịch vụ giặt ủi mà không cần mang đồ tới Tiệm.</li>
                                    <li>Tiện lợi hơn nữa khi đặt dịch vụ giặt ủi tại 247 và Chúng tôi sẽ giao lại cho bạn vào bất cứ khi nào và ở đâu.</li>
                                </ul>
                                <p style={{ textAlign: "center" }}>
                                    <a href="/giao-nhan-tan-noi-chinh-sach-giao-nhan-tai-giat-ui-247" className="mb-2 btn btn-primary" data-bs-original-title="" title="Phí Giặt ủi giao nhận tận nhà">Biểu phí giao nhận</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="s_text_image o_cc o_cc2 o_colored_level pb0 pt0 o_we_force_no_transition mt-5" data-snippet="s_image_text" data-name="Image - Text" style={{ backgroundImage: "none" }}>
                    <div className="container">
                        <div className="row align-items-center o_we_force_no_transition" data-bs-original-title="" title="Thảo luận - Đánh giá - Câu hỏi khi sử dụng dịch vụ giặt ủi thời gian gần đây" aria-describedby="tooltip191547">
                            <div className="col-lg-6 pt16 pb16 o_colored_level o_we_force_no_transition">
                                <h2 style={{ textAlign: "center" }}>Thảo luận - Đánh giá</h2>
                                <p>
                                    Bạn cần thêm thông tin hay, nêu thắc mắc về dịch vụ của 247 hay của bất kỳ cửa hàng hay nhà giặt nào. Hãy đặt câu hỏi và xem những đánh giá nhận xét khách quan, câu trả lời hay nhất tại diễn đàn của 247. Mọi thông tin, chủ đề về thị trường giặt ủi hay các Tiệm giặt ủi gần đây được Chúng tôi và cộng đồng cập nhật thường xuyên tại mục <a href="/forum/thao-luan-tro-giup-1">Thảo luận/FAQs</a>. Sau đây là một số câu hỏi rất thường gặp khi bạn sử dụng dịch vụ giặt ủi của Chúng tôi:</p>
                                <ol>
                                    <li>
                                        <em>
                                            <span style={{ fontSize: "14px" }}>Tiệm giặt ủi gần đây, thông tin tiệm giặt ủi 247 gần đây nhất?</span>
                                        </em>
                                    </li>
                                    <li>
                                        <em>
                                            <span style={{ fontSize: "14px" }}>Dịch vụ giặt ủi nào gần chỗ tôi nhất?</span>
                                        </em>
                                    </li>
                                    <li>
                                        <em>
                                            <span style={{ fontSize: "14px" }}>Có tiệm giặt giặt khô nào gần đây không?</span>
                                        </em>
                                    </li>
                                    <li>
                                        <em>
                                            <span style={{ fontSize: "14px" }}>Chất lượng dịch vụ giặt ủi tại 247 có đảm bảo không? được đánh giá theo tiêu chí, tiêu chuẩn nào?</span>
                                        </em>
                                    </li>
                                    <li>
                                        <em>
                                            <span style={{ fontSize: "14px" }}>Giá giặt hấp áo Vest?</span>
                                        </em>
                                    </li>
                                    <li>
                                        <em>
                                            <span style={{ fontSize: "14px" }}>Giặt hấp sau bao lâu thì lấy được?</span>
                                        </em>
                                    </li>
                                    <li>
                                        <em>
                                            <span style={{ fontSize: "14px" }}>Dịch vụ giặt ủi nào tốt nhất cho chiếc áo lông vũ của tôi?</span>
                                        </em>
                                    </li>
                                    <li>
                                        <em>
                                            <span style={{ fontSize: "14px" }}>Giặt sấy quần áo có lấy liền được không? Sau bao lâu thì xong</span>
                                        </em>
                                    </li>
                                    <li>
                                        <em>
                                            <span style={{ fontSize: "14px" }}>Giá giặt ủi bao tiền 1 Kg?</span>
                                        </em>
                                    </li>
                                </ol>
                                <p>
                                    <a href="/forum" data-bs-original-title="" title="Thảo luận - Đánh giá - Câu hỏi khi sử dụng dịch vụ giặt ủi thời gian gần đây">
                                        <img src="https://giatui247.vn/web/image/605-5716e6c8/faq2.png" className="img img-fluid o_we_custom_image mx-auto d-block" data-original-id="604" data-original-src="/web/image/604-bf28cf78/faq2.png" data-mimetype="image/png" data-bs-original-title="" title="Thảo luận - Đánh giá - Câu hỏi khi sử dụng dịch vụ giặt ủi thời gian gần đây" aria-describedby="tooltip470644" data-resize-width="512" loading="lazy" alt="Câu hỏi thường gặp khi giặt ủi" />
                                    </a>
                                </p>
                            </div>
                            <div className="col-lg-6 pt16 pb16 o_colored_level o_we_force_no_transition">
                                <p>Nếu gần đây bạn thường xuyên giặt đồ tại các Tiệm giặt ủi hãy đăng ký nhận những bản tin mới nhất của 247 để nhận những thông tin ưu đãi - khuyến mãi dịch vụ giặt ủi vượt trội từ 247!</p>
                                <div className="s_newsletter_subscribe_form s_newsletter_list js_subscribe" data-vxml="001" data-list-id="1" data-name="Newsletter" data-snippet="s_newsletter_subscribe_form">
                                    <div className="input-group">
                                        <input type="email" name="email" className="js_subscribe_value form-control" placeholder="email của bạn..." />
                                        <a role="button" href="/" className="btn btn-primary js_subscribe_btn o_submit o_default_snippet_text">Đăng ký nhận tin</a>
                                        <a role="button" href="/" className="btn btn-success js_subscribed_btn o_submit o_default_snippet_text d-none" disabled="disabled">Cám ơn</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section data-snippet="s_dynamic_snippet_products" className="s_blog_posts s_dynamic_snippet_blog_posts s_blog_posts_effect_marley s_dynamic o_colored_level s_blog_post_card o_cc o_cc2 pt4 pb0 mt-3" data-name="Blog Posts" style={{ backgroundImage: "none" }} data-filter-by-blog-id="-1" data-number-of-records="6" data-filter-id="8" data-template-key="website_blog.dynamic_filter_template_blog_post_card" data-number-of-elements="3" data-bs-original-title="Thông tin giặt ủi mới được cập nhật" title="Thông tin giặt ủi mới được cập nhật" aria-describedby="tooltip134341">
                    <h2 style={{ textAlign: "center" }}>
                        <font className="text-gradient" style={{ backgroundImage: "linear-gradient(135deg, rgb(47, 128, 237) 0%, rgb(178, 255, 218) 100%)" }}>Thông tin giặt ủi nổi bật</font>
                    </h2>
                    <p style={{ textAlign: "center" }}>Những thông tin dịch vụ, mẹo giặt ủi được cập nhật tại Blog của chúng tôi...</p>
                    <div className="o_not_editable container">
                        <div className="css_non_editable_mode_hidden">
                            <div className="missing_option_warning alert alert-info rounded-0 fade show d-none d-print-none o_default_snippet_text">
                                <span style={{ textAlign: "center" }}>Thông tin dịch vụ, mẹo giặt ủi được cập nhật mới nhất...</span>
                            </div>
                        </div>
                        <div className="dynamic_snippet_template">
                            <div className="row my-4 ">
                                <div className="d-flex flex-grow-0 flex-shrink-0 col-4">
                                    <div className="s_blog_posts_post pb32 w-100" data-number-of-elements="3">
                                        <div className="card">
                                            <a className="s_blog_posts_post_cover" href="/blog/thong-tin-dich-vu-1/dat-dich-vu-giat-ui-truc-tuyen-gan-ay-dan-tro-thanh-xu-huong-moi-29">
                                                <div data-name="Ảnh bìa" data-res-model="blog.post" data-res-id="29" className="o_record_cover_container d-flex flex-column h-100 o_colored_level o_cc o_cc3 o_cc   thumb">
                                                    <img src="https://giatui247.vn/web/image/2467-f71bcffe/247laundry-delivery.png?&height=256&width=256" alt="" />
                                                </div>
                                            </a>
                                            <div className="card-body">
                                                <a href="/blog/thong-tin-dich-vu-1/dat-dich-vu-giat-ui-truc-tuyen-gan-ay-dan-tro-thanh-xu-huong-moi-29"><h4 className="mb-0">Đặt dịch vụ giặt ủi trực tuyến gần đây dần trở thành xu hướng mới</h4></a>
                                                <p className="s_blog_posts_post_subtitle mb-1 d-none d-sm-block">Đặt dịch vụ giặt ủi trực tuyến hay đặt lịch giặt ủi online đang dần trở thành xu hướng mới thay thế các Tiệm giặt ủi truyền thống. Vậy có cần Tìm kiếm Tiệm giặt ủi gần đây không? Hãy cùng 247 xem xu thế đặt lịch giặt ủi trực tuyến như thế nào nhé!</p>
                                            </div>
                                            <div className="card-footer d-flex justify-content-between">
                                                <span className="text-muted mb-0">thg 8 31, 2023</span>
                                                <span className="text-muted mb-0">Trong <a className="fw-bold" href="/blog/1">Thông tin dịch vụ</a>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-grow-0 flex-shrink-0 col-4">
                                    <div className="s_blog_posts_post pb32 w-100" data-number-of-elements="3">
                                        <div className="card">
                                            <a className="s_blog_posts_post_cover" href="/blog/thong-tin-dich-vu-1/giat-ui-va-cham-soc-quan-ao-co-chat-lieu-cao-cap-bi-quyet-tu-chuyen-gia-28">
                                                <div data-name="Ảnh bìa" data-res-model="blog.post" data-res-id="28" className="o_record_cover_container d-flex flex-column h-100 o_colored_level o_cc o_cc3 o_cc   thumb">
                                                    <img src="https://giatui247.vn/web/image/2458-a875dd70/ao-dai-lua.png?&height=256&width=256" alt="" />
                                                </div>
                                            </a>
                                            <div className="card-body">
                                                <a href="/blog/thong-tin-dich-vu-1/giat-ui-va-cham-soc-quan-ao-co-chat-lieu-cao-cap-bi-quyet-tu-chuyen-gia-28"><h4 className="mb-0">Giặt ủi và chăm sóc quần áo có chất liệu cao cấp - Bí quyết từ chuyên gia</h4></a>
                                                <p className="s_blog_posts_post_subtitle mb-1 d-none d-sm-block">Bạn có những bộ quần áo&nbsp;cao cấp được làm từ các chất liệu đặc biệt như lụa, tơ tằm, len, da, lông thú…? Bạn muốn giữ cho chúng luôn bền đẹp và mới mẻ? Bạn muốn tự tay chăm sóc và giặt ủi chúng tại nhà, Vậy hãy tham khảo những lời khuyên và lưu ý khi giặt ủi những chất liệu cao cấp từ những chuyên gia của 247 tại bài viết này nhé!</p>
                                            </div>
                                            <div className="card-footer d-flex justify-content-between">
                                                <span className="text-muted mb-0">thg 8 29, 2023</span>
                                                <span className="text-muted mb-0">Trong <a className="fw-bold" href="/blog/1">Thông tin dịch vụ</a>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-grow-0 flex-shrink-0 col-4">
                                    <div className="s_blog_posts_post pb32 w-100" data-number-of-elements="3">
                                        <div className="card">
                                            <a className="s_blog_posts_post_cover" href="/blog/tin-tong-hop-2/cach-giat-ui-quan-ao-khong-bi-co-rut-27">
                                                <div data-name="Ảnh bìa" data-res-model="blog.post" data-res-id="27" className="o_record_cover_container d-flex flex-column h-100 o_colored_level o_cc o_cc3 o_cc   thumb">
                                                    <img src="https://giatui247.vn/web/image/2371-20422762/giat-ui-dung-cach.png?&height=256&width=256" alt="" />
                                                </div>
                                            </a>
                                            <div className="card-body">
                                                <a href="/blog/tin-tong-hop-2/cach-giat-ui-quan-ao-khong-bi-co-rut-27"><h4 className="mb-0">Cách giặt ủi quần áo không bị co rút</h4></a>
                                                <p className="s_blog_posts_post_subtitle mb-1 d-none d-sm-block">Quần áo khi giặt ủi nhiều khi gặp phải tình trạng co rút vải, vậy làm thế nào tránh bị co giãn&nbsp;khi giặt hay ủi? Hãy cùng 247 khám phá nguyên nhân để phòng tránh tình trạng co rút (co giãn) và cách giặt ủi tại nhà tốt nhất cho quẩn áo của bạn.</p>
                                            </div>
                                            <div className="card-footer d-flex justify-content-between">
                                                <span className="text-muted mb-0">thg 7 19, 2023</span>
                                                <span className="text-muted mb-0">Trong <a className="fw-bold" href="/blog/2">Tin tổng hợp</a>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row my-4 ">
                                <div className="d-flex flex-grow-0 flex-shrink-0 col-4">
                                    <div className="s_blog_posts_post pb32 w-100" data-number-of-elements="3">
                                        <div className="card">
                                            <a className="s_blog_posts_post_cover" href="/blog/thong-tin-dich-vu-1/giat-la-ha-noi-thong-tin-nhung-tiem-giat-ui-giat-la-noi-tieng-gan-day-26">
                                                <div data-name="Ảnh bìa" data-res-model="blog.post" data-res-id="26" className="o_record_cover_container d-flex flex-column h-100 o_colored_level o_cc o_cc3 o_cc   thumb">
                                                    <img src="https://giatui247.vn/web/image/2362-c7dcd2e4/giat-do-tai-tiem-giat-ui.png?&height=256&width=256" alt="" />
                                                </div>
                                            </a>
                                            <div className="card-body">
                                                <a href="/blog/thong-tin-dich-vu-1/giat-la-ha-noi-thong-tin-nhung-tiem-giat-ui-giat-la-noi-tieng-gan-day-26"><h4 className="mb-0">Giặt là Hà Nội - Thông tin những Tiệm giặt ủi (Giặt là) nổi tiếng gần đây</h4></a>
                                                <p className="s_blog_posts_post_subtitle mb-1 d-none d-sm-block">Giặt ủi 247 cập nhật thông tin một số Tiệm giặt ủi ở Hà Nội, Thông tin được cập nhật mới nhất từ cộng đồng (FAQs) trong quá trình thảo luận và hỏi đáp tại 247.</p>
                                            </div>
                                            <div className="card-footer d-flex justify-content-between">
                                                <span className="text-muted mb-0">thg 7 14, 2023</span>
                                                <span className="text-muted mb-0">Trong <a className="fw-bold" href="/blog/1">Thông tin dịch vụ</a>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-grow-0 flex-shrink-0 col-4">
                                    <div className="s_blog_posts_post pb32 w-100" data-number-of-elements="3">
                                        <div className="card">
                                            <a className="s_blog_posts_post_cover" href="/blog/tin-tong-hop-2/giat-do-tai-tiem-giat-ui-cac-tinh-huong-co-the-xay-ra-25">
                                                <div data-name="Ảnh bìa" data-res-model="blog.post" data-res-id="25" className="o_record_cover_container d-flex flex-column h-100 o_colored_level o_cc o_cc3 o_cc   thumb">
                                                    <img src="https://giatui247.vn/web/image/2179-8f240103/dich-vu-giat-ui-cao-cap-247.png?&height=256&width=256" alt="" />
                                                </div>
                                            </a>
                                            <div className="card-body">
                                                <a href="/blog/tin-tong-hop-2/giat-do-tai-tiem-giat-ui-cac-tinh-huong-co-the-xay-ra-25"><h4 className="mb-0">Tiệm giặt ủi các tình huống có thể xảy ra khi giặt ủi - giặt sấy tại đây</h4></a>
                                                <p className="s_blog_posts_post_subtitle mb-1 d-none d-sm-block">Gần đây bạn có mang đồ đi giặt tại các Tiệm giặt ủi thì hãy lưu ý các tình huống có thể xảy ra sau đây. Bạn hãy lưu tâm để tránh những hậu quả không mong muốn có thể xảy ra với quần áo của bạn khi sử dụng dịch vụ giặt ủi của bất cứ nhà giặt hay tiệm giặt ủi nào.</p>
                                            </div>
                                            <div className="card-footer d-flex justify-content-between">
                                                <span className="text-muted mb-0">thg 7 5, 2023</span>
                                                <span className="text-muted mb-0">Trong <a className="fw-bold" href="/blog/2">Tin tổng hợp</a>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-grow-0 flex-shrink-0 col-4">
                                    <div className="s_blog_posts_post pb32 w-100" data-number-of-elements="3">
                                        <div className="card">
                                            <a className="s_blog_posts_post_cover" href="/blog/thong-tin-dich-vu-1/giat-ui-quan-ao-ung-cach-co-the-ban-chua-biet-24">
                                                <div data-name="Ảnh bìa" data-res-model="blog.post" data-res-id="24" className="o_record_cover_container d-flex flex-column h-100 o_colored_level o_cc o_cc3 o_cc   thumb">
                                                    <img src="https://giatui247.vn/web/image/2293-23104075/Screen%20Shot%202023-07-02%20at%2017.34.45.png?&height=256&width=256" alt="" />
                                                </div>
                                            </a>
                                            <div className="card-body">
                                                <a href="/blog/thong-tin-dich-vu-1/giat-ui-quan-ao-ung-cach-co-the-ban-chua-biet-24"><h4 className="mb-0">Giặt ủi quần áo&nbsp;đúng cách! Có thể bạn chưa biết</h4></a>
                                                <p className="s_blog_posts_post_subtitle mb-1 d-none d-sm-block">"Giặt ủi" một công việc hàng ngày quen thuộc với mỗi chúng ta. Vậy bạn đã giặt ủi quần áo tại nhà đúng cách chưa. Hãy tham khảo cách giặt ủi quần áo và các trang phục thời trang&nbsp;đúng cách theo hướng dẫn&nbsp;của nhân viên giặt ủi giàu kinh nghiệm của Giặt ủi 247 sau đây.</p>
                                            </div>
                                            <div className="card-footer d-flex justify-content-between">
                                                <span className="text-muted mb-0">thg 7 2, 2023</span>
                                                <span className="text-muted mb-0">Trong <a className="fw-bold" href="/blog/1">Thông tin dịch vụ</a>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
            <div className="pt-5 bg-light">
                <Footer />
            </div>
        </>
    )
}

export default HomePage
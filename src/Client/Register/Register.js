import { useState } from "react"
import "../Register/Register.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";
import { addUser } from "../../Service/userAPI";

function UserRegister() {

    // Khởi tạo các biến ứng với các thuộc tính User
    const [userName, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repassword, setRePassword] = useState("")
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [avatar, setAvatar] = useState("")
    const [addressUser, setAddressUser] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const navigate = useNavigate()

    const handleRegister = async () => {
        const newUser = {
            username: userName,
            password: password,
            email: email,
            first_name: firstName,
            last_name: lastName,
            role: 2,
            status: 1,
            avatar: avatar,
            address_user: addressUser,
            phone_number: phoneNumber,
            created_at: new Date(),
            updated_at: "",
            created_by_id: "",
            updated_by_id: ""
        }
        //validate input
        if (password !== repassword) {
            toast.error("Mật khẩu nhập lại không khớp")
        } else {
            try {
                //Gọi API thêm mới user
                await addUser(newUser)
                navigate("/userlogin")
                toast.success(`Đăng kí tài khoản username: ${newUser.username} thành công!`)
            } catch (error) {
                toast.error(error.response.data.error)
            }
        }
    }

    const handleRedirect = () => {
        navigate("/userlogin")
    }
    return (
        <>
            <div className="containers">
                <div className="box">
                    <h1 align="center" >Đăng kí</h1>
                    <div className="inputBox">
                        <input type="text" name="username" required
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label>Tên đăng nhập</label>
                    </div>
                    <div className="inputBox">
                        <input type="email" name="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Email</label>
                    </div>
                    <div className="inputBox">
                        <input type="text" name="first-name" required
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <label>First name</label>
                    </div>
                    <div className="inputBox">
                        <input type="text" name="last-name" required
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <label>Last name</label>
                    </div>
                    <div className="inputBox">
                        <input type="text" name="avatar" required
                            onChange={(e) => setAvatar(e.target.value)}
                        />
                        <label>Avatar URL</label>
                    </div>
                    <div className="inputBox">
                        <input type="text" name="avatar" required
                            onChange={(e) => setAddressUser(e.target.value)}
                        />
                        <label>Nơi ở hiện tại</label>
                    </div>
                    <div className="inputBox">
                        <input type="text" name="avatar" required
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <label>Số điện thoại</label>
                    </div>
                    <div className="inputBox">
                        <input type="password" name="password" minLength={6} required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>Mật khẩu</label>
                    </div>
                    <div className="inputBox">
                        <input type="password" name="re-password" required
                            onChange={(e) => setRePassword(e.target.value)}
                        />
                        <label>Nhập lại mật khẩu</label>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-success me-3" onClick={handleRegister}>Đăng kí</button>
                        <button className="btn btn-primary" onClick={handleRedirect}>Trở về</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserRegister
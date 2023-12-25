import { useNavigate } from "react-router-dom"
import "./Login.css"
import { useState } from "react"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI } from "../../Service/authenAPI";

function UserLogin() {
    const [userName, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async () => {
        const userLogin = {
            username: userName,
            password: password,
            role:3
        }
        try {
            const token = await loginAPI(userLogin)
            if (token) {
                localStorage.setItem("admin", JSON.stringify(token.key))
                localStorage.setItem("userId", JSON.stringify(token.id))
                toast.success("Đăng nhập thành công!")
                navigate("/")
            }
        } catch (error) {
            console.log(error)
            const errorResponse = error.response.data.errMessage
            toast.error(errorResponse)
        }
    }

    return (
        <>
            <div className="containers">
                <div className="box">
                    <h1 align="center" >Đăng nhập</h1>
                    <div className="inputBox">
                        <input type="text" name="username" required
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label>Tên đăng nhập</label>
                    </div>
                    <div className="inputBox">
                        <input type="password" name="password" required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>Mật khẩu</label>
                    </div>
                    <div className="text-center">
                        <button type="button" className="btn btn-primary me-3" onClick={handleLogin}>Đăng nhập</button>
                        <button type="button" className="btn btn-success" onClick={() => navigate("/userregister")}>Đăng kí</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserLogin
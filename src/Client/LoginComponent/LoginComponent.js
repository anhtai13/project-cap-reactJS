import React from 'react'
import logo from '../../img/Logo.png'
import { Link } from 'react-router-dom'

const LoginComponent = () => {
  return (
    <div>
        <img className=' w-full absolute opacity-50' src="https://scontent.fdad7-2.fna.fbcdn.net/v/t1.15752-9/258533607_618547459316980_8987574654561787223_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_ohc=WTzkEo3QN4sAX-oSyd0&_nc_ht=scontent.fdad7-2.fna&oh=03_AdRt_0X6YE3_JJ3bKhXdow1FWHWRpgbEsgXVYX1_Gzo-jQ&oe=65460688" alt='background' />
        <div className=' relative'>
            <div className='wrapper'>
                <h2 className=' text-4xl text-center pt-28 font-bold'>Đăng nhập</h2>
            </div>
            <div className=' flex justify-around mt-20'>
                <div className=' mt-12'>
                    <img className=' opacity-50' src={logo} alt="" />
                </div>
                <div className=' bg-gray-300 py-16 px-36 rounded-3xl mt-10 h-96'>
                    <form action="">
                        <label htmlFor="">Tài khoản</label> <br />
                        <input className=' border border-purple-700 w-96 mb-7 pl-2.5 rounded-md' type="text" placeholder='Nhập tài khoản' /> <br />
                        <label htmlFor="">Mật khẩu</label> <br />
                        <input className=' border border-purple-700 w-96 mb-7 pl-2.5 rounded-md' type="password" placeholder='Nhập mật khẩu' /> <br />
                        <div className=' flex justify-between space-between'>
                            <div className=' flex'>
                                <input type='checkbox'></input>
                                <p className=' text-gray-400'>Ghi nhớ đăng nhập</p>
                            </div>
                        <p className=' text-gray-400'>Quên mật khẩu?</p>
                    </div>
                    <Link to="/">
                    <button className=' border border-red-500 bg-orange-500 w-96 h-10 rounded-3xl mt-5 text-white text-xl font-bold' type='button'>Đăng nhập</button>
                    </Link>
                    <div className=' flex justify-around space-between pt-8'>
                            <p className=' text-gray-600'>Bạn chưa có tài khoản?</p>
                            <Link to="/register">
                            <p className=' text-gray-600 font-bold underline decoration-solid'>Đăng ký</p>
                            </Link>
                    </div>
                    </form>


                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginComponent
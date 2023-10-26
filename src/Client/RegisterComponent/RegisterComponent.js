import React from 'react'
import logo from '../../img/Logo.png'

const RegisterComponent = () => {
  return (
    <div>
        <img className=' w-full absolute opacity-50' src="https://scontent.fdad7-2.fna.fbcdn.net/v/t1.15752-9/258533607_618547459316980_8987574654561787223_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_ohc=WTzkEo3QN4sAX-oSyd0&_nc_ht=scontent.fdad7-2.fna&oh=03_AdRt_0X6YE3_JJ3bKhXdow1FWHWRpgbEsgXVYX1_Gzo-jQ&oe=65460688" alt='background' />
        <div className=' relative'>
            <div className='wrapper'>
                <h2 className=' text-4xl text-center pt-28 font-bold'>Đăng ký</h2>
            </div>
            <div className=' flex justify-around mt-20'>
                <div className=' mt-12'>
                    <img className=' opacity-50' src={logo} alt="" />
                </div>
                <div className=' bg-gray-300 py-16 px-36 rounded-3xl mt-10 h-3/4'>
                    <form action="">
                        <label htmlFor="">Tài khoản</label> <br />
                        <input className=' border border-purple-700 bg-gray-300 w-96 mb-7 pl-2.5 rounded-md' type="text" placeholder='Nhập tài khoản' /> <br />
                        <label htmlFor="">Email</label> <br />
                        <input className=' border border-purple-700 bg-gray-300 w-96 mb-7 pl-2.5 rounded-md' type="text" placeholder='Nhập email' /> <br />
                        <label htmlFor="">Số điện thoại</label> <br />
                        <input className=' border border-purple-700 bg-gray-300 w-96 mb-7 pl-2.5 rounded-md' type="text" placeholder='Nhập số điện thoại' /> <br />
                        <label htmlFor="">Mật khẩu</label> <br />
                        <input className=' border border-purple-700 bg-gray-300 w-96 mb-7 pl-2.5 rounded-md' type="password" placeholder='Nhập mật khẩu' /> <br />
                        <label htmlFor="">Nhập lại mật khẩu</label> <br />
                        <input className=' border border-purple-700 bg-gray-300 w-96 mb-7 pl-2.5 rounded-md' type="password" placeholder='Nhập lại mật khẩu' /> <br />
                        
                    <button className=' border border-red-500 bg-orange-500 w-96 h-10 rounded-3xl mt-5 text-white text-xl font-bold' type='button'>Đăng ký</button>
                    </form>


                </div>
            </div>
        </div>
    </div>
  )
}

export default RegisterComponent
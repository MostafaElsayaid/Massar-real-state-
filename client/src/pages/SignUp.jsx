import React from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>
        إنشاء حساب جديد</h1>
        <form className='flex flex-col gap-4 '>
          <input type='text' placeholder='اسم المستخدم' 
          className=' border p-3 rounded-lg text-right' id='username'/>
          <input type='email' placeholder='البريد الالكترونى' 
          className=' border p-3 text-right rounded-lg' id='email'/>
          <input type='password' placeholder='الرقم السرى' 
          className=' border p-3 text-right rounded-lg' id='password'/>
          <button  className='bg-[#bb9652] text-black hover:bg-black hover:text-white
               rounded-lg p-2 text-nowrap font-sans font-bold disabled:opacity-80 uppercase text-2xl'>إنشاء حساب</button>
        </form>
        <div className=''>
          <p className='text-right'>
            تمتلك حساب بالفعل؟
          </p>
          <p className='text-right'>
          <Link  to={"/sign-in"}>
            <span className='text-[#bb9652] '>تسجيل الدخول</span>
          </Link>
          </p>
          
        </div>
    </div>
  )
}

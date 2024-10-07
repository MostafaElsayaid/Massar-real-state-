import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'


export default function Signin() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handlechange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
   
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
    setLoading(true)
    const res = await fetch('/api/auth/signin',
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData),
    }
    );
    const data = await res.json();
    if(data.succes === false){
      setLoading(false)
      setError(data.message)
      
      return
    }
    setLoading(false)
    setError(null);
    navigate('/')
  } catch(error){
    setLoading(false)
    setError(error.message)
  }
    
  }
  console.log(formData)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>
        تسجيل الدخول</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
         
          <input type='email' placeholder='البريد الالكترونى' 
          className=' border p-3 text-right rounded-lg' id='email'onChange={handlechange}/>
          <input type='password' placeholder='الرقم السرى' 
          className=' border p-3 text-right rounded-lg' id='password'onChange={handlechange}/>
          <button disabled={loading}  className='bg-[#bb9652] text-black hover:bg-black hover:text-white
               rounded-lg p-2 text-nowrap font-sans font-bold disabled:opacity-80 uppercase text-2xl'>{loading ? '... تحميل': 'تسجيل الدخول'}</button>
        </form>
        <div className=''>
          <p className='text-right'>
            لاتمتلك حساب ؟
          </p>
          <p className='text-right'>
          <Link  to={"/sign-up"}>
            <span className='text-[#bb9652] '>إنشاء حساب</span>
          </Link>
          </p>
          
        </div>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

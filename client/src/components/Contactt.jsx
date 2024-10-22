import React, { useEffect, useState } from 'react'
import { IoLogoWhatsapp } from "react-icons/io";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { Link } from 'react-router-dom';





export default function Contactt({listing}) {
    const [landlord, setLandlord] = useState(null)
    const [phone, setPhone] = useState(false)
    const [email, setEmail] = useState(false)
    const [message, setMessage] = useState('')
    const onChange = (e)=>{
        setMessage(e.target.value)
    }
    useEffect(()=>{
        const fetchLandlord = async()=>{
            try {
                const res = await fetch(`/api/user/${listing.userRef}`)
                const data = await res.json();
                setLandlord(data)
                
            } catch (error) {
                console.error(error)
            }
            
        }
        fetchLandlord()
        

    },[listing.userRef])
  return (
    <div className='p-6 flex gap-2'>
        <Link to={`http://wa.me/201008688315?text=${listing.name}${listing.regularPrice}جنيه ${listing.address}\n تفاصيل العقار؟`} className='bg-[#bb9652] flex items-center rounded-lg p-3 gap-1 text-white'><IoLogoWhatsapp className='text-4xl text-green-700'/> واتساب</Link>
         <button onClick={()=>setPhone(true)}
         className='bg-[#bb9652] flex items-center rounded-lg p-3 gap-1 text-white'
         >{phone ? <span>01008688315</span> : <span className='flex items-center gap-1'><BiSolidPhoneCall className='text-4xl text-black'/> إتصل</span>} </button>
         <button onClick={()=>setEmail(true)}
         className='bg-[#bb9652] flex items-center rounded-lg p-3 gap-1 text-white'
         >{email ? <span>
            <textarea
            className='text-black text-right w-full rounded-lg' 
            name='message' 
            id='message'  
            rows="5" 
            cols='30'
            value={message} 
            onChange={onChange}
            placeholder='اكتب رسالتك هنا '
            ></textarea>
            <Link to={`mailto:${landlord.email}?subject=${listing.name}&body=${message}`}
            className='text-white text-right bg-black rounded-lg p-1 hover:opacity-85'>
            إرسال الرسالة
            </Link>
            
         </span>:<span className='flex items-center gap-1'><MdEmail className='text-4xl text-red-700'/>إيميل</span>}</button>
         
    </div>
  )
}

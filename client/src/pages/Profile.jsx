import React, { useEffect, useState } from 'react'
import {  useSelector } from 'react-redux'
import { useRef } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'
export default function Profile() {
  const fileRef = useRef(null)
  const {currentUser} = useSelector((state)=> state.user)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  
  // firebase storage 
  // allow read;
  //     allow write: if
  //     request.resource.size < 2 * 1024 * 1024 &&
  //     request.resource.contentType.matches('image/.*')
  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  }, [file])
  const handleFileUpload = (file)=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePerc(Math.round(progress) )     
      
    },
    
    (error)=>{
      setFileUploadError(true)
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        setFormData({...formData, avatar: downloadURL})
      })
    }
    )
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7'>الملف الشخصى</h1>
    <form className='flex flex-col gap-4'>
      <input onChange={(e)=> setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*'/>
      <img
       onClick={()=>fileRef.current.click()}
       className='rounded-full h-24 w-24 object-cover cursor-pointer
       self-center m-2 '
        src={formData.avatar || currentUser.avatar} alt='profile'
        />
       <p className='text-sm self-center'>
        {fileUploadError ? 
  (<span className='text-red-700 text-right'>حدث خطأ في رفع الصورة. حاول مرة أخرى (يجب ان يكون حجم الصورة اقل من  2 ميجا)</span>) : 
        filePerc > 0 && filePerc < 100 ? (
          <span className='text-[#bb9652] text-right'> {`%يتم تحمبل الصورة ${filePerc}`}</span>)
        :
        filePerc === 100 ? (
          <span className='text-green-700 text-right'>تم تحميل الصورة بنجاح</span>
        ) :(
          ''
        )}
       </p>
       <input type='text' placeholder='اسم المستخدم ' id='username' className='border text-right p-3 rounded-lg'>
        
       </input>
       <input type='email'  placeholder='البريد الالكترونى  ' id='email' className='border p-3 text-right rounded-lg'>
        
       </input>
       <input type='password' placeholder='كلمة المرور  ' id='password' className='border text-right p-3 rounded-lg'>
        
       </input>
       <button className='bg-[#bb9652] text-black font-bold rounded-lg p-3 uppercase 
       hover:opacity-85 disabled:opacity-75'>تحديث الملف الشخصى</button>
    </form>
    <div className='flex justify-between mt-5'>
      <span className='text-red-700 cursor-pointer'>مسح الحساب</span>
      <span className='text-red-700 cursor-pointer'>تسجيل الخروج</span>
    </div>
    </div>
  )
}

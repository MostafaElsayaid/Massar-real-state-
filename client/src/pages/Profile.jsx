import React, { useEffect, useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'
import { updateUserStart,
    updateUserFailure,
    updateUserSuccess,
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    signOutUserFailure,
    signOutUserStart,
    signOutUserSuccess,
   
   } from '../redux/user/userSlice.js'
   import { Link } from 'react-router-dom'
export default function Profile() {
  const fileRef = useRef(null)
  const {currentUser, loading, error} = useSelector((state)=> state.user)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  const dispatch = useDispatch()
  
  // firebase storage 
  // allow read;
  //     allow write: if
  //     request.resource.size < 2 * 1024 * 1024 &&
  //     request.resource.contentType.matches('image/.*')
  useEffect(()=>{
    try {
      
      
    } catch (error) {
      
    }
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
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id] : e.target.value})
    console.log(e.target.value)
  };
  const handleSubmit =  async (e)=>{
    e.preventDefault();
    try {
        dispatch(updateUserStart());
        
        const res = await fetch(`/api/user/update/${currentUser._id}`,
        {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData),
        })
        const data = await res.json();
        if(data.success === false){
            dispatch(updateUserFailure(data.message))
            return;
        }
        dispatch(updateUserSuccess(data));
        
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }
  const handleDeleteUser = async()=>{
    try {
         dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`,{
          method:'DELETE',
        });
        const data = await res.json();
        if(data.success === false){
            dispatch(deleteUserFailure(data.message))
            return;
        }
        dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }
  const handleSignOut = async ()=>{
      try {
        dispatch(signOutUserStart());
        const res = await fetch('/api/auth/signout');
        const data = await res.json();
        if(data.success === false){
            dispatch(signOutUserFailure(data.message));
            return;
        }
        dispatch(signOutUserSuccess(data));
      } catch (error) {
        dispatch(signOutUserFailure(error.message));
      }
  }
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7'>الملف الشخصى</h1>
    <form 
    onSubmit={handleSubmit} 
    className='flex flex-col gap-4'>
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
       <input
          type='text'
          placeholder='اسم المستخدم '
          defaultValue={currentUser.username}
          id='username' 
          className='border text-right p-3 rounded-lg'
          onChange={handleChange}
          >
        
       </input>
       <input 
        type='email'
        placeholder='البريد الالكترونى  '
        defaultValue={currentUser.email}
        id='email'
        className='border p-3 text-right rounded-lg'
        onChange={handleChange}
        >
        
       </input>
       <input
        type='password'
        placeholder='كلمة المرور  '
        id='password'
        className='border text-right p-3 rounded-lg'
        onChange={handleChange}
        
        >
        
       </input>
       <button disabled={loading} className='bg-[#bb9652] text-black font-bold rounded-lg p-3 uppercase 
       hover:opacity-85 disabled:opacity-75'>
        {loading ?  ' انتظار التحديث' : 'تحديث البيانات'}

       </button>
       <Link className='flex flex-col gap-4' to={"/create-listing"}>
        {currentUser.role === 'admin' ?(
          <button className='bg-green-700 p-3 rounded-lg text-center text-white  '>إنشاء عقار جديد</button>
        ) : ('')
        }
       </Link>
    </form>
    <div className='flex justify-between mt-5'>
      <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>مسح الحساب</span>
      <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>تسجيل الخروج</span>
    </div>
    
    </div>
  )
}

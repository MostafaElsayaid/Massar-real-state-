import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react'
import { app } from '../firebase';

export default function CreateListing() {
    const [files, setFiles] = useState([])
    const [formData, setFormData] = useState({
        imageUrls: [],
    });
    const [imageUploadError, setImageUploadError] = useState(false)
    const [uploading, setUploading] = useState(false)
    console.log(formData)
    const handleImageSubmit = (e)=>{
            if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
                setUploading(true)
                setImageUploadError(false)
                const promises = [];

                for (let i = 0 ; i < files.length ; i++){
                    promises.push(storeImage(files[i]));
                }
                Promise.all(promises).then((urls)=>{
                    setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls)});
                    setImageUploadError(false)
                    setUploading(false)
            }).catch((err)=>{
                setImageUploadError('فشل رفع الصور')
                setUploading(false)
                
            }
            )
    }else{
        setImageUploadError(' يمكنك فقط رفع 6 صور او على الاقل صوره ')
        setUploading(false)
    }
}
    const storeImage = async (file) => {
        return new Promise((resolve, reject) =>{
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error)=>{
                reject(error)
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                    resolve(downloadURL);
                })
            })
        })
    }
        
            
return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-semibold text-center my-7'>
            إنشاء عقار </h1>
            <form className='flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input
                        className='border p-3 rounded-lg text-right'
                        type='text'
                        placeholder='اسم العقار'
                        id='name'
                        maxLength='62'
                        minLength='10'
                        required >
                    </input>
                    <textarea
                        className='border p-3 rounded-lg text-right'
                        type='text'
                        placeholder='وصف العقار'
                        id='description'
                        required >
                    </textarea>
                    <input
                        className='border p-3 rounded-lg text-right'
                        type='text'
                        placeholder='عنوان العقار'
                        id='address'
                        required >
                    </input>
                    <div className='flex gap-6 flex-wrap'>
                        <div className='flex gap-2'>
                            <input className='w-5'type='checkbox'id='sale'></input>
                            <span>للبيع</span>
                        </div>
                        <div className='flex gap-2'>
                            <input className='w-5'type='checkbox'id='rent'></input>
                            <span>للإيجار</span>
                        </div>
                        <div className='flex gap-2'>
                            <input className='w-5'type='checkbox'id='parking'></input>
                            <span>جراج</span>
                        </div>
                        <div className='flex gap-2'>
                            <input className='w-5'type='checkbox'id='furnished'></input>
                            <span>مفروشة</span>
                        </div>
                        <div className='flex gap-2'>
                            <input className='w-5'type='checkbox'id='offer'></input>
                            <span>تخفيض</span>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-2'>
                        <div className='flex items-center gap-2'>
                            <input type='number' id='bedrooms' min='1' max='20' required
                            className='p-3 border border-gray-800 rounded-lg'></input>
                            <p>عدد الغرف</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type='number' id='bathrooms' min='1' max='20' required
                            className='p-3 border border-gray-800 rounded-lg'></input>
                            <p>عدد الحمامات</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type='number' id='regularPrice' min='1' max='20' required
                            className='p-3 border border-gray-800 rounded-lg'></input>
                            <div className='flex flex-col items-center'>
                                <p>السعر </p>
                                <span className='text-xs'>($ / شهريا)</span>
                            </div>
                            

                        </div>
                        <div className='flex items-center gap-2'>
                            <input type='number' id='discountPrice'  min='1' max='20' required
                            className='p-3 border border-gray-800 rounded-lg'></input>
                            <div className='flex flex-col items-center'>
                                <p>السعر بعد التخفيض</p>
                                <span className='text-xs'>($ / شهريا)</span>
                            </div>

                        </div>

                    </div>
                </div>
                <div className='flex flex-col flex-1 gap-4'>
                    <p className='font-semibold text-right'>الصور: 
                    <span className='font-normal text-gray-600 ml-2 text-right'>  اول صوره ستكون صورة الغلاف (اقصى عدد للصور :  6 صور  ) </span>
                    </p>
                    <div className='flex gap-4'>
                        <input 
                        onChange={(e)=>setFiles(e.target.files)} 
                        className='p-3 border border-gray-300 rounded w-full'
                        type="file" id='images' accept='image/*' multiple />
                        <button 
                        type='button'
                        onClick={handleImageSubmit}
                        disabled={uploading}
                        className='p-3   text-green border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'
                        >
                            {uploading ? '... يتم الرفع ':'رفع الصور'}
                        </button>
                    </div>
                    <p>
                {imageUploadError && (
                    <div className='text-red-700 font-bold text-xs'>
                        {imageUploadError}
                    </div>
                )}
               </p>
               {
                 formData.imageUrls.map((url, index)=>(
                    <div key={index} className='flex justify-between items-center p-3 border'>
                        <img src={url} alt='image' className='w-20 h-20 object-contain rounded-lg' />
                        <button 
                        onClick={()=>setFormData({...formData, imageUrls: formData.imageUrls.filter((_, i)=> i!== index)})}
                        className='p-1 text-red-700 font-bold hover:opacity-75 m-4'>حذف</button>
                    </div>
                 ))
               }
                    <button className='p-3 bg-[#bb9652] text-white font-bold rounded-lg hover:opacity-80 disabled:opacity-70'>إنشاء عقار</button>
               
                </div>
               
            </form>
           
    </main>
  )
}

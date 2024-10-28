import React from 'react'

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row '>
        <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
            <form className='flex flex-col gap-8'>
                <div className='flex items-center gap-2'>
                    
                    <input type='text'
                    id='searhTerm'
                    placeholder='بحث...'
                    className='border rounded-lg p-3 w-full text-right'
                    />
                    <label className='whitespace-nowrap'>بحث عن</label>
                </div>
                <div className='flex gap-8 flex-wrap items-center '>
                
                    <div className='flex gap-2'>
                        <input type='checkbox' id='all' className='w-5'/>
                        <span>بيع و إيجار</span>
                        
                    </div>
                    
                    <div className='flex gap-2'>
                        <input type='checkbox' id='rent' className='w-5'/>
                        <span>إيجار</span>

                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='sale' className='w-5'/>
                        <span>بيع</span>

                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='offer' className='w-5'/>
                        <span>عرض؟</span>

                    </div>
                    <label className=''>: النوع</label>
                </div>
                
                <div className='flex gap-8 flex-wrap items-center'>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='parking' className='w-5'/>
                        <span>جراج</span>

                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='furnished' className='w-5'/>
                        <span>مفروشة</span>
                         
                    </div>
                    
                    <label>: وسائل الراحة </label>

                </div>
                <div className="flex items-center gap-10">
                    
                    <select id='sort_order' className='border rounded-lg p-3'>
                        <option>السعر من العلى الى الاقل </option>
                        <option>السعر من الاقل الى الاعلى  </option>
                        <option>الاقدم </option>
                        <option>الاحدث </option>
                    </select>
                    <label>: ترتيب </label>
                </div>
                <button className='bg-[#bb9652] text-white p-3 rounded-lg hover:opacity-85'>بحث</button>
            </form>
        </div>
        <div className='p-2 text-center items-center'>
            <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5 text-center'>
                نتائج البحث
            </h1>
        </div>
    </div>
  )
}

'use client'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import  { useEffect, useState } from 'react'
import image from '../assets/LOGO.jpeg'
export default function Header() {
    const [isClick, setisClick] = useState(false);
  const toggleNavbar = () => {
    setisClick(!isClick)
  }
    
  return (
    <header className=' shadow-md bg-[#100604]'>
        <div className='flex justify-between items-center max-w-8xl mx-auto p-2'>
        <div className='md:hidden flex items-center'>
              <button className='inline-flex items-center justify-center p-2 rounded-md text-white
              hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                onClick={toggleNavbar}>
                {isClick ? (

                  <svg className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor" >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                )}
              </button>
            </div>
            
           
         <form className='bg-slate-100 p-3  rounded-lg flex items-center'> 
            <input type='text' placeholder='            ...... ابحث عن مدينة او محافظة' className='bg-transparent focus:outline-none w-24 sm:w-64 ' />
            <FaSearch className='text-slate-500'/>
         </form>
         <ul className=' gap-4 text-white hidden md:block  justify-center items-center'>
            <div className='flex gap-10'>
            <Link to='/sign-in'>
          <li className='bg-[#bb9652] text-black hover:bg-black hover:text-white
               rounded-lg p-2 text-nowrap font-sans font-bold   text-2xl '>تسجيل الدخول</li>
          </Link>
          <Link to='/about'>
           <li className=' text-white hover:bg-[#bb9652] hover:text-black
               rounded-lg p-2 text-nowrap font-sans font-bold   text-2xl '>من نحن؟</li>
           </Link>
           <Link to='/'>
           <li className='text-white hover:bg-[#bb9652] hover:text-black
               rounded-lg p-2 text-nowrap font-sans font-bold   text-2xl'>للإيجار</li>
           </Link> 
           <Link to='/'>
           <li className='text-white hover:bg-[#bb9652] hover:text-black
               rounded-lg p-2 text-nowrap font-sans font-bold   text-2xl '>للبيع</li>
           </Link>
            </div>
        
          
          
          
            
         </ul>
         <Link to='/' className='flex text-white'> 
            
            <div className='pt-4'>
                  <a className='text-nowrap font-sans font-bold  mr-4 text-4xl'>مســــــار</a>
                  <h6>للتسويق العقارى</h6>
                </div>
                <img src={image} width={100} height={100} alt='logo' className='rounded-xl lg:mr-20 m-1 p-1  '/>
            </Link>
            
        </div>
        {isClick && (
          <div className='md:hidden '>
            <ul className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
             <Link to='/'><li href='' className='text-white hover:bg-[#bb9652] block hover:text-black rounded-lg p-2 text-nowrap font-sans font-bold   text-2xl '> للبيع</li> </Link> 
            <Link to='/'>  <li href='' className='text-white hover:bg-[#bb9652] block hover:text-black rounded-lg p-2 text-nowrap font-sans font-bold   text-2xl '> للإيجار</li></Link> 
             <Link to='/about'> <li href='' className='text-white hover:bg-[#bb9652] block hover:text-black rounded-lg p-2 text-nowrap font-sans font-bold   text-2xl '> تواصل معنا</li>
</Link> 
<Link to='/sign-in'>
          <li className='bg-[#bb9652] text-white hover:bg-white hover:text-black
               rounded-lg p-2 text-nowrap font-sans font-bold   text-2xl '>تسجيل الدخول</li>
          </Link>

            </ul>
          </div>
        )}
       
      
    </header>
  )
}

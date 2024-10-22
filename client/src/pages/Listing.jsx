import{ useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import {  useSelector } from 'react-redux'
import 'swiper/css/bundle';
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking } from 'react-icons/fa'
import Contactt from '../components/Contactt'

export default function Listing() {
    SwiperCore.use([Navigation]);
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [contact, setContact] = useState(false)
    const params = useParams()
    const {currentUser} = useSelector((state)=>state.user);
    useEffect(()=>{
        const fetchListing = async()=>{
            try {
                setLoading(true)
                const res = await fetch(`/api/listing/get/${params.listingId}`)
                const data = await res.json();
                if(data.success === false){
                    setError(true)
                    setLoading(false)
                    return;
                }
                setListing(data)
                setLoading(false)
                setError(false)
                } catch (error) {
                setError(true)
                setLoading(false)
                
                }
           
        }
        
        fetchListing()
    },[params.listingId])
  return (
    <main className='bg-slate-200'>
        {loading && <p className='text-center my-7 text-2xl'>يتم  التحميل...</p>}
        {error && <p className='text-center text-red-700 text-2xl'>حدث خطأ ما</p>}
        {listing && 
        (
            <>
            <Swiper navigation>
                {listing.imageUrls.map(url => <SwiperSlide key={url}>
                    <div className='items-center '>
                        <img className='mx-auto' src={url} width={1080} height={1024}></img>
                    </div>
                    <div className='flex flex-col items-center p-4'>
                    <p className='text-right  m-2 text-gray-700 text-2xl'>{listing.name}  </p>
                    <div className='flex flex-row items-center gap-2 '>
                    <p className='text-2xl font-semibold'>{listing.type === 'rent' && ' شهريًا /'}</p>
                    <p className='text-2xl font-semibold'>جنيه</p>

                    <p className=' text-3xl '>

                        {listing.offer === 'true'
                         ? listing.discountPrice 
                         : listing.regularPrice}
                          </p>
                    </div>
                    <p className='flex items-center mt-6 gap-2 my-2 '><FaMapMarkerAlt className='text-[#bb9652]'/> {listing.address}</p>
                    <div className='p-2 flex flex-col gap-2'>
                        <p className='bg-[#bb9652] w-full max-w-[200px] text-white text-center p-2 rounded-md '> 
                        {listing.type === 'rent' ? 'للإيجار' : 'للبيع'}
                        </p>
                        {
                            listing.offer && (
                                <p className='bg-green-600 w-full max-w-[200px] text-white text-center p-2 rounded-md '> وفرت {+listing.regularPrice -  +listing.discountPrice } جنيه</p>

                            )
                        }
                    </div>
                    <p className='text-slate-800 max-w-lg text-lg p-2'>
                    <span className='font-semibold text-black'>
                    وصف العقار - {' '}
                    </span>
                    {listing.description}
                    </p>
                    <ul className='font-semibold flex gap-2 items-center p-2 flex-wrap sm:gap-6'>
                        <li className='flex items-center gap-1 whitespace-nowrap text-black '>
                            <FaBed className='text-2xl  font-semibold text-[#bb9652]'/>
                            {listing.bedrooms > 1 ? `${listing.bedrooms} سراير ` : `${listing.bedrooms} سرير`}
                        </li>
                        <li className='flex items-center gap-1 whitespace-nowrap text-black '>
                            <FaBath className='text-2xl  font-semibold text-[#bb9652]'/>
                            {listing.bathrooms > 1 ? `${listing.bathrooms} حمامات` : `${listing.bathrooms} حمام`}
                        </li>
                        <li className='flex items-center gap-1 whitespace-nowrap text-black '>
                            <FaParking className='text-2xl  font-semibold text-[#bb9652]'/>
                            {listing.parking ? 'يوجد جراج' : 'بدون جراج'}
                        </li>
                        <li className='flex items-center gap-1 whitespace-nowrap text-black '>
                            <FaChair className='text-2xl  font-semibold text-[#bb9652]'/>
                            {listing.furnished ? 'مفروشة' : 'بدون فرش'}
                        </li>
                    </ul>
                    { listing.userRef !== currentUser._id && !contact &&(
                        <button onClick={()=>setContact(true)} className='bg-[#bb9652] mt-4 text-white rounded-lg uppercase hover:opacity-85 p-3'
                        >تواصل  مع المالك
                        </button>
                    )}
                    {contact && <Contactt listing={listing}/>}
                    

                    </div>
                    
                    
                </SwiperSlide>)}
            </Swiper>
            </>
            
        )}

    </main>
  )
}

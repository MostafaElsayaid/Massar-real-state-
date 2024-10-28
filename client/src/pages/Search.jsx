import  { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function Search() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    console.log(listings)
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc',

    })
    
useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const searchTermfromurl = urlParams.get('searchTerm');
    const typefromurl = urlParams.get('type');
    const parkingfromurl = urlParams.get('parking')
    const furnishedfromurl = urlParams.get('furnished') 
    const offerfromurl = urlParams.get('offer') 
    const sortfromurl = urlParams.get('sort');
    const orderfromurl = urlParams.get('order');

    if(
        searchTermfromurl || typefromurl || parkingfromurl || furnishedfromurl || offerfromurl || sortfromurl || orderfromurl
    ){
        setSidebardata({
            searchTerm: searchTermfromurl || '',
            type: typefromurl || 'all',
            parking: parkingfromurl  === 'true' ? true : false,
            furnished: furnishedfromurl === 'true' ? true : false,
            offer: offerfromurl === 'true' ? true : false,
            sort: sortfromurl || 'created_at',
            order: orderfromurl || 'desc',
        })
    }

    const fetchListings = async()=>{
        setLoading(true)
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        setListings(data);
        setLoading(false);


    }
    fetchListings()
},[location.search])
    
    const handleChange = (e)=>{

        if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale'){
            setSidebardata({...sidebardata, type: e.target.id})
        }
        if(e.target.id === 'searchTerm'){
            setSidebardata({...sidebardata, searchTerm: e.target.value})
        }
        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
            setSidebardata({...sidebardata, [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false})
        }
        if(e.target.id === 'sort_order'){
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';
            setSidebardata({...sidebardata, sort, order})
        }
    };

    const handleSubmit =  (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams()
        urlParams.set('searchTerm', sidebardata.searchTerm)
        urlParams.set('type', sidebardata.type)
        urlParams.set('parking', sidebardata.parking)
        urlParams.set('furnished', sidebardata.furnished)
        urlParams.set('offer', sidebardata.offer)
        urlParams.set('sort', sidebardata.sort)
        urlParams.set('order', sidebardata.order)
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)
    }
  return (
    <div className='flex flex-col md:flex-row '>
        <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                <div className='flex items-center gap-2'>
                    
                <input
              type='text'
              id='searchTerm'
              placeholder='بحث...'
              className='border rounded-lg p-3 w-full text-right'
              value={sidebardata.searchTerm}
              onChange={handleChange}
              />
                    <label className='whitespace-nowrap'>بحث عن</label>
                </div>
                <div className='flex gap-8 flex-wrap items-center '>
                
                    <div className='flex gap-2'>
                        <input type='checkbox' id='all' className='w-5'
                        onChange={handleChange}
                        checked={sidebardata.type === 'all'}
                        />
                        <span>بيع و إيجار</span>
                        
                    </div>
                    
                    <div className='flex gap-2'>
                        <input type='checkbox' id='rent' className='w-5'
                        onChange={handleChange}
                        checked={sidebardata.type === 'rent'}
                        />
                        <span>إيجار</span>

                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='sale' className='w-5'
                        onChange={handleChange}
                        checked={sidebardata.type === 'sale'}
                        />
                        <span>بيع</span>

                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='offer' className='w-5'
                        onChange={handleChange}
                        checked={sidebardata.offer}
                        />
                        <span>عرض؟</span>

                    </div>
                    <label className=''>: النوع</label>
                </div>
                
                <div className='flex gap-8 flex-wrap items-center'>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='parking' className='w-5'
                        onChange={handleChange}
                        checked={sidebardata.parking}
                        />
                        <span>جراج</span>

                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id='furnished' className='w-5'
                        onChange={handleChange}
                        checked={sidebardata.furnished}
                        />
                        <span>مفروشة</span>
                         
                    </div>
                    
                    <label>: وسائل الراحة </label>

                </div>
                <div className="flex items-center gap-10">
                    
                    <select onChange={handleChange} defaultValue={'created_at_desc'} id='sort_order' className='border rounded-lg p-3'>
                        <option value='regularPrice_desc'>السعر من العلى الى الاقل </option>
                        <option value='regularPrice_asc'>السعر من الاقل الى الاعلى  </option>
                        <option value='createdAt_desc'>الاقدم </option>
                        <option value='createdAt_asc'>الاحدث </option>
                    </select>
                    <label>: ترتيب </label>
                </div>
                <button className='bg-[#bb9652] text-white p-3 rounded-lg hover:opacity-85'>بحث</button>
            </form>
        </div>
        <div className='p-2 '>
            <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5 text-right'>
                نتائج البحث
            </h1>
        </div>
    </div>
  )
}

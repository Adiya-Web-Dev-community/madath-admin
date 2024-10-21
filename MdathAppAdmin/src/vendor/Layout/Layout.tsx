import { Outlet,useNavigate, NavLink } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import ProfileIcon from '../../superAdmin/component/icon/ProfileIcon'
import { BannerIcon, BookingIcon, CalenderIcon,  ServiceCategoryIcon,ServiceIcon } from '../../superAdmin/component/icon/Icon'
// import {Search} from '../component/header/Search'
import Profile from '../../superAdmin/component/header/Profile'
import { formatDateFun } from '../../superAdmin/function/function'

const Layout = () => {
  
  const navigate = useNavigate()
  const handaleLogout = ()=>{
    navigate('/')
    localStorage.clear()
  }

  return (
    <main className='flex h-screen w-screen overflow-x-hidden '
 
    >
        <header 
      
        className='w-[20rem]  h-full p-2  sticky top-0'>
          <div className=' w-full py-2  flex flex-col rounded-md justify-center items-center'>
          <div className='text-black p-4   -mt-4 mb-6     rounded   flex items-center'>    
             <ProfileIcon  width={"60px"}/>
             <span className='text-2xl font-[600]'>Adiya Service</span>
          </div>
        </div>
                  
           <ul className='py-2 -mt-6 ' >
            <li className=' rounded  font-[600] mb-4   duration-200  hover:bg-blue-50 border-black/10 cursor-pointer'><NavLink to='/Admin/service_category' className={({isActive})=>`${isActive?'bg-black text-white rounded':"bg-transparent"}  w-full h-full  flex p-2 `}> <ServiceCategoryIcon className='mr-2' width='30px'/> Service Category</NavLink></li>
            <li className=' rounded  font-[600] mb-4   duration-200  hover:bg-blue-50 border-black/10 cursor-pointer'><NavLink to='/Admin/service' className={({isActive})=>`${isActive?'bg-black text-white rounded':"bg-transparent"}  w-full h-full  flex p-2 `}><ServiceIcon className='mr-2' width='30px' /> All Service</NavLink></li>
            <li className=' rounded  font-[600] mb-4   duration-200  hover:bg-blue-50 border-black/10 cursor-pointer'><NavLink to='/Admin/genral_booking_component' className={({isActive})=>`${isActive?'bg-black text-white rounded':"bg-transparent"}  w-full h-full  flex p-2 `}> <BookingIcon className='mr-2' width='30px' />Genral Service Booking </NavLink></li>
            <li className=' rounded  font-[600] mb-4   duration-200  hover:bg-blue-50 border-black/10 cursor-pointer'><NavLink to='/Admin/restaurant_booking_component' className={({isActive})=>`${isActive?'bg-black text-white rounded':"bg-transparent"}  w-full h-full  flex p-2 `}> <BookingIcon className='mr-2' width='30px' />Restaurant Booking </NavLink></li>
            <li className=' rounded  font-[600] mb-4   duration-200  hover:bg-blue-50 border-black/10 cursor-pointer'><NavLink to='/Admin/barber_booking_component' className={({isActive})=>`${isActive?'bg-black text-white rounded':"bg-transparent"}  w-full h-full  flex p-2 `}> <BookingIcon className='mr-2' width='30px' />Barber Booking </NavLink></li>
            <li className=' rounded  font-[600] mb-4   duration-200  hover:bg-blue-50 border-black/10 cursor-pointer'><NavLink to='/Admin/Banner' className={({isActive})=>`${isActive?'bg-black text-white rounded':"bg-transparent"}  w-full h-full  flex p-2 `}> <BannerIcon className='mr-2' width='30px' /> Banner </NavLink></li>

           </ul> 

           <button onClick={handaleLogout} className='p-2 font-[600] w-full rounded text-black  bg-blue-50   flex justify-center'>
            Logout
            <svg xmlns="http://www.w3.org/2000/svg" height={20} width={24} viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 18H6V20H18V4H6V6H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 
            22 19 22H5C4.44772 22 4 21.5523 4 21V18ZM6 11H13V13H6V16L1 12L6 8V11Z"></path></svg>
           </button>

        </header>

        <section  className={'w-full bg-cover  min-h-full shrink-1 '}>
          
          
          
<div className='bg-white/90 h-full'>
 <div className='h-24   sticky top-0  flex items-center px-2 -ml-[0.5px]  z-[2] bg-white mb-4'>
     <div className='font-[600]  shadow  border  flex items-center text-sm text-black border-black  p-2 rounded ' >
  <CalenderIcon width='30px' className='mr-1 '/>
  {formatDateFun(new Date()+"")}
 </div>

<Profile vendor/>
              </div>
              <div className='p-2 font-bold bg-gray-100 text-start '>
               Documents {location.pathname}
              </div>
         <div >
          
         <ToastContainer hideProgressBar position='top-right'/>
          <Outlet/>
          </div>
          </div>
        </section>
        {/* <ToastContainer hideProgressBar position='top-right'/> */}
    </main>
  )
}

export default Layout

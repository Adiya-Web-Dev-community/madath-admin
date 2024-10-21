import { Outlet,useNavigate, NavLink } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import {LoginAdminIcon, LoginUserIcon,  TvIcon } from '../component/icon/Icon'
import Profile from '../component/header/Profile'
import { formatDateFun } from '../function/function'

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
             <span className='text-2xl font-[600]'>Madath App</span>
          </div>
        </div>
   
                  
           <ul className='py-2 -mt-6 ' >
            <li className=' rounded  font-[600] mb-4   duration-200  hover:bg-blue-50 border-black/10 cursor-pointer'><NavLink  to='/Admin/Admin'  className={({isActive})=>`${isActive?'bg-emerald-500 text-white rounded':"bg-transparent"}  w-full h-full  flex p-2 `}> <LoginAdminIcon className='mr-2' width='30px'/> Login Admin</NavLink></li>
            <li className=' rounded  font-[600] mb-4   duration-200  hover:bg-blue-50 border-black/10 cursor-pointer'><NavLink to='/Admin/Users' className={({isActive})=>`${isActive?'bg-emerald-500 text-white rounded':"bg-transparent"}  w-full h-full  flex p-2 `}>  <LoginUserIcon className='mr-2' width='30px'/> Login Users</NavLink></li>
            <li className=' rounded  font-[600] mb-4   duration-200  hover:bg-blue-50 border-black/10 cursor-pointer'><NavLink to='/Admin/Event' className={({isActive})=>`${isActive?'bg-emerald-500 text-white rounded':"bg-transparent"}  w-full h-full  flex p-2 `}>  <LoginUserIcon className='mr-2' width='30px'/> Event</NavLink></li>

            <li className=' rounded  font-[600] mb-4   duration-200  hover:bg-blue-50 border-black/10 cursor-pointer'><NavLink to='/Admin_Tv/Tv' className={({isActive})=>`${isActive?'bg-emerald-500 text-white rounded':"bg-transparent"}  w-full h-full  flex p-2 `}>  <TvIcon className='mr-2' width='30px'/> Display Tv</NavLink></li>
            <li className=' rounded  font-[600] mb-4   duration-200  hover:bg-blue-50 border-black/10 cursor-pointer'><NavLink to='/Admin_Tv/Tv' className={({isActive})=>`${isActive?'bg-emerald-500 text-white rounded':"bg-transparent"}  w-full h-full  flex p-2 `}>  <TvIcon className='mr-2' width='30px'/> Display Tv Controller</NavLink></li>


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
     

<div className='font-[600]  shadow  border  flex items-center text-sm text-emerald-500 border-emerald-500  p-2 rounded ' >
  {/* <CalenderIcon width='30px' className='mr-1 '/> */}
  {formatDateFun(new Date()+"")}
</div>
<Profile/>

              
              </div>
              <div className='p-2 font-bold bg-gray-100 text-start '>
               Documents{location.pathname}
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

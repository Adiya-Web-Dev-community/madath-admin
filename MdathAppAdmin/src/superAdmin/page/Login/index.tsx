import {useState} from 'react'
import Login from './Login'
import Otp from './Otp'
import day_city  from '../../assets/day_city.jpg'
import Email from './Email'
import CreateNewPassword from './CreateNewPassword'
import { ToastContainer } from 'react-toastify'
import LoginModel from '../../component/Model/LoginModel'

const Signin = () => {

 const [steps,setSteps] = useState(0)
 const [email,setEmail] = useState('')
 const [token,setToken] = useState('')

 const handaleSteps = (num:number,email:string)=>{
    setSteps(num)
    setEmail(email)
 }
 const handaleConfirmEmailSteps = (num:number,email:string,token:string)=>{
  setSteps(num)
  setEmail(email)
  setToken(token)
}




  return (
    <div 
    style={{backgroundImage:`url(${day_city})`,backgroundSize:"cover"}}
    className='w-full  h-screen
     flex justify-center items-center bg-white '>
      <div className='flex rounded-xl overflow-hidden bg-white border shadow'>

        {/* <div  
         className='w-[23rem] h-[30rem] text-gray-500 font-[400] '>
          <img src={LoginBackground}/>
          <p className='text-end p-4 text-xl'>Professional Sevice for a home environment</p>
      </div> */}
      <div  className='relative overflow-x-hidden w-[30rem] duration-200  '>
        <h2 className='font-[700] text-2xl mt-8  text-emerald-500 px-2 text-center'>Madath App</h2>
      <div style={{left:steps===1?'-100%':steps===2?'-200%':steps===3?'-300%':steps===4?'-400%':'0'}} className='w-[200rem] relative flex  duration-200'>
        
         <div className='w-[30rem]'>
         <Login handaleSteps={handaleSteps}/>
         </div>
         <div className='w-[30rem]'>
         <Otp email={email} isEmailCheck={false}  handaleConfirmEmailSteps={handaleConfirmEmailSteps} />
         </div>
         <div className='w-[30rem]'>
         <Email  handaleSteps={handaleSteps} email={email} />
         </div>
         <div className='w-[30rem]'>
         <Otp email={email} isEmailCheck ={true} handaleConfirmEmailSteps={handaleConfirmEmailSteps} />
         </div>
         <div className='w-[30rem]'>
         <CreateNewPassword email={email}   handaleSteps={handaleSteps} token={token} />
         </div>
      </div>
      </div>
     </div>
      <ToastContainer hideProgressBar position='top-right'/>
      {!!JSON.parse(localStorage.getItem("user-auth")||"{}")?.token&&<LoginModel/>}
    </div>
  )
}

export default Signin

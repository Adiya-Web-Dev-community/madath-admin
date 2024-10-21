import { useEffect, useState } from 'react'
import AuthentcatingRole from './roleChecking.svg'
import { getHeaders } from '../superAdmin/api/authfunction/header'

const AuthenticatingPanelRole = ({setIsRechecking,setRole}:{setIsRechecking:(val:boolean)=>void,setRole:(val:boolean)=>void})=>{


    const token = JSON.parse(localStorage.getItem('user-auth')||"{}")?.token

    const [isSuperAdmin,setIsSuperAdmin] = useState(false)

    const [isRoleChecked,setRoleisChecked] = useState({
      api:false,
      timer:false
    }) 


    useEffect(()=>{
        if(token){
         fetch(`${import.meta.env.VITE_BASE_URL}/admin/Login_Role_Check`,
        {
          headers:getHeaders(),
          method:"POST"
        }
         ).then((res1)=>{
         res1.json().then(async (res)=>{
            const data = await res
            if(res1.status===200){
              setRoleisChecked(prev=>({...prev,api:true}))
              setIsSuperAdmin(data?.superAdimn)
              setRole(data?.superAdimn)    
            }
          })
        }).catch((error)=>{
           console.error(error)
        })
      }
      },[token])

      useEffect(() => {
        const timer = setTimeout(() => {
            // navugate("/role_checking");
            setRoleisChecked(prev=>({...prev,timer:true}))
        }, 3000);
        return () => clearTimeout(timer); // Clean up the timeout on component unmount
      }, []);

      useEffect(()=>{
        if(isRoleChecked.timer&&isRoleChecked.api && isSuperAdmin){
            // navigate('/Admin/Admin')
            setIsRechecking(true)
        }else if (isRoleChecked.timer&&isRoleChecked.api && !isSuperAdmin){
            // navigate('/Admin/service_category')
            setIsRechecking(true)
        }
      },[isRoleChecked.timer,isRoleChecked.api])

 return <div className="h-screen w-screen flex justify-center items-center flex-col" >
           <img src={AuthentcatingRole} width={500}/>

        <p className="flex text-lg justify-center w-ful h-8">

        <svg className="animate-spin border-2 border-blue-400 rounded h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
<span className='font-semibold'>Authenticating And Checking Role .....</span>
        </p>
 </div> 
}

export default AuthenticatingPanelRole
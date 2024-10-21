

const Profile = ({vendor=false}) =>{

  const user = JSON.parse(localStorage.getItem('user-auth')||'{}')||{}

    return <div className=" ml-auto mr-2 rounded flex shadow">
          
           <div >
            <div className=" flex   p-2 ml-2 rounded ">

            {/* <div className={`border  h-fit ${!vendor?'border-emerald-500 text-emerald-500' :'border-black text-black'} w-fit p-3 rounded cursor-pointer mr-2`}>
             <MessageIcon width="25px"/>
           </div> */}
           {/* <Link className={` border block h-fit ${!vendor?'border-emerald-500 text-emerald-500' :'border-black text-black'} w-fit p-3 rounded cursor-pointer `} to={"/Admin/booking"} >
             <NotificationIcon width="25px"/>
           </Link> */}

                <div className={` ${vendor?"bg-gray-200":"bg-sky-200"} h-12 w-12 border-gray-200 ml-8 rounded `} />
                <p className="text-start  pl-1 ">
                    <span className="font-[500] text-gray-600">{user.name}</span><br/>
                    <span className="text-gray-600">{user.email}</span>
                </p>
            </div>

           </div>

    </div>
}


export default Profile


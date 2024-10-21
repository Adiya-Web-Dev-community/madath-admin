import {forwardRef} from 'react'
import { DeleteIcon } from '../icon/Icon'

interface ChildComponentProps {
    imageUrl?:string ,
    handleUpload?:(file:File|null)=>void,
    progress?:number,
    handaleDelete?:()=>void
}

const Uploadimage = forwardRef<HTMLInputElement,ChildComponentProps>(({imageUrl,handleUpload,progress,handaleDelete},ref)=>{

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (handleUpload) {
          const file = event.target.files ? event.target.files[0] : null;
          handleUpload(file);
        }
      };


      

    return <div className="mb-2 h-[17.2rem] w-[30rem]  group   mx-auto  bg-white border rounded relative">
    {imageUrl ? (
      <img
        src={imageUrl}
        alt="" 
        className="h-full w-full object-cover rounded"
      />
    ) : (
      <div className="h-64 w-full rounded flex items-center justify-center bg-cover ">
        <span>No photo</span>
      </div>
    )}
    <input
      className="absolute inset-0 opacity-0 cursor-pointer "
      type="file"
      name="serviceImage"
      onChange={handleChange}
      ref={ref}
      required={!imageUrl?.trim()}
      accept="image/*"
    />
  

  {(progress!==100&&progress!==0&&progress)&&<div className="w-full bg-blue-100 rounded-full mt-4">
      <div className="bg-emerald-500 text-xs font-medium text-blue-100 text-center p-0.2 leading-none rounded-full" style={{"width": (progress||0)+"%"}}> {Math.round(progress||0)}%</div>
    </div>}
    {imageUrl?<div onClick={()=>handaleDelete?handaleDelete():()=>{}} className="absolute hidden group-hover:block top-0 right-0 text-red-500 p-1 border rounded cursor-pointer">
    <DeleteIcon width="30px"/>
  </div>:""}
  </div>


})

export default Uploadimage
import {
    useMutation,
    useQueryClient,
  } from "@tanstack/react-query";
  import  { useState, ChangeEvent, FormEvent, useEffect} from "react";
  import { toast } from "react-toastify";
  import {filterAndUpdate } from "../../api/querryfunction/function";
import { postEventData, updateEventData } from "../../api/Event";
import TimePiker from "./TimePiker";

  interface UserForm { 
    paging:number,
    searchQuery:string,
    isEdit:string,
    eventObj:{
   "eventStartTime": string,
    "eventEndTime": string,
    "eventTitle": string,
    "eventDiscription": string,
    "eventStaus": boolean,
    "eventBackgroundColor":string,
    "eventTextColor": string,
    "_id"?:string 
    }
 
  }


  const UserLoginForm = ({paging,searchQuery,isEdit,eventObj}:UserForm) => {
  
  
    const obj = eventObj;

    const [Event, setEvent] = useState({...eventObj });
    const queryClient = useQueryClient();
 
  
    const postMutation = useMutation({
      mutationFn: postEventData,
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["eventData"],
          exact: false,
        })
        if (data.message === "Successfully saved") {
          toast.success("Successfully save");
          setEvent({ ...obj });
        } else {
          toast.error(data.message);
        }
      },
    });
  

  
    const updateMutation = useMutation({
      mutationFn: updateEventData,
      onSuccess: (obj, _) => {
      queryClient.setQueryData(["eventData", searchQuery, paging],
      filterAndUpdate(obj)); toast.success("Update Successfully"); },
    });
  
   
    const handleFormChange = (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      setEvent({ ...Event, [e.target.name]: e.target.value });
    };
  
    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!isEdit) {
        postMutation.mutate({ ...Event, status: typeof Event.eventStaus === 'string'?JSON.parse(Event.eventStaus):Event.eventStaus });
      } else {
        updateMutation.mutate({ ...Event, eventStaus: typeof Event.eventStaus === 'string'?JSON.parse(Event.eventStaus):Event.eventStaus });
      }
    };

    useEffect(()=>{
       setEvent({...eventObj})
    },[eventObj?._id])
  
    
    return ((
          <form
            onSubmit={handleFormSubmit}
            className="mb-4 p-4 border rounded bg-gray-100 grid grid-cols-3 gap-2 m-2 text-start"
          >
            <div className="mb-2">
              <label className="block">Name:</label>
              <input
                className="border p-2 w-full"
                type="text"
                name="eventTitle"
                value={Event.eventTitle}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="mb-2">
              <label className="block">Event Start Time</label>
              {/* <input
                className="border p-2 w-full"
                type="time"
                name="eventStartTime"
                value={Event.eventStartTime}
                onChange={handleFormChange}
                required
              /> */}
              <TimePiker isEdit={isEdit} date={Event.eventStartTime} setDate={(eventStartTime)=>{setEvent(prev=>({...prev,eventStartTime}))}}/>
            </div>
            <div className="mb-2">
              <label className="block">Event End Time</label>
              {/* <input
                className="border p-2 w-full"
                type="time"
                name="eventEndTime"
                value={Event.eventEndTime}
                onChange={handleFormChange}
                required
              /> */}
                <TimePiker isEdit={isEdit} date={Event.eventEndTime} setDate={(eventEndTime)=>{setEvent(prev=>({...prev,eventEndTime}))}}/>

            </div>
        
            <div className="mb-2">
              <label className="block">Status:</label>
              <select
                className="border p-2 w-full"
                name="eventStaus"
                value={`${Event.eventStaus}`}
                onChange={handleFormChange}
                required
              >
                <option value="">Select Status</option>
                <option value={`true`}>Active</option>
                <option value={`false`}>Inactive</option>
              </select>
            </div>

            <div className="mb-2 col-span-2">
              <label className="block">Event Discription</label>
              <input
                className="border p-2 w-full"
                type="text"
                name="eventDiscription"
                value={Event.eventDiscription}
                onChange={handleFormChange}
                required
              />
            </div>
            
            <div className="mb-2 ">
              <label className="block">Event Background</label>
              <div  className="border-2 border-gray-300 rounded h-[38px]"
               style={{backgroundColor:Event.eventBackgroundColor}}>

</div>
              <input
                className="p-2 w-full  border-2 bg-gray-600 rounded "
                type="color"
                name="eventBackgroundColor"
                value={Event.eventBackgroundColor}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="mb-2 ">
              <label className="block">Event Text Color</label>
              <div  className="border-2 border-gray-300 rounded h-[38px]"
               style={{backgroundColor:Event.eventTextColor}}>

</div>
              <input
                className="p-2 w-full  border-2 bg-gray-600 rounded "
                type="color"
                name="eventTextColor"
                value={Event.eventTextColor}
                onChange={handleFormChange}
                required
              />
            </div>
               <div></div>
            <div>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-500 text-white rounded"
              >
                {!isEdit ? "Add" : "Update"}
              </button>
            </div>
          </form>
        )
    );
  };
  
  export default UserLoginForm;
  
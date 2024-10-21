import Slider from "./Slider";
// import imageQr from "../../../../public/QR_code_for_mobile_English_Wikipedia.svg"
import Watch from "./Watch";
// import TowerGraph from "./TowerGraph";
import { useQuery, 
    // useQueryClient
 } from "@tanstack/react-query";
import { getActiveEventData } from "../../api/Event";

const TV = () => {

    // const queryClient = useQueryClient();

    const { 
        // isLoading, 
        data } = useQuery({
      queryKey: ["eventData"],
      queryFn: () => getActiveEventData(),
    });

    // console.log

    // const eventData = [
    //     {
    //         "title": "Morning Yoga Session",
    //         "date": "2024-10-16",
    //         "description": "A refreshing yoga session to start the day.",
    //         "startTime": "06:00 AM",
    //         "endTime": "07:00 AM"
    //     },
    //     {
    //         "title": "Team Meeting",
    //         "date": "2024-10-16",
    //         "description": "Monthly team meeting to discuss project progress.",
    //         "startTime": "09:30 AM",
    //         "endTime": "11:00 AM"
    //     },
    //     {
    //         "title": "Client Presentation",
    //         "date": "2024-10-16",
    //         "description": "Presenting project updates to the client.",
    //         "startTime": "12:00 PM",
    //         "endTime": "01:00 PM"
    //     },
    //     {
    //         "title": "Lunch Break",
    //         "date": "2024-10-16",
    //         "description": "Time to relax and grab some food.",
    //         "startTime": "01:30 PM",
    //         "endTime": "02:30 PM"
    //     },
    //     {
    //         "title": "Lunch Break",
    //         "date": "2024-10-16",
    //         "description": "Time to relax and grab some food.",
    //         "startTime": "01:30 PM",
    //         "endTime": "02:30 PM"
    //     },
    
        
    // ]

  const newsArray =   [
    {
        "title": "Election Promises to Address Tribal Issues",
        "date": "2024-10-11",
        "summary": "Candidates in the Mendhar assembly elections outline their promises to tackle issues faced by Scheduled Tribes, including education and employment.",
        "source": "Election Watch"
    },
        {
            "title": "Mendhar Assembly Elections: Key Candidates Emerge",
            "date": "2024-10-15",
            "summary": "Candidates from various parties are gearing up for the upcoming elections in the Mendhar assembly segment, focusing on issues concerning Scheduled Tribes.",
            "source": "Local News Network"
        },
        {
            "title": "Election Campaigns Heat Up in Mendhar",
            "date": "2024-10-14",
            "summary": "Political parties intensify their campaigns in the Mendhar assembly segment, with a strong emphasis on the needs of the Scheduled Tribes community.",
            "source": "State Gazette"
        },
        {
            "title": "Voter Awareness Programs Launched in Mendhar",
            "date": "2024-10-13",
            "summary": "Election officials launch voter awareness programs to educate the Scheduled Tribes community about the voting process in Mendhar.",
            "source": "Community Bulletin"
        },
        {
            "title": "Local Leaders Rally Support for Scheduled Tribes",
            "date": "2024-10-12",
            "summary": "Local leaders emphasize the importance of representation for Scheduled Tribes in the Mendhar assembly segment ahead of the elections.",
            "source": "Tribal Voice"
        },
    ]
    

    

    return (
        <div className="h-full w-full flex flex-col   overflow-hidden">
       
            {/* Event Section */}
            <div className=" rounded-lg   mb-4 flex h-[calc(100%-18rem)] bg-white" >
                <div className="text-xl font-semibold mb-2 w-96    rounded-lg  overflow-scroll" >
                    <div className="p-2 ">
                        {data?.data?.map((el:any) =>
                            <div style={{backgroundColor:el.eventBackgroundColor,color:el.eventTextColor}} className="w-full shadow-xl border mb-2 text-start text-xs p-2 rounded-lg">
                                <h2 className="text-lg font-bold">{el.eventTitle}</h2>
                                <p >{el.eventDiscription}</p>
                                <p >Event Duration 
                                    {new Date(el.eventStartTime).toLocaleTimeString()} 
                                    {new Date(el.eventEndTime).toLocaleTimeString()}</p>
                                <p >Event Anouncement  {el.startTime} {el.endTime}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="text-gray-700 mb-2 flex h-fit  mt-2  rounded-lg">
                    <div className="w-[22rem] ">
                    <Slider/>
                    </div>
                   <img className="w-[22rem]   m-4 rounded-lg" src="https://swiperjs.com/demos/images/nature-1.jpg"/>
                   {/* <div className="flex py-8 bg-white flex-col justify-between items-center   m-4 w-24 rounded-md">
                    <div className="bg-gray-200 p-2 rounded-lg">Qr Code 1</div>
                    <div className="bg-gray-200 p-2 rounded-lg">Qr Code 2</div>
                    <img src={imageQr} className="w-3/4"/>
                    <img src={imageQr} className="w-3/4"/>
                    <img src={imageQr} className="w-3/4"/>


                
                </div>  */}
                <Watch/>


                </div>
                {/* <TowerGraph/> */}
                </div>



            <div className="  shadow-md  w-full bg-gray-100  fixed bottom-0   ">
                {/* <h2 className="absolute bottom-full left-0 bg-slate-600 text-xl p-4 text-white font-bold rounded-t">COMMUNITY</h2> */}
                <div className="text-xl font-semibold mb-2 w-full text-start flex ">
                    <div className="w-full bg-gray-100 flex ">
                        <p className="p-3  w-fit">   Community</p>
                        <div className="w-[80rem] overflow-hidden mx-auto  ">
                        <div   className="   " style={{width:`${newsArray.length*80}rem`,
                         animationDuration:`${newsArray.length*30}s`}}> 
                         <div   className="p-3 flex marquee relative " style={{width:`${newsArray.length*80}rem`,
                         animationDuration:`${newsArray.length*30}s`}}>
                             {newsArray.map((el)=><div className="w-[80rem] pl-8">
                               <h2 className="text-md font-bold">{el.title}</h2> 
                               {/* <p className="text-sm font-semibold">{el.summary}</p>  */}
                            </div>)}
                          </div>

                          </div>


                         </div> 
                    </div>
                    <p className="w-fit text-bold bg-red-600 text-white py-2 px-8 mx-2">
                        News
                    </p>
                 </div>
                <div className="text-xl font-semibold  w-full text-start flex  bg-black text-white">
                <p className="p-3  w-fit">   Closter News</p>
                <div className="w-[80rem] overflow-hidden mx-auto h-full  ">
                        <div   className="   " style={{width:`${newsArray.length*80}rem`,
                         animationDuration:`${newsArray.length*15}s`}}> 
                         <div   className=" flex marquee_reverse relative " style={{width:`${newsArray.length*80}rem`,
                         animationDuration:`${newsArray.length*15}s`}}>
                             {newsArray.map((el)=><div className="w-[80rem] pl-8">
                               <p className="text-sm font-semibold  p-3">{el.summary}</p> 
                            </div>)}
                          </div>

                          </div>


                         </div> 
                </div>
            </div>
        </div>
        
    );
}

export default TV;

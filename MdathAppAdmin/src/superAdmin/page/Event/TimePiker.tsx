import { useEffect, useRef, useState } from "react";
import { BackIcon } from "../../component/icon/card";

const TimePicker = ({
    date,
  setDate,
  isEdit
}: {
  date?: string;
  setDate: (date: string) => void;
  isEdit:string
}) => {
  const hourElRef = useRef(null);
  const minuteElRef = useRef(null);
  const secondsElRef = useRef(null);
  const dateObj = new Date();
  const [isCalenderOpen,setIsCalenderOpen] = useState(true)

  const handleDateObj = (dateObj: Date) => {
    let hours = dateObj.getHours();
    const minutes =
      (dateObj.getMinutes() + "").length === 1
        ? "0" + dateObj.getMinutes()
        : dateObj.getMinutes();
    const seconds =
      (dateObj.getSeconds() + "").length === 1
        ? "0" + dateObj.getSeconds()
        : dateObj.getSeconds();
  
    const zone = hours >= 12 ? "PM" : "AM"; // Determine AM or PM
    hours = hours % 12 || 12; // Convert 24-hour to 12-hour format (0 becomes 12)
  
    const formattedHours = (hours + "").length === 1 ? "0" + hours : hours;
  
    return {
      hour: formattedHours,
      minutes: minutes,
      seconds: seconds,
      zone: zone,
    };
  };

  const [time, setTime] = useState(handleDateObj(dateObj));

  const [currentScrollPostion, setCurrentScrollPosition] = useState({
    hour: 0,
    minutes: 0,
    seconds: 0,
  });

  const hours = Array.from({ length: 12 }, (_, i) =>
    (i + 1 + "").length === 1 ? "0" + (i + 1) : i + 1
  ); // 1 to 12 hours
  const minutes = Array.from({ length: 60 }, (_, i) =>
    (i + "").length === 1 ? "0" + i : i
  ); // 0 to 59 minutes
  const seconds = Array.from({ length: 60 }, (_, i) =>
    (i + "").length === 1 ? "0" + i : i
  ); // 0 to 59 seconds

  const scrollToElement = (
    position: number,
    element: React.RefObject<HTMLDivElement>
  ) => {
    if (element.current) {
      element.current.scrollTo({
        top: position, // Scroll to the target's position
        behavior: "smooth", // Add smooth scrolling
      });
    }
  };

  const handaleHourBottomScroll = () => {
    setCurrentScrollPosition((prev) => ({
      ...prev,
      hour: prev.hour > 150 && prev.hour > 150 ? 150 : 0,
    }));
  };
  const handaleHourTopScroll = () => {
    setCurrentScrollPosition((prev) => ({
      ...prev,
      hour: prev.hour >= 0 && prev.hour < 150 ? 150 : 210,
    }));
  };

  const handaleMinuteBottomScroll = () => {
    setCurrentScrollPosition((prev) => ({
      ...prev,
      minutes: prev.minutes > 150 ? prev.minutes - 150 : 0, // Decrease by 150, but stop at 0
    }));
  };
  const handaleMinuteTopScroll = () => {
    setCurrentScrollPosition((prev) => ({
      ...prev,
      minutes: prev.minutes < 1650 ? prev.minutes + 150 : 1650, // Increment by 150 until 1200
    }));
  };

  const handaleSecondsBottomScroll = () => {
    setCurrentScrollPosition((prev) => ({
      ...prev,
      seconds: prev.seconds > 150 ? prev.seconds - 150 : 0, // Decrease by 150, but stop at 0
    }));
  };
  const handaleSecondsTopScroll = () => {
    setCurrentScrollPosition((prev) => ({
      ...prev,
      seconds: prev.seconds < 1650 ? prev.seconds + 150 : 1650, // Increment by 150 until 1200
    }));
  };
  const convertTo24HourFormatTime = (time12h: string): string => {
    let [time, modifier] = time12h.split(" "); // Split time and AM/PM
    let [hours, minutes, seconds] = time.split(":");
  
    if (modifier === "PM" && hours !== "12") {
      hours = (parseInt(hours) + 12).toString(); // Convert PM hours to 24-hour format
    } else if (modifier === "AM" && hours === "12") {
      hours = "00"; // Convert 12 AM to 00
    }
  
    return `${hours}:${minutes}:${seconds}`;
  };

  const convertTo24HourFormat = (string: string) => {
    const date = new Date();
    console.log(
      date.toISOString().split("T")[0] + "T" + convertTo24HourFormatTime(string)
    );
      return new Date(
        date.toISOString().split("T")[0] +
          "T" +
          convertTo24HourFormatTime(string)
      )+""
  };

  useEffect(() => {
    scrollToElement(currentScrollPostion.hour, hourElRef);
    setDate(
      convertTo24HourFormat(
        `${time.hour}:${time.minutes}:${time.seconds} ${time.zone}`
      )
    );
  }, [currentScrollPostion.hour]);

  useEffect(() => {
    scrollToElement(currentScrollPostion.minutes, minuteElRef);
    setDate(
      convertTo24HourFormat(
        `${time.hour}:${time.minutes}:${time.seconds} ${time.zone}`
      )
    );
  }, [currentScrollPostion.minutes]);

  useEffect(() => {
    scrollToElement(currentScrollPostion.seconds, secondsElRef);
    setDate(
      convertTo24HourFormat(
        `${time.hour}:${time.minutes}:${time.seconds} ${time.zone}`
      )
    );
  }, [currentScrollPostion.seconds]);

  useEffect(() => {
    scrollToElement(currentScrollPostion.seconds, secondsElRef);
    setDate(
      convertTo24HourFormat(
        `${time.hour}:${time.minutes}:${time.seconds} ${time.zone}`
      )
    );
  }, [time.zone]);



  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.id !== "calenderId8ty893u4hyt") {
        setIsCalenderOpen(true);
      }
    };
    
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []); 

  useEffect(()=>{
    if(`${new Date(date||"")}`!=='Invalid Date'&&isEdit){
        setTime(handleDateObj(new Date((new Date().toISOString().split('T')[0]+"T"+date))))
        console.log(handleDateObj(new Date((new Date().toISOString().split('T')[0]+"T"+date))))
    }
  },[isEdit])


  return (
    <div id="calenderId8ty893u4hyt" onClick={()=>{setIsCalenderOpen(false)}}
     className="w-full border h-[42px] bg-white rounded p-2 relative">
      <p id="calenderId8ty893u4hyt" >
        {time.hour}:{time.minutes}:{time.seconds}:{time.zone}
      </p>


      <div id="calenderId8ty893u4hyt" className={` ${isCalenderOpen?'h-[0px]':'h-[22rem] p-4'} overflow-hidden duration-200 absolute top-full mt-1 left-0  bg-white w-full shadow-xl  rounded `}>
           <div id="calenderId8ty893u4hyt" className="flex justify-evenly items-center">
        <ul id="calenderId8ty893u4hyt" className="w-20 shrink-0 text-center bg-slate-100">
          <li id="calenderId8ty893u4hyt" className=" py-2 bg-white">Hour</li>
          <li
          id="calenderId8ty893u4hyt"
            className=" py-2 bg-white"
            onClick={() => {
              handaleHourTopScroll();
            }}
          >
            <BackIcon width="25px" className="-rotate-90 block mx-auto" />
          </li>
          <li ref={hourElRef} id="calenderId8ty893u4hyt" className="h-[150px] overflow-hidden ">
            <ul id="calenderId8ty893u4hyt" className="box-border">
              {hours.map((hour, i) => (
                <li
                  onClick={() => {
                    setCurrentScrollPosition((prev) => ({
                      ...prev,
                      hour: (i - 2) * 30,
                    })),
                      setTime((prev) => ({ ...prev, hour: hour }));
                  }}
                  key={hour}
                  id="calenderId8ty893u4hyt"
                  className={`${
                    time.hour === hour ? "bg-emerald-500 text-white" : ""
                  } p-1 border h-[30px] cursor-pointer`}
                >
                  {hour}
                </li>
              ))}
            </ul>
          </li>
          <li
            className=" py-2 bg-white"
            onClick={() => {
              handaleHourBottomScroll();
            }}
            id="calenderId8ty893u4hyt"
          >
            <BackIcon width="25px" className="rotate-90 block mx-auto" />
          </li>
        </ul>

        {/* Minutes List */}
        <ul id="calenderId8ty893u4hyt" className="w-20 shrink-0 text-center bg-slate-100">
          <li id="calenderId8ty893u4hyt" className=" py-2 bg-white">Minutes</li>
          <li
            className=" py-2 bg-white"
            onClick={() => {
              handaleMinuteTopScroll();
            }}
            id="calenderId8ty893u4hyt"
          >
            <BackIcon width="25px" className="-rotate-90 block mx-auto" />
          </li>
          <li id="calenderId8ty893u4hyt" ref={minuteElRef} className="h-[150px] overflow-hidden">
            <ul id="calenderId8ty893u4hyt" className="box-border">
              {minutes.map((minute, i) => (
                <li
                id="calenderId8ty893u4hyt"
                  key={minute}
                  className={`${
                    time.minutes === minute ? "bg-emerald-500 text-white" : ""
                  } p-1 border h-[30px] cursor-pointer`}
                  onClick={() => {
                    setCurrentScrollPosition((prev) => ({
                      ...prev,
                      minutes: (i - 2) * 30,
                    })),
                      setTime((prev) => ({ ...prev, minutes: minute }));
                  }}
                >
                  {minute}
                </li>
              ))}
            </ul>
          </li>
          <li
            className=" py-2 bg-white"
            onClick={() => {
              handaleMinuteBottomScroll();
            }}
            id="calenderId8ty893u4hyt"
          >
            <BackIcon width="25px" className="rotate-90 block mx-auto" />
          </li>
        </ul>

        {/* Seconds List */}
        <ul id="calenderId8ty893u4hyt" className="w-20 shrink-0 text-center bg-slate-100">
          <li id="calenderId8ty893u4hyt" className=" py-2 bg-white">Seconds</li>
          <li
          id="calenderId8ty893u4hyt"
            className=" py-2 bg-white"
            onClick={() => handaleSecondsTopScroll()}
          >
            <BackIcon width="25px" className="-rotate-90 block mx-auto" />
          </li>
          <li ref={secondsElRef} id="calenderId8ty893u4hyt" className="h-[150px] overflow-hidden">
            <ul id="calenderId8ty893u4hyt">
              {seconds.map((second, i) => (
                <li
                id="calenderId8ty893u4hyt"
                  key={second}
                  className={`${
                    time.seconds === second ? "bg-emerald-500 text-white" : ""
                  } p-1 border h-[30px] cursor-pointer`}
                  onClick={() => {
                    setCurrentScrollPosition((prev) => ({
                      ...prev,
                      seconds: (i - 2) * 30,
                    })),
                      setTime((prev) => ({ ...prev, seconds: second }));
                  }}
                >
                  {second}
                </li>
              ))}
            </ul>
          </li>
          <li
            className=" py-2 bg-white"
            onClick={() => handaleSecondsBottomScroll()}
            id="calenderId8ty893u4hyt"
          >
            <BackIcon width="25px" className="rotate-90 block mx-auto" />
          </li>
        </ul>

        <div id="calenderId8ty893u4hyt" className="flex flex-col border">
          <button
          id="calenderId8ty893u4hyt"
            onClick={() => {
              setTime((prev) => ({ ...prev, zone: "AM" }));
            }}
            className={`${
              time.zone === "AM" ? "bg-emerald-500 text-white" : ""
            } p-4 duration-200`}
          >
            AM
          </button>
          <button
          id="calenderId8ty893u4hyt"
            onClick={() => {
              setTime((prev) => ({ ...prev, zone: "PM" }));
            }}
            className={`${
              time.zone === "PM" ? "bg-emerald-500 text-white" : ""
            } p-4 duration-200`}
          >
            PM
          </button>
        </div>
        </div>
  
      </div>

    </div>
  );
};

export default TimePicker;

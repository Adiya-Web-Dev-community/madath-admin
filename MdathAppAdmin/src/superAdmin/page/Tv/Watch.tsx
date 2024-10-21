import { useEffect, useState } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

const Watch = ()=>{

      const [value, setValue] = useState(new Date());
      const [date,setDate] = useState(new Date())
    
      useEffect(() => {
        const interval = setInterval(() =>{setDate(new Date())
        setValue(new Date())}, 1000);
        return () => {
          clearInterval(interval);
        };
      }, []);
    
      return (
        <div className='flex  justify-between    p-4 w-80'>
          <Clock value={value} />
          <div className='text-start'>
          <p> {date.toDateString()}</p>
          <p> {date.toLocaleTimeString()}</p>

          </div>

        </div>
      );
    }
    
export default Watch
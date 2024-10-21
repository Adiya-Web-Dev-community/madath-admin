const TowerGraph = () => {
    const data = [
      { month: "Jan", value: 50 },
      { month: "Feb", value: 75 },
      { month: "Mar", value: 100 },
      { month: "Apr", value: 125 },
    //   { month: "May", value: 150 },
    //   { month: "Jun", value: 200 },
    //   { month: "Jul", value: 175 },
    //   { month: "Aug", value: 120 },
    //   { month: "Sep", value: 90 },
    //   { month: "Oct", value: 110 },
    //   { month: "Nov", value: 140 },
    //   { month: "Dec", value: 160 }
    ];
  
    return (
      <div className=" bg-white h-[26rem] m-3  rounded-lg p-4 flex flex-col justify-end items-center">
        <div className="w-full flex justify-around items-end h-full">
          {data.map((item, index) => (
            <div key={index} className="w-10 h-full flex flex-col items-center">
              <div
                className="w-6 bg-black/10 h-full rounded flex items-end "
              >
                <div
                  className="w-6 bg-black "
                  style={{ height: `${item.value}px` }}
                ></div>
              </div>
              <span className="mt-2 text-xs text-gray-700">{item.month}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default TowerGraph;
  
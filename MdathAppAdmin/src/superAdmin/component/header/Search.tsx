import { useState, useEffect } from "react";
import Pagination from "../Ui/Pagination";
import { NoDataAvailable } from "../Model/NoDataAvailable";
import Loading from "../Ui/Loading";
import { RemoveIcon } from "../icon/Icon";
interface Service {
  name: string;
  _id: string;
}
interface SearchProps {
  data?: Service[];
  className?: string;
  pagination?: boolean;
  totalDocuments?: number;
  paging?: number;
  setPagingService?: (num: number) => void;
  currentPage?: number;
  isSearchLoading?: boolean;
  setSearchServiceQuery?: (querry: string) => void;
  selectedData?: Service[];
  setSeelectedData?: (prev: Service) => void;
}

const Search: React.FC<SearchProps> = ({
  data,
  className,
  pagination,
  currentPage,
  setSeelectedData,
  selectedData,
  isSearchLoading,
  totalDocuments,
  paging,
  setPagingService,
  setSearchServiceQuery,
}) => {
  const [activeDropDown, setActiveDropDown] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest("#search-input") &&
        !target.closest(".dropdown") &&
        !target.closest("#pageing")
      ) {
        setActiveDropDown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={"inline-block relative mr-8   " + className}>
      <div className=" border bg-white h-fit rounded-md">
        {
          <div
            className={
              (selectedData?.length && "pl-2 pr-2 pt-2") +
              " flex flex-wrap   duration-200 max-h-40 overflow-y-scroll"
            }
          >
            {selectedData?.map((service: Service, i) => (
              <p
                onClick={() => {
                  setSeelectedData ? setSeelectedData(service) : () => {};
                }}
                key={i}
                className="border flex  bubble  bg-blue-50 font-[600] border-emerald-500 text-emerald-500 p-1.5 rounded-md mr-2 mb-2 text-sm cursor-pointer duration-500"
              >
                {service.name}
                <span ><RemoveIcon width="25px"/></span>

              </p>
            ))}
          </div>
        }

        <input
          id="search-input"
          onFocus={() => setActiveDropDown(true)}
          onChange={(e) => {
            setSearchServiceQuery
              ? setSearchServiceQuery(e.target.value)
              : () => {};
          }}
          className={
            "rounded-md outline-none p-1  relative min-w-32 " + className
          }
          required={!selectedData?.length}
        />
      </div>
      <div
        className={`dropdown left-0 border-white absolute   bg-white rounded-lg shadow-lg duration-200 ${
          activeDropDown
            ? " w-full h-fit overflow-hidden border-b-[0.5rem] border-r-[0.5rem]"
            : "h-0 w-full overflow-hidden"
        }`}
      >
        {!isSearchLoading ? (
          <div className="flex flex-wrap pt-8 px-2 overflow-y-scroll max-h-64   duration-200">
            {data?.map((service: Service, i) => (
              <p
                onClick={() => {
                  setSeelectedData ? setSeelectedData(service) : () => {};
                  setActiveDropDown(false);
                }}
                key={i}
                className={`border-2 p-1.5 rounded-md mr-2 mb-2 text-sm cursor-pointer duration-500 " 
                  ${(selectedData?.find((el)=>el._id===service._id))?" border-emerald-500 text-emerald-500 ":" "}`}
              >
                {service.name}
              </p>
            ))}
          </div>
        ) : (
          <Loading />
        )}

        {isSearchLoading || !!totalDocuments || !pagination || (
          <NoDataAvailable size="150px" />
        )}
        {pagination && (
          <Pagination
            totalDocuments={totalDocuments || 0}
            paging={paging || 0}
            setPaging={(num) => {
              setPagingService ? setPagingService(num) : () => {};
            }}
            currentPage={currentPage || 0}
          />
        )}
      </div>
    </div>
  );
};

const SearchList: React.FC<SearchProps & {selectedDataObj:Service}> = ({
  data,
  className,
  pagination,
  currentPage,
  setSeelectedData,
  selectedDataObj,
  isSearchLoading,
  totalDocuments,
  paging,
  setPagingService,
  setSearchServiceQuery,
}) => {
  const [activeDropDown, setActiveDropDown] = useState(false);


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest("#search-input") &&
        !target.closest(".dropdown") &&
        !target.closest("#pageing")
      ) {
        setActiveDropDown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={"inline-block relative mr-8   " + className}>
      <div className=" border bg-white h-fit rounded-md ">
             <div className={selectedDataObj?.name?"p-1 m-1 border-2 font-[500] bg-blue-50   border-emerald-500 rounded text-emerald-500":""}>
              {selectedDataObj?.name} 
              </div> 

        <input
          id="search-input"
          onFocus={() => setActiveDropDown(true)}
          onChange={(e) => {
            setSearchServiceQuery
              ? setSearchServiceQuery(e.target.value)
              : () => {};
          }}
          className={
            "rounded-md outline-none p-1  relative " + className
          }
          required={!selectedDataObj._id}
        />
      </div>
      <div
        className={`dropdown left-0 border-white absolute z-10  bg-white rounded-lg shadow-lg duration-200 ${
          activeDropDown
            ? " w-full h-fit overflow-hidden border-b-[0.5rem] border-r-[0.5rem]"
            : "h-0 w-full overflow-hidden"
        }`}
      >
        {!isSearchLoading ? (
          <div className="pt-4 px-2   duration-200">
            {data?.map((service: Service, i) => (
              <p
                onClick={() => {
                  setSeelectedData ? setSeelectedData(service) : () => {};
                  setActiveDropDown(false);
                }}
                key={i}
                className={`p-2.5 borde r rounded-md hover:bg-emerald-500 hover:text-white mb-2 text-sm cursor-pointer duration-200
                            ${service._id===selectedDataObj._id?"bg-emerald-500  font-[500]  text-white":""} `}
              >
                {service.name}
              </p>
            ))}
          </div>
        ) : (
          <Loading />
        )}

        {isSearchLoading || !!totalDocuments || !pagination || (
          <NoDataAvailable size="150px" />
        )}
        {pagination && (
          <Pagination
            totalDocuments={totalDocuments || 0}
            paging={paging || 0}
            setPaging={(num) => {
              setPagingService ? setPagingService(num) : () => {};
            }}
            currentPage={currentPage || 0}
          />
        )}
      </div>
    </div>
  );
};

export { Search,SearchList };

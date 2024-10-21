
const baseUrl = import.meta.env.VITE_BASE_URL;

const getHeaders = () => {
  const token = JSON.parse(localStorage.getItem("user-auth") || '{}')?.token;
  return {
    "Content-Type": "application/json",
    "Authorization": token ? `${token}` : '',
  };
};


const getEventData = async (name: string, page: number, limit: number) => {
  const response = await fetch(`${baseUrl}/admin/event/all?name=${name}&page=${page}&limit=${limit}`, {
    method: "GET",
    headers:getHeaders(),
  });
  return response.json();
};

const postEventData = async (data: {}) => {
  const response = await fetch(`${baseUrl}/admin/event/create`, {
    method: "POST",
    headers:getHeaders(),
    body: JSON.stringify(data),
  });
  return response.json();
};

const deleteEventData = async (id: string) => {
  const response = await fetch(`${baseUrl}/admin/event/delete/${id}`, {
    method: "DELETE",
    headers:getHeaders(),
  });
  return response.json();
};

const updateEventData = async (obj:{
  "eventStartTime": string,
   "eventEndTime": string,
   "eventTitle": string,
   "eventDiscription": string,
   "eventStaus": boolean,
   "eventBackgroundColor":string,
   "eventTextColor": string,
   "_id"?:string
   }) => {

  const id = obj._id;
  const response = await fetch(`${baseUrl}/admin/event/update/${id}`, {
    method: "PATCH",
    headers:getHeaders(),
    body: JSON.stringify(obj),
  });
  return response.json();
};


const getActiveEventData = async () => {
  const response = await fetch(`${baseUrl}/client/event/all/active_Event`, {
    method: "GET",
    headers:getHeaders(),
  });
  return response.json();
};

export {getEventData, postEventData, deleteEventData,
        updateEventData,getActiveEventData};

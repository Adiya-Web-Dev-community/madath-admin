import { UserLoginListType } from "../types/page";

const baseUrl = import.meta.env.VITE_BASE_URL;

const getHeaders = () => {
  const token = JSON.parse(localStorage.getItem("user-auth") || '{}')?.token;
  return {
    "Content-Type": "application/json",
    "Authorization": token ? `${token}` : '',
  };
};


const getUserLoginData = async (name: string, page: number, limit: number) => {
  const response = await fetch(`${baseUrl}/user-account/all?name=${name}&page=${page}&limit=${limit}`, {
    method: "GET",
    headers:getHeaders(),
  });
  return response.json();
};

const postUserLoginData = async (data: {}) => {
  const response = await fetch(`${baseUrl}/user-account/create`, {
    method: "POST",
    headers:getHeaders(),
    body: JSON.stringify(data),
  });
  return response.json();
};

const deleteUserLoginData = async (id: string) => {
  const response = await fetch(`${baseUrl}/user-account/delete/${id}`, {
    method: "DELETE",
    headers:getHeaders(),
  });
  return response.json();
};

const updateUserLoginData = async (obj: UserLoginListType) => {
  if (!obj.password?.trim()) {
    obj.password = obj.prevPassword;
  }
  const id = obj._id;
  delete obj.prevPassword;

  const response = await fetch(`${baseUrl}/user-account/update/${id}`, {
    method: "PATCH",
    headers:getHeaders(),
    body: JSON.stringify(obj),
  });
  return response.json();
};

export {getUserLoginData, postUserLoginData, deleteUserLoginData,
        updateUserLoginData};

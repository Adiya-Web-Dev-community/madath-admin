// Global
interface EmailType {
    email: string;
}
interface OtpType{
    otp: string;
}

type EmailOtpType = EmailType & OtpType;

//Admin  Only
interface AdminLoginDataType extends EmailType {
    password: string;
  }
interface AdminPostDataType extends AdminLoginDataType {
    name: string;
    status: boolean;
    role:string
  }

interface AdminLoginUserListType extends AdminPostDataType {
    createdAt: string;
    _id: string;
}
// user Only
interface UserLoginDataType extends EmailType {
    password: string|undefined;
  }
interface UserPostDataType extends UserLoginDataType {
    _id?: string;
    fullName: string;
    status: boolean;
  }

interface UserLoginListType extends UserPostDataType {
    createdAt?: string;
    prevPassword?:string
    _id?: string;
}
// service Category Only 

interface ServiceCategoryNamePost  {
  name: string,
  status:boolean,
  description:string,
  serviceImage:string,
}

interface ServiceCategoryNameList extends ServiceCategoryNamePost{
  createdAt?:string,
  _id?:string
}

//Service Only

interface ServiceNamePost  {
  title: string,
  uniqTitle:string,
  serviceTime:string,
  status:boolean,
  description:string,
  price:number|string,
  isSubService:boolean
  serviceImage:string,
}
interface ServiceNameList extends ServiceNamePost{
  createdAt?:string,
  _id?:string,
  selectedServiceData?:{name:string,_id:string}[], 
  selectedDeleteService?:string[] 
  selectedParentServiceData?:string,
}






export type {EmailType,OtpType,EmailOtpType}
export type {AdminLoginUserListType,AdminPostDataType,AdminLoginDataType}
export type {UserLoginListType,UserPostDataType,UserLoginDataType}
export type {ServiceCategoryNamePost,ServiceCategoryNameList}
export type {ServiceNamePost,ServiceNameList}




import { ServiceNameList, UserPostDataType } from "./page"

interface FormProps {
    paging:number,
    searchQuery:string,
    isEdit:boolean,
    loginUserObj:UserPostDataType
}


interface ServiceFormProps {
    paging:number,
    searchQuery:string,
    isEdit:boolean,
    serviceObj:ServiceNameList,
 }

 interface booking {
    orderDate:Date,
      clientId:{
      email:string,
      fullName:string,      
    },
    orderStatus:string,
    totalItemAmount:number,
    _id:string
  }

type UserFormProps = FormProps

export type {UserFormProps,ServiceFormProps,booking}
'use server'

import { Api } from "@/src/api-conection/fetch";

export const SingInSubmit = async (prevState: any, formData:FormData) => {
  const requestInfo: any= {
    method: 'POST',
    body:{
      email: formData.get('email'),
      password: formData.get('password')
    }
  }

  try{
    const responseApi:any = await Api('/login', requestInfo);
   
    if(responseApi.status == 200){
      return {
        ok: true,
        body: responseApi.body,
        status: responseApi.status
      }
    }
  }catch(err){
    return {
      ok: false,
    }
  }

 
}
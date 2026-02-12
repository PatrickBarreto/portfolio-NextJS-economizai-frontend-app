'use server'

import { Api } from "@/src/api-conection/fetch";

export const SingInSubmit = async (prevState: any, formData:FormData) => {
  const requestInfo: any= {
    method: 'POST',
    body: JSON.stringify({
      email: formData.get('email'),
      password: formData.get('password')
    })
  }
  const responseApi:any = await Api('/login', requestInfo);
  return {
    ok: responseApi.status === 200,
    body: responseApi.body,
    status: responseApi.status
  }
}
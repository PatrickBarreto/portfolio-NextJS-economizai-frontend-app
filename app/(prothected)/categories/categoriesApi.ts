'use server'

import { Api } from "@/src/api-conection/fetch";
import { revalidatePath } from "next/cache";

export const Find = async () => {
  const responseApi:any = await Api('/categories');
  
  return {
    ok: responseApi.status === 200,
    body: responseApi.data,
    status: responseApi.status
  }
}
export const Delete = async (id: number) => {
  const responseApi:any = await Api('/category/'+id, {
    method: 'DELETE'
  });
  revalidatePath('/categories')
  return {
    ok: responseApi.status === 200,
    body: responseApi.data,
    status: responseApi.status
  }
}
export const Update = async (id:number, body:any) => {
  body = JSON.stringify(body)
  const responseApi:any = await Api('/category/'+id, {
    method: 'PUT',
    body: body
  });

  return {
    ok: responseApi.status === 200,
    body: responseApi.data,
    status: responseApi.status
  }
}
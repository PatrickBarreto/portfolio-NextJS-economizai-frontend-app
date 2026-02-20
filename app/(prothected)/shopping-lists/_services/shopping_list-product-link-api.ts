'use server'

import { Api } from "@/src/api-conection/fetch";
import { revalidatePath } from "next/cache";

export const Find = async () => {
  const responseApi:any = await Api('/shopping-list');
  return {
    ok: responseApi.status === 200,
    body: responseApi.data,
    status: responseApi.status
  }
}

export const Detail = async (id:number) => {
  const responseApi:any = await Api('/shopping-list/'+id);
  return {
    ok: responseApi.status === 200,
    body: responseApi.data,
    status: responseApi.status
  }
}
export const Delete = async (id: number) => {
  const responseApi:any = await Api('/shopping-list/'+id, {
    method: 'DELETE'
  });
  revalidatePath('/shopping-lists')
  return {
    ok: responseApi.status === 200,
    body: responseApi.data,
    status: responseApi.status
  }
}

export const Update = async (id:string, body:any) => {
  const responseApi:any = await Api('/shopping-list/'+id, {
    method: 'PUT',
    body: JSON.stringify({
      name: body.name || '',
      type: body.type
    })
  });
  revalidatePath('/shopping-lists')
  return {
    ok: responseApi.status === 200,
    body: responseApi.data,
    status: responseApi.status
  }
}

export const Create = async (shoppingListId:number, body:any) => {
  const responseApi:any = await Api('/shopping-list/'+shoppingListId+'/new-product', {
    method: 'POST',
    body: JSON.stringify(body)
  });
  revalidatePath('/shopping-lists')
  return {
    ok: responseApi.status === 200,
    body: responseApi.data,
    status: responseApi.status
  }
}
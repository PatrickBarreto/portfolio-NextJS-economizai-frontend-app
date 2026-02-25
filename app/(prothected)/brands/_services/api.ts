'use server'

import { Api } from "@/src/api-conection/fetch";
import { revalidatePath } from "next/cache";

export const Find = async () => {
  const responseApi:any = await Api('/brands');
  return {
    ok: responseApi.status === 200,
    body: responseApi.data,
    status: responseApi.status
  }
}

export const Detail = async (id:number) => {
  const responseApi:any = await Api('/brands/'+id);
  return {
    ok: responseApi.status === 200,
    body: responseApi.data,
    status: responseApi.status
  }
}
export const Delete = async (id: number) => {
  const responseApi:any = await Api('/brand/'+id, {
    method: 'DELETE'
  });
  revalidatePath('/brands')
  return {
    ok: responseApi.status === 200,
    body: responseApi.data,
    status: responseApi.status
  }
}

export const Update = async (id:string, body:any) => {
  const categories = JSON.parse(body.categories).map((c:any)=>{
    return c.id
  })
  const responseApi:any = await Api('/brands/'+id, {
    method: 'PUT',
    body: JSON.stringify({
      name: body.name || '',
      type: body.type,
      categories
    })
  });
  revalidatePath('/brands')
  return {
    ok: responseApi.status === 200,
    body: responseApi.data,
    status: responseApi.status
  }
}

export const Create = async (body:any) => {
  const categories = JSON.parse(body.categories).map((c:any)=>{
    return c.id
  })
  const responseApi:any = await Api('/brands/create', {
    method: 'POST',
    body: JSON.stringify({
      name: body.name || '',
      type: body.type,
      categories
    })
  });
  revalidatePath('/brands')
  return {
    ok: responseApi.status === 200,
    body: responseApi.data,
    status: responseApi.status
  }
}
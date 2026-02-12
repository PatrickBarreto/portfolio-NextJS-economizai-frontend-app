'use server'

import { Api } from "@/src/api-conection/fetch";
import { revalidatePath } from "next/cache";

export const findProducts = async () => {
  const responseApi:any = await Api('/products');
  return {
    ok: responseApi.status === 200,
    body: responseApi.data,
    status: responseApi.status
  }
}

export const DetailProduct = async (id:number) => {
  const responseApi:any = await Api('/product/'+id);
  return {
    ok: responseApi.status === 200,
    body: responseApi.data,
    status: responseApi.status
  }
}
export const deleteProduct = async (id: number) => {
  const responseApi:any = await Api('/product/'+id, {
    method: 'DELETE'
  });
  revalidatePath('/products')
  return {
    ok: responseApi.status === 200,
    body: responseApi.data,
    status: responseApi.status
  }
}

export const Update = async (id:string, body:any) => {
  const categories = JSON.parse(body.categories).map((c)=>{
    return c.id
  })
  const responseApi:any = await Api('/product/'+id, {
    method: 'PUT',
    body: JSON.stringify({
      name: body.name || '',
      type: body.type,
      categories
    })
  });
  revalidatePath('/products')
  return {
    ok: responseApi.status === 200,
    body: responseApi.data,
    status: responseApi.status
  }
}

export const Create = async (body:any) => {
  const categories = JSON.parse(body.categories).map((c)=>{
    return c.id
  })
  const responseApi:any = await Api('/product', {
    method: 'POST',
    body: JSON.stringify({
      name: body.name || '',
      type: body.type,
      categories
    })
  });
  revalidatePath('/products')
  return {
    ok: responseApi.status === 200,
    body: responseApi.data,
    status: responseApi.status
  }
}
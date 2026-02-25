'use server'

import { Api } from "@/src/api-conection/fetch";
import { revalidatePath } from "next/cache";

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

export const findAllProducts = async (shoppingListId:number) => {
  const responseApi:any = await Api('/shopping-list/'+shoppingListId+'/products');
  return {
    ok: responseApi.status === 200,
    body: responseApi.data,
    status: responseApi.status
  }
}
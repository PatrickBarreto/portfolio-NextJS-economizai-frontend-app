'use server'

import { Api } from "@/src/api-conection/fetch";

export const singUp = async (body:any) => {
  const resultApi =  await Api('/accounts', {
    method: 'POST',
    body: JSON.stringify({
      name: body.name,
      phone: body.phone,
      email: body.email,
      password: body.password
    })
  })

  return resultApi
}
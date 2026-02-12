'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export const setToken = async (token: string) => {
 const cookiesSetting = await cookies()
  cookiesSetting.set({
    name: 'authorization',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60,
  })

}

export const checkToken = async () => {
  const cookiesSetting = await cookies()
  if(!cookiesSetting.get('authorization')?.value){
    redirect('/sing-in')
  }
}

export async function logout() {
  const cookiesSetting = await cookies()

  cookiesSetting.delete({
    name: 'authorization',
    path: '/',
  })

  redirect('/sing-in')
}
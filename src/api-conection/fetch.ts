import { cookies } from 'next/headers'
import '../../envConfig'

export const prepareQueryStrings = (ontions:{
  [key:string]: string
  }|undefined) => {
    const queryParams = new URLSearchParams(ontions)
    const queryString = queryParams.toString()
    const preparedQueryString = (queryString) ? '?'+queryString : ''
    return preparedQueryString
}

export const Api = async <T = unknown>(path: string, info:RequestInit = {
  method: 'GET',
  cache: 'no-cache'
}): Promise<{
  status:number,
  data: T
}> => {

  const cookieStorage = await cookies()
  const authorization = cookieStorage.get('authorization')

  info.headers = (!info.headers) ? {
    'Content-Type': 'application/json',
    'Access-Token': process.env.API_PUBLIC_KEY!,
    'Authorization': authorization?.value || ''
    } : info.headers
    
  info.body = (info.body) ? JSON.stringify(info.body) : undefined

  try{

    const data:any = await fetch(process.env.API_BASE_URL+path, info)

    if (!data.ok) {
      throw new Error(`HTTP ${data.status}`)
    }

    cookieStorage.set({
      name: 'authorization',
      value: data.headers.authorization,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })
   
    const jsonData = await data.json()

    return {
      status: data.status,
      data: jsonData
    }

  }catch(err){
    if(err instanceof Error) {
      throw new Error(err.message)
    }

    throw new Error('Erro desconhecido')
  }
}
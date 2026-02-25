import { cookies } from 'next/headers'
import '../../envConfig'
import { setToken } from '@/app/(prothected)/_checkToken/checkToken'

export const prepareQueryStrings = (ontions:{
  [key:string]: string
  }|undefined) => {
    const queryParams = new URLSearchParams(ontions)
    const queryString = queryParams.toString()
    const preparedQueryString = (queryString) ? '?'+queryString : ''
    return preparedQueryString
}

export const Api = async <T = any>(path: string, info:RequestInit = {
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
    
  info.body = (info.body) ? info.body : undefined

  try{
    const data:any = await fetch(process.env.API_BASE_URL+path, info)

    const jsonData = await data.json()

    if(data.headers.get('authorization')){
      setToken(data.headers.get('authorization'))
    }

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
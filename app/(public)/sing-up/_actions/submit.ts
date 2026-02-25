'use server'

import {redirect} from "next/navigation"
import { singUp } from "../_services/singUpApi"

export const SingUpSubmit = async (prevState: any, formData:FormData) => {
  const name = formData.get('name')
  const phone = formData.get('phone')
  const email = formData.get('email')
  const password = formData.get('password')

  await singUp({
    name,
    phone,
    email,
    password,
  })

  return redirect('/shopping-lists')
}
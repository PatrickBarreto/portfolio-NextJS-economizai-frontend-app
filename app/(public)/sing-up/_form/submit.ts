'use server'

import { revalidatePath } from "next/cache"

export const SingUpSubmit = async (prevState: any, formData:FormData) => {
  revalidatePath('/sing-up')
}
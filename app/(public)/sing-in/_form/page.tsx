'use client'

import { CustomForm } from "@/components/custom-components/server/form/Form"
import { SingInSubmit } from "./submit";
import CustomInput from "@/components/custom-components/server/form/Input";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";


export const SingInForm = () => {
  const [state, action] = useActionState(SingInSubmit, null)
  const router = useRouter()
  
  useEffect(()=>{
    if(state){
      if(state.ok){
        router.push('/shopping-lists')
      }else{
        alert("<h1> ops</h1>")
      }
    }
  },[state, router])

  return(
    <>
      <CustomForm 
        handleSubmit={action} 
        className="flex 
          flex-col
          divide-y
          divide-gray-200
          gap-5
          rounded-md
          items-center
          w-full
          max-w-100
          bg-white
          py-10
          p-10
          "
        >
        <>
          <CustomInput 
            name="email" 
            inputClassName="w-full h-10 p-3" 
            type="text" 
            placeholder="Your email"
          />
          <CustomInput 
            name="password" 
            inputClassName="w-full h-10 p-3" 
            type="password" 
            placeholder="Your password"
          />
          <CustomInput 
            name="submit" 
            inputClassName="bg-green-900 w-30 h-10 rounded-md text-white" 
            type="submit" value="Login"
          />
        </>
      </CustomForm>
    </>
  )
}
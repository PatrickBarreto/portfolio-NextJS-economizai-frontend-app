'use client'

import { CustomForm } from "@/src/custom-components/server/form/Form"
import { useFormState } from "react-dom";
import { SingInSubmit } from "./submit";
import CustomInput from "@/src/custom-components/server/form/Input";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export const SingInForm = () => {
  const [state, action] = useFormState(SingInSubmit, null)
  const router = useRouter()
  
  useEffect(()=>{
    if(state){
      if(state.ok){
        router.push('/home')
      }else{
        alert("<h1> ops</h1>")
      }
    }
  },[state])

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
          bg-white
          h-fit
          w-100
          p-10"
        >
        <>
          <CustomInput 
            name="email" 
            inputClassName="w-80 h-10 p-3" 
            type="text" 
            placeholder="Your email"
          />
          <CustomInput 
            name="password" 
            inputClassName="w-80 h-10 p-3" 
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
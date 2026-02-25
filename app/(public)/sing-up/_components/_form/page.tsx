'use client'

import { CustomForm } from "@/components/custom-components/server/form/Form"
import { useActionState } from "react";
import { SingUpSubmit } from "../../_actions/submit";
import CustomInput from "@/components/custom-components/server/form/Input";


export const SingUpForm = () => {
  const [, action] = useActionState(SingUpSubmit, null)
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
            name="name" 
            inputClassName="w-80 h-10 p-3" 
            type="text" 
            placeholder="Your name"
          />
          <CustomInput 
            name="email" 
            inputClassName="w-80 h-10 p-3" 
            type="email" 
            placeholder="Your email"
          />
          <CustomInput 
            name="phone" 
            inputClassName="w-80 h-10 p-3" 
            type="text" 
            placeholder="Your phone"
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
            type="submit" value="Create"
          />
        </>
      </CustomForm>
    </>
  )
}
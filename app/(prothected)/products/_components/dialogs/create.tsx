'use client'
import { useEffect, useState, useActionState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Create } from "../../_actions/submit"
import Form from "next/form"

type createProductDialo = {
  content: {
    categories: any[]
  }
  onClose: ()=>void
  onSubmit: ()=>void
}

export function CreateDialog({
  content:{
    categories
  },
  onClose,
  onSubmit,
}:createProductDialo) {

  const [state, action] = useActionState(Create, null)
  const [productCategories, setProductCategories] = useState<any[]>([])
  const [type, setType] = useState<any>('')

  useEffect(()=>{
    if(state){
      onSubmit()
    }
  }, [state])
 
  return (
    <Dialog open={true} onOpenChange={()=>{}}>
        <DialogContent className="md:w-md">
          <Form className="flex flex-col gap-10 p-5" action={action} > 
            <div className="flex flex-col gap-6">
              <DialogHeader>
                <DialogTitle>New Product</DialogTitle>
                <DialogDescription>
                Create a new product
                </DialogDescription>
              </DialogHeader>
            
              <Field>
                <Label>Name</Label>
                <Input 
                  name={'name'} 
                  type={"text"}
                  required={true}
                ></Input>
              </Field>
              <Field>
                <Label>Type</Label>
                <Select name={'type'} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue placeholder={'select a type'}/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={'food'}>
                      Food
                    </SelectItem>
                    <SelectItem value={'medicine'}>
                      Medicine
                    </SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <Label>Product Categories</Label>
                <div className="flex flex-col h-50 overflow-y-scroll gap-2 pl-4">
                    {categories.map((c)=>{
                      return (
                        <div key={c.id} className="flex flex-row gap-3">
                          <Checkbox
                            id={c.id.toString()}
                            onCheckedChange={(value) => {
                              const checked = value === true
                              setProductCategories(prev =>
                              checked
                                ? [...prev, c]
                                : prev.filter(cat => cat.id !== c.id)
                              )
                            }}
                          />
                          <p>{c.name}</p>
                        </div>
                      )
                    })}
                </div>

                <input
                  type="hidden"
                  name="type"
                  value={type}
                />

                <input
                  type="hidden"
                  name="productCategories"
                  value={JSON.stringify(productCategories)}
                />
                
              </Field>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button className={'cursor-pointer'} variant="outline" onClick={onClose} >Cancel</Button>
              </DialogClose>
              <Button className={'cursor-pointer'} type="submit">Save</Button>
            </DialogFooter>
          </Form>
        </DialogContent>
      </Dialog>
  )
}

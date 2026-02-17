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
import { Input } from "@/components/ui/input"
 import { Field } from "@/components/ui/field"
 import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

import { Create } from "../../_actions/submit"
import Form from "next/form"

type createCategorieDialog = {
  content:{
    brands: any[]
    products: any[]  
  }
  onClose: ()=>void
  onSubmit: ()=>void
}

export function CreateDialog({
  content:{
    brands,
    products,
  },
  onClose,
  onSubmit,
}:createCategorieDialog) {

  const [state, action] = useActionState(Create, null)
  const [categoryProducts, setProductCategories] = useState<any[]>([])
  const [categoryBrands, setCategoryBrands] = useState<any[]>([])

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
                <DialogTitle>New Category</DialogTitle>
                <DialogDescription>

                </DialogDescription>
              </DialogHeader>
            
              <Field>
                <Label>Name</Label>
                <Input 
                  name={'name'} 
                  type={"text"}
                  required={true}
                  defaultValue={state?.name}
                ></Input>
              </Field>

              <Field>
                <Label>Products</Label>
                <div className="flex flex-col h-fit max-h-50 overflow-y-scroll gap-2 pl-4">
                    {products.map((c)=>{
                      return (
                        <div key={c.id} className="flex flex-row gap-3">
                          <Checkbox
                            checked={categoryProducts.some((i)=>i === c.id)}
                            id={c.id.toString()}
                            onCheckedChange={(value) => {
                              const checked = value === true
                              setProductCategories(prev =>
                              checked
                                ? [...prev, c.id]
                                : prev.filter(i => i !== c.id)
                              )
                            }}
                          />
                          <p>{c.name}</p>
                        </div>
                      )
                    })}
                </div>
              </Field>

              <Field>
                <Label>Brands</Label>
                <div className="flex flex-col h-fit max-h-50 overflow-y-scroll gap-2 pl-4">
                    {brands.map((c)=>{
                      return (
                        <div key={c.id} className="flex flex-row gap-3">
                          <Checkbox
                            id={c.id.toString()}
                            onCheckedChange={(value) => {
                              const checked = value === true
                              setCategoryBrands(prev =>
                              checked
                                ? [...prev, c.id]
                                : prev.filter(cat => cat.id !== c.id)
                              )
                            }}
                          />
                          <p>{c.name}</p>
                        </div>
                      )
                    })}
                </div>
                
              </Field>
                <input
                  type="hidden"
                  name="categoryProducts"
                  value={JSON.stringify(categoryProducts)}
                />
                <input
                  type="hidden"
                  name="categoryBrands"
                  value={JSON.stringify(categoryBrands)}
                />
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

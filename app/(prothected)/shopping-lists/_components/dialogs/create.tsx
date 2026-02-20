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
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Create } from "../../_actions/submit"
import Form from "next/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Detail } from "@/app/(prothected)/categories/_services/categoriesApi"
import CustomInput from "@/components/custom-components/server/form/Input"

type createProductDialo = {
  content: {
    shoppingLists: any[]
    categories: any[]
    products: any[]
  }
  onClose: ()=>void
  onSubmit: ()=>void
}

export function CreateDialog({
  content:{
    shoppingLists,
    categories,
    products
  },
  onClose,
  onSubmit,
}:createProductDialo) {

  
  const [state, action] = useActionState(Create, null)
  const [type, setType] = useState<any>('')
  const [shoppingListProducts, setShoppingListProducts] = useState<any>([])
  
  useEffect(()=>{
    if(state){
      // shoppingListProducts()
      onSubmit()
    }
  }, [state])
 
  return (
    <Dialog open={true} onOpenChange={()=>{}}>
        <DialogContent className="md:w-md">
          <Form className="flex flex-col gap-10 p-5" action={action} > 
            <div className="flex flex-col gap-6">
              <DialogHeader>
                <DialogTitle>New Brand</DialogTitle>
                <DialogDescription>
                
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

              <Field>
              <Label>Products</Label>
                <div className="flex flex-col max-h-50 h-fit overflow-y-scroll gap-2 pl-4">
                    {products?.map((p)=>{
                      return (
                        <div className="">
                          <div className="flex flex-row content-start justify-between">
                            <div key={p.id} className="flex flex-row gap-4">
                              <Checkbox
                                checked={shoppingListProducts.some((product)=> product == p.id)}
                                id={p.id.toString()}
                                onCheckedChange={(value) => {
                                  const checked = value === true
                                  setShoppingListProducts(prev =>
                                    checked
                                    ? [...prev, p.id]
                                    : prev.filter(item => item !== p.id)
                                  )
                                }}
                              />
                              <p>{p.name}</p>
                            </div>
                            <input name={'products['+p.id+']'} type="number" className={'w-10 border'} onChange={(e)=>{shoppingListProducts({
                              product: p,
                              amount: e.target.value
                            })}}/>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </Field>


                <input
                  type="hidden"
                  name="ID"
                  value={shoppingLists.id}
                />

                <input
                  type="hidden"
                  name="type"
                  value={type}
                />

                <input
                  type="hidden"
                  name="shoppingListProducts"
                  value={shoppingListProducts}
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

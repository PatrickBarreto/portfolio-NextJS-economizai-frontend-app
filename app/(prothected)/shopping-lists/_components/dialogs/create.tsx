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

type createProductDialo = {
  content: {
    categories: {id:number, name:string, products:any[] }[]
    products: {id:number, name:string, categories:any[] }[]
  }
  onClose: ()=>void
  onSubmit: ()=>void
}

export function CreateDialog({
  content:{
    categories,
  },
  onClose,
  onSubmit,
}:createProductDialo) {

  
  const [state, action] = useActionState(Create, null)
  const [type, setType] = useState<any>('')
  const [wasCheckedInput, setWasCheckedInput] = useState<boolean>(false)
  const [shoppingListcategories, setShoppingListcategories] = useState<any>([])
  const [shoppingListCategoryProducts, setShoppingListCategoryProducts] = useState<any>([])
  
  useEffect(()=>{
    if(state){
      onSubmit()
    }
  }, [state, onSubmit])

  return (
    <Dialog open={true} onOpenChange={()=>{}}>
        <DialogContent className="md: max-h-full">
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
                <Label>Categories and Products</Label>
                <div className="flex flex-col max-h-100 overflow-y-scroll gap-2 pl-4">
                    {categories?.map((c)=>{
                      return (
                        <div key={c.id} className="">
                          <div className="flex flex-col content-start justify-between">
                            <div className="flex flex-row content-start justify-between">
                              <b>{c.name}</b>
                              <b>Qtd</b>
                            </div>
                            <div>
                              { (!c.products || c.products[0] == null )&& <small>Not found</small> }
                              
                              { c.products?.map(p => {
                                if(p === null) return 

                                const listProducts = state?.products ? state.products : shoppingListCategoryProducts
                                return <div key={c.id+p.id} className="flex flex-row content-start justify-between p-0.5">
                                  <div key={p.id} className="flex flex-row gap-4">
                                    <Checkbox
                                      checked={listProducts.some(
                                          (item:any)=> item.uniqueId == c.id+'-'+p.id,
                                      )}
                                      id={p.id.toString()}
                                      onCheckedChange={(value) => {
                                        const checked = value === true
                                        setWasCheckedInput(checked)
                                        setShoppingListCategoryProducts((prev:any) =>
                                          checked
                                          ? [...prev, { 
                                              uniqueId: c.id+'-'+p.id,
                                              ...p
                                            }]
                                          : prev.filter((pr:any) => pr.uniqueId != c.id+'-'+p.id)
                                        )
                                        setWasCheckedInput(false)
                                      }}
                                    />
                                  {p?.name}
                                    </div>
                                    <input 
                                      type="number" 
                                      className={'w-10 border'} 
                                      required={wasCheckedInput}
                                      onChange={(e)=>{setShoppingListcategories([...shoppingListcategories, {
                                        ...p,
                                        categories_id: c.id,
                                        amount: e.target.value
                                      }])}}
                                    />
                                  </div>
                              })}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </Field>

                <input
                  type="hidden"
                  name="type"
                  value={type}
                />

                <input
                  type="hidden"
                  name="shoppingListCategories"
                  value={JSON.stringify(shoppingListcategories)}
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

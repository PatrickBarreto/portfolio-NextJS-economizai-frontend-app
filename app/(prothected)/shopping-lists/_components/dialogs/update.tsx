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
import { Update } from "../../_actions/submit"
import Form from "next/form"
import { Checkbox } from "@/components/ui/checkbox"
import { findAllProducts } from "../../_services/shopping_list-product-link-api"

type updateProductDialo = {
  content: {
    shoppingLists: any
    categories: {id:number, products:any[]}[]
    products: any[]
  }
  onClose: ()=>void
  onSubmit: ()=>void
}

export function UpdateDialog({
  content:{
    shoppingLists,
    categories,
  },
  onClose,
  onSubmit,
}:updateProductDialo) {

  
  const [state, action] = useActionState(Update, null)
  const [type, setType] = useState<any>('')
  const [wasCheckedInput, setWasCheckedInput] = useState<boolean>(false)
  const [shoppingListcategories, setShoppingListcategories] = useState<any>([])
  const [shoppingListCategoryProducts, setShoppingListCategoryProducts] = useState<any>([])
  
  useEffect(()=>{
    const findListProducts = async () => {
      const products = (await findAllProducts(shoppingLists.id)).body
      setShoppingListCategoryProducts(products)
    }

    if(shoppingLists.id){
      findListProducts()
    }

    if(state){
      onSubmit()
    }
  }, [state, shoppingLists, onSubmit])
 
  return (
    <Dialog open={true} onOpenChange={()=>{}}>
        <DialogContent className="md: max-h-full">
          <Form className="flex flex-col gap-10 p-5" action={action} > 
            <div className="flex flex-col gap-6">
              <DialogHeader>
                <DialogTitle>New List</DialogTitle>
                <DialogDescription>
                
                </DialogDescription>
              </DialogHeader>
            
              <Field>
                <Label>Name</Label>
                <Input 
                  name={'name'} 
                  type={"text"}
                  required={true}
                  defaultValue={shoppingLists.name}
                ></Input>
              </Field>
             
              <Field>
                <Label>Type</Label>
                <Select name={'type'} defaultValue={shoppingLists.type} onValueChange={setType}>
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
                    {categories?.map((c:any)=>{
                      return (
                        <div key={c.id} className="">
                          <div className="flex flex-col content-start justify-between">
                            <div className="flex flex-row content-start justify-between">
                              <b>{c.name}</b>
                              <b>Qtd</b>
                            </div>
                            <div>
                              {
                                !c.products && <small>Not found</small>
                              }
                              
                              {c.products?.map((p:any) => {
                                if(!p) return

                                let checked = false
                                let amount = undefined
                                
                                const listProducts:any[] = state?.products ? state.products : shoppingListCategoryProducts
                                return <div className="flex flex-row content-start justify-between p-0.5">
                                  <div key={p.id} className="flex flex-row gap-4">
                                    <Checkbox
                                      checked={listProducts.some(
                                          (item)=> {
                                            if(item.categories_id.toString()+item.products_id == c.id+p.id){
                                              checked = true
                                              amount = item.amount
                                              return true
                                            }
                                          }
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
                                    defaultValue={checked ? amount : undefined}
                                    onChange={(e)=>{
                                      const currentItems = shoppingListcategories[0] != null ? shoppingListcategories : undefined
                                      const newItem = {
                                        ...p,
                                        categories_id: c.id,
                                        amount: e.target.value
                                      }
                                      const toIncrement = currentItems ? [...currentItems, newItem] : [newItem]
                                      setShoppingListcategories(toIncrement)}}
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
'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
 import { Field, FieldGroup } from "@/components/ui/field"
 import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useEffect, useState } from "react"
import { CreateProduct } from "./submit"
import Form from "next/form"
import { useActionState } from "react"

export function CreateDialog({
  brands,
  products,
  onClose,
  onSubmit,
  open
}:{
  brands: any[]
  products: any[]
  onClose: ()=>void
  onSubmit: ()=>void
  open: boolean
}) {

  const [state, action] = useActionState(CreateProduct, null)
  const [categoryProducts, setProductCategories] = useState<any[]>([])
  const [categoryBrands, setCategoryBrands] = useState<any[]>([])

  useEffect(()=>{
    if(state){
      onSubmit()
      setProductCategories(state?.products || [])
      setCategoryBrands(state?.brands || [])
    }
  }, [state])

  return (
    <Dialog open={open} onOpenChange={()=>{
       if (open) {
        onClose()
      }}}>
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

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useEffect, useState } from "react"
import { Detail } from "../../categoriesApi"
import { CustomForm } from "@/src/custom-components/server/form/Form"
import { Update } from "./submit"
import Form from "next/form"
import { useActionState } from "react"


export function UpdateDialog({
  category,
  products,
  brands,
  onClose,
  onSubmit,
  open
}:{
  category: any
  products: any[]
  brands: any[]
  onClose: ()=>void
  onSubmit: ()=>void
  open: boolean
}) {

  const [state, action] = useActionState(Update, null)
  const [name, setName] = useState<any>('')
  const [categoryProducts, setCategoryProducts] = useState<any[]>([])
  const [categoryBrands, setCategoryBrands] = useState<any[]>([])

  useEffect(()=>{
    const reload = async () => {
      if (!category.id) return
      
      const categoryDetail = (await Detail(category.id)).body
    
      if(state){
        setName(state?.name ? state.name : category.name)
        setCategoryProducts(state?.products || categoryDetail.products.map(i=>i.products_id))
        setCategoryBrands(state?.brands || categoryDetail.brands.map(i=>i.brands_id))
      }else{
        setName(category.name)
        setCategoryProducts(categoryDetail.products.map(i=>i.products_id))
        setCategoryBrands(categoryDetail.brands.map(i=>i.brands_id))
      }
  

    if(state){
      onSubmit()
    }

    }
    
    reload()
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
                <DialogTitle>Update Category</DialogTitle>
                <DialogDescription>
                </DialogDescription>
              </DialogHeader>
            
              <Field>
                <Label>Name</Label>
                <Input
                  name={'name'} 
                  type={"text"}
                  disabled={category.accounts_id === 0}
                  placeholder={name} 
                  defaultValue={name} 
                  required={true}
                ></Input>
              </Field>

              <Field>
                <Label>Products</Label>
                <div className="flex flex-col max-h-50 h-fit overflow-y-scroll gap-2 pl-4">
                    {products.map((p)=>{
                      return (
                        <div key={p.id} className="flex flex-row gap-3">
                          <Checkbox
                            checked={categoryProducts.some((product)=> product == p.id)}
                            id={p.id.toString()}
                            onCheckedChange={(value) => {
                              const checked = value === true
                              setCategoryProducts(prev =>
                                checked
                                ? [...prev, p.id]
                                : prev.filter(item => item !== p.id)
                              )
                            }}
                          />
                          <p>{p.name}</p>
                        </div>
                      )
                    })}
                </div>
              </Field>

              <Field>
                <Label>Brands</Label>
                <div className="flex flex-col max-h-50 h-fit overflow-y-scroll gap-2 pl-4">
                    {brands.map((b)=>{
                      return (
                        <div key={b.id} className="flex flex-row gap-3">
                          <Checkbox
                            checked={categoryBrands.some((brand)=> brand == b.id)}
                            id={b.id.toString()}
                            onCheckedChange={(value) => {
                              const checked = value === true
                              setCategoryBrands(prev =>
                              checked
                                ? [...prev, b.id]
                                : prev.filter(item => item !== b.id)
                              )
                            }}
                          />
                          <p>{b.name}</p>
                        </div>
                      )
                    })}
                </div>

                <input
                  type="hidden"
                  name="categoryId"
                  value={String(category.id)}
                />
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
                
              </Field>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button className={'cursor-pointer'} variant="outline" onClick={()=>onClose} >Cancel</Button>
              </DialogClose>
              <Button className={'cursor-pointer'} type="submit">Save changes</Button>
            </DialogFooter>
          </Form>
        </DialogContent>
      </Dialog>
  )
}

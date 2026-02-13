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
import { CreateProduct } from "./submit"
import Form from "next/form"
import { useActionState } from "react"

export function CreateProductDialog({
  categories,
  onClose,
  onSubmit,
  open
}:{
  categories: any[]
  onClose: ()=>void
  onSubmit: ()=>void
  open: boolean
}) {

  const [state, action] = useActionState(CreateProduct, null)
  const [productCategories, setProductCategories] = useState<any[]>([])
  const [type, setType] = useState<any>('')

  useEffect(()=>{
    state
    onSubmit()
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

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
import { Detail } from "../../_services/api"
import { Update } from "../../_actions/submit"
import Form from "next/form"
import { useActionState } from "react"




export function UpdateDialog({
  content:{
    brands,
    categories
  },
  onClose,
  onSubmit,
}:{
  content:{brands:any, categories:any[]}
  onClose: ()=>void
  onSubmit: ()=>void
}) {
  
  const [state, action] = useActionState(Update, null)
  const [brandCategories, setBrandCategories] = useState<any[]>([])
  const [type, setType] = useState<any>('')
  const [name, setName] = useState<any>('')
  
  useEffect(()=>{
    const reload = async () => {
      if (!brands.id) return

      if(state){
        setName(state.name ? String(state.name) : brands.name)
        setType(state.type ? String(state.type) : brands.type)
        setBrandCategories(JSON.parse(state.categories ? state.categories : brands.categories))
        onSubmit()
      }else{
        setName( brands.name)
        setType( brands.type )
        const {categories} = (await Detail(brands.id)).body
        setBrandCategories(categories)
      }
    } 
    reload()

  }, [state])

  return (
    <Dialog open={true} onOpenChange={()=>{}}>
        <DialogContent className="md:w-md">
          <Form className="flex flex-col gap-10 p-5" action={action} > 
            <div className="flex flex-col gap-6">
              <DialogHeader>
                <DialogTitle>Update Brand</DialogTitle>
                <DialogDescription>
                Identifier: {brands?.id}
                </DialogDescription>
              </DialogHeader>
            
              <Field>
                <Label>Name</Label>
                <Input 
                  name={'name'} 
                  type={"text"}
                  placeholder={name} 
                  defaultValue={name} 
                  required={true}
                ></Input>
              </Field>
              
              <Field>
                <Label>Type</Label>
                <Select name={'type'} defaultValue={type}  onValueChange={setType}>
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
                <Label>Categories</Label>
                <div className="flex flex-col h-50 overflow-y-scroll gap-2 pl-4">
                    {categories.map((c)=>{
                      return (
                        <div key={c.id} className="flex flex-row gap-3">
                          <Checkbox
                            checked={brandCategories.some((category)=> category.id == c.id)}
                            id={c.id.toString()}
                            onCheckedChange={(value) => {
                              const checked = value === true
                              setBrandCategories(prev =>
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
                  name="ID"
                  value={String(brands.id)}
                />
                <input
                  type="hidden"
                  name="type"
                  value={type}
                />
                <input
                  type="hidden"
                  name="brandsCategories"
                  value={JSON.stringify(brandCategories)}
                />
                
              </Field>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button className={'cursor-pointer'} variant="outline" onClick={onClose} >Cancel</Button>
              </DialogClose>
              <Button className={'cursor-pointer'} type="submit">Save changes</Button>
            </DialogFooter>
          </Form>
        </DialogContent>
      </Dialog>
  )
}

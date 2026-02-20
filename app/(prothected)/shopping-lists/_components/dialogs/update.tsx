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
 import { Field } from "@/components/ui/field"
 import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { Detail } from "../../_services/api"
import { Update } from "../../_actions/submit"
import Form from "next/form"
import { useActionState } from "react"
import { CustomItem } from "@/components/custom-components/item/item"


export function UpdateDialog({
  content:{
    shoppingLists,
  },
  onClose,
  onSubmit,
}:{
  content:{shoppingLists:any}
  onClose: ()=>void
  onSubmit: ()=>void
}) {
  
  const [state, action] = useActionState(Update, null)
  const [type, setType] = useState<any>('')
  const [name, setName] = useState<any>('')
  const [shopppingListExecutions, setShopppingListExecutions] = useState<any>([])
  
  useEffect(()=>{
    const reload = async () => {
      if (!shoppingLists.id) return

      const shoppingList = (await Detail(shoppingLists.id)).body
      //Pegar os produtos da lista

      if(state){
        setName(state.name ? String(state.name) : shoppingList.name)
        setType(state.type ? String(state.type) : shoppingList.type)
        setShopppingListExecutions(state.executions ? String(state.executions) : shoppingList.executions)
        onSubmit()
      }else{
        setName( shoppingList.name)
        setType( shoppingList.type )
        setShopppingListExecutions( shoppingList.executions )
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
                <DialogTitle>Update Shopping List</DialogTitle>
                <DialogDescription>
                Identifier: {shoppingLists?.id}
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

              {
                //Adicionar o campo. de produtos da lista, listando todos os produtos para poder refazer a vinculação.
              }
              
              <Field>
                <Label>Executions</Label>
                <div className="flex flex-col max-h-50 h-fit overflow-y-scroll gap-2 pl-4">
                    {shopppingListExecutions.map((i)=>{
                      return (
                        <div key={i.id} className="flex flex-row gap-3">
                          <CustomItem 
                            id={i.id}
                            itemTitle={i.created}
                            >
                              <Button>

                              </Button>
                            </CustomItem>
                          <p>{i.name}</p>
                        </div>
                      )
                    })}
                </div>
              </Field>

              
              <Field>
                <input
                  type="hidden"
                  name="ID"
                  value={String(shoppingLists.id)}
                />
                <input
                  type="hidden"
                  name="type"
                  value={type}
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

'use client'
import { CustomItem } from "@/src/custom-components/item/item"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Delete, Find, Detail } from "../../categoriesApi"
import { UpdateDialog } from "../dialogs/update"
import { Input } from "@/components/ui/input"
import { CreateDialog } from "../dialogs/create"

export const List = ({categories, products, brands}:{
  categories:any[]
  products:any[]
  brands:any[]
}) => {

  const [itemListToUpdate, setItemListToUpdate] = useState(null)
  const [open, setOpen] = useState(false)
  const [itemList, setItemList] = useState(categories)
  const [caegoriesState, setCaegoriesState] = useState(categories)
  const [newItem, setNewItem] = useState(false)
  const [reload, setReload] = useState(false)

  const filter = (list:any[], toFind:string) => {
    return list.filter(product => 
      product.name.toLowerCase().includes(toFind.toLowerCase())
    )
  }

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value){
      setItemList(filter(caegoriesState, e.target.value))
    }else{
      setItemList(caegoriesState)
    }
  }

  useEffect(()=>{
    const reloading = async () => {
      const itemList = await (await Find()).body
      setCaegoriesState(itemList)
      setItemList(itemList)
      setReload(false)
      return
    }

    if(reload){
      reloading()
    }
    
  },[reload])

  return (
    <>
      <div className="flex gap-15 ">
         <div className="flex flex-row w-full md:w-1/2">
            <Input className="" onChange={searchHandler} id="input-button-group" placeholder="Type to search..." />
        </div>
        <Button variant={'default'} onClick={()=>{
          setOpen(true)
          setNewItem(true)
          }}> New </Button>
      </div>

      <ul className="flex flex-col gap-5 w-full">
          {  
            itemList.map(i => {
              return (
                <li key={i.id}>
                  <CustomItem
                    id={i.id}
                    itemTitle={i.name}
                    className={'bg-white shadow-md md:w-1/2'}
                  >
                    <>
                      <Button
                        className={'cursor-pointer'}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setOpen(true)
                          setItemListToUpdate(i)
                          }
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        className={'cursor-pointer'}
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          Delete(i.id)
                          setReload(true)
                          }
                        }
                      >
                        Delete
                      </Button>
                    </>
                  </CustomItem>
                </li>
              )
            })
          }
      </ul>

      {itemListToUpdate && (
        <UpdateDialog
          category={itemListToUpdate}
          products={products}
          brands={brands}
          onClose={() => {
            setItemListToUpdate(null)
          }}
          onSubmit={() => {
            setReload(true)
          }}
          open={open}
        />
      )}

      {newItem && (
        <CreateDialog
          products={products}
          brands={brands}
          onClose={() => {
            setNewItem(false)
          }}
          onSubmit={async () => {
            setReload(true)
            setNewItem(false)
          }}
          open={open}
        />
      )}
    </>
  )
}
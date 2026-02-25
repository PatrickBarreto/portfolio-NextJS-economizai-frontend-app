'use client'
import { CustomItem } from "@/components/custom-components/item/item"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { UpdateDialog } from "../dialogs/update"
import { CreateDialog } from "../dialogs/create"
import { searchHandler } from "@/src/search/search"
import { useCategories } from "../../_hooks/use-categories"
import { Search } from "@/components/custom-components/search/search"
import { useToggles } from "@/hooks/useToggles"
import { UpdateDeleteButton } from "@/components/custom-components/button/update-delete"

export const List = ({categories, products, brands}:{
  categories:any[]
  products:any[]
  brands:any[]
}) => {

  const [selected, setSelected] = useState(false)
  const [newItem, setNewItem] = useState(false)

  const { items, setItems, remove } = useCategories(categories)
  
  const {ToggleCreate, ToggleUpdate} = useToggles({
    defaultList: categories,
    newItem,
    setItems,
    setSelected, 
    setNewItem,
  })

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItems(searchHandler(categories, e.target.value))
  }

  return (
    <>
      <div className="flex gap-15 ">
        <Search onSearch={onSearch} />
        <Button variant={'default'} onClick={()=>{ToggleCreate()}}> New </Button>
      </div>

      <ul className="flex flex-col gap-5 w-full">
          {  
            items.map(i => {
              return (
                <li key={i.id}>
                  <CustomItem
                    id={i.id}
                    itemTitle={i.name}
                    className={'bg-white shadow-md md:w-1/2'}
                  >
                    <UpdateDeleteButton
                      ToggleRemove={() => remove(i.id)}
                      ToggleUpdate={() => ToggleUpdate(i)}
                    />
                  </CustomItem>
                </li>
              )
            })
          }
      </ul>

      {selected && (
        <UpdateDialog
          content={{
            category: selected,
            products: products,
            brands: brands
          }}
          onClose={() => ToggleUpdate()}
          onSubmit={() => ToggleUpdate(selected)}
        />
      )}

      {newItem && (
        <CreateDialog
          content={{
            products: products,
            brands: brands
          }}
          onClose={() => ToggleCreate()}
          onSubmit={() => ToggleCreate()}
        />
      )}
    </>
  )
}
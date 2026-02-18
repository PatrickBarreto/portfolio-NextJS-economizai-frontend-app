'use client'
import { CustomItem } from "@/components/custom-components/item/item"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Delete as deleteBrands, Find as findBrands } from "../../_services/api"
import { UpdateDialog } from "../dialogs/update"
import { CreateDialog } from "../dialogs/create"
import { searchHandler } from "@/src/search/search"
import { useBrands } from "../../_hooks/useBrands"
import { Search } from "@/components/custom-components/search/search"
import { UpdateDeleteButton } from "@/components/custom-components/button/update-delete"
import { useToggles } from "@/hooks/useToggles"


type ProductList = {
  brands:any[]
  categories:any[]
}


export const List = ({brands, categories}:ProductList) => {
  
  const [selected, setSelected] = useState(null)
  const [newItem, setNewItem] = useState(false)

  const { items, setItems, remove } = useBrands(brands)
  
  const {ToggleCreate, ToggleUpdate} = useToggles({
    defaultList: brands,
    newItem,
    setItems, 
    setSelected,
    setNewItem
  })

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItems(searchHandler(brands, e.target.value))
  }

  return (
    <>
      <div className="flex gap-15 ">
        <Search onSearch={onSearch} />
        <Button variant={'default'} onClick={()=>ToggleCreate()}> New </Button>
      </div>

      <ul className="flex flex-col gap-5 w-full">
        {  
          items.map(p => {
            return (
              <li key={p.id}>
                <CustomItem
                  id={p.id}
                  itemTitle={p.name}
                  itemDescription={p.type}
                  className={'bg-white shadow-md md:w-1/2'}
                >

                  <UpdateDeleteButton
                    ToggleRemove={() => remove(p.id)}
                    ToggleUpdate={() => ToggleUpdate(p)}
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
            brands: selected,
            categories: categories
          }}
          onClose={() => ToggleUpdate()}
          onSubmit={() => ToggleUpdate(selected)}
        />
      )}

      {newItem && (
        <CreateDialog
          content={{
            categories
          }}
          onClose={() => ToggleCreate()}
          onSubmit={() => ToggleCreate()}
        />
      )}
    </>
  )
}
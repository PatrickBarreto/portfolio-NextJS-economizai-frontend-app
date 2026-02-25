'use client'
import { CustomItem } from "@/components/custom-components/item/item"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { UpdateDialog } from "../dialogs/update"
import { CreateDialog } from "../dialogs/create"
import { searchHandler } from "@/src/search/search"
import { useBrands } from "../../_hooks/useShoppingList"
import { Search } from "@/components/custom-components/search/search"
import { UpdateDeleteButton } from "@/components/custom-components/button/update-delete"
import { useToggles } from "@/hooks/useToggles"


type ShoppingListsList = {
  shoppingLists:any[]
  categories:any, 
  products: any
}


export const List = ({shoppingLists, categories, products}:ShoppingListsList) => {
  
  const [selected, setSelected] = useState(null)
  const [newItem, setNewItem] = useState(false)

  const { items, setItems, remove } = useBrands(shoppingLists)
  
  const {ToggleCreate, ToggleUpdate} = useToggles({
    defaultList: shoppingLists,
    newItem,
    setItems, 
    setSelected,
    setNewItem
  })

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItems(searchHandler(shoppingLists, e.target.value))
  }

  return (
    <>
      <div className="flex gap-15 ">
        <Search onSearch={onSearch} />
        <Button variant={'default'} onClick={()=>ToggleCreate()}> New </Button>
      </div>

      <ul className="flex flex-col gap-5 w-full">
        {  
          items.map(i => {
            return (
              <li key={i.id}>
                <CustomItem
                  id={i.id}
                  itemTitle={i.name}
                  itemDescription={i.type}
                  className={'bg-white shadow-md md:w-1/2'}
                >
                  <>
                    <Button onClick={()=>console.log(i.id)}>Execute</Button>
                    <UpdateDeleteButton
                      ToggleRemove={() => remove(i.id)}
                      ToggleUpdate={() => ToggleUpdate(i)}
                    />
                  </>
                </CustomItem>
              </li>
            )
          })
        }
      </ul>

      {selected && (
        <UpdateDialog
          content={{
            shoppingLists: selected,
            categories,
            products
          }}
          onClose={() => ToggleUpdate()}
          onSubmit={() => ToggleUpdate(selected)}
        />
      )}

      {newItem && (
        <CreateDialog
          content={{
            categories,
            products
          }}
          onClose={() => ToggleCreate()}
          onSubmit={() => ToggleCreate()}
        />
      )}
    </>
  )
}
'use client'
import { CustomItem } from "@/components/custom-components/item/item"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { deleteProduct, findProducts } from "../../_services/productsApi"
import { UpdateProductDialog } from "../dialogs/update"
import { CreateDialog } from "../dialogs/create"
import { searchHandler } from "@/src/search/search"
import { useProducts } from "../../_hooks/useProducts"
import { Search } from "@/components/custom-components/search/search"
import { UpdateDeleteButton } from "@/components/custom-components/button/update-delete"


type ProductList = {
  products:any[]
  categories:any[]
}


export const List = ({products, categories}:ProductList) => {
  
  const [selected, setSelected] = useState(null)
  const [newItem, setNewItem] = useState(false)

  const { items, setItems, remove } = useProducts(products)

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItems(searchHandler(products, e.target.value))
  }

  const ToggleCreate = (product?:any) => {
    if(product){
      setItems(product)
    }
    setNewItem(!newItem)
  }
  const ToggleUpdate = (product?:any) => {
    if(product){
      setItems(products)
    }
    setSelected(product || null)
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
        <UpdateProductDialog
          content={{
            product: selected,
            categories: categories
          }}
          onClose={() => ToggleUpdate()}
          onSubmit={() => ToggleUpdate(products)}
        />
      )}

      {newItem && (
        <CreateDialog
          content={{
            categories
          }}
          onClose={() => ToggleCreate()}
          onSubmit={() => ToggleCreate(products)}
        />
      )}
    </>
  )
}
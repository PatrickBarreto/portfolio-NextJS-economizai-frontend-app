'use client'
import { CustomItem } from "@/src/custom-components/item/item"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { deleteProduct } from "../../productsApi"
import { UpdateProductDialog } from "../dialogs/update"
import { Input } from "@/components/ui/input"

export const ProductList = ({products, categories}:{
  products:any[]
  categories:any[]
}) => {

  const [editingProduct, setEditingProduct] = useState(null)
  const [open, setOpen] = useState(false)
  const [productsList, setProducts] = useState(products)

  const filter = (list:any[], toFind:string) => {
    return list.filter(product => 
      product.name.toLowerCase().includes(toFind.toLowerCase())
    )
  }

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value){
      setProducts(filter(productsList, e.target.value))
    }else{
      setProducts(products)
    }
  }

  useEffect(()=>{
    setProducts(productsList)
  },[productsList])

  return (
    <>
      <div className="flex gap-15 ">
         <div className="flex flex-row w-full md:w-1/2">
            <Input className="" onChange={searchHandler} id="input-button-group" placeholder="Type to search..." />
        </div>
        <Button variant={'default'}> New </Button>
      </div>

      <ul className="flex flex-col gap-5 w-full">
          {  
            productsList.map(p => {
              return (
                <li key={p.id}>
                  <CustomItem
                    id={p.id}
                    itemTitle={p.name}
                    itemDescription={p.type}
                    className={'bg-white shadow-md md:w-1/2'}
                  >
                    <>
                      <Button
                        className={'cursor-pointer'}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setOpen(true)
                          setEditingProduct(p)
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
                          deleteProduct(p.id)
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
      {editingProduct && (
        <UpdateProductDialog
          product={editingProduct}
          categories={categories}
          onClose={() => {
            setEditingProduct(null)
            setProducts(products)
          }}
          onSubmit={() => {
          }}
          open={open}
        />
      )}
    </>
  )
}
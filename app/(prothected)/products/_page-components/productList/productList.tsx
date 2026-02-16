'use client'
import { CustomItem } from "@/src/custom-components/item/item"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { deleteProduct, findProducts } from "../../productsApi"
import { UpdateProductDialog } from "../dialogs/update"
import { Input } from "@/components/ui/input"
import { CreateProductDialog } from "../dialogs/create"

export const ProductList = ({products, categories}:{
  products:any[]
  categories:any[]
}) => {

  const [editingProduct, setEditingProduct] = useState(null)
  const [open, setOpen] = useState(false)
  const [productsList, setProducts] = useState(products)
  const [reload, setReload] = useState(false)
  const [newProduct, setNewProduct] = useState(false)

  const filter = (list:any[], toFind:string) => {
    return list.filter(product => 
      product.name.toLowerCase().includes(toFind.toLowerCase())
    )
  }

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value){
      setProducts(filter(products, e.target.value))
    }else{
      setProducts(products)
    }
  }
  // O problema é que o reload está sendo feito antes do submit do update, ou seja, não pega o produto que foi atualizado no backend. 

  useEffect(()=>{
    const findProductsList = async () => {
      if(reload){
        const product = await (await findProducts()).body
        setProducts(product)
        setReload(false)
        return
      }
    }

    findProductsList()
    
  },[reload])

  return (
    <>
      <div className="flex gap-15 ">
         <div className="flex flex-row w-full md:w-1/2">
            <Input className="" onChange={searchHandler} id="input-button-group" placeholder="Type to search..." />
        </div>
        <Button variant={'default'} onClick={()=>{
          setOpen(true)
          setNewProduct(true)
          }}> New </Button>
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

      {editingProduct && (
        <UpdateProductDialog
          product={editingProduct}
          categories={categories}
          onClose={() => {
            setEditingProduct(null)
          }}
          onSubmit={() => {
            setReload(true)
          }}
          open={open}
        />
      )}

      {newProduct && (
        <CreateProductDialog
          categories={categories}
          onClose={() => {
            setNewProduct(false)
          }}
          onSubmit={() => {
            setReload(true)
          }}
          open={open}
        />
      )}
    </>
  )
}
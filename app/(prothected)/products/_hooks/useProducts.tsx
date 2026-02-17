'use client'
import { useState } from "react"
import { deleteProduct, findProducts } from "../_services/productsApi"


export const useProducts = (initialItems: any[]) => {
  const [items, setItems] = useState(initialItems)

  const remove = async (id:number) => {
    await deleteProduct(id)
    setItems(prev => prev.filter(p => p.id !== id))
  }

  const refresh = async () => {
    setItems((await findProducts()).body)
  }


  return {
    items, 
    refresh,
    setItems,
    remove
  }
}
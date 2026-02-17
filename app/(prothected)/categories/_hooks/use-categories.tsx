'use client'
import { useState } from "react"
import { Delete, Find } from "../_services/categoriesApi"


export const useCategories = (initialItems: any[]) => {
  const [items, setItems] = useState(initialItems)

  const remove = async (id:number) => {
    await Delete(id)
    setItems(prev => prev.filter(p => p.id !== id))
  }

  const refresh = async () => {
    setItems((await Find()).body)
  }


  return {
    items, 
    refresh,
    setItems,
    remove
  }
}
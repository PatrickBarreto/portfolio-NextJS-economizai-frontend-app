'use client'
import { useState } from "react"
import { Delete as deleteBrands, Find as findBrands } from "../_services/api"


export const useBrands = (initialItems: any[]) => {
  const [items, setItems] = useState(initialItems)

  const remove = async (id:number) => {
    await deleteBrands(id)
    setItems(prev => prev.filter(p => p.id !== id))
  }

  const refresh = async () => {
    setItems((await findBrands()).body)
  }


  return {
    items, 
    refresh,
    setItems,
    remove
  }
}
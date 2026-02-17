'use client'

import { useState } from "react"
type TogglesType = {
    defaultList:any[]
    newItem:any
    setItems:Function
    setNewItem:Function
    setSelected:Function
}
export const useToggles = ({
  defaultList,
  newItem,
  setItems, 
  setNewItem, 
  setSelected
}:TogglesType) => {

  const ToggleCreate = (item?:any) => {
    const items = item ? item : defaultList
    setItems(items)
    setNewItem(!newItem)
  }
  
  const ToggleUpdate = (item?:any) => {
    setSelected(item || null)
    setItems(defaultList)
  }
  
  return {ToggleCreate, ToggleUpdate}

}
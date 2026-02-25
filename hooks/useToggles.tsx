'use client'

type TogglesType = {
    defaultList:unknown[]
    newItem:unknown
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

  const ToggleCreate = (item?:unknown) => {
    const items = item ? item : defaultList
    setItems(items)
    setNewItem(!newItem)
  }
  
  const ToggleUpdate = (item?:unknown) => {
    setSelected(item || null)
    setItems(defaultList)
  }
  
  return {ToggleCreate, ToggleUpdate}

}
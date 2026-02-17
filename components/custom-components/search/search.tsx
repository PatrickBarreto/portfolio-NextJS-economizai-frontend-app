'ese client'

import { Input } from "@/components/ui/input"
import { ChangeEventHandler } from "react"

export const Search = ({onSearch}:{
  onSearch: ChangeEventHandler<HTMLInputElement, HTMLInputElement>
}):React.ReactElement => {
  return(
    <>
     <div className="flex flex-row w-full md:w-1/2">
        <Input className="" onChange={onSearch} id="input-button-group" placeholder="Type to search..." />
      </div>
    </>
  )
}
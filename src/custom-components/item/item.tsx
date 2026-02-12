'use client'
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"

export function CustomItem({
  id,
  itemTitle,
  itemDescription,
  className,
  children
}:{
  id: number
  itemTitle: string
  itemDescription?: string
  className?: string
  children?: React.ReactElement
}) {
  return (
    <div className="flex flex-col gap-6">
      <Item variant="outline" className={className}>
        <ItemContent>
          <ItemTitle>{itemTitle}</ItemTitle>
          <ItemDescription>
            {itemDescription}
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          {children}
        </ItemActions>
      </Item>
    </div>
  )
}
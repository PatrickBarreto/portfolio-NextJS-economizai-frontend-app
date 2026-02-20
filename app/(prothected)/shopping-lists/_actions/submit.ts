import z from "zod"
import {Create as createShoppingList, Update as updateShoppingList} from "../_services/api"
import {Create as CreateShoppingListProducts} from "../_services/shopping_list-product-link-api"

export const Update = async (prev:any, formData:FormData) => {
 
  const id = formData.get('ID')
  const name = formData.get('name') || null
  const type = formData.get('type')
  const executions = formData.get('executions')
  
  const  shoppingListchema = z.object({
    name: z.string().optional(),
    type: z.string().optional(),
    executions: z.array(z.string()).optional(),
  })

  const ShoppingList = {
    name,
    type,
    executions
  }

  const parsed =  shoppingListchema.parse(ShoppingList)
  
  await updateShoppingList(id, parsed)

  return {
    ...parsed
  }
}

export const Create = async (prev:any, formData:FormData) => {
  const name = formData.get('name') || null
  const type = formData.get('type')
  const products = formData.get('shoppingListProducts')?.toString().split(',')

  const shoppingListLink = products.map(p=>{
    return {
      products_id: Number(p),
      categories_id: 53,
      amount: Number(formData.get('products['+p+']'))
    }
  })
  
  const  shoppingListchema = z.object({
    name: z.string().optional(),
    type: z.string().optional(),
  })

  const ShoppingList = {
    name,
    type,
  }

  const parsed = shoppingListchema.parse(ShoppingList)
  
  const shoppingListId = (await createShoppingList(parsed)).body

  await CreateShoppingListProducts(shoppingListId.id, shoppingListLink)

  return {
    ...parsed
  }
}
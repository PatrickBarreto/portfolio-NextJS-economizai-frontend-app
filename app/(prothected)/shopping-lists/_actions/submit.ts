import z from "zod"
import {Create as createShoppingList, Update as updateShoppingList} from "../_services/api"
import {Create as CreateShoppingListProducts} from "../_services/shopping_list-product-link-api"

export const Update = async (prev:any, formData:FormData) => {
 
  const id = formData.get('ID')
  const name = formData.get('name') || null
  const type = formData.get('type')
  const productsList = formData.get('shoppingListCategories')
  
  const  shoppingListchema = z.object({
    name: z.string().optional(),
    type: z.string().optional(),
    products: z.array(z.string()).optional(),
  })

  const ShoppingList = {
    name,
    type,
    productsList
  }

  const parsed =  shoppingListchema.parse(ShoppingList)
  
  await updateShoppingList(String(id), parsed)
  // await UpdateShoppingListProducts(shoppingListId.id, shoppingListLink)

  return {
    ...parsed
  }
}

export const Create = async (prev:any, formData:FormData) => {
  const name = formData.get('name') || null
  const type = formData.get('type')
  const products = formData.get('shoppingListCategories')

  const parsedProducts:any[] = JSON.parse(String(products))

  const shoppingListLink = parsedProducts?.map(p=>{
    return {
      products_id: p.id,
      categories_id: p.categories_id,
      amount: p.amount
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
    ...parsed,
    products: shoppingListLink
  }
}
import z from "zod"
import {Create, Update} from "../../productsApi"
import Categories from "../../../categories/page"

export const UpdateProduct = async (prev:any, formData:FormData) => {
  const id = formData.get('productId')
  const name = formData.get('name') || null
  const type = formData.get('type')
  const categoriesText = formData.get('productCategories') || ''
  
  const productSchemma = z.object({
    name: z.string().optional(),
    type: z.string().optional(),
    categories: z.string()
  })

  const Product = {
    name,
    type,
    categories: categoriesText
  }

  const parsed = productSchemma.parse(Product)
  
  await Update(id, parsed)

  return {
    ...Product,
    categories: JSON.parse(JSON.stringify(categoriesText))
  }
}

export const CreateProduct = async (prev:any, formData:FormData) => {
  const name = formData.get('name') || null
  const type = formData.get('type')
  const categoriesText = formData.get('productCategories') || ''
  
  const productSchemma = z.object({
    name: z.string().optional(),
    type: z.string().optional(),
    categories: z.string()
  })

  const Product = {
    name,
    type,
    categories: categoriesText
  }

  const parsed = productSchemma.parse(Product)
  
  await Create(parsed)

  return {
    ...Product,
    categories: JSON.parse(JSON.stringify(categoriesText))
  }
}
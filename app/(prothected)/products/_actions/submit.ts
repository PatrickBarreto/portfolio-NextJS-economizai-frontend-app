import z from "zod"
import {Create as createProduct, Update as updateProduct} from "../_services/productsApi"

export const Update = async (prev:any, formData:FormData) => {
 
  const id = formData.get('productId')
  const name = formData.get('name') || null
  const type = formData.get('type')
  const categoriesText = formData.get('productCategories') || ''
  
  const productSchemma = z.object({
    name: z.string().optional(),
    type: z.string().optional(),
    categories: z.string().optional()
  })

  const Product = {
    name,
    type,
    categories: categoriesText
  }

  const parsed = productSchemma.parse(Product)
  
  await updateProduct(String(id), parsed)

  return {
    ...parsed,
    categories: JSON.parse(JSON.stringify(categoriesText))
  }
}

export const Create = async (prev:any, formData:FormData) => {
  const name = formData.get('name') || null
  const type = formData.get('type')
  const categoriesText = formData.get('productCategories') || ''
  
  const productSchemma = z.object({
    name: z.string(),
    type: z.string(),
    categories: z.string()
  })

  const Product = {
    name,
    type,
    categories: categoriesText
  }

  const parsed = productSchemma.parse(Product)
  
  await createProduct(parsed)

  return {
    ...Product,
    categories: JSON.parse(JSON.stringify(categoriesText))
  }
}
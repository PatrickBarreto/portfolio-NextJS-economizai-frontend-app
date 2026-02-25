import z from "zod"
import {Create as createBrands, Update as updateBrands} from "../_services/api"

export const Update = async (prev:any, formData:FormData) => {
 
  const id = formData.get('ID')
  const name = formData.get('name') || null
  const type = formData.get('type')
  const categoriesText = formData.get('brandsCategories') || ''
  
  const  brandSchema = z.object({
    name: z.string().optional(),
    type: z.string().optional(),
    categories: z.string()
  })

  const Brands = {
    name,
    type,
    categories: categoriesText
  }

  const parsed =  brandSchema.parse(Brands)
  
  await updateBrands(String(id), parsed)

  return {
    ...parsed,
    categories: JSON.parse(JSON.stringify(categoriesText))
  }
}

export const Create = async (prev:any, formData:FormData) => {
  const name = formData.get('name') || null
  const type = formData.get('type')
  const categoriesText = formData.get('brandsCategories') || ''
  
  const brandSchema = z.object({
    name: z.string().optional(),
    type: z.string().optional(),
    categories: z.string().optional()
  })

  const Brand = {
    name,
    type,
    categories: categoriesText
  }

  const parsed = brandSchema.parse(Brand)
  
  await createBrands(parsed)

  return {
    ...Brand,
    categories: JSON.parse(JSON.stringify(categoriesText))
  }
}
import z from "zod"
import {Create as createProduct, Update as UpdateCategory} from "../_services/categoriesApi"

export const Update = async (prev:any, formData:FormData) => {
  const id = formData.get('categoryId')
  const name = formData.get('name') || null
  const brands = formData.get('categoryBrands') || null
  const products = formData.get('categoryProducts') || null

  const categoriesSchema = z.object({
    name: z.string().optional(),
    products: z.array(z.any()).optional(),
    brands: z.array(z.any()).optional(),
  })

  const category:any = {
    brands: JSON.parse(brands  as string),
    products: JSON.parse(products  as string)
  }

  if(name){
    category['name'] = name
  }

  const parsed = categoriesSchema.parse(category)
  
  await UpdateCategory(id, parsed)

  return {
    ...parsed
  }
}

export const Create =  async (prev:any, formData:FormData) => {
  const name = formData.get('name') || null
  const brands = formData.get('categoryBrands') || null
  const products = formData.get('categoryProducts') || null
  
  const categoriesSchema = z.object({
    name: z.string(),
    products: z.array(z.any()).optional(),
    brands: z.array(z.any()).optional(),
  })

  const category:any = {
    brands: JSON.parse(brands  as string),
    products: JSON.parse(products  as string)
  }

  if(name){
    category['name'] = name
  }


  const parsed = categoriesSchema.parse(category)
  
  try{
    await createProduct(category)
  }catch(err){
    err
  }

  return {
    ...parsed
  }
}
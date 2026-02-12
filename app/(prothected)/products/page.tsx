import { checkToken } from "../_checkToken/checkToken"
import { findProducts } from "./productsApi"
import { Find } from "../categories/categoriesApi"
import { ProductList } from "./_page-components/productList/productList"
import { Button } from "@/components/ui/button"
import { CustomItem } from "@/src/custom-components/item/item"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"

export default async function Products() {
  await checkToken()
  const products = await findProducts()
  const categories:any[] = (await Find()).body

  return(
    <div className="flex flex-col gap-15 w-full mt-10 px-10">
      <ProductList products={products.body} categories={categories} />
    </div>
  )
}

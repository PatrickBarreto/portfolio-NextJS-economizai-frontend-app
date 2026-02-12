import { findProducts } from "./productsApi"
import { Find } from "../categories/categoriesApi"
import { ProductList } from "./_page-components/productList/productList"

export default async function Products() {
  const products = await findProducts()
  const categories:any[] = (await Find()).body

  return(
    <div className="flex flex-col gap-15 w-full mt-10 px-10">
      <ProductList products={products.body} categories={categories} />
    </div>
  )
}

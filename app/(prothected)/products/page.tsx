import { findProducts } from "./_services/productsApi"
import { Find } from "../categories/_services/categoriesApi"
import { List } from "./_components/list/productList"

export default async function Products() {
  const products = await findProducts()
  const categories:any[] = (await Find()).body

  return(
    <div className="flex flex-col gap-15 w-full mt-10 px-10">
      <h1>Products</h1>
      <List products={products.body} categories={categories} />
    </div>
  )
}

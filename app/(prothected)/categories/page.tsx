import { findProducts } from "../products/productsApi"
import { List } from "./_page-components/list/list"
import { Find as findBrands } from "../brands/brandsApi"
import { Find as findCategory} from "./categoriesApi"

export default async function Categories() {
  const categories = await (await findCategory()).body
  const products = await (await findProducts()).body
  const brands = await (await findBrands()).body
  return(
    <>
      <div className="flex flex-col gap-15 w-full mt-10 px-10">
        <h1>Categories</h1>
        <List
          categories={categories}
          products={products}
          brands={brands}
        ></List>
      </div>
    </>
  )
}

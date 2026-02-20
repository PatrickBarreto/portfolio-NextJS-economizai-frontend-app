import { Find as findShoppingLists } from "./_services/api"
import { List } from "./_components/list/list"
import { findProducts } from "../products/_services/productsApi"
import { Find as findCategories} from "../categories/_services/categoriesApi"

export default async function Products() {
  const shoppingLists = await findShoppingLists()
  const shoppingCategories = await findCategories()
  const productsLists = await findProducts()

  return(
    <div className="flex flex-col gap-15 w-full mt-10 px-10">
      <h1>Shopping Lists</h1>
      <List 
        shoppingLists={shoppingLists.body || []} 
        categories={shoppingCategories.body || []} 
        products={productsLists.body || []}
      />
    </div>
  )
}

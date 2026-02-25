import { Find as findBrands } from "./_services/api"
import { Find } from "../categories/_services/categoriesApi"
import { List } from "./_components/list/list"

export default async function Products() {
  const brands = await findBrands()
  const categories = await Find()

  return(
    <div className="flex flex-col gap-15 w-full mt-10 px-10">
      <h1>Brands</h1>
      <List brands={brands.ok ? brands.body : []} categories={categories.ok ? categories.body : []} />
    </div>
  )
}

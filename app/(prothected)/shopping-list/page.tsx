import { checkToken } from "../_checkToken/checkToken"

export default async function ShoppingList() {
  await checkToken()
  return(
    <>
      <h1> hello world </h1>
    </>
  )
}

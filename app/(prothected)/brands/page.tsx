import { checkToken } from "../_checkToken/checkToken"

export default async function Brands() {
  await checkToken()
  return(
    <>
      <h1> hello world </h1>
    </>
  )
}

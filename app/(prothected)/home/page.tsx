import { checkToken, logout } from "../_checkToken/checkToken"

export default async function Home() {
  await checkToken()

  return(
    <>
      <h1> </h1>
    </>
  )
}

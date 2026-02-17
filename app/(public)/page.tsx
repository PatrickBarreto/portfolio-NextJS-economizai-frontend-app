import { NavButton } from "@/components/custom-components/client/nav-button";

export default function LadingPage() {
  return(
    <>
      <div className="h-screen flex flex-col gap-20 items-center justify-center -mt-(--header-height)">
        <h2> Save more without worrying about numbers </h2>
        <NavButton href={'/sing-up'} content={"create an account"}/>
      </div>
    </>
  )
}

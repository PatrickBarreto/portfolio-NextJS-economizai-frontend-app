import { PublicMenu } from "../_components/menu";
import { publicMenuLinks } from "../layout";
import { SingInForm } from "./_form/page";

export default function singIn() {

  return(
    <>
      <PublicMenu links={publicMenuLinks}/>
      <div className="
        flex 
        flex-col
        w-screen
        h-full
        md:flex-row 
        ">
        <div className="
          hidden
          items-center 
          -mt-(--header-height)
          md:w-1/2
          md:flex
          ">
          <h2></h2>
        </div>
        <div className="
          flex
          justify-center
          items-center
          p-10
          h-screen
          bg-(--wise-spend-green)
          h-[calc(100vh-var(--header-height))]
          w-screen
          md:w-1/2
          ">
          <SingInForm />
        </div>
      </div>
    </>
  )
}

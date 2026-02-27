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
        w-full
        h-full
        md:flex-row 
        ">
        <div className="
          hidden
          items-center 
          w-full 
          -mt-(--header-height) 
          md:flex
          ">
          <h2></h2>
        </div>
        <div className="
          flex
          justify-center
          items-center
          w-full 
          h-screen
          bg-(--wise-spend-green)
          h-[calc(100vh-var(--header-height))]
          ">
          <SingInForm />
        </div>
      </div>
    </>
  )
}

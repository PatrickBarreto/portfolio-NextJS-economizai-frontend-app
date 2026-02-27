import { PublicMenu } from "../_components/menu";
import { publicMenuLinks } from "../layout";
import { SingUpForm } from "./_components/_form/page";

export default function singUp() {

  return(
    <>
      <PublicMenu links={publicMenuLinks}/>
       <div className="
        flex 
        flex-col
        md:flex-row 
        ">
        <div className="
          hidden
          items-center 
          w-full 
          p-10
          md:-mt-(--header-height) 
          md:flex
          ">
            <h2>Here, you always pay less for the same thing.</h2>
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
          <SingUpForm />
        </div>
      </div>
    </>
  )
}

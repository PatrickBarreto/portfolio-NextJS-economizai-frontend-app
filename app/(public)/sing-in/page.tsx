import { SingInForm } from "./_form/page";

export default function singIn() {

  return(
    <>
      <div className="
        flex 
        flex-col
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
          h-[calc(100vh-var(--header-height))]
          w-full 
          bg-(--wise-spend-green)
          ">
          <SingInForm />
        </div>
      </div>
    </>
  )
}

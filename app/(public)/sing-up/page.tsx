import { SingUpForm } from "./_components/_form/page";

export default function singUp() {

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
            <h2>Here, you always pay less for the same thing.</h2>
        </div>
        <div className="
          flex
          justify-center
          items-center
          h-[calc(100vh-var(--header-height))]
          w-full 
          bg-(--wise-spend-green)
          ">
          <SingUpForm />
        </div>
      </div>
    </>
  )
}

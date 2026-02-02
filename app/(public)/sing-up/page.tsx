import { SingUpForm } from "./_form/page";

export default function singUp() {

  return(
    <>
      <div className="flex flex-row h-full">
        <div className="flex items-center w-full -mt-(--header-height) p-10">
          <h2>Here, you always pay less for the same thing.</h2>
        </div>
        <div className="flex justify-center items-center w-full bg-(--wise-spend-green) p-10">
          <SingUpForm />
        </div>
      </div>
    </>
  )
}

import { SingInForm } from "./_form/page";

export default function singIn() {

  return(
    <>
      <div className="flex flex-row h-full">
        <div className="flex items-center w-full -mt-(--header-height) p-10">
          <h2></h2>
        </div>
        <div className="flex justify-center items-center w-full bg-(--wise-spend-green) p-10">
          <SingInForm />
        </div>
      </div>
    </>
  )
}

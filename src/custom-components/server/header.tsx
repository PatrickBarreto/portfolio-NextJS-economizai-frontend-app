export const TopMenuNavigation = ({children}: {
  children: React.ReactElement,
}) => {
  return (
    <header className="
      bg-(--wise-spend-green) 
      h-screen 
      w-30
      pr-5
      pl-5
      fixed
      text-white
      
      md:flex 
      md:w-full 
      md:justify-between
      md:items-center 
      md:gap-10
      md:h-(--header-height) 
      md:pr-10"
    >
      {children}
    </header>
)
}
export const TopMenuNavigation = ({children}: {
  children: React.ReactElement,
}) => {
  return (
    <header className="
      bg-green-50
      h-screen 
      w-30
      pr-5
      pl-5
      fixed
      border-b
      z-9
      
      
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
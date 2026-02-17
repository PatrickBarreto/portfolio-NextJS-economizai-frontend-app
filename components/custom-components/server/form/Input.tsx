export default function CustomInput({value, type, name, label, placeholder, inputClassName, children}:{
  type: string,
  name?: string,
  value?: string,
  label?: string,
  placeholder?: string,
  inputClassName?: string,
  children?: React.ReactElement 
}) {
  return (
    <div className="flex flex-col">
      {label && <label htmlFor={name}> {label} </label>}
      <span>{children}</span>
      <input className={inputClassName} id={name} type={type} name={name} placeholder={placeholder} value={value}/>
    </div>
  )
}
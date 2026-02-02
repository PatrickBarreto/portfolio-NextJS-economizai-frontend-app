import Form from 'next/form'

export const CustomForm = ({handleSubmit, children, className}:{
  handleSubmit: (formData: FormData)=>void,
  children: React.ReactElement
  className?: string
}) => {
  return(
    <Form className={className} action={handleSubmit}>
      {children}
    </Form>
  )
}
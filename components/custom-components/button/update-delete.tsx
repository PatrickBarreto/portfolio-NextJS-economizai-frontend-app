import { Button } from "@/components/ui/button"

export const UpdateDeleteButton = ({
  ToggleUpdate,
  ToggleRemove,
}:{
  ToggleUpdate: ()=>void
  ToggleRemove: ()=>void
}) => {
  return(
    <>
      <Button
        className={'cursor-pointer'}
        variant="outline"
        size="sm"
        onClick={() => ToggleUpdate()}
      >
        Edit
      </Button>

      <Button
        className={'cursor-pointer'}
        variant="destructive"
        size="sm"
        onClick={() => ToggleRemove()}
      >
        Delete
      </Button>
    </>
  )
}
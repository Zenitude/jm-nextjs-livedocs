import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function UserTypeSelector({userType, setUserType, onClickHandler}: UserTypeSelectorParams) {

  const accessChangeHandler = (type: UserType) => {
    setUserType(type);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onClickHandler && onClickHandler(type);
  }

  return (
    <Select value={userType} onValueChange={(type: UserType) => accessChangeHandler(type)}>
      <SelectTrigger className="shad-select">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent className="border-none bg-dark-200">
        <SelectItem value="viewer" className="shad-select-item">can view</SelectItem>
        <SelectItem value="editor" className="shad-select-item">can edit</SelectItem>
      </SelectContent>
    </Select>
  )
}
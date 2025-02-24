import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const getTypeField = (
  {
    indexGet,
    namefield,
    namefieldlang,
    labelfield,
    placeholderfield,
    descriptionfiled,
    defaultfield,
    typefield,
    field

  }: {
    indexGet: number | string,
    namefield: string,
    namefieldlang: string,
    labelfield: string,
    placeholderfield: string,
    descriptionfiled: string,
    defaultfield: string | number | boolean,
    typefield: "textarea" | "checkbox" | "input" | "number" | "url" | "file" | "select",
    field: any
  }
) => {
  if (typefield === "input") return <div><Label htmlFor={`${namefieldlang}input${indexGet}`}>{labelfield}</Label><Input id={`${namefieldlang}input${indexGet}`} placeholder={placeholderfield} {...field} /></div>
  if (typefield === "textarea") return <div><Label htmlFor={`${namefieldlang}textarea${indexGet}`}>{labelfield}</Label><Textarea id={`${namefieldlang}textarea${indexGet}`} placeholder={placeholderfield} {...field} /></div>
  if (typefield === "checkbox") return <div><Label htmlFor={`${namefieldlang}checkbox${indexGet}`}>{labelfield}</Label><Checkbox id={`${namefieldlang}checkbox${indexGet}`} {...field} /></div>
  if (typefield === "select") return  <select {...field}/>
  if (typefield === "number") return <div><Label htmlFor={`${namefieldlang}number${indexGet}`}>{labelfield}</Label><Input id={`${namefieldlang}number${indexGet}`} placeholder={placeholderfield} {...field} /></div>
  if (typefield === "url") return <div><Label htmlFor={`${namefieldlang}url${indexGet}`}>{labelfield}</Label><Input id={`${namefieldlang}url${indexGet}`} placeholder={placeholderfield} {...field} /></div>
  if (typefield === "file") return <div><Label htmlFor={`${namefieldlang}file${indexGet}`}>{labelfield}</Label><Input type="file" id={`${namefieldlang}file${indexGet}`} placeholder={placeholderfield} {...field} /></div>
  // return isLoaded ? <ShareButton /> : null;
};
export default getTypeField

import React from 'react'
import { Input } from '@/components/ui/input'
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from '@/components/ui/textarea'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import { Control } from 'react-hook-form'
import { z } from 'zod'
import { Label } from '../ui/label'


function FormReactHooksTypefields({
  indexkey, formControl, namefield, labelfield, placeholderfield, descriptionfiled,  typefield
} : {
  formControl : Control<z.infer<any>, any>; indexkey: number; namefield : string; labelfield : string;  placeholderfield : string; descriptionfiled : string; 
  typefield : "textarea" | "checkbox" | "input" | "number" | "url" | "file" | "select"
} ) { 

  return (
    <div>
<FormField
          control={formControl}
          name={namefield}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{labelfield}</FormLabel>
              <FormControl>
              {typefield === "textarea" ?  <div><Label htmlFor={`${namefield}textarea${indexkey}`}>{labelfield}</Label><Textarea id={`${namefield}textarea${indexkey}`} placeholder={placeholderfield} {...field} /></div> : ''}  
              {typefield === "checkbox" ? <div><Label htmlFor={`${namefield}checkbox${indexkey}`}>{labelfield}</Label><Checkbox id={`${namefield}checkbox`} {...field} /></div>: ''}
              {typefield === "input" ?  <div><Label htmlFor={`${namefield}input${indexkey}`}>{labelfield}</Label><Input id={`${namefield}input`} placeholder={placeholderfield} {...field} /></div> : ''}
              {typefield === "select" ?  <select {...field}/> : ''}
              {typefield === "number" ?  <div><Label htmlFor={`${namefield}number${indexkey}`}>{labelfield}</Label><Input id={`${namefield}number`} placeholder={placeholderfield} {...field} /></div> : ''}
              {typefield === "url" ?  <div><Label htmlFor={`${namefield}url${indexkey}`}>{labelfield}</Label><Input id={`${namefield}url`} placeholder={placeholderfield} {...field} /></div>: ''}
              {typefield === "file" ? <div><Label htmlFor={`${namefield}file${indexkey}`}>{labelfield}</Label><Input type="file" id={`${namefield}file${indexkey}`} placeholder={placeholderfield} {...field} /></div> : '' }          
              </FormControl>
              <FormDescription>
                {descriptionfiled}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>    
  )
}

export default FormReactHooksTypefields
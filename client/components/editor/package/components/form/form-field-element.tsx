import React from 'react'
import {  
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


function FormFieldsElement({formControlProps, nameProps, formLabelProps, formPlaceholderProps, formDescriptionProps}: any) 
{
  return (                
      <FormField
          control={formControlProps}
          name={nameProps}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formLabelProps}</FormLabel>
              <FormControl>
                <Input placeholder={formPlaceholderProps} {...field} />
              </FormControl>
              <FormDescription>
                {formDescriptionProps}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
  )
  
} 

export default FormFieldsElement


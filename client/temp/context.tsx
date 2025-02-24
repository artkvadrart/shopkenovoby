"use client";
import { createContext, useContext } from 'react'
import React from 'react'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm} from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

import { formSchema, formDefaultValues } from '@/app/db/categories/input/components/prisma-zod';
import FormFieldsCyclic from './components/form-fields-cyclic';
// import { formSchema, formDefaultValues } from './components/prisma-zod';
// console.log(nameFieldForm );
// console.dir(nameFieldForm, { depth: null })


export const FormContext = createContext<Promise<any> | null>(null)
 

export function FormProvider({
  children,
  // formPromise,
}: {
  children: React.ReactNode
  formPromise: Promise<any>
}) {
  return (
    <FormContext.Provider value={formPromise}>{children}</FormContext.Provider>
  )
}
 

export function useFormContext() {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider')
  }
  return context
}




 function InputCategoryPage() { 


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...formDefaultValues      
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }


  return (
    <div>      
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        <FormField
          control={form.control}
          name="path"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Path</FormLabel>
              <FormControl>
                <Input placeholder="path" {...field} />
              </FormControl>
              <FormDescription>
                This is path.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="top"
          render={({ field }) => (
            <FormItem>
              <FormLabel>top</FormLabel>
              <FormControl>
                <Checkbox 
                checked={field.value}
                onCheckedChange={field.onChange}
                 />
                {/* <Checkbox placeholder="top" {...field} /> */}
              </FormControl>
              <FormDescription>
                This is top.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> 

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>status</FormLabel>
              <FormControl>
                <Input placeholder="status" {...field} />
              </FormControl>
              <FormDescription>
                This is status.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="parentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>parentId</FormLabel>
              <FormControl>
                <Input placeholder="parentId" {...field} />
              </FormControl>
              <FormDescription>
                This is parentId.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


         <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>avatar</FormLabel>
              <FormControl>
                <Input placeholder="avatar" {...field} />
              </FormControl>
              <FormDescription>
                This is avatar.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>image</FormLabel>
              <FormControl>
                <Input placeholder="image" {...field} />
              </FormControl>
              <FormDescription>
                This is image.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>images</FormLabel>
              <FormControl>
                <Input placeholder="images" {...field} />
              </FormControl>
              <FormDescription>
                This is images.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>fUrl</FormLabel>
              <FormControl>
                <Input placeholder="fUrl" {...field} />
              </FormControl>
              <FormDescription>
                This is fUrl.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="code1c"
          render={({ field }) => (
            <FormItem>
              <FormLabel>code1c</FormLabel>
              <FormControl>
                <Input placeholder="code1c" {...field} />
              </FormControl>
              <FormDescription>
                This is code1c.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="codeChange"
          render={({ field }) => (
            <FormItem>
              <FormLabel>codeChange</FormLabel>
              <FormControl>
                <Input placeholder="codeChange" {...field} />
              </FormControl>
              <FormDescription>
                This is codeChange.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


        <Button type="submit">Submit</Button>
      </form>
    </Form>



    </div>
  )
}
// export default InputCategoryPage


// 'use client'

import { use } from 'react'
import React from 'react'
import { $Enums } from '@prisma/client'
import { z } from 'zod'
// import {  ZodType } from 'zod'
import { iArrayNameFormField, INameFieldForm, INameFieldFormZod } from '@/types'
// import { Control, FieldValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { Form} from "@/components/ui/form"
import { zodResolver } from '@hookform/resolvers/zod'
import { toast, Toaster } from "react-hot-toast"
import { ToastProvider } from '@/providers/toast-provider'
import { categoryInputFormFieldsDescriptionJson, 
         categoryInputFormFieldsNoTranslateData,
         categoryInputFormFieldsSeoJson,
         categoryInputFormFieldsNameSetParametrsJson} from '@/settings/category-input-form-fields'
import { Label } from '@/components/ui/label'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'


// export default function FormFieldsCyclic({
//    activeLanguagesProps,
//   } : { 
//     activeLanguagesProps: Promise <{ id: number; code: string; time: string; image: string;
//     name: string; status: boolean; createdAt: Date; updatedAt: Date; language: $Enums.Language;
//     sort_order: number; locale: string; colorText: string; colorBackground: string; 
//     }[]> ; 
//       } )       
//   {

   const nameFieldForm: INameFieldFormZod = {}; //формирование названий полей формы, для zod
   const defaultFieldForm: INameFieldForm = {}; //формирование названий полей формы, для переводных полей
   const arrayNameFormFieldDescriptionJson: Array<iArrayNameFormField> = [];
   const arrayNameFormFieldSeoJson: Array<iArrayNameFormField> = [];
   const arrayNameFormFieldNameSetParametrsJson: Array<iArrayNameFormField> = [];
   const arrayNameFormFieldNoTranslateData: Array<iArrayNameFormField> = [];

   const activeLanguages = use (activeLanguagesProps) // передаем функ => Promise
   

//***************************
   activeLanguages.map((lang ) => {
     categoryInputFormFieldsDescriptionJson[lang.code].map( (element,indexsort)=>{    
     nameFieldForm[element.namefield+lang.code] = element.zod;   // формируем название полей и валидацию zod
     defaultFieldForm[element.namefield+lang.code] = element.defaultfield; // формируем дефолтные значения полей
 
     arrayNameFormFieldDescriptionJson.push({
       indexkey: element.namefield + lang.code,
       languagename : lang.language,
       sort: lang.sort_order,
       classhtml: "",
       namefield: element.namefield,
       namefieldlang: element.namefield + lang.code,
       namefieldlangsort: indexsort+element.namefield +lang.sort_order + lang.code,
       labelfield: element.labelfield,
       placeholderfield: element.placeholderfield,
       descriptionfiled: element.descriptionfiled,
       defaultfield: element.defaultfield,
       zod: element.zod,
       typefield: element.typefield
     }
     )
    })
  })


  

  activeLanguages.map((lang ) => {

    categoryInputFormFieldsSeoJson[lang.code].map( (element,indexsort)=>{    
    nameFieldForm[element.namefield+lang.code] = element.zod;   // формируем название полей и валидацию zod
    defaultFieldForm[element.namefield+lang.code] = element.defaultfield; // формируем дефолтные значения полей
  
      arrayNameFormFieldSeoJson.push({
        indexkey: element.namefield + lang.code,
        languagename : lang.language,
        sort: lang.sort_order,
        classhtml: "",
        namefield: element.namefield,
        namefieldlang: element.namefield + lang.code,
        namefieldlangsort: indexsort+element.namefield +lang.sort_order + lang.code,
        labelfield: element.labelfield,
        placeholderfield: element.placeholderfield,
        descriptionfiled: element.descriptionfiled,
        defaultfield: element.defaultfield,
        zod: element.zod,
        typefield: element.typefield
      }
      )
     })
    })

    activeLanguages.map((lang ) => {
     categoryInputFormFieldsNameSetParametrsJson[lang.code].map( (element,indexsort)=>{    
   //   nameFieldForm[element.namefield+lang.code] = element.zod;   // формируем название полей и валидацию zod
    //  defaultFieldForm[element.namefield+lang.code] = element.defaultfield; // формируем дефолтные значения полей
  
      arrayNameFormFieldNameSetParametrsJson.push({
        indexkey: element.namefield + lang.code,
        languagename : lang.language,
        sort: lang.sort_order,
        classhtml: "",
        namefield: element.namefield,
        namefieldlang: element.namefield + lang.code,
        namefieldlangsort: indexsort+element.namefield +lang.sort_order + lang.code,
        labelfield: element.labelfield,
        placeholderfield: element.placeholderfield,
        descriptionfiled: element.descriptionfiled,
        defaultfield: element.defaultfield,
        zod: element.zod,
        typefield: element.typefield
      }
      )
     })
    })


    activeLanguages.map((lang ) => {
     categoryInputFormFieldsNoTranslateData[lang.code].map( (element,indexsort)=>{    
    //  nameFieldForm[element.namefield+lang.code] = element.zod;   // формируем название полей и валидацию zod
    //  defaultFieldForm[element.namefield+lang.code] = element.defaultfield; // формируем дефолтные значения полей
  
      arrayNameFormFieldNoTranslateData.push({
        indexkey: element.namefield + lang.code,
        languagename : lang.language,
        sort: lang.sort_order,
        classhtml: "",
        namefield: element.namefield,
        namefieldlang: element.namefield + lang.code,
        namefieldlangsort: indexsort+element.namefield +lang.sort_order + lang.code,
        labelfield: element.labelfield,
        placeholderfield: element.placeholderfield,
        descriptionfiled: element.descriptionfiled,
        defaultfield: element.defaultfield,
        zod: element.zod,
        typefield: element.typefield
      }
      )
     })

    })



const formSchema = z.object({
  ...nameFieldForm
});

const formDefaultValues = {
  ...defaultFieldForm
};


   //********************************** */



  const form = useForm<z.infer<typeof formSchema>>({
    mode : "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...formDefaultValues
    },

  })




  const GetTypeFieldDescription = (
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
    // if (typefield === "select") return  <select {...field}/>
    if (typefield === "number") return <div><Label htmlFor={`${namefieldlang}number${indexGet}`}>{labelfield}</Label><Input id={`${namefieldlang}number${indexGet}`} placeholder={placeholderfield} {...field} /></div>
    if (typefield === "url") return <div><Label htmlFor={`${namefieldlang}url${indexGet}`}>{labelfield}</Label><Input id={`${namefieldlang}url${indexGet}`} placeholder={placeholderfield} {...field} /></div>
    if (typefield === "file") return <div><Label htmlFor={`${namefieldlang}file${indexGet}`}>{labelfield}</Label><Input type="file" id={`${namefieldlang}file${indexGet}`} placeholder={placeholderfield} {...field} /></div>
    // return isLoaded ? <ShareButton /> : null;
  };


  function FormReactHooksTypeFieldsDescription( {formControlProps} : {formControlProps: any } ) {
    const arrayJSX: Array<React.ReactNode> = []

    arrayNameFormFieldDescriptionJson.sort((a, b) => a.namefieldlangsort > b.namefieldlangsort ? 1 : -1)
    
    let variablePrev : string = "";
    let variableNow : string = "";
    let i = 1;      
    
    arrayNameFormFieldDescriptionJson.map((description) => {
      variableNow = description.namefield

      if (variableNow != variablePrev && i < activeLanguages.length) {
        description.classhtml = "border-t-2 border-x-2 border-red-300 rounded-t-sm p-4 mt-4";
        variablePrev = description.namefield;
        i++;
      }
      else if (variableNow === variablePrev && i < activeLanguages.length) {
        description.classhtml = "border-x-2 border-red-300  p-4 ";
        variablePrev = description.namefield;
        i++;
      }
      else if (variableNow === variablePrev && i == activeLanguages.length) {
        description.classhtml = "border-b-2 border-x-2 border-red-300 rounded-b-sm p-4 mb-4"
        i = 1;
      } 
      
    }
    )
     
    arrayNameFormFieldDescriptionJson.map((description, index) => {
      arrayJSX.push(
        <FormField
          key={`${description.namefieldlang}textarea${index}`}
          control={formControlProps}
          name={description.namefieldlang}
          render={({ field }) => (
            <FormItem className={description.classhtml}>
              {/* <FormLabel>{description.labelfield + "***********************"}</FormLabel> */}
              <FormControl>

                {/* <GetTypeFieldDescription
                  indexGet={index}
                  namefield={description.namefield}
                  namefieldlang={description.namefieldlang}
                  labelfield={description.namefieldlang}
                  placeholderfield={description.placeholderfield}
                  descriptionfiled={description.descriptionfiled}
                  defaultfield={description.defaultfield}
                  typefield={description.typefield}
                  field={field}
                /> */}

                {GetTypeFieldDescription({
                  indexGet : index,
                  namefield : description.namefield,
                  namefieldlang : description.namefieldlang,
                  labelfield : description.namefield + " (" + description.languagename + ")",
                  placeholderfield : description.placeholderfield,
                  descriptionfiled : description.descriptionfiled,
                  defaultfield : description.defaultfield,
                  typefield : description.typefield,
                  field : field } 
                 ) }

              </FormControl>
              <FormDescription>
                {description.descriptionfiled}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )
    })  
    return (
      <div> {...arrayJSX} </div>      
    )
  }   


  return (
    <div>
      FormFieldsCyclic11111
      <Toaster  />
      <ToastProvider  />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitWork)} className="space-y-3 w-full">

           {/* <FormReactHooksTypefieldsDescription formControlProps={form.control}/> */}

          {FormReactHooksTypeFieldsDescription({formControlProps: form.control})}
          <Button type="submit" variant={"default"} className="w-80 text-3xl md:text-3xl" size={"lg"} >
          #Впирод
          </Button>
        </form>
      </Form>
    </div>
  )
}


export {nameFieldForm, defaultFieldForm, arrayNameFormFieldDescriptionJson}

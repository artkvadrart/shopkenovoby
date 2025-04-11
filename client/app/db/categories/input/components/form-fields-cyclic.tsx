'use client'
import { use } from 'react'
import React from 'react'
import { $Enums, L18n } from '@prisma/client'
import { z } from 'zod'
import { iArrayNameFormField, INameFieldForm, INameFieldFormZod } from '@/types'
import { useForm } from 'react-hook-form'
import { Form} from "@/components/ui/form"
import { zodResolver } from '@hookform/resolvers/zod'
import { toast, Toaster } from "react-hot-toast"
import { ToastProvider } from '@/providers/toast-provider'
import { categoryInputFormFieldsDescriptionJson, 
         categoryInputFormFieldsNoTranslateData,
         categoryInputFormFieldsSeoJson,
         categoryInputFormFieldsNameSetParametrsJson} from '@/settings/category-input-form-fields'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import getTypeField from '@/app/db/categories/input/components/get-type-field'
import axios from 'axios'

export default function FormFieldsCyclic({
   activeLanguagesProps   
  } : { 
    activeLanguagesProps: Promise <{ id: number; code: string; time: string; image: string;
    name: string; status: boolean; createdAt: Date; updatedAt: Date; language: $Enums.Language;
    sort_order: number; locale: string; colorText: string; colorBackground: string; 
    }[]> ;
      } )   
      {
   const activeLanguages = use (activeLanguagesProps) // передаем функ => Promise

   const nameFieldForm: INameFieldFormZod = {}; //формирование названий полей формы, для zod
   const defaultFieldForm: INameFieldForm = {}; //формирование названий полей формы, для переводных полей
   const arrayNameFormFieldDescriptionJson: Array<iArrayNameFormField> = [];
   const arrayNameFormFieldSeoJson: Array<iArrayNameFormField> = [];
   const arrayNameFormFieldNameSetParametrsJson: Array<iArrayNameFormField> = [];
   const arrayNameFormFieldNoTranslateData: Array<iArrayNameFormField> = [];

   

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
 
       nameFieldForm[element.namefield+lang.code] = element.zod;   // формируем название полей и валидацию zod
       defaultFieldForm[element.namefield+lang.code] = element.defaultfield; // формируем дефолтные значения полей  
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
 
 

      
           
    

      const languagefornotranslate=Object.keys(categoryInputFormFieldsNoTranslateData)[0]

    
      categoryInputFormFieldsNoTranslateData[languagefornotranslate].map( (element,indexsort)=>
       {    
       nameFieldForm[element.namefield+"notranslate"] = element.zod;   // формируем название полей и валидацию zod
       defaultFieldForm[element.namefield+"notranslate"] = element.defaultfield; // формируем дефолтные значения полей  
       arrayNameFormFieldNoTranslateData.push({
         indexkey: element.namefield+"notranslate",
         languagename : activeLanguages[0].language,
         sort: activeLanguages[0].sort_order,
         classhtml: "border-2 border-red-300 rounded-sm p-4 mt-4",
         namefield: element.namefield+"notranslate",
         namefieldlang: element.namefield + "notranslate",
         namefieldlangsort: indexsort+element.namefield +activeLanguages[0].sort_order + +"notranslate",
         labelfield: element.labelfield,
         placeholderfield: element.placeholderfield,
         descriptionfiled: element.descriptionfiled,
         defaultfield: element.defaultfield,
         zod: element.zod,
         typefield: element.typefield
       }
       )
      })


      // activeLanguages.map((lang ) => {       })


const formSchema = z.object({
  ...nameFieldForm
});

const formDefaultValues = {
  ...defaultFieldForm
};

  const form = useForm<z.infer<typeof formSchema>>({
    mode : "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...formDefaultValues
    },

  })


  const onSubmitWork = async  (data: z.infer<typeof formSchema>) => {      
    toast.success(`God : `, { duration: 7000 });      
    try {
      toast.success(`Dog :  `, { duration: 7000 });
      console.log(`!!! Data:`);
      // console.dir(nameFieldForm, { depth: null })
      console.dir(data, { depth: null });

      // setLoading( value =>  value = true );
      await axios.post(`/api/input`, data )
      .then( (responseRoute)=>{
        console.log(` responseRouteCategoryInput ------------- ${responseRoute.data} `);
      //   toast.success(` ${formLanguage[language].resultOkOrderMessage} : ${orderDb.data} `, { duration: 7000 });
      })
      // .then( () => {setLoading( value =>  value = false ); })
      .catch( (error) => {toast.error(`Error response result: ${error}`, { duration: 7000 }); })
      // .finally( () => {setLoading( value =>  value = false ); })

      // const toastMessage = JSON.stringify(data, null, 2);

      // reset({     
      //   ...containerServiceSwitchNameField,
      //   dateOrder: new Date(),
      //   customer: '',
      //   email: '',
      //   emailSec: 'my@m.m',
      //   address: '',
      //   phone: '',      
      //   note: ''    

     //  } );       
      

      // setTimeout( ( ) => { 
      //   router.push(`/${language}/form`);
      //   window.location.reload();        
      //  }, 7000)

      // setLoading( value =>  value = false ); 

    } catch (error: any) {
      console.log(` ErrorrErro ------------- ${error} `);
      toast.error(`ErrorrError`, { duration: 5000 });      
      // setLoading( value =>  value = false );    
    } finally {
      // setLoading( value =>  value = false );     
      }
  }


 // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  function FormReactHooksTypefieldsDescription( {formControlProps} : {formControlProps: any } ) {
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

  arrayNameFormFieldDescriptionJson.map((element, index) => {
    arrayJSX.push(
      <FormField
        key={`${element.namefieldlang}textarea${index}`}
        control={formControlProps}
        name={element.namefieldlang}
        render={({ field }) => (
          <FormItem className={element.classhtml}>
            {/* <FormLabel>{description.labelfield + "***********************"}</FormLabel> */}
            <FormControl>
              {getTypeField({
                indexGet : index,
                namefield : element.namefield,
                namefieldlang : element.namefieldlang,
                labelfield : element.namefield + " (" + element.languagename + ")",
                placeholderfield : element.placeholderfield,
                descriptionfiled : element.descriptionfiled,
                defaultfield : element.defaultfield,
                typefield : element.typefield,
                field : field } 
               ) }
            </FormControl>
            <FormDescription>
              {element.descriptionfiled}
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
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
function FormReactHooksTypefieldsSeo( {formControlProps} : {formControlProps: any } ) {
  const arrayJSX: Array<React.ReactNode> = []

  arrayNameFormFieldSeoJson.sort((a, b) => a.namefieldlangsort > b.namefieldlangsort ? 1 : -1)
 
  let variablePrev : string = "";
  let variableNow : string = "";
  let i = 1;      
  
  arrayNameFormFieldSeoJson.map((description) => {
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

  arrayNameFormFieldSeoJson.map((element, index) => {
    arrayJSX.push(
      <FormField
        key={`${element.namefieldlang}textarea${index}`}
        control={formControlProps}
        name={element.namefieldlang}
        render={({ field }) => (
          <FormItem className={element.classhtml}>
            {/* <FormLabel>{description.labelfield + "***********************"}</FormLabel> */}
            <FormControl>
              {getTypeField({
                indexGet : index,
                namefield : element.namefield,
                namefieldlang : element.namefieldlang,
                labelfield : element.namefield + " (" + element.languagename + ")",
                placeholderfield : element.placeholderfield,
                descriptionfiled : element.descriptionfiled,
                defaultfield : element.defaultfield,
                typefield : element.typefield,
                field : field } 
               ) }
            </FormControl>
            <FormDescription>
              {element.descriptionfiled}
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
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
function FormReactHooksTypefieldsNameSetParametrs( {formControlProps} : {formControlProps: any } ) {
  const arrayJSX: Array<React.ReactNode> = []

  arrayNameFormFieldNameSetParametrsJson.sort((a, b) => a.namefieldlangsort > b.namefieldlangsort ? 1 : -1)
 
  let variablePrev : string = "";
  let variableNow : string = "";
  let i = 1;      
  
  arrayNameFormFieldNameSetParametrsJson.map((description) => {
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

  arrayNameFormFieldNameSetParametrsJson.map((element, index) => {
    arrayJSX.push(
      <FormField
        key={`${element.namefieldlang}textarea${index}`}
        control={formControlProps}
        name={element.namefieldlang}
        render={({ field }) => (
          <FormItem className={element.classhtml}>
            {/* <FormLabel>{description.labelfield + "***********************"}</FormLabel> */}
            <FormControl>
              {getTypeField({
                indexGet : index,
                namefield : element.namefield,
                namefieldlang : element.namefieldlang,
                labelfield : element.namefield + " (" + element.languagename + ")",
                placeholderfield : element.placeholderfield,
                descriptionfiled : element.descriptionfiled,
                defaultfield : element.defaultfield,
                typefield : element.typefield,
                field : field } 
               ) }
            </FormControl>
            <FormDescription>
              {element.descriptionfiled}
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
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
function FormReactHooksTypefieldsNoTranslateData( {formControlProps} : {formControlProps: any } ) {
  const arrayJSX: Array<React.ReactNode> = []

  // arrayNameFormFieldNoTranslateData.sort((a, b) => a.namefieldlangsort > b.namefieldlangsort ? 1 : -1)
 
  // let variablePrev : string = "";
  // let variableNow : string = "";
  // let i = 1;      
  
  // arrayNameFormFieldNoTranslateData.map((description) => {
  //   variableNow = description.namefield
  //   if (variableNow != variablePrev && i < activeLanguages.length) {
  //     description.classhtml = "border-t-2 border-x-2 border-red-300 rounded-t-sm p-4 mt-4";
  //     variablePrev = description.namefield;
  //     i++;
  //   }
  //   else if (variableNow === variablePrev && i < activeLanguages.length) {
  //     description.classhtml = "border-x-2 border-red-300  p-4 ";
  //     variablePrev = description.namefield;
  //     i++;
  //   }
  //   else if (variableNow === variablePrev && i == activeLanguages.length) {
  //     description.classhtml = "border-b-2 border-x-2 border-red-300 rounded-b-sm p-4 mb-4"
  //     i = 1;
  //   }      
  // }
  // )

  arrayNameFormFieldNoTranslateData.map((element, index) => {
    arrayJSX.push(
      <FormField
        key={`${element.namefieldlang}textarea${index}`}
        control={formControlProps}
        name={element.namefieldlang}
        render={({ field }) => (
          <FormItem className={element.classhtml}>
            {/* <FormLabel>{description.labelfield + "***********************"}</FormLabel> */}
            <FormControl>
              {getTypeField({
                indexGet : index,
                namefield : element.namefield,
                namefieldlang : element.namefieldlang,
                labelfield : element.namefield + " (" + element.languagename + ")",
                placeholderfield : element.placeholderfield,
                descriptionfiled : element.descriptionfiled,
                defaultfield : element.defaultfield,
                typefield : element.typefield,
                field : field } 
               ) }
            </FormControl>
            <FormDescription>
              {element.descriptionfiled}
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
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>




  return (
    <div>
      FormFieldsCyclic11111
      <Toaster  />
      <ToastProvider  />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitWork)} className="space-y-3 w-full">

           {/* <FormReactHooksTypefieldsDescription formControlProps={form.control}/> */}

          {FormReactHooksTypefieldsDescription({formControlProps: form.control})}
          {FormReactHooksTypefieldsSeo({formControlProps: form.control})}
          {FormReactHooksTypefieldsNameSetParametrs({formControlProps: form.control})}
          ***********************************************
          {FormReactHooksTypefieldsNoTranslateData({formControlProps: form.control})}

         

          <Button type="submit" variant={"default"} className="w-80 text-3xl md:text-3xl" size={"lg"} >
          #Впирод
          </Button>
        </form>
      </Form>
    </div>
  )
}

'use client'
import { z } from 'zod'
import { iArrayNameFormField, INameFieldForm, INameFieldFormZod } from '@/types'
import { categoryInputFormFieldsDescriptionJson, 
         categoryInputFormFieldsNoTranslateData,
         categoryInputFormFieldsSeoJson,
         categoryInputFormFieldsNameSetParametrsJson} from '@/settings/category-input-form-fields'
// import { getActiveLanguages } from '@/utils/get-active-languages'
 import { use } from 'react';
// import { $Enums } from '@prisma/client';
import { getActiveLanguages } from '@/utils/get-active-languages';

// export default function categoryZodDefaultFormfield({
//    activeLanguagesProps} : { 
//        activeLanguagesProps: Promise <{ id: number; code: string; time: string; image: string;
//        name: string; status: boolean; createdAt: Date; updatedAt: Date; language: $Enums.Language;
//        sort_order: number; locale: string; colorText: string; colorBackground: string; 
//        }[]> ; 
//          } ) 
      
      
      // { 
      //   activeLanguagesProps: Promise <{ id: number; code: string; time: string; image: string;
      //   name: string; status: boolean; createdAt: Date; updatedAt: Date; language: $Enums.Language;
      //   sort_order: number; locale: string; colorText: string; colorBackground: string; 
      //   }[]> ; 
      //     }


      // { 
      //   activeLanguagesProps:  { id: number; code: string; time: string; image: string;
      //   name: string; status: boolean; createdAt: Date; updatedAt: Date; language: $Enums.Language;
      //   sort_order: number; locale: string; colorText: string; colorBackground: string; 
      //   }[]
      //     }


  // {
   const nameFieldForm: INameFieldFormZod = {}; //формирование названий полей формы, для zod
   const defaultFieldForm: INameFieldForm = {}; //формирование названий полей формы, для переводных полей
   const arrayNameFormFieldDescriptionJson: Array<iArrayNameFormField> = [];
   const arrayNameFormFieldSeoJson: Array<iArrayNameFormField> = [];
   const arrayNameFormFieldNameSetParametrsJson: Array<iArrayNameFormField> = [];
   const arrayNameFormFieldNoTranslateData: Array<iArrayNameFormField> = [];

   //  const activeLanguages = getActiveLanguages() // передаем функ => Promise
   const activeLanguages = use (getActiveLanguages()) // getActiveLanguages() // передаем функ => Promise
   

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


    activeLanguages.map((lang ) => {
     categoryInputFormFieldsNoTranslateData[lang.code].map( (element,indexsort)=>
      {    
      nameFieldForm[element.namefield+lang.code] = element.zod;   // формируем название полей и валидацию zod
      defaultFieldForm[element.namefield+lang.code] = element.defaultfield; // формируем дефолтные значения полей  
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

// return {formSchema, formDefaultValues, 
//         arrayNameFormFieldDescriptionJson, arrayNameFormFieldSeoJson, 
//         arrayNameFormFieldNameSetParametrsJson, arrayNameFormFieldNoTranslateData}


// } 




export {
   formSchema, 
   formDefaultValues, 
   arrayNameFormFieldDescriptionJson,
   arrayNameFormFieldSeoJson,
   arrayNameFormFieldNameSetParametrsJson,
   arrayNameFormFieldNoTranslateData
}
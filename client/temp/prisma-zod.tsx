import { z } from "zod";
import { getActiveLanguages } from '@/utils/get-active-languages';
import type {iArrayNameFormField, INameFieldForm, INameFieldFormZod} from '@/types';
import { categoryInputFormFieldsDescriptionJson, 
  categoryInputFormFieldsNoTranslateData,
  categoryInputFormFieldsSeoJson,
  categoryInputFormFieldsNameSetParametrsJson} from '@/settings/category-input-form-fields'





 const languagesActive = await getActiveLanguages()

 const nameFieldForm: INameFieldFormZod = {}; //формирование названий полей формы, для переводных полей
 const defaultFieldForm: INameFieldForm = {}; //формирование названий полей формы, для переводных полей
 const arrayNameFormFieldDescriptionJson: Array<iArrayNameFormField> = [];
 const arrayNameFormFieldSeoJson: Array<iArrayNameFormField> = [];
 const arrayNameFormFieldNameSetParametrsJson: Array<iArrayNameFormField> = [];
 const arrayNameFormFieldNoTranslateData: Array<iArrayNameFormField> = [];
  
  



  languagesActive.map((lang ) => {
    console.log(lang.code)
    console.log(categoryInputFormFieldsDescriptionJson[lang.code])
    categoryInputFormFieldsDescriptionJson[lang.code].map( (element)=>{    
     nameFieldForm[element.namefield+lang.code] = element.zod;   // формируем название полей и валидацию zod
     defaultFieldForm[element.namefield+lang.code] = element.defaultfield; // формируем дефолтные значения полей
 
     arrayNameFormFieldDescriptionJson.push({
       key: element.namefield + lang.code,
       sort: lang.sort_order,
       namefield: element.namefield,
       namefieldlang: element.namefield + lang.code,
       labelfield: element.labelfield,
       placeholderfield: element.placeholderfield,
       descriptionfiled: element.descriptionfiled,
       defaultfield: element.defaultfield,
       zod: element.zod,
       typefield: element.typefield
     }
     )
    })


    categoryInputFormFieldsSeoJson[lang.code].map( (element)=>{    
      nameFieldForm[element.namefield+lang.code] = element.zod;   // формируем название полей и валидацию zod
      defaultFieldForm[element.namefield+lang.code] = element.defaultfield; // формируем дефолтные значения полей
  
      arrayNameFormFieldSeoJson.push({
        key: element.namefield + lang.code,
        sort: lang.sort_order,
        namefield: element.namefield,
        namefieldlang: element.namefield + lang.code,
        labelfield: element.labelfield,
        placeholderfield: element.placeholderfield,
        descriptionfiled: element.descriptionfiled,
        defaultfield: element.defaultfield,
        zod: element.zod,
        typefield: element.typefield
      }
      )
     })


     categoryInputFormFieldsNameSetParametrsJson[lang.code].map( (element)=>{    
      nameFieldForm[element.namefield+lang.code] = element.zod;   // формируем название полей и валидацию zod
      defaultFieldForm[element.namefield+lang.code] = element.defaultfield; // формируем дефолтные значения полей
  
      arrayNameFormFieldNameSetParametrsJson.push({
        key: element.namefield + lang.code,
        sort: lang.sort_order,
        namefield: element.namefield,
        namefieldlang: element.namefield + lang.code,
        labelfield: element.labelfield,
        placeholderfield: element.placeholderfield,
        descriptionfiled: element.descriptionfiled,
        defaultfield: element.defaultfield,
        zod: element.zod,
        typefield: element.typefield
      }
      )
     })


     categoryInputFormFieldsNoTranslateData[lang.code].map( (element)=>{    
      nameFieldForm[element.namefield+lang.code] = element.zod;   // формируем название полей и валидацию zod
      defaultFieldForm[element.namefield+lang.code] = element.defaultfield; // формируем дефолтные значения полей
  
      arrayNameFormFieldNoTranslateData.push({
        key: element.namefield + lang.code,
        sort: lang.sort_order,
        namefield: element.namefield,
        namefieldlang: element.namefield + lang.code,
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


export {formSchema, formDefaultValues, 
        arrayNameFormFieldDescriptionJson, arrayNameFormFieldSeoJson, 
        arrayNameFormFieldNameSetParametrsJson, arrayNameFormFieldNoTranslateData }
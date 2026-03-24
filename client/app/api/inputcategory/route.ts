// TODO make auth verification
import { I18n } from "@prisma/client";
import React from "react";
import { NextResponse } from "next/server";
import {
  getActiveLanguages,
  getBaseLanguage,
} from "@/utils/get-languages";

import {
  categoryInputFormFieldsNameJson,
  categoryInputFormFieldsDescriptionJson,
  categoryInputFormFieldsNoTranslateData,
  categoryInputFormFieldsSeoJson,
  categoryInputFormFieldsNameSetParametrsJson,
  IcategoryInputFormFields,
} from "@/settings/category-input-form-fields";
import { iArrayNameFormField, INameFieldFormZod } from "@/types";
import { z } from "zod";
import prismadb from "@/lib/prismadb";

export async function POST(request: Request) {
  try {
    const activeLanguages = await getActiveLanguages();
    const baseLanguage = await getBaseLanguage();    
    var baseLanguageCode: string = "ru";    
    baseLanguage
      ? (baseLanguageCode = baseLanguage.code)
      : (baseLanguageCode = "ru");
      
const formData = await request.formData();

//console.log('formDataServer11data', formData.getAll("data"));
// const body = JSON.parse( formData.get('data') );
const dataValue = formData.get('data');

const body = dataValue !== null ? JSON.parse(dataValue as string) : null;
const selectedImageJson = formData.get('selectedImageJson');
const fromEditorJson = formData.get('fromEditorJson') as string;

// console.log('formDataServer11fromEditorJson', formData.getAll("fromEditorJson"));
// const fromEditorJson = formData.getAll('fromEditorJson');
  
    
    // nulled elements Zod and ArrayValueForm
    const nameFieldForm: INameFieldFormZod = {}; //формирование названий полей формы, для zod
    const arrayNameFormFieldNameJson: Array<iArrayNameFormField> = [];
    const arrayNameFormFieldDescriptionJson: Array<iArrayNameFormField> = [];
    const arrayNameFormFieldSeoJson: Array<iArrayNameFormField> = [];
    const arrayNameFormFieldNameSetParametrsJson: Array<iArrayNameFormField> = [];
    const arrayNameFormFieldNoTranslateData: Array<iArrayNameFormField> = [];

    // create name field for validation zod  valueField
    activeLanguages.map((lang) => {
      categoryInputFormFieldsNameJson[lang.code].map((element, indexsort) => {
        nameFieldForm[element.namefield + lang.code] = element.zod; // формируем название полей и валидацию zod
      });

      categoryInputFormFieldsDescriptionJson[lang.code].map(
        (element, indexsort) => {
          nameFieldForm[element.namefield + lang.code] = element.zod; // формируем название полей и валидацию zod
        }
      );

      categoryInputFormFieldsSeoJson[lang.code].map((element, indexsort) => {
        nameFieldForm[element.namefield + lang.code] = element.zod; // формируем название полей и валидацию zod
      });

      categoryInputFormFieldsNameSetParametrsJson[lang.code].map(
        (element, indexsort) => {
          nameFieldForm[element.namefield + lang.code] = element.zod; // формируем название полей и валидацию zod
        }
      );
    });

    categoryInputFormFieldsNoTranslateData[baseLanguageCode].map(
      (element, indexsort) => {
        nameFieldForm[element.namefield + "notranslate"] = element.zod; // формируем название полей и валидацию zod
      }
    );

    // const formSchema = z.object({
    //   ...nameFieldForm,
    // });

    // create JSON string for insert to database Category

    const insertToCategoryNameJson: any = {}; // TODO not Any
    const insertToCategoryDescriptionJson: any = {};
    const insertToCategorySeoMetaJson: any = {};
    const insertToCategoryNameSetParametrsJson: any = {};
    const insertToCategoryNoTranslateData: any = {};   
    const dataInsertToCategoryNameJson: never[] = [];


    // activeLanguages.map((lang, indexsort) => {
    //   dataInsertToCategoryNameJson : [
    //     categoryInputFormFieldsNameJson[lang.code].map((element, indexsort) => {
    //       // ru.namefield = body.ru.namefield
    //       insertToCategoryNameJson[lang.code][element.namefield] =                     
    //         body[element.namefield + lang.code];
    //     })
    //   ];

    //   dataInsertToCategoryNameJson &&   insertToCategoryNameJson = { [lang.code] : {
    //     ...dataInsertToCategoryNameJson
    //   }}
    // })


    activeLanguages.map((lang) => {
      insertToCategoryNameJson[lang.code] = {};

      insertToCategoryDescriptionJson[lang.code] = {};
      insertToCategorySeoMetaJson[lang.code] = {};
      insertToCategoryNameSetParametrsJson[lang.code] = {};

      categoryInputFormFieldsNameJson[lang.code].map((element, indexsort) => {
        insertToCategoryNameJson[lang.code][element.namefield] =
          body[element.namefield + lang.code];
      });
      categoryInputFormFieldsDescriptionJson[lang.code].map(
        (element, indexsort) => {
          insertToCategoryDescriptionJson[lang.code][element.namefield] =
            body[element.namefield + lang.code];
        }
      );
      categoryInputFormFieldsSeoJson[lang.code].map((element, indexsort) => {
        insertToCategorySeoMetaJson[lang.code][element.namefield] =
          body[element.namefield + lang.code];
      });
      categoryInputFormFieldsNameSetParametrsJson[lang.code].map(
        (element, indexsort) => {
          insertToCategoryNameSetParametrsJson[lang.code][element.namefield] =
            body[element.namefield + lang.code];
        }
      );
    });

    categoryInputFormFieldsNoTranslateData[baseLanguageCode].map(
      (element, indexsort) => {
        insertToCategoryNoTranslateData[element.namefield] =
          body[element.namefield + "notranslate"];
      }
    );

    //----------------------------------
    // console.log(request);
    // console.log("activeLanguages: ");
    // console.dir(activeLanguages, { depth: null });

    // console.log("body: ");
    // console.dir(body, { depth: null });

    console.log("insertToCategoryNameJson: ");
    console.dir(insertToCategoryNameJson, { depth: null });  // TOBASE
    console.log("insertToCategoryNameJson: ", insertToCategoryNameJson);
    console.dir(insertToCategoryNameJson, { depth: null });  // TOBASE

    console.log("insertToCategoryDescriptionJson: ");
    console.dir(insertToCategoryDescriptionJson, { depth: null }); // TOBASE

    console.log("insertToCategorySeoMetaJson: ");
    console.dir(insertToCategorySeoMetaJson, { depth: null }); // TOBASE

    console.log("insertToCategoryNameSetParametrsJson: ");
    console.dir(insertToCategoryNameSetParametrsJson, { depth: null }); // TOBASE

    //console.log("insertToCategoryNameSetParametrsJson: ");
    //console.dir(JSON.stringify(insertToCategoryNameSetParametrsJson), {depth: null });

    console.log('formDataServer11selectedImageJson', selectedImageJson); // TOBASE      
    console.dir(selectedImageJson, { depth: null });
    console.dir(JSON.stringify(selectedImageJson), { depth: null });

    console.log("insertToCategoryNoTranslateData: ");
     console.dir(insertToCategoryNoTranslateData, { depth: null });
    console.dir(JSON.stringify(insertToCategoryNoTranslateData), { depth: null });

    console.log("fromEditorJson: ");
    console.dir(fromEditorJson, { depth: null });    
    console.dir(JSON.stringify(fromEditorJson), { depth: null });    

    const objFromEditorJson = JSON.parse(fromEditorJson);
    // const objFromEditorJsonParse = JSON.parse(objFromEditorJson);
    console.dir(objFromEditorJson, { depth: null });

//  throw new Error("error no ne sovsem1");



    const orderDb = await prismadb.category.create({
      data: {
        categoryNameJson: insertToCategoryNameJson,
        categoryDescriptionJson: insertToCategoryDescriptionJson,
        categorySeoMetaJson: insertToCategorySeoMetaJson,
        categoryNameSetParametrsJson: insertToCategoryNameSetParametrsJson,
        imagesJson: selectedImageJson,  
         editorCategoryJson: {
           create: { editorCategoryJson: objFromEditorJson},          
         },        
        ...insertToCategoryNoTranslateData,             
      },
      // include: {
      //   EditorCategoryJson: true, // Include all editorJson in the returned object
      // },
    })



    console.log("orderDb: ", orderDb)

    return NextResponse.json(orderDb);
  
  } catch (error) {
    console.log(`Error inRouteCategoryInput:${error}`);
    return NextResponse.json(`Error inRouteCategoryInput:${error}`);
  }
}



export async function GET(request: Request) {
  try {  
   const searchParams = new URL(request.url).searchParams;       
   const selectCategory =[...searchParams.getAll('items')!];  

  const getOnCategoriesNameJsonNameSetParametrsJsonInCategory= await prismadb.category.findMany({
      select: {
      id: true,
      categoryNameJson: true,
      categoryNameSetParametrsJson: true
    },
    where: {      
      status: 1,
      id: {
        in: selectCategory.map(Number)
      }
    }
  })
  

  console.log('getOnCategoriesNameJsonNameSetParametrsJsonInCategory ',getOnCategoriesNameJsonNameSetParametrsJsonInCategory);

  

 
    return NextResponse.json(
      {   
 getOnCategoriesNameJsonNameSetParametrsJsonInCategory: getOnCategoriesNameJsonNameSetParametrsJsonInCategory,
       }      
    );
  } catch (error) {
    // handle any unknown error
    return NextResponse.json(
      { error: 'Error get list of files.' },
      { status: 500 }
    );
  }
}

// TODO make auth verification
import { L18n } from "@prisma/client";
import React from "react";
import { NextResponse } from "next/server";
import {
  getActiveLanguages,
  getBaseLanguage,
} from "@/utils/get-active-languages";

import {
  categoryInputFormFieldsNameJson,
  categoryInputFormFieldsDescriptionJson,
  categoryInputFormFieldsNoTranslateData,
  categoryInputFormFieldsSeoJson,
  categoryInputFormFieldsNameSetParametrsJson,
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
    const body = await request.json();

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

    const formSchema = z.object({
      ...nameFieldForm,
    });

    // create JSON string for insert to database Category

    const insertToCategoryNameJson: any = {}; // TODO not Any
    const insertToCategoryDescriptionJson: any = {};
    const insertToCategorySeoMetaJson: any = {};
    const insertToCategoryNameSetParametrsJson: any = {};
    const insertToCategoryNoTranslateData: any = {};

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
    console.log("activeLanguages: ");
    console.dir(activeLanguages, { depth: null });

    console.log("body: ");
    console.dir(body, { depth: null });

    console.log("insertToCategoryNameJson: ");
    console.dir(insertToCategoryNameJson, { depth: null });

    console.log("insertToCategoryNameJson: ");
   // console.dir(JSON.stringify(insertToCategoryNameJson), { depth: null });

    console.log("insertToCategoryDescriptionJson: ");
    console.dir(insertToCategoryDescriptionJson, { depth: null });

    console.log("insertToCategoryDescriptionJson: ");
    //console.dir(JSON.stringify(insertToCategoryDescriptionJson), { depth: null });

    console.log("insertToCategorySeoMetaJson: ");
    console.dir(insertToCategorySeoMetaJson, { depth: null });

    console.log("insertToCategorySeoMetaJson: ");
    //console.dir(JSON.stringify(insertToCategorySeoMetaJson), { depth: null });

    console.log("insertToCategoryNameSetParametrsJson: ");
    console.dir(insertToCategoryNameSetParametrsJson, { depth: null });

    console.log("insertToCategoryNameSetParametrsJson: ");
    //console.dir(JSON.stringify(insertToCategoryNameSetParametrsJson), {depth: null });

    console.log("insertToCategoryNoTranslateData: ");
    console.dir(JSON.stringify(insertToCategoryNoTranslateData), { depth: null });

    // NameJson parsing
    // DescriptionJson parsing
    // SeoJson parsing
    // NameSetParametrsJson parsing
    // NoTranslateData parsing





    const orderDb = await prismadb.category.create({
      data: {
        categoryNameJson: insertToCategoryNameJson,
        categoryDescriptionJson: insertToCategoryDescriptionJson,
        categorySeoMetaJson: insertToCategorySeoMetaJson,
        categoryNameSetParametrsJson: insertToCategoryNameSetParametrsJson,
        ...insertToCategoryNoTranslateData                
      }
    })





    return NextResponse.json(
      // [
      // JSON.stringify(insertToCategoryNameJson),
      // JSON.stringify(insertToCategoryDescriptionJson),
      // JSON.stringify(insertToCategorySeoMetaJson),
      // JSON.stringify(insertToCategoryNameSetParametrsJson),
      // JSON.stringify(insertToCategoryNoTranslateData),
      // ]
      JSON.stringify(orderDb)
  );
  } catch (error) {
    console.log(`Error inRouteCategoryInput:${error}`);
    return NextResponse.json(`Error inRouteCategoryInput:${error}`);
  }
}

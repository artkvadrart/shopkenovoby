// TODO make auth verification
import { L18n } from '@prisma/client';
import React from 'react';
import { NextResponse } from "next/server";
import { getActiveLanguages } from "@/utils/get-active-languages";
import { categoryInputFormFieldsDescriptionJson, 
         categoryInputFormFieldsNoTranslateData,
         categoryInputFormFieldsSeoJson,
         categoryInputFormFieldsNameSetParametrsJson} from '@/settings/category-input-form-fields'

export async function POST(
  request: Request
  
) {
  try {
  const activeLanguages = await getActiveLanguages();
  const body = await request.json();
  console.log(request);
  console.log('activeLanguages: ');
  console.dir(activeLanguages, { depth: null });
    
  console.log('body: ');
  console.dir(body, { depth: null });
  

// DescriptionJson parsing
// SeoJson parsing
// NameSetParametrsJson parsing

// NoTranslateData parsing

return NextResponse.json({ body })
  } 
  catch (error) {
    console.log(`Error inRouteCategoryInput:${error}`) 
  }

}
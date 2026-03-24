import {  iGetCategoriesNameJsonNameSetParametrsJson } from "@/utils/get-categories";
import { iGetActiveCurrency } from "@/utils/get-curency";
import { $Enums } from "@prisma/client";

export interface iProductsFormFieldsCyclicProps {
  activeLanguagesProps: Promise<{
    id: number;
    name: string;
    code: string;      
    language: $Enums.Language;
    sort_order: number;
    status: boolean;      
  }[]>;

  baseLanguageProps: Promise<{
    id: number;
    name: string;
    code: string;    
    language: $Enums.Language;
    sort_order: number;
    status: boolean;
  } | null>;

  getActiveCurrencyProps: Promise<iGetActiveCurrency> ;
  getCategoriesProps: Promise<PrismaJson.typeCategoryNameJson>;
  getProductsProps: Promise<PrismaJson.typeProductNameJson>;
  getCategoriesNameJsonNameSetParametrsJsonProps: iGetCategoriesNameJsonNameSetParametrsJson;    
  }


export interface iIdNameProducts {
  [key: string]: iJsonLangProducts;
}

export interface iJsonLangProducts {
  [key: string]: iJsonNameProducts;
}

export interface iJsonNameProducts {
  [key: string]: string;
}  


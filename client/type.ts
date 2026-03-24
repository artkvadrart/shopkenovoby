import { JsonValue } from "@prisma/client/runtime/library";

declare global {
   namespace PrismaJson {
    export type typeCategoryNameJson = { 
      id: number; 
      categoryNameJson: typeCategoryNameLangJson<JsonValue>; 
      categoryNameSetParametrsJson: typeCategoryNameSetParametrsJson<JsonValue>; }[];
    
    export type typeCategoryNameLangJson<T> = {
      [key: string]: typeCategoriesNameLangItemJson<T>;
    };
    export type typeCategoriesNameLangItemJson<T> = {
      [key: string]: T;
    };
    
    export type typeCategoryNameSetParametrsJson<T> = {
      [key: string]: typeCategoriesNameSetParametrsJson<T>;
    };
    export type typeCategoriesNameSetParametrsJson<T> = {
      [key: string]: T;
    };  


    export type typeProductNameJson = {
      id: number; 
      productNameJson:  typeProductNameLangJson<JsonValue>;// iProductsNameJson<JsonValue>   unknown   PrismaJson.typeCategoryNameJson;
    }[];

    export type typeProductNameLangJson<T> = {
      [key: string]: typeProductNameLangItemJson<T>;
    };

    export type typeProductNameLangItemJson<T> = {
      [key: string]: T;
    };  



    export type iGetProducts = 
     { id: number; 
      productNameJson:  PrismaJson.typeProductNameJson;// iProductsNameJson<JsonValue>   unknown   PrismaJson.typeCategoryNameJson;   
    }[];


export interface iProductsNameJson<T> {
     [key: string]: IProductsNameItem<T>;
     }
     
export interface IProductsNameItem<T>{
     [key: string]: T;
     }





    type ComplexType = { foo: string; bar: number };
    // Define your custom types here!
  }
}

// The file MUST be a module! 
 export type {PrismaJson}



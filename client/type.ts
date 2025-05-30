declare global {
   namespace PrismaJson {
    export type typeCategoryNameJson = {
      [key: string]: typeJsonLangCategories;
    };
    export type typeJsonLangCategories = {
      [key: string]: typeJsonNameCategories;
    };
    export type typeJsonNameCategories = {
      [key: string]: string;
    };  



    type ComplexType = { foo: string; bar: number };
    // Define your custom types here!
  }
}

// The file MUST be a module! 
 export type {PrismaJson }



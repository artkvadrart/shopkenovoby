import prismadb from "@/lib/prismadb";
// import type { PrismaJson } from '@/type'
// import { JsonValue } from "@prisma/client/runtime/library";
// import { iGetCategories } from "./get-categories";



// export type iGetProducts = 
//      { id: number; 
//       productNameJson:  PrismaJson.typeProductNameJson;// iProductsNameJson<JsonValue>   unknown   PrismaJson.typeCategoryNameJson;   
//     }[];


// export interface iProductsNameJson<T> {
//      [key: string]: IProductsNameItem<T>;
//      }
     
// export interface IProductsNameItem<T>{
//      [key: string]: T;
//      }



async function getProducts(): Promise<PrismaJson.typeProductNameJson> {
  const getProducts = await prismadb.product.findMany({
      select: {
      id: true,
      productNameJson: true,
    },   
  }) 
  return getProducts
};


async function getEnabledProducts(): Promise<PrismaJson.typeProductNameJson> {
  const getEnabledProducts = await prismadb.product.findMany({
      select: {
      id: true,
      productNameJson: true,
    },   
  }) 
  return getEnabledProducts
};


async function getEnabledProductsInCategory(): Promise<PrismaJson.typeProductNameJson> {
  const getEnabledProductsInCategory = await prismadb.product.findMany({
      select: {
      id: true,
      productNameJson: true,
      categories: true,            
    },
    where: {      
      status: 1,
    }
  }) 
  return getEnabledProductsInCategory
};







//TODO: подключить связанные поля ProductNameJson и DescriptionJson
const getPathsProducts = async () => {
  const pathsProducts = await prismadb.product.findMany({
    select: {
    id: true,
    productNameJson: true,
    productDescriptionJson: true,
  //  productSeoJson: true,
  //  idParent: true,
    
    }
    
  });


  const categoriesArr = []
  pathsProducts.map((item) => { 
     // return {
    //   id: item.id,
    //   categoryDescriptionJson: item.categoryDescriptionJson,
    //   idParent: item.idParent,
    //   categoryPath: item.categoryPath,
    // }
  })
  
  return pathsProducts;
};


export {getProducts, getEnabledProducts, getPathsProducts}
import prismadb from "@/lib/prismadb";
import { JsonValue } from "@prisma/client/runtime/library";

export type iGetCategoriesNameJsonNameSetParametrsJson = 
     Promise<{ id: number; categoryNameJson: JsonValue; categoryNameSetParametrsJson: JsonValue; }[] | null>;

 export type iGetCategoriesNameJsonNameSetParametrsJsonInCategory = 
     Promise<{ id: number; categoryNameJson: JsonValue; categoryNameSetParametrsJson: JsonValue; }[] | null>;    


// export type iGetCategories = 
//      { id: number; categoryNameJson: iCategoryNameJson<JsonValue>; categoryNameSetParametrsJson: JsonValue; }[];


// export interface iCategoryNameJson<T> {
//      [key: string]: ICategoryNameItem<T>;
//      }
     
// export interface ICategoryNameItem<T>{
//      [key: string]: T;
//      }


async function getCategories(): Promise<PrismaJson.typeCategoryNameJson> {
  const getCategories= await prismadb.category.findMany({
      select: {
      id: true,
      categoryNameJson: true,
      categoryNameSetParametrsJson: true
    },   
  })
  return getCategories
};


async function getCategoriesNameJsonNameSetParametrsJson(): iGetCategoriesNameJsonNameSetParametrsJson {
  const getCategoriesNameJsonNameSetParametrsJsonProps= await prismadb.category.findMany({
      select: {
      id: true,
      categoryNameJson: true,
      categoryNameSetParametrsJson: true
    },   
  })
  return getCategoriesNameJsonNameSetParametrsJsonProps
};



const getEnabledCategories = async () => {
  await prismadb.category.findMany({
    where: {      
      status: 1,
    }
  })
};


async function getEnabledCategoriesNameJsonNameSetParametrsJson(): iGetCategoriesNameJsonNameSetParametrsJson {
  const getCategoriesNameJsonNameSetParametrsJsonProps= await prismadb.category.findMany({
      select: {
      id: true,
      categoryNameJson: true,
      categoryNameSetParametrsJson: true
    },
    where: {      
      status: 1,
    }
  })
  return getCategoriesNameJsonNameSetParametrsJsonProps
};


async function getOnCategoriesNameJsonNameSetParametrsJsonInCategory(idCategory: string[]) : Promise<PrismaJson.typeCategoryNameJson> {

  console.log("idCategory", idCategory);
  
  const getOnCategoriesNameJsonNameSetParametrsJsonInCategory= await prismadb.category.findMany({
      select: {
      id: true,
      categoryNameJson: true,
      categoryNameSetParametrsJson: true
    },
    where: {      
      status: 1,
      id: {
        in: idCategory.map(Number)
      }

    }
  })
  return getOnCategoriesNameJsonNameSetParametrsJsonInCategory
};

// const getOnCategoriesNameJsonNameSetParametrsJsonInCategory    = async (idCategory: string[]) : Promise<PrismaJson.typeCategoryNameJson> => {
//   const getOnCategoriesNameJsonNameSetParametrsJsonInCategory= await prismadb.category.findMany({
//       select: {
//       id: true,
//       categoryNameJson: true,
//       categoryNameSetParametrsJson: true
//     },
//     where: {      
//       status: 1,
//       id: {
//         in: idCategory.map(Number)
//       }
//     }
//   })
//   return getOnCategoriesNameJsonNameSetParametrsJsonInCategory
// };





// const getCategoriesNameJsonNameSetParametrsJson = async () => {
//   await prismadb.category.findMany({
//       select: {
//       id: true,
//       categoryNameJson: true,
//       categoryNameSetParametrsJson: true
//     },
//     where: {      
//       status: 1,
//     }
//   })
// };


const getNameSetParametrsJson = async (id: number) => {
  await prismadb.category.findMany({
    select: {
      id: true,
      categoryNameSetParametrsJson: true
    },
    where: {      
      // status: 1,  // ?????????? 
      id: id
    }
  })
};



const getPathsCategories = async () => {
  const pathsCategories = await prismadb.category.findMany({
    select: {
    id: true,
    categoryNameJson: true,
 //   categoryDescriptionJson: true,
  //  idParent: true,
    categoryPath: true
    }
    
  });


  const categoriesArr = []
  pathsCategories.map((item) => { 
     // return {
    //   id: item.id,
    //   categoryDescriptionJson: item.categoryDescriptionJson,
    //   idParent: item.idParent,
    //   categoryPath: item.categoryPath,
    // }
  })
  
  return pathsCategories;
};


export {getCategories, getEnabledCategories, getPathsCategories, getCategoriesNameJsonNameSetParametrsJson, getEnabledCategoriesNameJsonNameSetParametrsJson, getNameSetParametrsJson, getOnCategoriesNameJsonNameSetParametrsJsonInCategory}
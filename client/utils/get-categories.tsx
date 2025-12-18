import prismadb from "@/lib/prismadb";

const getCategories = async () => {
  await prismadb.category.findMany({
    where: {      
      status: 1,
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


export {getCategories, getPathsCategories}
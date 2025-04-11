import prismadb from "@/lib/prismadb";

const getCategories = async () => {
  const allCategories = await prismadb.category.findMany({
    where: {      
      status: 1,
    }
  });
  return allCategories;
};

const getPathsCategories = async () => {
  const pathsCategories = await prismadb.category.findMany({
    where: {      
      status: 1,
    }
  });
  return pathsCategories;
};


export {getCategories, getPathsCategories}
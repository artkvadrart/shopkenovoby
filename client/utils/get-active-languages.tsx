import prismadb from "@/lib/prismadb";

const getActiveLanguages = async () => {
  const languagesActive = await prismadb.l18n.findMany({
    select: {
      id: true,
      name: true,
      code: true,
      locale: true,
      language: true,
      sort_order: true,
      status: true,
      time: true,
      colorText: true,
      colorBackground: true
      },
    where: {      
      status: true,
    }
  });
  return languagesActive;
};

const getBaseLanguage = async () => {
  const baseLanguage = await prismadb.l18n.findFirst({
    select: {
      id: true,
      name: true,
      code: true,
      locale: true,
      language: true,
      sort_order: true,
      status: true,
      time: true,
      colorText: true,
      colorBackground: true
      },
    where: {      
      sort_order: 0,
    }
  });
  return baseLanguage;
};



export {getActiveLanguages, getBaseLanguage}
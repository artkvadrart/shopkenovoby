import prismadb from "@/lib/prismadb";
import { $Enums } from "@prisma/client";

export interface iActiveLanguages {
        id: number;
        name: string;
        code: string;
        language: $Enums.Language;
        sort_order: number;
        status: boolean;
    };

export interface iBaseLanguages{
        id: number;
        name: string;
        code: string;
        language: $Enums.Language;
        sort_order: number;
        status: boolean;
    };
    
export interface iAllLanguages{
        id: number;
        name: string;
        code: string;
        language: $Enums.Language;
        sort_order: number;
        status: boolean;
    };

const getActiveLanguages = async () => {
  const languagesActive = await prismadb.i18n.findMany({
    select: {
      id: true,
      name: true,
      code: true,      
      language: true,
      sort_order: true,
      status: true,      
      },
    where: {      
      status: true,
    }
  });
  return languagesActive;
};

const getBaseLanguage = async () => {
  const baseLanguage = await prismadb.i18n.findFirst({
    select: {
      id: true,
      name: true,
      code: true,      
      language: true,
      sort_order: true,
      status: true,
      },
    where: {      
      sort_order: 0,
    }
  });
  return baseLanguage;
};

const getAllLanguages = async () => {
  const baseLanguage = await prismadb.i18n.findFirst({
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




export {getActiveLanguages, getBaseLanguage, getAllLanguages}

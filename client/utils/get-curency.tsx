import prismadb from "@/lib/prismadb";
import { $Enums } from "@prisma/client";

export type iGetActiveCurrency = {
    id: number;
    isDefault: boolean;
    codeCurrency: string;
    valueCurrency: number;
}[];

export interface iGetAllCurrency{
        id: number;
        isDefault: boolean;
        codeCurrency: string;
        valueCurrency: number;        
    };

export interface iGetBaseCurrency{
        id: number;
        isDefault: boolean;
        codeCurrency: string;
        valueCurrency: number;        
    };
    

const getBaseCurrency = async () => {
  const currencyActive = await prismadb.currency.findFirst({
    select: {
      id: true,
      codeCurrency: true,      
      valueCurrency: true,
      },
    where: {      
      isDefault: true,

    }
  });
  return currencyActive;
};


// const getActiveCurrency = async () => {
//   const currencyActive = await prismadb.currency.findMany({
//     select: {
//       id: true,
//       codeCurrency: true,      
//       valueCurrency: true,
//       isDefault: true
//       },
//     where: {      
//       isActive: true,

//     }
//   });
//   return currencyActive;
// };

async function getActiveCurrency(): Promise<iGetActiveCurrency> {
  const getActiveCurrency  = await prismadb.currency.findMany({
      select: {
      id: true,
      codeCurrency: true,      
      valueCurrency: true,
      isDefault: true
      },
    where: {      
      isActive: true,
    },
  }); 
  return getActiveCurrency 
};



const getAllCurrency = async () => {
  const allCurrency = await prismadb.currency.findMany({
    select: {
      id: true,
      isDefault: true,
      codeCurrency: true,
      valueCurrency: true
      }
  });
  return allCurrency;
};




export {getActiveCurrency, getAllCurrency, getBaseCurrency}

import { $Enums } from "@prisma/client";

export interface iFormFieldsCyclicProps {
  activeLanguagesProps: Promise<
    {
      id: number;
      name: string;
      code: string;
      locale: string;
      language: $Enums.Language;
      sort_order: number;
      status: boolean;
      time: string;
      colorText: string;
      colorBackground: string;
    }[]
  >;
  baseLanguageProps: Promise<{
    id: number;
    name: string;
    code: string;
    locale: string;
    language: $Enums.Language;
    sort_order: number;
    status: boolean;
    time: string;
    colorText: string;
    colorBackground: string;
  } | null>;
  getPathsCategoriesProps: Promise<
    {
      id: number;
      categoryNameJson: PrismaJson.typeCategoryNameJson;
      categoryPath: string;
      valuesSelectCategoryPath?: number[];
      numberReversSortCategoryPath?: number;
    }[]
  >;
}

export interface iIdNameCategories {
  [key: string]: iJsonLangCategories;
}

export interface iJsonLangCategories {
  [key: string]: iJsonNameCategories;
}

export interface iJsonNameCategories {
  [key: string]: string;
}  


import { getActiveLanguages, getBaseLanguage } from "@/utils/get-languages";
import { getPathsCategories} from "@/utils/get-categories"
import { iArrayNameFormField, INameFieldForm, INameFieldFormZod } from '@/types'
import { UseFormReturn } from "react-hook-form";
import { $Enums } from "@prisma/client";
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import GetTypeField from '@/app/db/categories/input/components/get-type-field'


  function FormReactHooksNameSetParametrs({
    formControlProps,
    arrayNameFormFieldNameSetParametrsJsonProps,
    formProps,
    activeLanguagesProps,
    pathsCategoriesProps,
    baseLanguageCodeProps 
  }: {
    formControlProps: any;
    arrayNameFormFieldNameSetParametrsJsonProps: Array<iArrayNameFormField> ;
    formProps: UseFormReturn<Record<string, unknown>, any, Record<string, unknown>>;
    activeLanguagesProps:{
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
    }[];
    pathsCategoriesProps: {
    id: number;
     // categoryNameJson: iJsonLangCategories;
    categoryNameJson: PrismaJson.typeCategoryNameJson ;
   // categoryDescriptionJson: JsonValue;
   //  idParent: number; for delete
    categoryPath: string;
    valuesSelectCategoryPath?: number[];
    numberReversSortCategoryPath?: number
}[];
    baseLanguageCodeProps: string;
  }) {
    const arrayJSX: Array<React.ReactNode> = [];

    arrayNameFormFieldNameSetParametrsJsonProps.sort((a, b) =>
      a.namefieldlangsort > b.namefieldlangsort ? 1 : -1
    );

    let variablePrev: string = "";
    let variableNow: string = "";
    let i = 1;

    arrayNameFormFieldNameSetParametrsJsonProps.map((description) => {
      variableNow = description.namefield;
      if (variableNow != variablePrev && i < activeLanguagesProps.length) {
        description.classhtml =
          "bg-zinc-200 border-t-2 border-x-2 border-stone-300 rounded-t-sm p-4 mt-4";
        variablePrev = description.namefield;
        i++;
      } else if (variableNow === variablePrev && i < activeLanguagesProps.length) {
        description.classhtml = "bg-zinc-200 border-x-2 border-stone-300  p-4 ";
        variablePrev = description.namefield;
        i++;
      } else if (variableNow === variablePrev && i == activeLanguagesProps.length) {
        description.classhtml =
          "bg-zinc-200 border-b-2 border-x-2 border-stone-300 rounded-b-sm p-4 mb-4";
        i = 1;
      }
    });

    arrayNameFormFieldNameSetParametrsJsonProps.map((element, index) => {
      arrayJSX.push(
        <FormField
          key={`${element.namefieldlang}textarea${index}`}
          control={formControlProps}
          name={element.namefieldlang}
          render={({ field }) => (
            <div className=" box shadow-lg shadow-black-200/80">
            <FormItem className={element.classhtml}>
              {/* <FormLabel>{description.labelfield + "***********************"}</FormLabel> */}
              <FormControl>
              <GetTypeField
                  form = {formProps}
                  indexGet = {index}
                  namefield = {element.namefield}
                  namefieldlang = {element.namefieldlang}
                  labelfield = {element.namefield + " (" + element.languagename + ")"}
                  placeholderfield = {element.placeholderfield}
                  descriptionfiled = {element.descriptionfiled}
                  defaultfield = {element.defaultfield}
                  typefield = {element.typefield}
                  field = {field}
                  activeLanguages = {activeLanguagesProps}
                  pathsCategories = {pathsCategoriesProps}
                  baseLanguageCode = {baseLanguageCodeProps}
                /> 
              </FormControl>
              <FormDescription>{element.descriptionfiled}</FormDescription>
              <FormMessage />
            </FormItem>
            </div>
          )}
        />
      );
    });
    return <div> {...arrayJSX} </div>;
  }
  
  export default FormReactHooksNameSetParametrs
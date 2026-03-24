import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import GetTypeField from "./get-type-field";
import { getActiveLanguages, getBaseLanguage, iActiveLanguages, iBaseLanguages } from "@/utils/get-languages";
import { getPathsCategories} from "@/utils/get-categories"
import { iArrayNameFormField, INameFieldForm, INameFieldFormZod } from '@/types'
import { UseFormReturn } from "react-hook-form";
import { $Enums } from "@prisma/client";

   function FormReactHooksNoTranslateData({
    formControlProps,
    arrayNameFormFieldNoTranslateDataProps,
    formProps,
    activeLanguagesProps,
    pathsCategoriesProps,
    baseLanguageCodeProps    
  }: {  
    formControlProps: any,
    arrayNameFormFieldNoTranslateDataProps: Array<iArrayNameFormField>;
    formProps: UseFormReturn<Record<string, unknown>, any, Record<string, unknown>>;
    activeLanguagesProps:iActiveLanguages[];
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
    baseLanguageCodeProps: string
  }) {
    const arrayJSX: Array<React.ReactNode> = [];

    arrayNameFormFieldNoTranslateDataProps.map((element, index) => {
      arrayJSX.push(
        <FormField
          key={`${element.namefieldlang}textarea${index}`}
          control={formControlProps}
          name={element.namefieldlang}
          render={({ field }) => (
            <div className=" box shadow-lg shadow-black-200/80">
            <FormItem className={element.classhtml+" bg-zinc-200 "}>
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

  export default  FormReactHooksNoTranslateData 
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import GetTypeField from "./get-type-field";
import { getActiveLanguages, getBaseLanguage, iActiveLanguages, iBaseLanguages } from "@/utils/get-languages";
import { getPathsProducts} from "@/utils/get-products"
import { iArrayNameFormField, INameFieldForm, INameFieldFormZod } from '@/types'
import { UseFormReturn } from "react-hook-form";
import { $Enums } from "@prisma/client";


   function FormReactHooksJoinProducts({
    formControlProps,
    getCategoriesProps,
    getProductsProps,
    arrayNameFormFieldJoinProductsJsonProps,
    formProps,
    activeLanguagesProps,
    // pathsProductsProps,
    baseLanguageCodeProps    
  }: {  
    formControlProps: any;
    getCategoriesProps: PrismaJson.typeCategoryNameJson;
    getProductsProps: PrismaJson.typeProductNameJson;
    arrayNameFormFieldJoinProductsJsonProps: Array<iArrayNameFormField>;
    formProps: UseFormReturn<Record<string, unknown>, any, Record<string, unknown>>;
    activeLanguagesProps:iActiveLanguages[];
    // pathsProductsProps: {
    //   id: number;
        // productNameJson: iJsonLangProducts;
      // productNameJson: PrismaJson.typeProductNameJson ;
        // productDescriptionJson: JsonValue;
        //  idParent: number; for delete
      // productPath: string;
      // valuesSelectProductPath?: number[];
      // numberReversSortProductPath?: number
      // }[];
    baseLanguageCodeProps: string
  }) {
    const arrayJSX: Array<React.ReactNode> = [];

    arrayNameFormFieldJoinProductsJsonProps.map((element, index) => {
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
                  getCategoriesProps = {getCategoriesProps}
                  getProductsProps = {getProductsProps}
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
                  // pathsProducts = {pathsProductsProps}
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

  export default  FormReactHooksJoinProducts
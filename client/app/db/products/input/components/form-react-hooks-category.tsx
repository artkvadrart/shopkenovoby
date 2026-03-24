import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import GetTypeField from "./get-type-field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "@/components/ui/select"
import { MultiSelect, MultiSelectContent, MultiSelectGroup, MultiSelectItem, MultiSelectTrigger, MultiSelectValue } from "@/components/ui/multi-select"
import { getActiveLanguages, getBaseLanguage, iActiveLanguages, iBaseLanguages } from "@/utils/get-languages";
import { getPathsProducts} from "@/utils/get-products"
import { iArrayNameFormField, INameFieldForm, INameFieldFormZod } from '@/types'
import { UseFormReturn } from "react-hook-form";
import { $Enums } from "@prisma/client";
import { Label } from "@/components/ui/label";
import { on } from "events";


   function FormReactHooksCategory({
    formControlProps,
    getCategoriesProps,
    getProductsProps,
    arrayNameFormFieldCategoryJsonProps,
    formProps,
    activeLanguagesProps,
    // pathsProductsProps,
    baseLanguageCodeProps, 
    setSelectCategoryProps   
  }: {  
    formControlProps: any;
    getCategoriesProps: PrismaJson.typeCategoryNameJson;
    getProductsProps: PrismaJson.typeProductNameJson;
    arrayNameFormFieldCategoryJsonProps: Array<iArrayNameFormField>;
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
    setSelectCategoryProps: any
  }) {
    const arrayJSX: Array<React.ReactNode> = [];

    arrayNameFormFieldCategoryJsonProps.map((element, index) => {
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
              {/* <GetTypeField
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
                /> */}

                  <div>
                    <Label htmlFor={`${element.namefieldlang}select${index}`}>{element.namefield + " (" + element.languagename + ")"}</Label>
                    <MultiSelect  onValuesChange = {(item) => setSelectCategoryProps (item)} >
                      <MultiSelectTrigger className="w-full bg-white">
                        <MultiSelectValue placeholder={element.placeholderfield} />
                      </MultiSelectTrigger>
                      <MultiSelectContent className="w-full bg-white text-black">
                        <MultiSelectGroup >
                          {getCategoriesProps && getCategoriesProps.map((elementMulti, indexMulti) => {
                            return <MultiSelectItem key={indexMulti * 10 + 54} value={elementMulti.id.toString()     }>
                              {activeLanguagesProps && activeLanguagesProps.map((lang, indexlang) => {
                                if (elementMulti.categoryNameJson && elementMulti.categoryNameJson[lang.code] && elementMulti.categoryNameJson[lang.code].name) {
                                  return `${indexlang === 0 ? "" : "..."}` + elementMulti.categoryNameJson[lang.code].name;
                                } else {
                                  return null;
                                }
                              })}
                            </MultiSelectItem>
                          })}
                        </MultiSelectGroup>
                      </MultiSelectContent>
                    </MultiSelect>
                    </div>
                 


                
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

  export default  FormReactHooksCategory 
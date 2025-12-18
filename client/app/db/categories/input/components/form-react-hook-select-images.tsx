import { getActiveLanguages, getBaseLanguage } from "@/utils/get-languages";
import { getPathsCategories} from "@/utils/get-categories"
import { iArrayNameFormField, INameFieldForm, INameFieldFormZod } from '@/types'
import { UseFormReturn, Validate } from "react-hook-form";
import { $Enums } from "@prisma/client";
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import GetTypeField from '@/app/db/categories/input/components/get-type-field'
import z from "zod";

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";


  function FormReactHooksSelectedImages({
    formControlProps,
    arrayNameFormFieldSelectedImagesProps,
    formProps,
    activeLanguagesProps,
    pathsCategoriesProps,
    baseLanguageCodeProps 
  }: {
    formControlProps: any;
    arrayNameFormFieldSelectedImagesProps: Array<iArrayNameFormField> ;
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
    let srsImgPrev: string = '';
    let srsImg: boolean = false;
    const lengthActiveLanguages = activeLanguagesProps.length;
    const lengthRows = arrayNameFormFieldSelectedImagesProps.length;
    let classColRow = ` row-span-${lengthActiveLanguages} col-span-5 `;
    let disabledButtonUp  = true;
    let disabledButtonDown = true;
       let variablePrev: string = "";
    let variableNow: string = "";
    let i = 1;


 arrayNameFormFieldSelectedImagesProps.sort((a, b) =>
      a.namefieldlangsort > b.namefieldlangsort ? 1 : -1
    );

 
    

    arrayNameFormFieldSelectedImagesProps.map((description) => {
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
  

    arrayNameFormFieldSelectedImagesProps.map((element, index) => {  // MAP TODO:
      formProps.register(element.namefieldlang, {
        required: false,
        value: 12345,
        disabled: false
      }); 

      formControlProps.register(element.namefieldlang, {
        required: false,
        valueAsNumber: false,
        disabled: false,
        onChange: undefined,
        onBlur: undefined,
        validate: z.string().min(5),
        defaultValue: "четотам",
        shouldUnregister: false,        
        shouldValidate: true,
        shouldTouch: false,
        shouldDirty: false     
      });


      if (srsImgPrev !== element.src)  
        {
          srsImg = true;
          srsImgPrev = element.src;
        } else {
          srsImg = false;
        }

      index === 0 ? disabledButtonUp = true : disabledButtonUp = false;
      index === lengthRows-1-lengthActiveLanguages+1 ? disabledButtonDown = true : disabledButtonDown = false;
     

      arrayJSX.push(
          <>
          {srsImg ? 
          <div className={'row-span-' + lengthActiveLanguages + ' col-span-5 '}>
            <div className="relative">
              <img src={element.srcThumb} alt="" />
              <Button variant="default" disabled={disabledButtonUp} size="icon" className="absolute top-4 left-4 size-10"><ChevronUpIcon /></Button>
              <Button variant="default" disabled={disabledButtonDown} size="icon" className="absolute bottom-4 left-4 size-10"><ChevronDownIcon /></Button>              
            </div>
          </div> : '' }

         
          <div className="col-span-7 row-span-1">
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
                      placeholderfield = {element.namefieldlang}
                      descriptionfiled = {element.descriptionfiled}
                      defaultfield = {element.namefieldlang}
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
          </div>
       {/* {srsImg ? </div> : '' } */}
        </>
      );
    });
    return (
    <div className={`grid grid-cols-12 gap-2`}> 
     
      
{...arrayJSX} 

    </div>
    )
  }
  
  export default FormReactHooksSelectedImages
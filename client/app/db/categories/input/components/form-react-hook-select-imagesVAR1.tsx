import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { $Enums } from '@prisma/client';
import React from 'react'
import { FieldValues, UseFieldArrayAppend, UseFormReturn } from "react-hook-form";
import GetTypeField from "./get-type-field";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { iSelectedImages } from '@/types';

function FormReactHookSelectImages(
  {
    formControlProps,
    formProps,
    activeLanguagesProps,
    pathsCategoriesProps,
    baseLanguageCodeProps,
    selectedImageProps,
    setSelectedImageProps,
    addInFormSelectedImageProps,
    appendProps
  }: {  
    formControlProps: any,
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
        selectedImageProps:  iSelectedImages[] | undefined;
        setSelectedImageProps(): void;
        addInFormSelectedImageProps(): void;
        appendProps: UseFieldArrayAppend<FieldValues, "reactHookSelectedImages">

  }
) {
const arrayJSX: Array<React.ReactNode> = [];



  selectedImageProps && selectedImageProps.map((element : iSelectedImages, index) => {     
     appendProps({ altRu: element.ulid });
      arrayJSX.push(
        <div key={index}>
          **************************************************************
          {element.ulid}
          <img src={element.urlThumb} alt={element.ulid} />   
          **************************************************************


        </div>
      );    
    });
  return (
    <div> {...arrayJSX} </div>
  )
}

export default FormReactHookSelectImages



        // <FormField
        //   key={index}
        //   control={formControlProps}
        //   name={`выбранные файлы ${index}`}
        //   render={({ field }) => (
        //     // TODO:   make CardImageAltLng
        //     <FormItem className={"space-y-2"}>
        //       {/* <FormLabel>{description.labelfield + "***********************"}</FormLabel> */}
        //       <FormControl>
        //         <Label htmlFor={element.ulid}>Alt for image</Label>
        //         <Input id={element.ulid} placeholder={`Images from kenovo.by ${element.ulid}`} {...field} />
        //       </FormControl>
        //       <FormDescription>{element.ulid}</FormDescription>
        //       <FormMessage />
        //     </FormItem>
        //   )}
        // />
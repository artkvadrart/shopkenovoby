"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "@/components/ui/select"

import { MultiSelect, MultiSelectContent, MultiSelectGroup, MultiSelectItem, MultiSelectTrigger, MultiSelectValue } from "@/components/ui/multi-select"
import z, { array } from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import { JsonValue } from "@prisma/client/runtime/library";
import { Switch } from "@radix-ui/react-switch";
import { it } from "node:test";
import { $Enums, Prisma } from "@prisma/client";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
// import { formSchema } from "./product-zod-default-formfield";
import { iActiveLanguages } from "@/utils/get-languages";
import { ITypeField } from "@/settings/product-input-form-fields";
import { get } from "lodash";
import { getCategories  } from "@/utils/get-categories";
import { iGetActiveCurrency } from "@/utils/get-curency";



interface iGetTypeFieldProps {
  // form: UseFormReturn<{ [x: string]: any; }, any, undefined>
  form: UseFormReturn<Record<string, unknown>, any, Record<string, unknown>>;
  getActiveCurrencyProps?: iGetActiveCurrency;
  getCategoriesProps?: PrismaJson.typeCategoryNameJson;
  getProductsProps?: PrismaJson.typeProductNameJson;
  indexGet: number | string,
  namefield: string,
  namefieldlang: string,
  labelfield: string,
  placeholderfield: string,
  descriptionfiled: string,
  defaultfield: string | number | boolean | string[] | number[],
  typefield: ITypeField["typefield"],
  field: any,
  activeLanguages:iActiveLanguages[];
  // pathsProducts:{
  //   id: number;
     // productNameJson: iJsonLangProducts;
    // productNameJson: PrismaJson.typeProductNameJson ;
   // productDescriptionJson: JsonValue;
   //  idParent: number; for delete
//     productPath: string;
//     valuesSelectProductPath?: number[];
//     numberReversSortProductPath?: number
// }[],
baseLanguageCode : string,
}

interface iIdNameProducts  {
   [key: string]:  iJsonLangProducts  ;
}

interface iJsonLangProducts {
  [key: string]:  iJsonNameProducts 
    ;
}  

interface iJsonNameProducts {
  [key: string]: string;
}  

// type iIdNameProducts = Record<string, string>;

const GetTypeField : React.FC <iGetTypeFieldProps>  = function (
  {
    form,
    getActiveCurrencyProps,
    getCategoriesProps,
    getProductsProps,
    indexGet,
    namefield,
    namefieldlang,
    labelfield,
    placeholderfield,
    descriptionfiled,
    defaultfield,
    typefield,
    field,
    activeLanguages,
    // pathsProducts,
    baseLanguageCode
  }
)  {
  if (typefield === "input") return <div><Label htmlFor={`${namefieldlang}input${indexGet}`}>{labelfield}</Label><Input id={`${namefieldlang}input${indexGet}`} placeholder={placeholderfield} {...field} className="bg-white" /></div>
  if (typefield === "textarea") return <div><Label htmlFor={`${namefieldlang}textarea${indexGet}`}>{labelfield}</Label><Textarea id={`${namefieldlang}textarea${indexGet}`} placeholder={placeholderfield} {...field} className="bg-white"/></div>
  if (typefield === "checkbox") return <div><Label htmlFor={`${namefieldlang}checkbox${indexGet}`}>{labelfield}</Label><Checkbox id={`${namefieldlang}checkbox${indexGet}`} {...field} className="bg-white flex h-8 w-8 items-center justify-center text-lg" /></div>  
  if (typefield === "switch") return <div><Label htmlFor={`${namefieldlang}switch${indexGet}`}>{labelfield}</Label><Switch id={`${namefieldlang}switch${indexGet}`} defaultChecked={defaultfield} checked={field.value} onCheckedChange={field.onChange} {...field} className="bg-white" /></div>  

 // if (typefield === "switch") return <div><Label htmlFor={`${namefieldlang}`}>{labelfield}</Label><Switch  checked={field.value}  onCheckedChange={{...field}} id={`${namefieldlang} `}/>{...field}</div>  
  if (typefield === "number") return <div><Label htmlFor={`${namefieldlang}number${indexGet}`}>{labelfield}</Label><Input id={`${namefieldlang}number${indexGet}`} placeholder={placeholderfield} type="number" {...field} className="bg-white" /></div>
  if (typefield === "url") return <div><Label htmlFor={`${namefieldlang}url${indexGet}`}>{labelfield}</Label><Input id={`${namefieldlang}url${indexGet}`} placeholder={placeholderfield} {...field} className="bg-white" /></div>
  if (typefield === "file") return <div><Label htmlFor={`${namefieldlang}file${indexGet}`}>{labelfield}</Label><Input type="file" id={`${namefieldlang}file${indexGet}`} placeholder={placeholderfield} {...field} className="bg-white"/></div>
  
  
 
  if (typefield === "selectcurrency") {

//     const defaultSelect : {
//     id: number;
//     isDefault: boolean;
    // codeCurrency: string;
//     valueCurrency: number;
// } | undefined   =  getActiveCurrencyProps && getActiveCurrencyProps.map((element, index) => {
//       if (element.isDefault === true) {  return element } })  //element.id.toString()

  const defaultSelect =getActiveCurrencyProps && getActiveCurrencyProps.find((element) => element.isDefault === true)
      
    return (
      <div>
        <Label htmlFor={`${namefieldlang}select${indexGet}`}>{labelfield}</Label>
        <Select defaultValue={defaultSelect && defaultSelect.id.toString()}  > 
          <SelectTrigger className="w-full bg-white">
            <SelectValue  placeholder="Theme" />
          </SelectTrigger>
          <SelectContent className="w-full bg-white ">
            <SelectGroup >   

              {getActiveCurrencyProps && getActiveCurrencyProps.map((element, index) => {
                return <SelectItem key={index * 11 + 54} value={element.id.toString()}>
                  {element.codeCurrency}
                </SelectItem>
              })}

            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    )

  }

if (typefield === "selectjoingroupproducts") {
    return (
      <div>
        <Label htmlFor={`${namefieldlang}select${indexGet}`}>{labelfield}</Label>
        <MultiSelect>
          <MultiSelectTrigger className="w-full bg-white">
            <MultiSelectValue placeholder={placeholderfield} />
          </MultiSelectTrigger>
          <MultiSelectContent className="w-full bg-white text-black">
            <MultiSelectGroup >
              {getProductsProps && getProductsProps.map((element, index) => {
                return <MultiSelectItem key={index * 11 + 54} value={element.id.toString()}>
                  {activeLanguages && activeLanguages.map((lang, indexlang) => {
                    if (element.productNameJson && element.productNameJson[lang.code] && element.productNameJson[lang.code].name) {
                      return `${indexlang === 0 ? "" : "..."}` + element.productNameJson[lang.code].name;
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
    )
  }



  if (typefield === "selectcategory") {
    return (
      <div>
        <Label htmlFor={`${namefieldlang}select${indexGet}`}>{labelfield}</Label>
        <MultiSelect>
          <MultiSelectTrigger className="w-full bg-white">
            <MultiSelectValue placeholder={placeholderfield} />
          </MultiSelectTrigger>
          <MultiSelectContent className="w-full bg-white text-black">
            <MultiSelectGroup >
              {getCategoriesProps && getCategoriesProps.map((element, index) => {
                return <MultiSelectItem key={index * 10 + 54} value={element.id.toString()}>
                  {activeLanguages && activeLanguages.map((lang, indexlang) => {
                    if (element.categoryNameJson && element.categoryNameJson[lang.code] && element.categoryNameJson[lang.code].name) {
                      return `${indexlang === 0 ? "" : "..."}` + element.categoryNameJson[lang.code].name;
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
    )
  }
  
};
export default GetTypeField

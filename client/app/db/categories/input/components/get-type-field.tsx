"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { array } from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import { JsonValue } from "@prisma/client/runtime/library";
import { Switch } from "@radix-ui/react-switch";
import { it } from "node:test";
import { $Enums, Prisma } from "@prisma/client";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";


interface iGetTypeFieldProps {
  form: UseFormReturn<{ [x: string]: any; }, any, undefined>
  indexGet: number | string,
  namefield: string,
  namefieldlang: string,
  labelfield: string,
  placeholderfield: string,
  descriptionfiled: string,
  defaultfield: string | number | boolean | string[] | number[],
  typefield: "textarea" | "checkbox" | "input" | "switch" | "number" | "url" | "file" | "select",
  field: any,
  activeLanguages: {
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
}[],
  pathsCategories:{
    id: number;
     // categoryNameJson: iJsonLangCategories;
    categoryNameJson: PrismaJson.typeCategoryNameJson ;
   // categoryDescriptionJson: JsonValue;
    idParent: number;
    categoryPath: number[];
    valuesSelectCategoryPath?: number[];
    numberReversSortCategoryPath?: number
}[],
baseLanguageCode : string,
}

interface iIdNameCategories  {
   [key: string]:  iJsonLangCategories  ;
}

interface iJsonLangCategories {
  [key: string]:  iJsonNameCategories 
    ;
}  

interface iJsonNameCategories {
  [key: string]: string;
}  

// type iIdNameCategories = Record<string, string>;

const GetTypeField : React.FC <iGetTypeFieldProps>  = function (
  {
    form,
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
    pathsCategories,
    baseLanguageCode
  }
)  {
  if (typefield === "input") return <div><Label htmlFor={`${namefieldlang}input${indexGet}`}>{labelfield}</Label><Input id={`${namefieldlang}input${indexGet}`} placeholder={placeholderfield} {...field} /></div>
  if (typefield === "textarea") return <div><Label htmlFor={`${namefieldlang}textarea${indexGet}`}>{labelfield}</Label><Textarea id={`${namefieldlang}textarea${indexGet}`} placeholder={placeholderfield} {...field} /></div>
  if (typefield === "checkbox") return <div><Label htmlFor={`${namefieldlang}checkbox${indexGet}`}>{labelfield}</Label><Checkbox id={`${namefieldlang}checkbox${indexGet}`} {...field} /></div>  
  // for status true or false
 // if (typefield === "switch") return <div><Label htmlFor={`${namefieldlang}`}>{labelfield}</Label><Switch  checked={field.value}  onCheckedChange={{...field}} id={`${namefieldlang} `}/>{...field}</div>  
  if (typefield === "number") return <div><Label htmlFor={`${namefieldlang}number${indexGet}`}>{labelfield}</Label><Input id={`${namefieldlang}number${indexGet}`} placeholder={placeholderfield} type="number" {...field} /></div>
  if (typefield === "url") return <div><Label htmlFor={`${namefieldlang}url${indexGet}`}>{labelfield}</Label><Input id={`${namefieldlang}url${indexGet}`} placeholder={placeholderfield} {...field} /></div>
  if (typefield === "file") return <div><Label htmlFor={`${namefieldlang}file${indexGet}`}>{labelfield}</Label><Input type="file" id={`${namefieldlang}file${indexGet}`} placeholder={placeholderfield} {...field} /></div>
  
  
  // typefield select
  var nameArrayJson =""
  var arrayDafaultfield : (string | number)[] = []

  // sample   idCategory   pathsCategories   pathsCategories[ [activeLang][name],[activeLang][name] , ...]
  //          default[empty[]]     value=[pathCategories push idCategory]   sort [number revers pathsCategories]
  if (typefield === "select") {
    const [theme, setTheme] = useState<string>("")


   // all path categories pathCategories + idCategory VALUE
   var numberSortCategoryPath : number
   var idNameCategories : PrismaJson.typeCategoryNameJson  = {} //| iIdNameCategories
  //     idNameCategories["arIdName0"] = { "name" : "Корневая категория [Main category]" }
   var reversCategoryPath : number[]
   var valuesSelectCategoryPath = []
   var defaultValueEmptySelect : number[] = [0]

   pathsCategories.map((item) =>{   
    var keyIdNameCategories :  string = `arIdName${item.id.toString()}`
        
    if (item?.categoryNameJson && typeof item?.categoryNameJson === 'object' && item?.categoryNameJson[baseLanguageCode]) {     
      idNameCategories[keyIdNameCategories] = { name: item?.categoryNameJson[baseLanguageCode]["name"] };
    }
    

    valuesSelectCategoryPath = [...item.categoryPath, item.id]  //full path (value)
    item["valuesSelectCategoryPath"] = valuesSelectCategoryPath
    
    // for sorting number FULL (value) category price
    var reversSortCategoryPath = ""
    var numberReversSortCategoryPath : number
    reversCategoryPath = [... valuesSelectCategoryPath]
    reversCategoryPath.reverse()
          // reversCategoryPath.sort(function(a, b){return b-a})
    reversCategoryPath.map((item2, index) => {
      reversSortCategoryPath  = reversSortCategoryPath + item2      
    })
    numberReversSortCategoryPath = parseInt(reversSortCategoryPath)
    item["numberReversSortCategoryPath"] = numberReversSortCategoryPath

  } )

  console.log('pathsCategories: ');
  console.dir(pathsCategories, { depth: null });
  
  console.log('idNameCategories: ');
  console.dir(idNameCategories, { depth: null });

  // console.log('************************************TestedidNameCategories: ');
  // console.log(idNameCategories[`arrayIdNAme${pathsCategories[0].id}`][`ru`][`name`]);


  console.log('************************************baseLanguageCode: ', baseLanguageCode);

    return ( 
    <div>
      <Label htmlFor={`${namefieldlang}`}>{labelfield}</Label>
      <Select value={field.value}  onValueChange={field.onChange}   >
      <SelectTrigger  className="w-[280px]" value={field.value} onReset={() => form.resetField(namefieldlang)}>
        <SelectValue  placeholder={placeholderfield}/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
        
        {/* <SelectItem value={`${defaultValueEmptySelect}`} >{`${idNameCategories["arIdName0"]["name"]}`}</SelectItem> */}
        <SelectLabel></SelectLabel>          
          {pathsCategories.map((item, index) => { if(item.valuesSelectCategoryPath) 
            { return  <SelectItem value={`${item.valuesSelectCategoryPath}`} key={index+1}>
              { item.valuesSelectCategoryPath.map((item2, index2) => 
              { if (idNameCategories["arIdName"+item2]) { return ("<"+ idNameCategories["arIdName"+item2]["name"] + "> " )} } ) }  </SelectItem> }}  )
          }
          
        </SelectGroup>
        </SelectContent>
      </Select>
    </div>  ) 
}

  // return isLoaded ? <ShareButton /> : null;
};
export default GetTypeField

{/* <div className="flex gap-x-8">
            <div className="">
                <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger asChild className="w-[280px]" value={theme} onReset={() => setTheme("")}>
                        <SelectValue placeholder="Place Select Theme" defaultValue={theme}/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
                <Button onClick={() => console.log("theme-->", theme)}>Theme</Button>
            </div> */}

import { z } from "zod";
import { getPathsProducts } from "@/utils/get-products";
// All info for form input product. Format:
// { ru: [
//  {namefield :"name", labelfield : "label", placeholderfield : "placeholder", descriptionfiled : "description", defaultfield : 0,  zod : z.string().min(5), typefield : "input"}
//  {namefield :"name", labelfield : "label", placeholderfield : "placeholder", descriptionfiled : "description", defaultfield : 0,  zod : z.string().min(5), typefield : "input"}
// ]
// }

interface IproductInputFormFields {
   [key : string] : Array<IproductInputFormFieldsItem>
   //IproductInputFormFieldsItem[]
}

export interface ITypeField {
  typefield:  "textarea" | "checkbox" | "input" | "switch" | "number" | "url" | "file" | "selectPath" | "selectcurrency"  | "selectcategory" | "selectjoingroupproducts"
 }

interface IproductInputFormFieldsItem {
  namefield: string,
  labelfield: string,
  placeholderfield: string,
  descriptionfiled: string,
  defaultfield: string | number | boolean | string[] | number [],
  // zod: z.AnyZodObject | z.ZodString | z.ZodNumber | z.ZodBoolean | z.ZodTypeAny | z.ArrayCardinality,
  // zod: z.AnyZodObject | z.ZodString | z.ZodNumber | z.ZodBoolean | z.ZodTypeAny | z.ArrayCardinality,
  zod: z.ZodTypeAny ,
  typefield: ITypeField["typefield"],
  callFunc : string
}


export const productInputFormFieldsNameJson : IproductInputFormFields  = {
  ru :  [   
    {namefield : "name", labelfield : "имя товара", placeholderfield : "имя товара", descriptionfiled : "введите введите уникальное имя товара", defaultfield : "nameRU1",  zod : z.string().min(5), typefield : "input", callFunc :  ""},    
  ],
  en :  [   
    {namefield : "name", labelfield : "name of product", placeholderfield : "name of product", descriptionfiled : "введите введите уникальное имя товара", defaultfield : "nameEN1",  zod : z.string().min(5), typefield : "input", callFunc :  ""},    
  ],
  by :  [    
    {namefield : "name", labelfield : "name of product", placeholderfield : "name of product", descriptionfiled : "введите введите уникальное имя категории", defaultfield : "nameBY1",  zod : z.string().min(5), typefield : "input", callFunc :  ""},    
  ] 
}


export const productInputFormFieldsCategoryJson : IproductInputFormFields  = {
  ru :  [   
    {namefield : "namecategory", labelfield : "выбор категории товара", placeholderfield : "выбор категории товара", descriptionfiled : "выберите одну или несколько категорий" , defaultfield : "",  zod : z.array(z.string()), typefield : "selectcategory", callFunc :  ""},    
  ],
  en :  [   
    {namefield : "namecategory", labelfield : "select category", placeholderfield : "выбор категории товара", descriptionfiled : "выберите одну или несколько категорий" , defaultfield : "",  zod : z.array(z.string()), typefield : "selectcategory", callFunc :  ""},    
  ],
  by :  [    
    {namefield : "namecategory", labelfield : "выбор катэгорыi тавару", placeholderfield : "выбор катэгорыi тавару", descriptionfiled : "выберите адну альбо некалькi категорый" , defaultfield : "",  zod : z.array(z.string()), typefield : "selectcategory", callFunc :  ""},    
  ] 
}

export const productInputFormFieldsJoinProductsJson : IproductInputFormFields  = {
  ru :  [   
    {namefield : "namejoingroup", labelfield : "Варианты этого товара", placeholderfield : "выберите варианты этого товара", descriptionfiled : "выберите одну или несколько категорий" , defaultfield : "",  zod : z.array(z.string()), typefield : "selectjoingroupproducts", callFunc :  ""},    
  ],
  en :  [   
    {namefield : "namejoingroup", labelfield : "select varianats", placeholderfield : "select variants this product", descriptionfiled : "выберите одну или несколько категорий" , defaultfield : "",  zod : z.array(z.string()), typefield : "selectjoingroupproducts", callFunc :  ""},    
  ],
  by :  [    
    {namefield : "namejoingroup", labelfield : "выбор падобных варыантау тавару", placeholderfield : "выбор падобных варыантау тавару", descriptionfiled : "выберите адну альбо некалькi категорый" , defaultfield : "",  zod : z.array(z.string()), typefield : "selectjoingroupproducts", callFunc :  ""},    
  ] 
}



export const productInputFormFieldsDescriptionJson : IproductInputFormFields  = {
  ru :  [
    {namefield : "titleH1", labelfield : "заголовок H1", placeholderfield : "заголовок H1", descriptionfiled : "введите заголовок уникальный", defaultfield : "titleH1RU1",  zod : z.string().min(5), typefield : "input", callFunc :  ""}, 
    // {namefield : "description", labelfield : "описание категории", placeholderfield : "краткое описание категории", descriptionfiled : "введите краткое описание, 200 символов", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield : "descriptionextendet", labelfield : "расширенное описание категории", placeholderfield : "расширенное описание категории", descriptionfiled : "введите расширенное описание", defaultfield : "",  zod : z.string().min(5), typefield : "textarea", callFunc :  ""},
  ],
  en :  [
    {namefield : "titleH1", labelfield : "title H1", placeholderfield : "title H1", descriptionfiled : "input unique title", defaultfield : "titleH1EN1",  zod : z.string().min(5), typefield : "input", callFunc :  ""},    
    // {namefield : "description", labelfield : "описание категории", placeholderfield : "краткое описание категории", descriptionfiled : "введите краткое описание, 200 символов", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield : "descriptionextendet", labelfield : "расширенное описание категории", placeholderfield : "расширенное описание категории", descriptionfiled : "введите расширенное описание", defaultfield : "",  zod : z.string().min(5), typefield : "textarea", callFunc :  ""},
  ],
  by :  [
    {namefield : "titleH1", labelfield : "title H1", placeholderfield : "title H1", descriptionfiled : "input unique title", defaultfield : "titleH1BY1",  zod : z.string().min(5), typefield : "input", callFunc :  ""},    
    // {namefield : "description", labelfield : "описание категории", placeholderfield : "краткое описание категории", descriptionfiled : "введите краткое описание, 200 символов", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield : "descriptionextendet", labelfield : "расширенное описание категории", placeholderfield : "расширенное описание категории", descriptionfiled : "введите расширенное описание", defaultfield : "",  zod : z.string().min(5), typefield : "textarea", callFunc :  ""},
  ] 
}


export const productInputFormFieldsSeoJson : IproductInputFormFields = {
  ru : [
    {namefield :"metadataBase", labelfield : "metadataBase", placeholderfield : "metadataBase", descriptionfiled : "введите metadataBase", defaultfield : "metadataBaseRU1",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    {namefield :"titleMeta", labelfield : "titleMeta", placeholderfield : "titleMeta", descriptionfiled : "введите titleMeta", defaultfield : "titleMetaRU1",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"description", labelfield : "description", placeholderfield : "description", descriptionfiled : "введите рdescription", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"abstract", labelfield : "abstract", placeholderfield : "abstract", descriptionfiled : "введите abstract", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"keywords", labelfield : "keywords", placeholderfield : "keywords", descriptionfiled : "введите keywords", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"applicationName", labelfield : "applicationName", placeholderfield : "applicationName", descriptionfiled : "введите applicationName", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // // h1: string; // see html content    
    // {namefield :"authorName", labelfield : "authorName", placeholderfield : "authorName", descriptionfiled : "введите authorName", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"authorUrl", labelfield : "authorUrl", placeholderfield : "authorUrl", descriptionfiled : "введите authorUrl", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"generator", labelfield : "generator", placeholderfield : "generator", descriptionfiled : "введите generator", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},

    // {namefield :"referrer", labelfield : "referrer", placeholderfield : "referrer", descriptionfiled : "введите referrer", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"themeColor", labelfield : "themeColor", placeholderfield : "themeColor", descriptionfiled : "введите themeColor", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},

    // {namefield :"colorScheme", labelfield : "colorScheme", placeholderfield : "colorScheme", descriptionfiled : "введите colorScheme", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    
    // {namefield :"urlOpenGraph", labelfield : "urlOpenGraph", placeholderfield : "urlOpenGraph", descriptionfiled : "введите urlOpenGraph", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"titleOpenGraph", labelfield : "titleOpenGraph", placeholderfield : "titleOpenGraph", descriptionfiled : "введите titleOpenGraph", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"descriptionOpenGraph", labelfield : "descriptionOpenGraph", placeholderfield : "descriptionOpenGraph", descriptionfiled : "введите descriptionOpenGraph", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"siteNameOpenGraph", labelfield : "siteNameOpenGraph", placeholderfield : "siteNameOpenGraph", descriptionfiled : "введите siteNameOpenGraph", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"imagesOpenGraph", labelfield : "imagesOpenGraph", placeholderfield : "imagesOpenGraph", descriptionfiled : "введите imagesOpenGraph", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
  
    // {namefield :"cardTwitter", labelfield : "cardTwitter", placeholderfield : "cardTwitter", descriptionfiled : "введите cardTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""}, // "summary" | "summary_large_image" | "player" | "app" | undefined;
    // {namefield :"siteTwitter", labelfield : "siteTwitter", placeholderfield : "siteTwitter", descriptionfiled : "введите siteTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"creatorTwitter", labelfield : "creatorTwitter", placeholderfield : "creatorTwitter", descriptionfiled : "введите creatorTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"titleTwitter", labelfield : "titleTwitter", placeholderfield : "titleTwitter", descriptionfiled : "введите titleTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"descriptionTwitter", labelfield : "descriptionTwitter", placeholderfield : "descriptionTwitter", descriptionfiled : "введите descriptionTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"imagesTwitter", labelfield : "imagesTwitter", placeholderfield : "imagesTwitter", descriptionfiled : "введите imagesTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
  
    // {namefield :"googleVerification", labelfield : "googleVerification", placeholderfield : "googleVerification", descriptionfiled : "введите googleVerification", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"yandexVerification", labelfield : "yandexVerification", placeholderfield : "yandexVerification", descriptionfiled : "введите yandexVerification", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
  
    // {namefield :"capableAppleWebApp", labelfield : "capableAppleWebApp", placeholderfield : "capableAppleWebApp", descriptionfiled : "введите capableAppleWebApp", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"titleAppleWebApp", labelfield : "titleAppleWebApp", placeholderfield : "titleAppleWebApp", descriptionfiled : "введите titleAppleWebApp", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"statusBarStyleAppleWebApp", labelfield : "statusBarStyleAppleWebApp", placeholderfield : "statusBarStyleAppleWebApp", descriptionfiled : "введите statusBarStyleAppleWebApp", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""}, // "defaultfield" | "black" | "black-translucent" | undefined; // "black-translucent"
   
    // {namefield :"indexRobots", labelfield : "indexRobots", placeholderfield : "indexRobots", descriptionfiled : "введите indexRobots", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"followRobots", labelfield : "followRobots", placeholderfield : "followRobots", descriptionfiled : "введите followRobots", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
  
    // {namefield :"manifest", labelfield : "manifest", placeholderfield : "manifest", descriptionfiled : "введите manifest", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"iconIcon", labelfield : "iconIcon", placeholderfield : "iconIcon", descriptionfiled : "введите iconIcon", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"iconShortcut", labelfield : "iconShortcut", placeholderfield : "iconShortcut", descriptionfiled : "введите iconShortcut", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"iconApple", labelfield : "iconApple", placeholderfield : "iconApple", descriptionfiled : "введите iconApple", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
  ],
  en : [
    {namefield :"metadataBase", labelfield : "metadataBase", placeholderfield : "metadataBase", descriptionfiled : "input metadataBase", defaultfield : "metadataBaseEN1",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    {namefield :"titleMeta", labelfield : "titleMeta", placeholderfield : "titleMeta", descriptionfiled : "введите titleMeta", defaultfield : "titleMetaEN1",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"description", labelfield : "description", placeholderfield : "description", descriptionfiled : "input рdescription", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"abstract", labelfield : "abstract", placeholderfield : "abstract", descriptionfiled : "input abstract", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"keywords", labelfield : "keywords", placeholderfield : "keywords", descriptionfiled : "input keywords", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"applicationName", labelfield : "applicationName", placeholderfield : "applicationName", descriptionfiled : "input applicationName", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // // h1: string; // see html content    
    // {namefield :"authorName", labelfield : "authorName", placeholderfield : "authorName", descriptionfiled : "input authorName", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"authorUrl", labelfield : "authorUrl", placeholderfield : "authorUrl", descriptionfiled : "input authorUrl", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"generator", labelfield : "generator", placeholderfield : "generator", descriptionfiled : "input generator", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},

    // {namefield :"referrer", labelfield : "referrer", placeholderfield : "referrer", descriptionfiled : "input referrer", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"themeColor", labelfield : "themeColor", placeholderfield : "themeColor", descriptionfiled : "input themeColor", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},

    // {namefield :"colorScheme", labelfield : "colorScheme", placeholderfield : "colorScheme", descriptionfiled : "input colorScheme", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    
    // {namefield :"urlOpenGraph", labelfield : "urlOpenGraph", placeholderfield : "urlOpenGraph", descriptionfiled : "input urlOpenGraph", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"titleOpenGraph", labelfield : "titleOpenGraph", placeholderfield : "titleOpenGraph", descriptionfiled : "input titleOpenGraph", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"descriptionOpenGraph", labelfield : "descriptionOpenGraph", placeholderfield : "descriptionOpenGraph", descriptionfiled : "input descriptionOpenGraph", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"siteNameOpenGraph", labelfield : "siteNameOpenGraph", placeholderfield : "siteNameOpenGraph", descriptionfiled : "input siteNameOpenGraph", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"imagesOpenGraph", labelfield : "imagesOpenGraph", placeholderfield : "imagesOpenGraph", descriptionfiled : "input imagesOpenGraph", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
  
    // {namefield :"cardTwitter", labelfield : "cardTwitter", placeholderfield : "cardTwitter", descriptionfiled : "input cardTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""}, // "summary" | "summary_large_image" | "player" | "app" | undefined;
    // {namefield :"siteTwitter", labelfield : "siteTwitter", placeholderfield : "siteTwitter", descriptionfiled : "введите siteTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"creatorTwitter", labelfield : "creatorTwitter", placeholderfield : "creatorTwitter", descriptionfiled : "input creatorTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"titleTwitter", labelfield : "titleTwitter", placeholderfield : "titleTwitter", descriptionfiled : "input titleTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"descriptionTwitter", labelfield : "descriptionTwitter", placeholderfield : "descriptionTwitter", descriptionfiled : "input descriptionTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"imagesTwitter", labelfield : "imagesTwitter", placeholderfield : "imagesTwitter", descriptionfiled : "input imagesTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
  
    // {namefield :"googleVerification", labelfield : "googleVerification", placeholderfield : "googleVerification", descriptionfiled : "input googleVerification", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"yandexVerification", labelfield : "yandexVerification", placeholderfield : "yandexVerification", descriptionfiled : "input yandexVerification", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
  
    // {namefield :"capableAppleWebApp", labelfield : "capableAppleWebApp", placeholderfield : "capableAppleWebApp", descriptionfiled : "input capableAppleWebApp", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"titleAppleWebApp", labelfield : "titleAppleWebApp", placeholderfield : "titleAppleWebApp", descriptionfiled : "input titleAppleWebApp", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"statusBarStyleAppleWebApp", labelfield : "statusBarStyleAppleWebApp", placeholderfield : "statusBarStyleAppleWebApp", descriptionfiled : "input statusBarStyleAppleWebApp", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""}, // "defaultfield" | "black" | "black-translucent" | undefined; // "black-translucent"
   
    // {namefield :"indexRobots", labelfield : "indexRobots", placeholderfield : "indexRobots", descriptionfiled : "input indexRobots", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"followRobots", labelfield : "followRobots", placeholderfield : "followRobots", descriptionfiled : "input followRobots", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
  
    // {namefield :"manifest", labelfield : "manifest", placeholderfield : "manifest", descriptionfiled : "input manifest", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"iconIcon", labelfield : "iconIcon", placeholderfield : "iconIcon", descriptionfiled : "input iconIcon", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"iconShortcut", labelfield : "iconShortcut", placeholderfield : "iconShortcut", descriptionfiled : "input iconShortcut", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"iconApple", labelfield : "iconApple", placeholderfield : "iconApple", descriptionfiled : "input iconApple", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
  ],
  by : [
    {namefield :"metadataBase", labelfield : "metadataBase", placeholderfield : "metadataBase", descriptionfiled : "input metadataBase", defaultfield : "metadataBaseBY1",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    {namefield :"titleMeta", labelfield : "titleMeta", placeholderfield : "titleMeta", descriptionfiled : "введите titleMeta", defaultfield : "titleMetaBY1",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"description", labelfield : "description", placeholderfield : "description", descriptionfiled : "input рdescription", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"abstract", labelfield : "abstract", placeholderfield : "abstract", descriptionfiled : "input abstract", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"keywords", labelfield : "keywords", placeholderfield : "keywords", descriptionfiled : "input keywords", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"applicationName", labelfield : "applicationName", placeholderfield : "applicationName", descriptionfiled : "input applicationName", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // // h1: string; // see html content    
    // {namefield :"authorName", labelfield : "authorName", placeholderfield : "authorName", descriptionfiled : "input authorName", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"authorUrl", labelfield : "authorUrl", placeholderfield : "authorUrl", descriptionfiled : "input authorUrl", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"generator", labelfield : "generator", placeholderfield : "generator", descriptionfiled : "input generator", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},

    // {namefield :"referrer", labelfield : "referrer", placeholderfield : "referrer", descriptionfiled : "input referrer", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"themeColor", labelfield : "themeColor", placeholderfield : "themeColor", descriptionfiled : "input themeColor", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},

    // {namefield :"colorScheme", labelfield : "colorScheme", placeholderfield : "colorScheme", descriptionfiled : "input colorScheme", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    
    // {namefield :"urlOpenGraph", labelfield : "urlOpenGraph", placeholderfield : "urlOpenGraph", descriptionfiled : "input urlOpenGraph", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"titleOpenGraph", labelfield : "titleOpenGraph", placeholderfield : "titleOpenGraph", descriptionfiled : "input titleOpenGraph", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"descriptionOpenGraph", labelfield : "descriptionOpenGraph", placeholderfield : "descriptionOpenGraph", descriptionfiled : "input descriptionOpenGraph", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"siteNameOpenGraph", labelfield : "siteNameOpenGraph", placeholderfield : "siteNameOpenGraph", descriptionfiled : "input siteNameOpenGraph", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"imagesOpenGraph", labelfield : "imagesOpenGraph", placeholderfield : "imagesOpenGraph", descriptionfiled : "input imagesOpenGraph", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
  
    // {namefield :"cardTwitter", labelfield : "cardTwitter", placeholderfield : "cardTwitter", descriptionfiled : "input cardTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""}, // "summary" | "summary_large_image" | "player" | "app" | undefined;
    // {namefield :"siteTwitter", labelfield : "siteTwitter", placeholderfield : "siteTwitter", descriptionfiled : "введите siteTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"creatorTwitter", labelfield : "creatorTwitter", placeholderfield : "creatorTwitter", descriptionfiled : "input creatorTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"titleTwitter", labelfield : "titleTwitter", placeholderfield : "titleTwitter", descriptionfiled : "input titleTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"descriptionTwitter", labelfield : "descriptionTwitter", placeholderfield : "descriptionTwitter", descriptionfiled : "input descriptionTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"imagesTwitter", labelfield : "imagesTwitter", placeholderfield : "imagesTwitter", descriptionfiled : "input imagesTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
  
    // {namefield :"googleVerification", labelfield : "googleVerification", placeholderfield : "googleVerification", descriptionfiled : "input googleVerification", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"yandexVerification", labelfield : "yandexVerification", placeholderfield : "yandexVerification", descriptionfiled : "input yandexVerification", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
  
    // {namefield :"capableAppleWebApp", labelfield : "capableAppleWebApp", placeholderfield : "capableAppleWebApp", descriptionfiled : "input capableAppleWebApp", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"titleAppleWebApp", labelfield : "titleAppleWebApp", placeholderfield : "titleAppleWebApp", descriptionfiled : "input titleAppleWebApp", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"statusBarStyleAppleWebApp", labelfield : "statusBarStyleAppleWebApp", placeholderfield : "statusBarStyleAppleWebApp", descriptionfiled : "input statusBarStyleAppleWebApp", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""}, // "defaultfield" | "black" | "black-translucent" | undefined; // "black-translucent"
   
    // {namefield :"indexRobots", labelfield : "indexRobots", placeholderfield : "indexRobots", descriptionfiled : "input indexRobots", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"followRobots", labelfield : "followRobots", placeholderfield : "followRobots", descriptionfiled : "input followRobots", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
  
    // {namefield :"manifest", labelfield : "manifest", placeholderfield : "manifest", descriptionfiled : "input manifest", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"iconIcon", labelfield : "iconIcon", placeholderfield : "iconIcon", descriptionfiled : "input iconIcon", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"iconShortcut", labelfield : "iconShortcut", placeholderfield : "iconShortcut", descriptionfiled : "input iconShortcut", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield :"iconApple", labelfield : "iconApple", placeholderfield : "iconApple", descriptionfiled : "input iconApple", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
  ]

}


// export const productInputFormFieldsNameSetParametrsJson : IproductInputFormFields = {
//   ru : [
//     {namefield :"nameSetParametrsJson", labelfield : "название параметров", placeholderfield : "параметр1, параметр2, ...", descriptionfiled : "введите названия параметров (пример: параметр1, параметр2, градус)", defaultfield : "параметр1RU, параметр2RU",  zod : z.string().min(5), typefield : "input", callFunc :  ""}, // "параметр1, параметр2, ...", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
//   ],
//   en : [
//     {namefield :"nameSetParametrsJson", labelfield : "names parametrs", placeholderfield : "parametr1, parametr2, ...", descriptionfiled : "inpt names of parametrs (example: parametr1, parametr2, gradus)", defaultfield : "parametr1EN, parametr2EN",  zod : z.string().min(5), typefield : "input", callFunc :  ""}, // "параметр1, параметр2, ...", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
//   ],
//   by : [
//     {namefield :"nameSetParametrsJson", labelfield : "names parametrs", placeholderfield : "parametr1, parametr2, ...", descriptionfiled : "inpt names of parametrs (example: parametr1, parametr2, gradus)", defaultfield : "параметр1BY, параметр2BY",  zod : z.string().min(5), typefield : "input", callFunc :  ""}, // "параметр1, параметр2, ...", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
//   ]
// }


export const productInputFormFieldsNoTranslateData : IproductInputFormFields = {
  ru : [
    {namefield : "status", labelfield : "Статус товара (активен или нет)", placeholderfield : "статус товара", descriptionfiled : "выберите статус товара (пример: неактивен)", defaultfield : "unchecked",  zod : z.string().min(5), typefield : "checkbox", callFunc :  ""},
    // {namefield : "joinGroupId", labelfield : "Варианты этого товара", placeholderfield : "варианты товара", descriptionfiled : "выберите вариант товара (разные цвета, размеры, ...)", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    {namefield : "furlProduct", labelfield : "seo имя товара", placeholderfield : "уникальное seo имя товара", descriptionfiled : "введите уникальное seo имя товара (пример: GSH58)", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    {namefield : "model", labelfield : "модель товара", placeholderfield : "модель товара", descriptionfiled : "введите модель товара (пример: GSH58)", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    {namefield : "sku", labelfield : "sku товара", placeholderfield : "sku товара", descriptionfiled : "введите sku товара (пример: GSH58)", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    {namefield : "upc", labelfield : "upc код товара (Universal Product Code)", placeholderfield : "upc товара", descriptionfiled : "введите upc товара (пример: GSH58)", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    {namefield : "ean", labelfield : "ean код товара", placeholderfield : "ean код товара", descriptionfiled : "введите ean код товара (пример: 4812345678911)", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    {namefield : "jan", labelfield : "jan код товара", placeholderfield : "jan код товара", descriptionfiled : "введите jan код товара (пример: 4812345678911)", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    {namefield : "isbn", labelfield : "isbn код товара", placeholderfield : "isbn код товара", descriptionfiled : "введите isbn код товара (пример: 4812345678911)", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    {namefield : "mpn", labelfield : "mpn код товара", placeholderfield : "mpn код товара", descriptionfiled : "введите mpn код товара (пример: 4812345678911)", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},   
    {namefield : "quantity", labelfield : "количество", placeholderfield : "количество", descriptionfiled : "количество", defaultfield : "",  zod : z.boolean(), typefield : "input", callFunc :  ""},
    {namefield : "subtract", labelfield : "уменьшать количество при продаже", placeholderfield : "subtract", descriptionfiled : "при enable уменьшает количество при продаже", defaultfield : "",  zod : z.int().min(1), typefield : "switch", callFunc :  ""},
    {namefield : "stockstatus", labelfield : "складской статус", placeholderfield : "складской статус", descriptionfiled : "складской статус", defaultfield : "",  zod : z.string().min(1), typefield : "input", callFunc :  ""},
    {namefield : "curency", labelfield : "curency", placeholderfield : "curency", descriptionfiled : "curency", defaultfield : "",  zod : z.string().min(1), typefield : "selectcurrency", callFunc :  ""},
    {namefield : "price", labelfield : "price", placeholderfield : "price", descriptionfiled : "price", defaultfield : "",  zod : z.int().min(1), typefield : "input", callFunc :  ""},
    {namefield : "price1", labelfield : "price1", placeholderfield : "price1", descriptionfiled : "price1", defaultfield : "",  zod : z.int().min(1), typefield : "input", callFunc :  ""},
    {namefield : "price2", labelfield : "price2", placeholderfield : "price2", descriptionfiled : "price2", defaultfield : "",  zod : z.int().min(1), typefield : "input", callFunc :  ""},
    {namefield : "dateAvailabale", labelfield : "dateAvailabale", placeholderfield : "dateAvailabale", descriptionfiled : "dateAvailabale", defaultfield : "",  zod : z.int().min(1), typefield : "input", callFunc :  ""},
    {namefield : "weight", labelfield : "weight", placeholderfield : "weight", descriptionfiled : "weight", defaultfield : "",  zod : z.int().min(1), typefield : "input", callFunc :  ""},
    {namefield : "length", labelfield : "length", placeholderfield : "length", descriptionfiled : "length", defaultfield : "",  zod : z.int().min(1), typefield : "input", callFunc :  ""},
    {namefield : "width", labelfield : "width", placeholderfield : "width", descriptionfiled : "width", defaultfield : "",  zod : z.int().min(1), typefield : "input", callFunc :  ""},
    {namefield : "height", labelfield : "height", placeholderfield : "height", descriptionfiled : "height", defaultfield : "",  zod : z.int().min(1), typefield : "input", callFunc :  ""},
    {namefield : "manufactured", labelfield : "manufactured", placeholderfield : "manufactured", descriptionfiled : "manufactured", defaultfield : "",  zod : z.int().min(1), typefield : "input", callFunc :  ""},
    {namefield : "code1c", labelfield : "код для 1с", placeholderfield : "код для 1с", descriptionfiled : "введите код для 1с", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    {namefield : "codechange", labelfield : "код для обмена данными", placeholderfield : "код для обмена данными", descriptionfiled : "код для обмена данными", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield : "avatar", labelfield : "изображение аватар", placeholderfield : "изображение аватар", descriptionfiled : "введите изображение аватар", defaultfield : "",  zod : z.string().min(5), typefield : "file", callFunc :  ""},
    // {namefield : "image", labelfield : "изображение основное", placeholderfield : "изображение основное", descriptionfiled : "изображение основное", defaultfield : "",  zod : z.string().min(5), typefield : "file", callFunc :  ""},
    // {namefield : "images", labelfield : "набор изображений", placeholderfield : "набор изображений", descriptionfiled : "набор изображений", defaultfield : "",  zod : z.string().min(5), typefield : "file", callFunc :  ""},
  ],
  en : [
    
    
   {namefield : "status", labelfield : "Статус товара (активен или нет)", placeholderfield : "статус товара", descriptionfiled : "выберите статус товара (пример: неактивен)", defaultfield : "unchecked",  zod : z.string().min(5), typefield : "checkbox", callFunc :  ""},
    {namefield : "joinGroupId", labelfield : "Варианты этого товара", placeholderfield : "варианты товара", descriptionfiled : "выберите вариант товара (разные цвета, размеры, ...)", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    {namefield : "furlProduct", labelfield : "seo имя товара", placeholderfield : "уникальное seo имя товара", descriptionfiled : "введите уникальное seo имя товара (пример: GSH58)", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    {namefield : "model", labelfield : "модель товара", placeholderfield : "модель товара", descriptionfiled : "введите модель товара (пример: GSH58)", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    {namefield : "sku", labelfield : "sku товара", placeholderfield : "sku товара", descriptionfiled : "введите sku товара (пример: GSH58)", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    {namefield : "upc", labelfield : "upc код товара (Universal Product Code)", placeholderfield : "upc товара", descriptionfiled : "введите upc товара (пример: GSH58)", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    {namefield : "ean", labelfield : "ean код товара", placeholderfield : "ean код товара", descriptionfiled : "введите ean код товара (пример: 4812345678911)", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    {namefield : "jan", labelfield : "jan код товара", placeholderfield : "jan код товара", descriptionfiled : "введите jan код товара (пример: 4812345678911)", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    {namefield : "isbn", labelfield : "isbn код товара", placeholderfield : "isbn код товара", descriptionfiled : "введите isbn код товара (пример: 4812345678911)", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    {namefield : "mpn", labelfield : "mpn код товара", placeholderfield : "mpn код товара", descriptionfiled : "введите mpn код товара (пример: 4812345678911)", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},   
    {namefield : "quantity", labelfield : "количество", placeholderfield : "количество", descriptionfiled : "количество", defaultfield : "",  zod : z.boolean(), typefield : "input", callFunc :  ""},
    {namefield : "subtract", labelfield : "уменьшать количество при продаже", placeholderfield : "subtract", descriptionfiled : "при enable уменьшает количество при продаже", defaultfield : "",  zod : z.int().min(1), typefield : "switch", callFunc :  ""},
    {namefield : "stockstatus", labelfield : "складской статус", placeholderfield : "складской статус", descriptionfiled : "складской статус", defaultfield : "",  zod : z.string().min(1), typefield : "input", callFunc :  ""},
    {namefield : "curency", labelfield : "curency", placeholderfield : "curency", descriptionfiled : "curency", defaultfield : "",  zod : z.string().min(1), typefield : "selectcurrency", callFunc :  ""},
    {namefield : "price", labelfield : "price", placeholderfield : "price", descriptionfiled : "price", defaultfield : "",  zod : z.int().min(1), typefield : "input", callFunc :  ""},
    {namefield : "price1", labelfield : "price1", placeholderfield : "price1", descriptionfiled : "price1", defaultfield : "",  zod : z.int().min(1), typefield : "input", callFunc :  ""},
    {namefield : "price2", labelfield : "price2", placeholderfield : "price2", descriptionfiled : "price2", defaultfield : "",  zod : z.int().min(1), typefield : "input", callFunc :  ""},
    {namefield : "dateAvailabale", labelfield : "dateAvailabale", placeholderfield : "dateAvailabale", descriptionfiled : "dateAvailabale", defaultfield : "",  zod : z.int().min(1), typefield : "input", callFunc :  ""},
    {namefield : "weight", labelfield : "weight", placeholderfield : "weight", descriptionfiled : "weight", defaultfield : "",  zod : z.int().min(1), typefield : "input", callFunc :  ""},
    {namefield : "length", labelfield : "length", placeholderfield : "length", descriptionfiled : "length", defaultfield : "",  zod : z.int().min(1), typefield : "input", callFunc :  ""},
    {namefield : "width", labelfield : "width", placeholderfield : "width", descriptionfiled : "width", defaultfield : "",  zod : z.int().min(1), typefield : "input", callFunc :  ""},
    {namefield : "height", labelfield : "height", placeholderfield : "height", descriptionfiled : "height", defaultfield : "",  zod : z.int().min(1), typefield : "input", callFunc :  ""},
    {namefield : "manufactured", labelfield : "manufactured", placeholderfield : "manufactured", descriptionfiled : "manufactured", defaultfield : "",  zod : z.int().min(1), typefield : "input", callFunc :  ""},
    {namefield : "code1c", labelfield : "код для 1с", placeholderfield : "код для 1с", descriptionfiled : "введите код для 1с", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    {namefield : "codechange", labelfield : "код для обмена данными", placeholderfield : "код для обмена данными", descriptionfiled : "код для обмена данными", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
  ],
  by : [
    
    
    {namefield : "status", labelfield : "Статус товара (активен или нет)", placeholderfield : "статус товара", descriptionfiled : "выберите статус товара (пример: неактивен)", defaultfield : "unchecked",  zod : z.string().min(5), typefield : "checkbox", callFunc :  ""},
    {namefield : "joinGroupId", labelfield : "Варианты этого товара", placeholderfield : "варианты товара", descriptionfiled : "выберите вариант товара (разные цвета, размеры, ...)", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    {namefield : "furlProduct", labelfield : "seo имя товара", placeholderfield : "уникальное seo имя товара", descriptionfiled : "введите уникальное seo имя товара (пример: GSH58)", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    {namefield : "model", labelfield : "модель товара", placeholderfield : "модель товара", descriptionfiled : "введите модель товара (пример: GSH58)", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    {namefield : "sku", labelfield : "sku товара", placeholderfield : "sku товара", descriptionfiled : "введите sku товара (пример: GSH58)", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    {namefield : "upc", labelfield : "upc код товара (Universal Product Code)", placeholderfield : "upc товара", descriptionfiled : "введите upc товара (пример: GSH58)", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    {namefield : "ean", labelfield : "ean код товара", placeholderfield : "ean код товара", descriptionfiled : "введите ean код товара (пример: 4812345678911)", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    {namefield : "jan", labelfield : "jan код товара", placeholderfield : "jan код товара", descriptionfiled : "введите jan код товара (пример: 4812345678911)", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    {namefield : "isbn", labelfield : "isbn код товара", placeholderfield : "isbn код товара", descriptionfiled : "введите isbn код товара (пример: 4812345678911)", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    {namefield : "mpn", labelfield : "mpn код товара", placeholderfield : "mpn код товара", descriptionfiled : "введите mpn код товара (пример: 4812345678911)", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},   
    {namefield : "quantity", labelfield : "количество", placeholderfield : "количество", descriptionfiled : "количество", defaultfield : "",  zod : z.boolean(), typefield : "input", callFunc :  ""},
    {namefield : "subtract", labelfield : "уменьшать количество при продаже", placeholderfield : "subtract", descriptionfiled : "при enable уменьшает количество при продаже", defaultfield : "",  zod : z.int().min(1), typefield : "switch", callFunc :  ""},
    {namefield : "stockstatus", labelfield : "складской статус", placeholderfield : "складской статус", descriptionfiled : "складской статус", defaultfield : "",  zod : z.string().min(1), typefield : "input", callFunc :  ""},
    {namefield : "curency", labelfield : "curency", placeholderfield : "curency", descriptionfiled : "curency", defaultfield : "",  zod : z.string().min(1), typefield : "selectcurrency", callFunc :  ""},
    {namefield : "price", labelfield : "price", placeholderfield : "price", descriptionfiled : "price", defaultfield : "",  zod : z.int().min(1), typefield : "input", callFunc :  ""},
    {namefield : "price1", labelfield : "price1", placeholderfield : "price1", descriptionfiled : "price1", defaultfield : "",  zod : z.int().min(1), typefield : "input", callFunc :  ""},
    {namefield : "price2", labelfield : "price2", placeholderfield : "price2", descriptionfiled : "price2", defaultfield : "",  zod : z.int().min(1), typefield : "input", callFunc :  ""},
    {namefield : "dateAvailabale", labelfield : "dateAvailabale", placeholderfield : "dateAvailabale", descriptionfiled : "dateAvailabale", defaultfield : "",  zod : z.int().min(1), typefield : "input", callFunc :  ""},
    {namefield : "weight", labelfield : "weight", placeholderfield : "weight", descriptionfiled : "weight", defaultfield : "",  zod : z.int().min(1), typefield : "input", callFunc :  ""},
    {namefield : "length", labelfield : "length", placeholderfield : "length", descriptionfiled : "length", defaultfield : "",  zod : z.int().min(1), typefield : "input", callFunc :  ""},
    {namefield : "width", labelfield : "width", placeholderfield : "width", descriptionfiled : "width", defaultfield : "",  zod : z.int().min(1), typefield : "input", callFunc :  ""},
    {namefield : "height", labelfield : "height", placeholderfield : "height", descriptionfiled : "height", defaultfield : "",  zod : z.int().min(1), typefield : "input", callFunc :  ""},
    {namefield : "manufactured", labelfield : "manufactured", placeholderfield : "manufactured", descriptionfiled : "manufactured", defaultfield : "",  zod : z.int().min(1), typefield : "input", callFunc :  ""},
    {namefield : "code1c", labelfield : "код для 1с", placeholderfield : "код для 1с", descriptionfiled : "введите код для 1с", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    {namefield : "codechange", labelfield : "код для обмена данными", placeholderfield : "код для обмена данными", descriptionfiled : "код для обмена данными", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
  ],
  
}


export const productInputFormFieldsSelectedImages : IproductInputFormFields  = {
  ru :  [   
    {namefield : "alt", labelfield : "alt тег", placeholderfield : "картинка для", descriptionfiled : "введите тег ALT картинки", defaultfield : "картинка для kenovo1",  zod : z.string().min(5), typefield : "input", callFunc :  ""},    
  ],
  en :  [   
    {namefield : "alt", labelfield : "alt tag", placeholderfield : "image for", descriptionfiled : "input tag ALT image", defaultfield : "img for kenovo1",  zod : z.string().min(5), typefield : "input", callFunc :  ""},    
  ],
  by :  [    
    {namefield : "alt", labelfield : "alt тэг", placeholderfield : "маляванка для", descriptionfiled : "введите тег ALT картинки", defaultfield : "маляванка для kenovo1",  zod : z.string().min(5), typefield : "input", callFunc :  ""},    
  ] 
}









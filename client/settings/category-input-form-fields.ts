import { z } from "zod";
import { getPathsCategories } from "@/utils/get-categories";
// All info for form input category. Format:
// { ru: [
//  {namefield :"name", labelfield : "label", placeholderfield : "placeholder", descriptionfiled : "description", defaultfield : 0,  zod : z.string().min(5), typefield : "input"}
//  {namefield :"name", labelfield : "label", placeholderfield : "placeholder", descriptionfiled : "description", defaultfield : 0,  zod : z.string().min(5), typefield : "input"}
// ]
// }

interface IcategoryInputFormFields {
   [key : string] : Array<IcategoryInputFormFieldsItem>
   //IcategoryInputFormFieldsItem[]
}

interface IcategoryInputFormFieldsItem {
  namefield: string,
  labelfield: string,
  placeholderfield: string,
  descriptionfiled: string,
  defaultfield: string | number | boolean | string[] | number [],
  // zod: z.AnyZodObject | z.ZodString | z.ZodNumber | z.ZodBoolean | z.ZodTypeAny | z.ArrayCardinality,
  // zod: z.AnyZodObject | z.ZodString | z.ZodNumber | z.ZodBoolean | z.ZodTypeAny | z.ArrayCardinality,
  zod: z.ZodTypeAny ,
  typefield: "textarea" | "checkbox" | "input" | "number" | "url" | "file" | "selectCategoryPath" ,
  callFunc : string
}


export const categoryInputFormFieldsNameJson : IcategoryInputFormFields  = {
  ru :  [   
    {namefield : "name", labelfield : "имя категории", placeholderfield : "имя категории", descriptionfiled : "введите введите уникальное имя категории", defaultfield : "nameRU1",  zod : z.string().min(5), typefield : "input", callFunc :  ""},    
  ],
  en :  [   
    {namefield : "name", labelfield : "name of category", placeholderfield : "name of category", descriptionfiled : "введите введите уникальное имя категории", defaultfield : "nameEN1",  zod : z.string().min(5), typefield : "input", callFunc :  ""},    
  ],
  by :  [    
    {namefield : "name", labelfield : "name of category", placeholderfield : "name of category", descriptionfiled : "введите введите уникальное имя категории", defaultfield : "nameBY1",  zod : z.string().min(5), typefield : "input", callFunc :  ""},    
  ] 
}


export const categoryInputFormFieldsDescriptionJson : IcategoryInputFormFields  = {
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


export const categoryInputFormFieldsSeoJson : IcategoryInputFormFields = {
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


export const categoryInputFormFieldsNameSetParametrsJson : IcategoryInputFormFields = {
  ru : [
    {namefield :"nameSetParametrsJson", labelfield : "название параметров", placeholderfield : "параметр1, параметр2, ...", descriptionfiled : "введите названия параметров (пример: параметр1, параметр2, градус)", defaultfield : "параметр1RU, параметр2RU",  zod : z.string().min(5), typefield : "input", callFunc :  ""}, // "параметр1, параметр2, ...", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
  ],
  en : [
    {namefield :"nameSetParametrsJson", labelfield : "names parametrs", placeholderfield : "parametr1, parametr2, ...", descriptionfiled : "inpt names of parametrs (example: parametr1, parametr2, gradus)", defaultfield : "parametr1EN, parametr2EN",  zod : z.string().min(5), typefield : "input", callFunc :  ""}, // "параметр1, параметр2, ...", defaultfield : 0,  zod : z.string().min(5), typefield : "input", callFunc :  ""},
  ],
  by : [
    {namefield :"nameSetParametrsJson", labelfield : "names parametrs", placeholderfield : "parametr1, parametr2, ...", descriptionfiled : "inpt names of parametrs (example: parametr1, parametr2, gradus)", defaultfield : "параметр1BY, параметр2BY",  zod : z.string().min(5), typefield : "input", callFunc :  ""}, // "параметр1, параметр2, ...", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
  ]
}


export const categoryInputFormFieldsNoTranslateData : IcategoryInputFormFields = {
  ru : [
    // for delete {namefield : "idParent", labelfield : "родительская категория", placeholderfield : "родительская категория", descriptionfiled : "введите родительскую категорию", defaultfield : 1, zod : z.coerce.number().min(1), typefield : "number", callFunc :  ""},
    // **** categoryPath  react hook form не поддерживает select multiple поэтому categoryPath не массив, а строка(которая потом преобразуется в массив и обратно)
    {namefield : "categoryPath", labelfield : "последовательность вложенных категорий", placeholderfield : "последовательность вложенных категорий", descriptionfiled : "последовательность вложенных категорий", defaultfield : "",  zod : z.string(), typefield : "selectCategoryPath", callFunc :  "getPathsCategories"},
    // {namefield : "top", labelfield : "показывать в меню", placeholderfield : "показывать в меню", descriptionfiled : "отметьте если необходимо показать категорию в меню", defaultfield : false,  zod : z.boolean(), typefield : "checkbox", callFunc :  ""},
    // {namefield : "status", labelfield : "статус категории", placeholderfield : "статус категории", descriptionfiled : "статус категории", defaultfield : "actived",  zod : z.string().min(5), typefield : "switch", callFunc :  ""},
    {namefield : "furlCategory", labelfield : "seo имя категории", placeholderfield : "seo имя категории", descriptionfiled : "введите seo имя категории (пример: /hook)", defaultfield : "hooker",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield : "code1c", labelfield : "код для 1с", placeholderfield : "код для 1с", descriptionfiled : "введите код для 1с", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield : "codechange", labelfield : "код для обмена данными", placeholderfield : "код для обмена данными", descriptionfiled : "код для обмена данными", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield : "avatar", labelfield : "изображение аватар", placeholderfield : "изображение аватар", descriptionfiled : "введите изображение аватар", defaultfield : "",  zod : z.string().min(5), typefield : "file", callFunc :  ""},
    // {namefield : "image", labelfield : "изображение основное", placeholderfield : "изображение основное", descriptionfiled : "изображение основное", defaultfield : "",  zod : z.string().min(5), typefield : "file", callFunc :  ""},
    // {namefield : "images", labelfield : "набор изображений", placeholderfield : "набор изображений", descriptionfiled : "набор изображений", defaultfield : "",  zod : z.string().min(5), typefield : "file", callFunc :  ""},
  ],
  en : [
    // for delete {namefield : "idParent", labelfield : "родительская категория", placeholderfield : "родительская категория", descriptionfiled : "введите родительскую категорию", defaultfield : 1,  zod : z.coerce.number().min(1), typefield : "number", callFunc :  ""},
    {namefield : "categoryPath", labelfield : "последовательность вложенных категорий", placeholderfield : "последовательность вложенных категорий", descriptionfiled : "последовательность вложенных категорий", defaultfield : "",  zod : z.string(), typefield : "selectCategoryPath", callFunc :  "getPathsCategories"},
    // {namefield : "top", labelfield : "показывать в меню", placeholderfield : "показывать в меню", descriptionfiled : "отметьте если необходимо показать категорию в меню", defaultfield : false,  zod : z.boolean(), typefield : "checkbox", callFunc :  ""},
    // {namefield : "status", labelfield : "статус категории", placeholderfield : "статус категории", descriptionfiled : "статус категории", defaultfield : "",  zod : z.string().min(5), typefield : "switch", callFunc :  ""},
    {namefield : "furlCategory", labelfield : "seo имя категории", placeholderfield : "seo имя категории", descriptionfiled : "введите seo имя категории (пример: /hook)", defaultfield : "hooker",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield : "code1c", labelfield : "код для 1с", placeholderfield : "код для 1с", descriptionfiled : "введите код для 1с", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield : "codechange", labelfield : "код для обмена данными", placeholderfield : "код для обмена данными", descriptionfiled : "код для обмена данными", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield : "avatar", labelfield : "изображение аватар", placeholderfield : "изображение аватар", descriptionfiled : "введите изображение аватар", defaultfield : "",  zod : z.string().min(5), typefield : "file", callFunc :  ""},
    // {namefield : "image", labelfield : "изображение основное", placeholderfield : "изображение основное", descriptionfiled : "изображение основное", defaultfield : "",  zod : z.string().min(5), typefield : "file", callFunc :  ""},
    // {namefield : "images", labelfield : "набор изображений", placeholderfield : "набор изображений", descriptionfiled : "набор изображений", defaultfield : "",  zod : z.string().min(5), typefield : "file", callFunc :  ""},
  ],
  by : [
    // for delete {namefield : "idParent", labelfield : "родительская категория", placeholderfield : "родительская категория", descriptionfiled : "введите родительскую категорию", defaultfield : 1,  zod : z.coerce.number().min(1), typefield : "number", callFunc :  ""},
    {namefield : "categoryPath", labelfield : "последовательность вложенных категорий", placeholderfield : "последовательность вложенных категорий", descriptionfiled : "последовательность вложенных категорий", defaultfield : "",  zod : z.string(), typefield : "selectCategoryPath", callFunc :  "getPathsCategories"},
    // {namefield : "top", labelfield : "показывать в меню", placeholderfield : "показывать в меню", descriptionfiled : "отметьте если необходимо показать категорию в меню", defaultfield : false,  zod : z.boolean(), typefield : "checkbox", callFunc :  ""},
    // {namefield : "status", labelfield : "статус категории", placeholderfield : "статус категории", descriptionfiled : "статус категории", defaultfield : "",  zod : z.string().min(5), typefield : "switch", callFunc :  ""},
    {namefield : "furlCategory", labelfield : "seo имя категории", placeholderfield : "seo имя категории", descriptionfiled : "введите seo имя категории (пример: /hook)", defaultfield : "hooker",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield : "code1c", labelfield : "код для 1с", placeholderfield : "код для 1с", descriptionfiled : "введите код для 1с", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield : "codechange", labelfield : "код для обмена данными", placeholderfield : "код для обмена данными", descriptionfiled : "код для обмена данными", defaultfield : "",  zod : z.string().min(5), typefield : "input", callFunc :  ""},
    // {namefield : "avatar", labelfield : "изображение аватар", placeholderfield : "изображение аватар", descriptionfiled : "введите изображение аватар", defaultfield : "",  zod : z.string().min(5), typefield : "file", callFunc :  ""},
    // {namefield : "image", labelfield : "изображение основное", placeholderfield : "изображение основное", descriptionfiled : "изображение основное", defaultfield : "",  zod : z.string().min(5), typefield : "file", callFunc :  ""},
    // {namefield : "images", labelfield : "набор изображений", placeholderfield : "набор изображений", descriptionfiled : "набор изображений", defaultfield : "",  zod : z.string().min(5), typefield : "file", callFunc :  ""},
  ],
  
}


export const categoryInputFormFieldsSelectedImages : IcategoryInputFormFields  = {
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









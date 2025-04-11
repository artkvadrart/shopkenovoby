import { z } from "zod";
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
  defaultfield: string | number | boolean,
  zod: z.AnyZodObject | z.ZodString | z.ZodNumber | z.ZodBoolean | z.ZodTypeAny | z.ArrayCardinality
  typefield: "textarea" | "checkbox" | "input" | "number" | "url" | "file" | "select" ,
}


export const categoryInputFormFieldsDescriptionJson : IcategoryInputFormFields  = {
  ru :  [
    {namefield : "titleH1", labelfield : "заголовок H1", placeholderfield : "заголовок H1", descriptionfiled : "введите заголовок уникальный", defaultfield : "",  zod : z.string().min(5), typefield : "input"},
    {namefield : "name", labelfield : "имя категории", placeholderfield : "имя категории", descriptionfiled : "введите введите уникальное имя категории", defaultfield : "",  zod : z.array(z.number()), typefield : "select"},
    // {namefield : "description", labelfield : "описание категории", placeholderfield : "краткое описание категории", descriptionfiled : "введите краткое описание, 200 символов", defaultfield : "",  zod : z.string().min(5), typefield : "input"},
    // {namefield : "descriptionextendet", labelfield : "расширенное описание категории", placeholderfield : "расширенное описание категории", descriptionfiled : "введите расширенное описание", defaultfield : "",  zod : z.string().min(5), typefield : "textarea"},
  ],
  en :  [
    {namefield : "titleH1", labelfield : "title H1", placeholderfield : "title H1", descriptionfiled : "input unique title", defaultfield : "",  zod : z.string().min(5), typefield : "input"},
    {namefield : "name", labelfield : "name of category", placeholderfield : "name of category", descriptionfiled : "введите введите уникальное имя категории", defaultfield : "",  zod : z.array(z.number()), typefield : "select"},
    // {namefield : "description", labelfield : "описание категории", placeholderfield : "краткое описание категории", descriptionfiled : "введите краткое описание, 200 символов", defaultfield : "",  zod : z.string().min(5), typefield : "input"},
    // {namefield : "descriptionextendet", labelfield : "расширенное описание категории", placeholderfield : "расширенное описание категории", descriptionfiled : "введите расширенное описание", defaultfield : "",  zod : z.string().min(5), typefield : "textarea"},
  ] 
  ,
  by :  [
    {namefield : "titleH1", labelfield : "title H1", placeholderfield : "title H1", descriptionfiled : "input unique title", defaultfield : "",  zod : z.string().min(5), typefield : "input"},
    {namefield : "name", labelfield : "name of category", placeholderfield : "name of category", descriptionfiled : "введите введите уникальное имя категории", defaultfield : "",  zod : z.array(z.number()), typefield : "select"},
    // {namefield : "description", labelfield : "описание категории", placeholderfield : "краткое описание категории", descriptionfiled : "введите краткое описание, 200 символов", defaultfield : "",  zod : z.string().min(5), typefield : "input"},
    // {namefield : "descriptionextendet", labelfield : "расширенное описание категории", placeholderfield : "расширенное описание категории", descriptionfiled : "введите расширенное описание", defaultfield : "",  zod : z.string().min(5), typefield : "textarea"},
  ] 
}


export const categoryInputFormFieldsNoTranslateData : IcategoryInputFormFields = {
  ru : [
    {namefield : "parentid", labelfield : "родительская категория", placeholderfield : "родительская категория", descriptionfiled : "введите родительскую категорию", defaultfield : 12345,  zod : z.string().min(5), typefield : "input"},
    {namefield : "path", labelfield : "последовательность вложенных категорий", placeholderfield : "последовательность вложенных категорий", descriptionfiled : "последовательность вложенных категорий", defaultfield : "/123/123/123",  zod : z.string().min(5), typefield : "input"},
    // {namefield : "top", labelfield : "показывать в меню", placeholderfield : "показывать в меню", descriptionfiled : "отметьте если необходимо показать категорию в меню", defaultfield : false,  zod : z.boolean(), typefield : "checkbox"},
    // {namefield : "status", labelfield : "статус категории", placeholderfield : "статус категории", descriptionfiled : "статус категории", defaultfield : "actived",  zod : z.string().min(5), typefield : "select"},
    // {namefield : "furl", labelfield : "seo имя категории", placeholderfield : "seo имя категории", descriptionfiled : "введите seo имя категории (пример: /hook)", defaultfield : "/hooker",  zod : z.string().min(5), typefield : "input"},
    // {namefield : "code1c", labelfield : "код для 1с", placeholderfield : "код для 1с", descriptionfiled : "введите код для 1с", defaultfield : "",  zod : z.string().min(5), typefield : "input"},
    // {namefield : "codechange", labelfield : "код для обмена данными", placeholderfield : "код для обмена данными", descriptionfiled : "код для обмена данными", defaultfield : "",  zod : z.string().min(5), typefield : "input"},
    // {namefield : "avatar", labelfield : "изображение аватар", placeholderfield : "изображение аватар", descriptionfiled : "введите изображение аватар", defaultfield : "",  zod : z.string().min(5), typefield : "file"},
    // {namefield : "image", labelfield : "изображение основное", placeholderfield : "изображение основное", descriptionfiled : "изображение основное", defaultfield : "",  zod : z.string().min(5), typefield : "file"},
    // {namefield : "images", labelfield : "набор изображений", placeholderfield : "набор изображений", descriptionfiled : "набор изображений", defaultfield : "",  zod : z.string().min(5), typefield : "file"}
  ],
  en : [
    {namefield : "parentid", labelfield : "родительская категория", placeholderfield : "родительская категория", descriptionfiled : "введите родительскую категорию", defaultfield : 12345,  zod : z.string().min(5), typefield : "input"},
    {namefield : "path", labelfield : "последовательность вложенных категорий", placeholderfield : "последовательность вложенных категорий", descriptionfiled : "последовательность вложенных категорий", defaultfield : "/123/123/123",  zod : z.string().min(5), typefield : "input"},
    // {namefield : "top", labelfield : "показывать в меню", placeholderfield : "показывать в меню", descriptionfiled : "отметьте если необходимо показать категорию в меню", defaultfield : false,  zod : z.boolean(), typefield : "checkbox"},
    // {namefield : "status", labelfield : "статус категории", placeholderfield : "статус категории", descriptionfiled : "статус категории", defaultfield : "",  zod : z.string().min(5), typefield : "select"},
    // {namefield : "furl", labelfield : "seo имя категории", placeholderfield : "seo имя категории", descriptionfiled : "введите seo имя категории (пример: /hook)", defaultfield : "/hooker",  zod : z.string().min(5), typefield : "input"},
    // {namefield : "code1c", labelfield : "код для 1с", placeholderfield : "код для 1с", descriptionfiled : "введите код для 1с", defaultfield : "",  zod : z.string().min(5), typefield : "input"},
    // {namefield : "codechange", labelfield : "код для обмена данными", placeholderfield : "код для обмена данными", descriptionfiled : "код для обмена данными", defaultfield : "",  zod : z.string().min(5), typefield : "input"},
    // {namefield : "avatar", labelfield : "изображение аватар", placeholderfield : "изображение аватар", descriptionfiled : "введите изображение аватар", defaultfield : "",  zod : z.string().min(5), typefield : "file"},
    // {namefield : "image", labelfield : "изображение основное", placeholderfield : "изображение основное", descriptionfiled : "изображение основное", defaultfield : "",  zod : z.string().min(5), typefield : "file"},
    // {namefield : "images", labelfield : "набор изображений", placeholderfield : "набор изображений", descriptionfiled : "набор изображений", defaultfield : "",  zod : z.string().min(5), typefield : "file"}
  ],
  by : [
    {namefield : "parentid", labelfield : "родительская категория", placeholderfield : "родительская категория", descriptionfiled : "введите родительскую категорию", defaultfield : 12345,  zod : z.string().min(5), typefield : "input"},
    {namefield : "path", labelfield : "последовательность вложенных категорий", placeholderfield : "последовательность вложенных категорий", descriptionfiled : "последовательность вложенных категорий", defaultfield : "/123/123/123",  zod : z.string().min(5), typefield : "input"},
    // {namefield : "top", labelfield : "показывать в меню", placeholderfield : "показывать в меню", descriptionfiled : "отметьте если необходимо показать категорию в меню", defaultfield : false,  zod : z.boolean(), typefield : "checkbox"},
    // {namefield : "status", labelfield : "статус категории", placeholderfield : "статус категории", descriptionfiled : "статус категории", defaultfield : "",  zod : z.string().min(5), typefield : "select"},
    // {namefield : "furl", labelfield : "seo имя категории", placeholderfield : "seo имя категории", descriptionfiled : "введите seo имя категории (пример: /hook)", defaultfield : "/hooker",  zod : z.string().min(5), typefield : "input"},
    // {namefield : "code1c", labelfield : "код для 1с", placeholderfield : "код для 1с", descriptionfiled : "введите код для 1с", defaultfield : "",  zod : z.string().min(5), typefield : "input"},
    // {namefield : "codechange", labelfield : "код для обмена данными", placeholderfield : "код для обмена данными", descriptionfiled : "код для обмена данными", defaultfield : "",  zod : z.string().min(5), typefield : "input"},
    // {namefield : "avatar", labelfield : "изображение аватар", placeholderfield : "изображение аватар", descriptionfiled : "введите изображение аватар", defaultfield : "",  zod : z.string().min(5), typefield : "file"},
    // {namefield : "image", labelfield : "изображение основное", placeholderfield : "изображение основное", descriptionfiled : "изображение основное", defaultfield : "",  zod : z.string().min(5), typefield : "file"},
    // {namefield : "images", labelfield : "набор изображений", placeholderfield : "набор изображений", descriptionfiled : "набор изображений", defaultfield : "",  zod : z.string().min(5), typefield : "file"}
  ],
  
}


export const categoryInputFormFieldsSeoJson : IcategoryInputFormFields = {
  ru : [
    {namefield :"metadataBase", labelfield : "metadataBase", placeholderfield : "metadataBase", descriptionfiled : "введите metadataBase", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    {namefield :"titleMeta", labelfield : "titleMeta", placeholderfield : "titleMeta", descriptionfiled : "введите titleMeta", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"description", labelfield : "description", placeholderfield : "description", descriptionfiled : "введите рdescription", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"abstract", labelfield : "abstract", placeholderfield : "abstract", descriptionfiled : "введите abstract", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"keywords", labelfield : "keywords", placeholderfield : "keywords", descriptionfiled : "введите keywords", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"applicationName", labelfield : "applicationName", placeholderfield : "applicationName", descriptionfiled : "введите applicationName", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // // h1: string; // see html content    
    // {namefield :"authorName", labelfield : "authorName", placeholderfield : "authorName", descriptionfiled : "введите authorName", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"authorUrl", labelfield : "authorUrl", placeholderfield : "authorUrl", descriptionfiled : "введите authorUrl", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"generator", labelfield : "generator", placeholderfield : "generator", descriptionfiled : "введите generator", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},

    // {namefield :"referrer", labelfield : "referrer", placeholderfield : "referrer", descriptionfiled : "введите referrer", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"themeColor", labelfield : "themeColor", placeholderfield : "themeColor", descriptionfiled : "введите themeColor", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},

    // {namefield :"colorScheme", labelfield : "colorScheme", placeholderfield : "colorScheme", descriptionfiled : "введите colorScheme", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    
    // {namefield :"urlOpenGraph", labelfield : "urlOpenGraph", placeholderfield : "urlOpenGraph", descriptionfiled : "введите urlOpenGraph", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"titleOpenGraph", labelfield : "titleOpenGraph", placeholderfield : "titleOpenGraph", descriptionfiled : "введите titleOpenGraph", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"descriptionOpenGraph", labelfield : "descriptionOpenGraph", placeholderfield : "descriptionOpenGraph", descriptionfiled : "введите descriptionOpenGraph", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"siteNameOpenGraph", labelfield : "siteNameOpenGraph", placeholderfield : "siteNameOpenGraph", descriptionfiled : "введите siteNameOpenGraph", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"imagesOpenGraph", labelfield : "imagesOpenGraph", placeholderfield : "imagesOpenGraph", descriptionfiled : "введите imagesOpenGraph", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
  
    // {namefield :"cardTwitter", labelfield : "cardTwitter", placeholderfield : "cardTwitter", descriptionfiled : "введите cardTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input"}, // "summary" | "summary_large_image" | "player" | "app" | undefined;
    // {namefield :"siteTwitter", labelfield : "siteTwitter", placeholderfield : "siteTwitter", descriptionfiled : "введите siteTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"creatorTwitter", labelfield : "creatorTwitter", placeholderfield : "creatorTwitter", descriptionfiled : "введите creatorTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"titleTwitter", labelfield : "titleTwitter", placeholderfield : "titleTwitter", descriptionfiled : "введите titleTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"descriptionTwitter", labelfield : "descriptionTwitter", placeholderfield : "descriptionTwitter", descriptionfiled : "введите descriptionTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"imagesTwitter", labelfield : "imagesTwitter", placeholderfield : "imagesTwitter", descriptionfiled : "введите imagesTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
  
    // {namefield :"googleVerification", labelfield : "googleVerification", placeholderfield : "googleVerification", descriptionfiled : "введите googleVerification", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"yandexVerification", labelfield : "yandexVerification", placeholderfield : "yandexVerification", descriptionfiled : "введите yandexVerification", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
  
    // {namefield :"capableAppleWebApp", labelfield : "capableAppleWebApp", placeholderfield : "capableAppleWebApp", descriptionfiled : "введите capableAppleWebApp", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"titleAppleWebApp", labelfield : "titleAppleWebApp", placeholderfield : "titleAppleWebApp", descriptionfiled : "введите titleAppleWebApp", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"statusBarStyleAppleWebApp", labelfield : "statusBarStyleAppleWebApp", placeholderfield : "statusBarStyleAppleWebApp", descriptionfiled : "введите statusBarStyleAppleWebApp", defaultfield : 0,  zod : z.string().min(5), typefield : "input"}, // "defaultfield" | "black" | "black-translucent" | undefined; // "black-translucent"
   
    // {namefield :"indexRobots", labelfield : "indexRobots", placeholderfield : "indexRobots", descriptionfiled : "введите indexRobots", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"followRobots", labelfield : "followRobots", placeholderfield : "followRobots", descriptionfiled : "введите followRobots", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
  
    // {namefield :"manifest", labelfield : "manifest", placeholderfield : "manifest", descriptionfiled : "введите manifest", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"iconIcon", labelfield : "iconIcon", placeholderfield : "iconIcon", descriptionfiled : "введите iconIcon", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"iconShortcut", labelfield : "iconShortcut", placeholderfield : "iconShortcut", descriptionfiled : "введите iconShortcut", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"iconApple", labelfield : "iconApple", placeholderfield : "iconApple", descriptionfiled : "введите iconApple", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
  ],
  en : [
    {namefield :"metadataBase", labelfield : "metadataBase", placeholderfield : "metadataBase", descriptionfiled : "input metadataBase", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    {namefield :"titleMeta", labelfield : "titleMeta", placeholderfield : "titleMeta", descriptionfiled : "введите titleMeta", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"description", labelfield : "description", placeholderfield : "description", descriptionfiled : "input рdescription", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"abstract", labelfield : "abstract", placeholderfield : "abstract", descriptionfiled : "input abstract", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"keywords", labelfield : "keywords", placeholderfield : "keywords", descriptionfiled : "input keywords", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"applicationName", labelfield : "applicationName", placeholderfield : "applicationName", descriptionfiled : "input applicationName", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // // h1: string; // see html content    
    // {namefield :"authorName", labelfield : "authorName", placeholderfield : "authorName", descriptionfiled : "input authorName", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"authorUrl", labelfield : "authorUrl", placeholderfield : "authorUrl", descriptionfiled : "input authorUrl", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"generator", labelfield : "generator", placeholderfield : "generator", descriptionfiled : "input generator", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},

    // {namefield :"referrer", labelfield : "referrer", placeholderfield : "referrer", descriptionfiled : "input referrer", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"themeColor", labelfield : "themeColor", placeholderfield : "themeColor", descriptionfiled : "input themeColor", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},

    // {namefield :"colorScheme", labelfield : "colorScheme", placeholderfield : "colorScheme", descriptionfiled : "input colorScheme", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    
    // {namefield :"urlOpenGraph", labelfield : "urlOpenGraph", placeholderfield : "urlOpenGraph", descriptionfiled : "input urlOpenGraph", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"titleOpenGraph", labelfield : "titleOpenGraph", placeholderfield : "titleOpenGraph", descriptionfiled : "input titleOpenGraph", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"descriptionOpenGraph", labelfield : "descriptionOpenGraph", placeholderfield : "descriptionOpenGraph", descriptionfiled : "input descriptionOpenGraph", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"siteNameOpenGraph", labelfield : "siteNameOpenGraph", placeholderfield : "siteNameOpenGraph", descriptionfiled : "input siteNameOpenGraph", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"imagesOpenGraph", labelfield : "imagesOpenGraph", placeholderfield : "imagesOpenGraph", descriptionfiled : "input imagesOpenGraph", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
  
    // {namefield :"cardTwitter", labelfield : "cardTwitter", placeholderfield : "cardTwitter", descriptionfiled : "input cardTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input"}, // "summary" | "summary_large_image" | "player" | "app" | undefined;
    // {namefield :"siteTwitter", labelfield : "siteTwitter", placeholderfield : "siteTwitter", descriptionfiled : "введите siteTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"creatorTwitter", labelfield : "creatorTwitter", placeholderfield : "creatorTwitter", descriptionfiled : "input creatorTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"titleTwitter", labelfield : "titleTwitter", placeholderfield : "titleTwitter", descriptionfiled : "input titleTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"descriptionTwitter", labelfield : "descriptionTwitter", placeholderfield : "descriptionTwitter", descriptionfiled : "input descriptionTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"imagesTwitter", labelfield : "imagesTwitter", placeholderfield : "imagesTwitter", descriptionfiled : "input imagesTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
  
    // {namefield :"googleVerification", labelfield : "googleVerification", placeholderfield : "googleVerification", descriptionfiled : "input googleVerification", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"yandexVerification", labelfield : "yandexVerification", placeholderfield : "yandexVerification", descriptionfiled : "input yandexVerification", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
  
    // {namefield :"capableAppleWebApp", labelfield : "capableAppleWebApp", placeholderfield : "capableAppleWebApp", descriptionfiled : "input capableAppleWebApp", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"titleAppleWebApp", labelfield : "titleAppleWebApp", placeholderfield : "titleAppleWebApp", descriptionfiled : "input titleAppleWebApp", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"statusBarStyleAppleWebApp", labelfield : "statusBarStyleAppleWebApp", placeholderfield : "statusBarStyleAppleWebApp", descriptionfiled : "input statusBarStyleAppleWebApp", defaultfield : 0,  zod : z.string().min(5), typefield : "input"}, // "defaultfield" | "black" | "black-translucent" | undefined; // "black-translucent"
   
    // {namefield :"indexRobots", labelfield : "indexRobots", placeholderfield : "indexRobots", descriptionfiled : "input indexRobots", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"followRobots", labelfield : "followRobots", placeholderfield : "followRobots", descriptionfiled : "input followRobots", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
  
    // {namefield :"manifest", labelfield : "manifest", placeholderfield : "manifest", descriptionfiled : "input manifest", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"iconIcon", labelfield : "iconIcon", placeholderfield : "iconIcon", descriptionfiled : "input iconIcon", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"iconShortcut", labelfield : "iconShortcut", placeholderfield : "iconShortcut", descriptionfiled : "input iconShortcut", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"iconApple", labelfield : "iconApple", placeholderfield : "iconApple", descriptionfiled : "input iconApple", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
  ],
  by : [
    {namefield :"metadataBase", labelfield : "metadataBase", placeholderfield : "metadataBase", descriptionfiled : "input metadataBase", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    {namefield :"titleMeta", labelfield : "titleMeta", placeholderfield : "titleMeta", descriptionfiled : "введите titleMeta", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"description", labelfield : "description", placeholderfield : "description", descriptionfiled : "input рdescription", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"abstract", labelfield : "abstract", placeholderfield : "abstract", descriptionfiled : "input abstract", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"keywords", labelfield : "keywords", placeholderfield : "keywords", descriptionfiled : "input keywords", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"applicationName", labelfield : "applicationName", placeholderfield : "applicationName", descriptionfiled : "input applicationName", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // // h1: string; // see html content    
    // {namefield :"authorName", labelfield : "authorName", placeholderfield : "authorName", descriptionfiled : "input authorName", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"authorUrl", labelfield : "authorUrl", placeholderfield : "authorUrl", descriptionfiled : "input authorUrl", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"generator", labelfield : "generator", placeholderfield : "generator", descriptionfiled : "input generator", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},

    // {namefield :"referrer", labelfield : "referrer", placeholderfield : "referrer", descriptionfiled : "input referrer", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"themeColor", labelfield : "themeColor", placeholderfield : "themeColor", descriptionfiled : "input themeColor", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},

    // {namefield :"colorScheme", labelfield : "colorScheme", placeholderfield : "colorScheme", descriptionfiled : "input colorScheme", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    
    // {namefield :"urlOpenGraph", labelfield : "urlOpenGraph", placeholderfield : "urlOpenGraph", descriptionfiled : "input urlOpenGraph", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"titleOpenGraph", labelfield : "titleOpenGraph", placeholderfield : "titleOpenGraph", descriptionfiled : "input titleOpenGraph", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"descriptionOpenGraph", labelfield : "descriptionOpenGraph", placeholderfield : "descriptionOpenGraph", descriptionfiled : "input descriptionOpenGraph", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"siteNameOpenGraph", labelfield : "siteNameOpenGraph", placeholderfield : "siteNameOpenGraph", descriptionfiled : "input siteNameOpenGraph", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"imagesOpenGraph", labelfield : "imagesOpenGraph", placeholderfield : "imagesOpenGraph", descriptionfiled : "input imagesOpenGraph", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
  
    // {namefield :"cardTwitter", labelfield : "cardTwitter", placeholderfield : "cardTwitter", descriptionfiled : "input cardTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input"}, // "summary" | "summary_large_image" | "player" | "app" | undefined;
    // {namefield :"siteTwitter", labelfield : "siteTwitter", placeholderfield : "siteTwitter", descriptionfiled : "введите siteTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"creatorTwitter", labelfield : "creatorTwitter", placeholderfield : "creatorTwitter", descriptionfiled : "input creatorTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"titleTwitter", labelfield : "titleTwitter", placeholderfield : "titleTwitter", descriptionfiled : "input titleTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"descriptionTwitter", labelfield : "descriptionTwitter", placeholderfield : "descriptionTwitter", descriptionfiled : "input descriptionTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"imagesTwitter", labelfield : "imagesTwitter", placeholderfield : "imagesTwitter", descriptionfiled : "input imagesTwitter", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
  
    // {namefield :"googleVerification", labelfield : "googleVerification", placeholderfield : "googleVerification", descriptionfiled : "input googleVerification", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"yandexVerification", labelfield : "yandexVerification", placeholderfield : "yandexVerification", descriptionfiled : "input yandexVerification", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
  
    // {namefield :"capableAppleWebApp", labelfield : "capableAppleWebApp", placeholderfield : "capableAppleWebApp", descriptionfiled : "input capableAppleWebApp", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"titleAppleWebApp", labelfield : "titleAppleWebApp", placeholderfield : "titleAppleWebApp", descriptionfiled : "input titleAppleWebApp", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"statusBarStyleAppleWebApp", labelfield : "statusBarStyleAppleWebApp", placeholderfield : "statusBarStyleAppleWebApp", descriptionfiled : "input statusBarStyleAppleWebApp", defaultfield : 0,  zod : z.string().min(5), typefield : "input"}, // "defaultfield" | "black" | "black-translucent" | undefined; // "black-translucent"
   
    // {namefield :"indexRobots", labelfield : "indexRobots", placeholderfield : "indexRobots", descriptionfiled : "input indexRobots", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"followRobots", labelfield : "followRobots", placeholderfield : "followRobots", descriptionfiled : "input followRobots", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
  
    // {namefield :"manifest", labelfield : "manifest", placeholderfield : "manifest", descriptionfiled : "input manifest", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"iconIcon", labelfield : "iconIcon", placeholderfield : "iconIcon", descriptionfiled : "input iconIcon", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"iconShortcut", labelfield : "iconShortcut", placeholderfield : "iconShortcut", descriptionfiled : "input iconShortcut", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
    // {namefield :"iconApple", labelfield : "iconApple", placeholderfield : "iconApple", descriptionfiled : "input iconApple", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
  ]

}


export const categoryInputFormFieldsNameSetParametrsJson : IcategoryInputFormFields = {
  ru : [
    {namefield :"nameSetParametrsJson", labelfield : "название параметров", placeholderfield : "параметр1, параметр2, ...", descriptionfiled : "введите названия параметров (пример: параметр1, параметр2, градус)", defaultfield : "",  zod : z.string().min(5), typefield : "input"}, // "параметр1, параметр2, ...", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
  ],
  en : [
    {namefield :"nameSetParametrsJson", labelfield : "names parametrs", placeholderfield : "parametr1, parametr2, ...", descriptionfiled : "inpt names of parametrs (example: parametr1, parametr2, gradus)", defaultfield : "",  zod : z.string().min(5), typefield : "input"}, // "параметр1, параметр2, ...", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
  ],
  by : [
    {namefield :"nameSetParametrsJson", labelfield : "names parametrs", placeholderfield : "parametr1, parametr2, ...", descriptionfiled : "inpt names of parametrs (example: parametr1, parametr2, gradus)", defaultfield : "",  zod : z.string().min(5), typefield : "input"}, // "параметр1, параметр2, ...", defaultfield : 0,  zod : z.string().min(5), typefield : "input"},
  ]
}







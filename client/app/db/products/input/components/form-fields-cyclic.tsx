'use client'
import type {JSX} from 'react';
import { use, useEffect, useState } from 'react'
import React from 'react'
import { $Enums, I18n } from '@prisma/client'
import { z } from 'zod'
import { iArrayNameFormField, iFromEditorJson, INameFieldForm, INameFieldFormZod, iSelectedImages } from '@/types'
import { useForm, useFieldArray} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form} from "@/components/ui/form"
import { toast, Toaster } from "react-hot-toast"
import { ToastProvider } from '@/providers/toast-provider'
import { productInputFormFieldsNameJson,
         productInputFormFieldsCategoryJson,
         productInputFormFieldsJoinProductsJson,
         productInputFormFieldsDescriptionJson, 
         productInputFormFieldsNoTranslateData,
         productInputFormFieldsSeoJson,
        //  productInputFormFieldsNameSetParametrsJson, 
         productInputFormFieldsSelectedImages} from '@/settings/product-input-form-fields'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import GetTypeField from '@/app/db/products/input/components/get-type-field'
import axios from 'axios'
// import { JsonValue } from '@prisma/client/runtime/library'
import { iProductsFormFieldsCyclicProps, iIdNameProducts, iJsonLangProducts, iJsonNameProducts } from '@/types'
import { Modal } from '@/components/modal/modal'
import { Upload } from '@/components/modal/upload'
import FormReactHooksNoTranslateData  from './form-react-hooks-notranslatedata'
import FormReactHooksNameSetParametrs from './form-react-hooks-namesetparametrs'
import FormReactHooksSeo from './form-react-hooks-seo'
import FormReactHooksDescription  from './form-react-hooks-description'
import FormReactHooksName from './form-react-hooks-name'
import FormReactHooksSelectedImages from './form-react-hook-select-images'
import EditorComponentForm from '@/components/editor/editor-component-form'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import {useSharedHistoryContext} from '@/components/editor/package/context/SharedHistoryContext';
import {useLexicalEditable} from '@lexical/react/useLexicalEditable';
import {useSettings} from '@/components/editor/package/context/SettingsContext';

import { $generateHtmlFromNodes } from '@lexical/html';
import type { EditorThemeClasses, LexicalEditor, SerializedEditorState, SerializedLexicalNode } from 'lexical';
import { SelectImage } from '@/components/modal/select-image';
import { divide } from 'lodash';
import { Separator } from '@/components/ui/separator';
import { JsonValue } from '@prisma/client/runtime/library';
import FormReactHooksCategory from './form-react-hooks-category';
import FormReactHooksJoinProducts from './form-react-hooks-join-products';
import { log } from 'node:console';
import AddNameSet from './form-react-hooks-add-nameset';


interface iReactHookSelectedImages {
  ReactHookSelectedImageText: string;
  options: iReactHookSelectedImage[];
}
interface iReactHookSelectedImage {
    reactHookSelectedImageText: string;
}
export interface iFormData {
  reactHookSelectedImages: iReactHookSelectedImage[];
}

const FormFieldsCyclic : React.FC<iProductsFormFieldsCyclicProps> = function  (
  {
    activeLanguagesProps, 
    baseLanguageProps, 
    getActiveCurrencyProps,
    getCategoriesProps,
    getProductsProps,    
    getCategoriesNameJsonNameSetParametrsJsonProps    
  }
) {
  const activeLanguages = use(activeLanguagesProps); // передаем функ => Promise
  const baseLanguage = use(baseLanguageProps); // передаем функ => Promise
  const getActiveCurrency = use(getActiveCurrencyProps); // передаем функ => Promise
  const getCategories = use(getCategoriesProps); // передаем функ => Promise
  const getProducts = use(getProductsProps); // передаем функ => Promise
  const getCategoriesNameJsonNameSetParametrsJson = use(getCategoriesNameJsonNameSetParametrsJsonProps);
  
   // передаем функ => Promise


        console.log('<<<<<<<<<<<<<<<<<<<<');
        console.dir(getActiveCurrency, { depth: null });
        console.log('getActiveCurrency', getActiveCurrency);
        console.log('*****************************');
        console.dir(getCategoriesNameJsonNameSetParametrsJson, { depth: null });
        console.log('getCategoriesNameJsonNameSetParametrsJson', getCategoriesNameJsonNameSetParametrsJson);
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');



    // const pathsProducts = use(getPathsProductsProps); // передаем функ => Promise
  const [isOpen, setIsOpen] = useState(false)
  const [isClick, setIsClick] = useState(false)
  const [isOpenSelectImages, setIsOpenSelectImages] = useState(false)
  // const [dataURN, setDataURN] = useState('/uploads') // /uploads
  const [selectedImage, setSelectedImage] = useState <iSelectedImages[] | undefined>([])
  const [selectCategory, setSelectCategory] = useState <string[] | undefined>([])
  const [dataNameSet, setDataNameSet] = useState <PrismaJson.typeCategoryNameJson [] | undefined>([]) //<iIdNameProducts[] | undefined>
  // const [fromEditor, setFromEditor] = useState("")
  const [fromEditorJson, setFromEditorJson] = useState<iFromEditorJson[]>()
  // const [fromEditorJson, setFromEditorJson] = useState<SerializedEditorState<SerializedLexicalNode>[]>([])
  const [lexicalEditor, setLexicalEditor] = useState ()
  const [updateLexical, setUpdateLexical] = useState(false)

 // const getOnCategoriesNameJsonNameSetParametrsJsonInCategory = use(getOnCategoriesNameJsonNameSetParametrsJsonInCategoryProps(selectCategory) );

  useEffect( () => {
    if (selectCategory && selectCategory?.length > 0) { 
     receiveDataNameSet(selectCategory);

     console.log ( 'dataNameSet', dataNameSet);
     //setDataNameSet( use(dataNameSet) )
      

     
    }
  }, [selectCategory]);


  const receiveDataNameSet = async (selectCategory: string[]) => {
    const params = new URLSearchParams();
    selectCategory.forEach(item => params.append('items', item));


      // const response = await fetch(`/api/inputcategory?${params.toString()}`, {
      //   method: 'GET',
      //   headers: {
      //   'Content-Type': 'application/json',
      // },
      // });      
      // const dataResponse = await response.json();
      // console.log('dataResponse', dataResponse);
      // return dataResponse



    await fetch(`/api/inputcategory?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('data', data);
        setDataNameSet(data)
      //  return data //<div>{data.name}</div>
      })

      
      

  }



  var baseLanguageCode : string = "ru";
  baseLanguage ?  baseLanguageCode = baseLanguage.code : baseLanguageCode = "ru";
  const nameFieldForm: INameFieldFormZod = {}; //формирование названий полей формы, для zod
  const defaultFieldForm: INameFieldForm = {}; //формирование значений по умолчанию полей формы
  const arrayNameFormFieldNameJson: Array<iArrayNameFormField> = []; //пустой начальный массив полей nameJson
  const arrayNameFormFieldCategoryJson: Array<iArrayNameFormField> = []; //пустой начальный массив полей nameJson
  const arrayNameFormFieldJoinProductsJson: Array<iArrayNameFormField> = []; //пустой начальный массив полей nameJson
  const arrayNameFormFieldDescriptionJson: Array<iArrayNameFormField> = []; //пустой начальный массив полей descriptionJson
  const arrayNameFormFieldSeoJson: Array<iArrayNameFormField> = []; //пустой начальный массив полей seoJson
  // const arrayNameFormFieldNameSetParametrsJson: Array<iArrayNameFormField> = []; //пустой начальный массив полей nameSetParametrsJson
  const arrayNameFormFieldSelectedImages: Array<iArrayNameFormField> = []; //пустой начальный массив полей SelectedImages
  const arrayNameFormFieldNoTranslateData: Array<iArrayNameFormField> = []; //пустой начальный массив полей noTranslateData

  activeLanguages.map((lang) => {
    productInputFormFieldsNameJson[lang.code].map(
      (element, indexsort) => {
        nameFieldForm[element.namefield + lang.code] = element.zod; // формируем название полей и валидацию zod
        defaultFieldForm[element.namefield + lang.code] = element.defaultfield; // формируем дефолтные значения полей
        arrayNameFormFieldNameJson.push({
          indexkey: element.namefield + lang.code,
          languagename: lang.language,
          sort: lang.sort_order,
          classhtml: "",
          namefield: element.namefield,
          namefieldlang: element.namefield + lang.code,
          namefieldlangsort:
            indexsort + element.namefield + lang.sort_order + lang.code,
          labelfield: element.labelfield,
          placeholderfield: element.placeholderfield,
          descriptionfiled: element.descriptionfiled,
          defaultfield: element.defaultfield,
          zod: element.zod,
          typefield: element.typefield,
          src: "",
          srcThumb: "",
                });
      }
    );
  });

  // activeLanguages.map((lang) => {
  //   productInputFormFieldsCategoryJson[lang.code].map(
  //     (element, indexsort) => {
  //       nameFieldForm[element.namefield + lang.code] = element.zod; // формируем название полей и валидацию zod
  //       defaultFieldForm[element.namefield + lang.code] = element.defaultfield; // формируем дефолтные значения полей
  //       arrayNameFormFieldCategoryJson.push({
  //         indexkey: element.namefield + lang.code,
  //         languagename: lang.language,
  //         sort: lang.sort_order,
  //         classhtml: "",
  //         namefield: element.namefield,
  //         namefieldlang: element.namefield + lang.code,
  //         namefieldlangsort:
  //           indexsort + element.namefield + lang.sort_order + lang.code,
  //         labelfield: element.labelfield,
  //         placeholderfield: element.placeholderfield,
  //         descriptionfiled: element.descriptionfiled,
  //         defaultfield: element.defaultfield,
  //         zod: element.zod,
  //         typefield: element.typefield,
  //         src: "",
  //         srcThumb: "",
  //               });
  //     }
  //   );
  // });


    productInputFormFieldsCategoryJson[baseLanguageCode].map(
    (element, indexsort) => {
      nameFieldForm[element.namefield + "notranslate"] = element.zod; // формируем название полей и валидацию zod
      defaultFieldForm[element.namefield +  "notranslate"] =
        element.defaultfield; // формируем дефолтные значения полей
      arrayNameFormFieldCategoryJson.push({
        indexkey: element.namefield + "notranslate",
        languagename: activeLanguages[0].language,
        sort: activeLanguages[0].sort_order,
        classhtml: "border-2 border-stone-300 rounded-sm p-4 mt-4",
        namefield: element.namefield + "notranslate",
        namefieldlang: element.namefield + "notranslate",
        namefieldlangsort: indexsort + element.namefield + activeLanguages[0].sort_order + "notranslate",
        labelfield: element.labelfield,
        placeholderfield: element.placeholderfield,
        descriptionfiled: element.descriptionfiled,
        defaultfield: element.defaultfield,  
        zod: element.zod,
        typefield: element.typefield,
        src: "",
        srcThumb: "",
      });
    }
  );


     productInputFormFieldsJoinProductsJson[baseLanguageCode].map(
    (element, indexsort) => {
      nameFieldForm[element.namefield + "notranslate"] = element.zod; // формируем название полей и валидацию zod
      defaultFieldForm[element.namefield +  "notranslate"] =
        element.defaultfield; // формируем дефолтные значения полей
      arrayNameFormFieldJoinProductsJson.push({
        indexkey: element.namefield + "notranslate",
        languagename: activeLanguages[0].language,
        sort: activeLanguages[0].sort_order,
        classhtml: "border-2 border-stone-300 rounded-sm p-4 mt-4",
        namefield: element.namefield + "notranslate",
        namefieldlang: element.namefield + "notranslate",
        namefieldlangsort: indexsort + element.namefield + activeLanguages[0].sort_order + "notranslate",
        labelfield: element.labelfield,
        placeholderfield: element.placeholderfield,
        descriptionfiled: element.descriptionfiled,
        defaultfield: element.defaultfield,  
        zod: element.zod,
        typefield: element.typefield,
        src: "",
        srcThumb: "",
      });
    }
  );


  activeLanguages.map((lang) => {
    productInputFormFieldsDescriptionJson[lang.code].map(
      (element, indexsort) => {
        nameFieldForm[element.namefield + lang.code] = element.zod; // формируем название полей и валидацию zod
        defaultFieldForm[element.namefield + lang.code] = element.defaultfield; // формируем дефолтные значения полей
        arrayNameFormFieldDescriptionJson.push({
          indexkey: element.namefield + lang.code,
          languagename: lang.language,
          sort: lang.sort_order,
          classhtml: "",
          namefield: element.namefield,
          namefieldlang: element.namefield + lang.code,
          namefieldlangsort:
            indexsort + element.namefield + lang.sort_order + lang.code,
          labelfield: element.labelfield,
          placeholderfield: element.placeholderfield,
          descriptionfiled: element.descriptionfiled,
          defaultfield: element.defaultfield,
          zod: element.zod,
          typefield: element.typefield,
          src: "",
          srcThumb: "",
        });
      }
    );
  });

  activeLanguages.map((lang) => {
    productInputFormFieldsSeoJson[lang.code].map((element, indexsort) => {
      nameFieldForm[element.namefield + lang.code] = element.zod; // формируем название полей и валидацию zod
      defaultFieldForm[element.namefield + lang.code] = element.defaultfield; // формируем дефолтные значения полей
      arrayNameFormFieldSeoJson.push({
        indexkey: element.namefield + lang.code,
        languagename: lang.language,
        sort: lang.sort_order,
        classhtml: "",
        namefield: element.namefield,
        namefieldlang: element.namefield + lang.code,
        namefieldlangsort:
          indexsort + element.namefield + lang.sort_order + lang.code,
        labelfield: element.labelfield,
        placeholderfield: element.placeholderfield,
        descriptionfiled: element.descriptionfiled,
        defaultfield: element.defaultfield,
        zod: element.zod,
        typefield: element.typefield,
        src: "",
        srcThumb: "",
      });
    });
  });

  // activeLanguages.map((lang) => {
  //   productInputFormFieldsNameSetParametrsJson[lang.code].map(
  //     (element, indexsort) => {
  //       nameFieldForm[element.namefield + lang.code] = element.zod; // формируем название полей и валидацию zod
  //       defaultFieldForm[element.namefield + lang.code] = element.defaultfield; // формируем дефолтные значения полей
  //       arrayNameFormFieldNameSetParametrsJson.push({
  //         indexkey: element.namefield + lang.code,
  //         languagename: lang.language,
  //         sort: lang.sort_order,
  //         classhtml: "",
  //         namefield: element.namefield,
  //         namefieldlang: element.namefield + lang.code,
  //         namefieldlangsort:
  //           indexsort + element.namefield + lang.sort_order + lang.code,
  //         labelfield: element.labelfield,
  //         placeholderfield: element.placeholderfield,
  //         descriptionfiled: element.descriptionfiled,
  //         defaultfield: element.defaultfield,
  //         zod: element.zod,
  //         typefield: element.typefield,
  //         src: "",
  //         srcThumb: "",
  //       });
  //     }
  //   );
  // });

//TODO:  Make Category and NameSetCategory aka selectImage MAKE FROM NAMESETCATEGORY
  // selectCategory && selectCategory.map((elementSelectCategory, index) => {  
  //   activeLanguages.map((lang) => {
  //   productInputFormFieldsSelectedImages[lang.code].map(
  //     (element, indexsort) => {
  //       nameFieldForm[element.namefield + elementSelectCategory.ulid + lang.code] = element.zod; // формируем название полей и валидацию zod
  //       defaultFieldForm[element.namefield + elementSelectCategory.ulid + lang.code] = element.defaultfield; // формируем дефолтные значения полей
  //       arrayNameFormFieldSelectedImages.push({
  //         indexkey: element.namefield + elementSelectCategory.ulid + lang.code,
  //         languagename: lang.language,
  //         sort: lang.sort_order,
  //         classhtml: "",
  //         namefield: element.namefield + elementSelectCategory.ulid,
  //         namefieldlang: element.namefield + elementSelectCategory.ulid + lang.code,
  //         namefieldlangsort: indexsort + element.namefield + elementSelectCategory.ulid + lang.sort_order + lang.code,
  //         labelfield: element.labelfield,
  //         placeholderfield: element.placeholderfield,
  //         descriptionfiled: element.descriptionfiled,
  //         defaultfield: element.namefield + lang.code,
  //         zod: element.zod,
  //         typefield: element.typefield,
  //         src: elementSelectCategory.url,
  //         srcThumb: elementSelectCategory.urlThumb,         
  //       });
  //     }
  //   );
  // });
  // })




  selectedImage && selectedImage.map((elementTop, index) => {  
    activeLanguages.map((lang) => {
    productInputFormFieldsSelectedImages[lang.code].map(
      (element, indexsort) => {
        nameFieldForm[element.namefield + elementTop.ulid + lang.code] = element.zod; // формируем название полей и валидацию zod
        defaultFieldForm[element.namefield + elementTop.ulid + lang.code] = element.defaultfield; // формируем дефолтные значения полей
        arrayNameFormFieldSelectedImages.push({
          indexkey: element.namefield + elementTop.ulid + lang.code,
          languagename: lang.language,
          sort: lang.sort_order,
          classhtml: "",
          namefield: element.namefield + elementTop.ulid,
          namefieldlang: element.namefield + elementTop.ulid + lang.code,
          namefieldlangsort: indexsort + element.namefield + elementTop.ulid + lang.sort_order + lang.code,
          labelfield: element.labelfield,
          placeholderfield: element.placeholderfield,
          descriptionfiled: element.descriptionfiled,
          defaultfield: element.namefield + lang.code,
          zod: element.zod,
          typefield: element.typefield,
          src: elementTop.url,
          srcThumb: elementTop.urlThumb,         
        });
      }
    );
  });
  })


  productInputFormFieldsNoTranslateData[baseLanguageCode].map(
    (element, indexsort) => {
      nameFieldForm[element.namefield + "notranslate"] = element.zod; // формируем название полей и валидацию zod
      defaultFieldForm[element.namefield +  "notranslate"] =
        element.defaultfield; // формируем дефолтные значения полей
      arrayNameFormFieldNoTranslateData.push({
        indexkey: element.namefield + "notranslate",
        languagename: activeLanguages[0].language,
        sort: activeLanguages[0].sort_order,
        classhtml: "border-2 border-stone-300 rounded-sm p-4 mt-4",
        namefield: element.namefield + "notranslate",
        namefieldlang: element.namefield + "notranslate",
        namefieldlangsort: indexsort + element.namefield + activeLanguages[0].sort_order + "notranslate",
        labelfield: element.labelfield,
        placeholderfield: element.placeholderfield,
        descriptionfiled: element.descriptionfiled,
        defaultfield: element.defaultfield,  
        zod: element.zod,
        typefield: element.typefield,
        src: "",
        srcThumb: "",
      });
    }
  );

  const formSchema = z.object({
    ...nameFieldForm,
  }); 

  const formDefaultValues = {
    ...defaultFieldForm,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(formSchema),
    defaultValues: {...formDefaultValues, },   
  });




  // export default async function Page({ searchParams }) {
  // // Получаем id из URL, например /page?id=10
  // const { id } = searchParams;  
  // const res = await fetch(`https://api.example.com/items?id=${id}`);
  // const data = await res.json();
  // return <div>{data.name}</div>;
  //}
  


  const onSubmitWork = async (data: z.infer<typeof formSchema>) => {
      setUpdateLexical(!updateLexical)  

      //  console.log('fromEditor', fromEditor);
       console.log('fromEditorJson', fromEditorJson);

    const dataAppendJson = JSON.stringify(data);
    const fromEditorJsonAppendJson = JSON.stringify(fromEditorJson);
    const selectedImageJson = JSON.stringify(selectedImage);

    toast.success(`God : `, { duration: 7000 });
    const formData = new FormData();
    formData.append("data", dataAppendJson);
    formData.append("fromEditorJson", fromEditorJsonAppendJson);
    formData.append("selectedImageJson", selectedImageJson);
      //  console.dir(formData, { depth: null });
      //  console.log('formData11', formData.getAll("fromEditorJson"));
       console.log(console.log(...formData.entries()));

    try {      
      toast.success(`Dog :  `, { duration: 7000 });
      // console.log(`!!! Data:`);
      // ************ console.dir(nameFieldForm, { depth: null })
      // console.dir(data, { depth: null });
      // console.dir(fromEditorJson, { depth: null });
      const response = await fetch('/api/input', {
        method: 'POST',
        body: formData,
        // headers: {'Content-Type': 'multipart/form-data'},
      });
      
      const dataResponse = await response.json();
        console.dir(dataResponse, { depth: null });
            if (response.ok) {      
        
      } else {
       //  setError(data.error || 'An error occurred during upload.');
      }
    } catch (error: any) {
      console.log(` ErrorrErro ------------- ${error} `);
      toast.error(`ErrorrError`, { duration: 5000 });
      // setLoading( value =>  value = false );
    } finally {
      // setLoading( value =>  value = false );
    }
  };

   function changePositionSelectedImages(index: number, newIndex: number) {
    // event.preventDefault();
    const arr : any = [...selectedImage ?? []];   
    let temp = arr[index];
    arr[index] = arr[newIndex]; 
    arr[newIndex] = temp;    
    setSelectedImage([...arr])  
  }

   function deleteItemSelectedImages(index: number) {
    // event.preventDefault();
    const arr : any = [...selectedImage ?? []]; 
    arr.splice(index, 1);   
    setSelectedImage([...arr])  
  }



  

  return (
    <div className={isOpenSelectImages  ? 'overscroll-y-none overflow-auto overs' : ''} >      
      <Toaster />
      <ToastProvider />      
      <Modal> 
        
        {/* {isOpen && <Upload onCloseProps={() => setIsOpen(false)}  setSelectedImageProps={setSelectedImage} pathArrayProps={pathArray}/>} */}
        {isOpenSelectImages && <SelectImage onCloseProps={() => setIsOpenSelectImages(false)}  
                                            selectedImageProps = {selectedImage} 
                                            setSelectedImageProps={setSelectedImage}     />}      
      </Modal>
      <div className='w-full mx-4 '>
      <Form  {...form}   >
        <form
          onSubmit={form.handleSubmit(onSubmitWork)}
          className='space-y-3 w-full'
        >          
          {FormReactHooksName({ formControlProps: form.control, arrayNameFormFieldNameJsonProps: arrayNameFormFieldNameJson, formProps: form, activeLanguagesProps: activeLanguages,  baseLanguageCodeProps: baseLanguageCode })}

          <FormReactHooksCategory  formControlProps= {form.control}  getCategoriesProps={getCategories} getProductsProps={getProducts}  arrayNameFormFieldCategoryJsonProps={arrayNameFormFieldCategoryJson}  formProps={form} 
                                    activeLanguagesProps={activeLanguages}  baseLanguageCodeProps={baseLanguageCode} 
                                    setSelectCategoryProps={setSelectCategory}/>
          
          <FormReactHooksJoinProducts  formControlProps= {form.control} getCategoriesProps={getCategories} getProductsProps={getProducts}  arrayNameFormFieldJoinProductsJsonProps={arrayNameFormFieldJoinProductsJson}  formProps={form} 
                                    activeLanguagesProps={activeLanguages}  baseLanguageCodeProps={baseLanguageCode} />

          <Separator className='bg-blue-500 my-6 ' />
          {FormReactHooksDescription({ formControlProps: form.control, arrayNameFormFieldDescriptionJsonProps: arrayNameFormFieldDescriptionJson, formProps: form, activeLanguagesProps: activeLanguages,  baseLanguageCodeProps: baseLanguageCode })}
         
          {FormReactHooksSeo({ formControlProps: form.control, arrayNameFormFieldSeoJsonProps: arrayNameFormFieldSeoJson, formProps: form, activeLanguagesProps: activeLanguages,  baseLanguageCodeProps: baseLanguageCode })}
         <Separator className='bg-blue-500 my-6 ' />
          {/* {FormReactHooksNameSetParametrs({ formControlProps: form.control, arrayNameFormFieldNameSetParametrsJsonProps: arrayNameFormFieldNameSetParametrsJson, formProps: form,  activeLanguagesProps: activeLanguages,  baseLanguageCodeProps: baseLanguageCode })}   */}
          <Separator className='bg-blue-500 my-6 ' />
{/*     
          <FormReactHooksSelectedImages selectedImageProps = {selectedImage}  
                                        setSelectedImageProps = {setSelectedImage} 
                                        changePositionSelectedImagesProps = {changePositionSelectedImages}  
                                        deleteItemSelectedImagesProps = {deleteItemSelectedImages}  
                                        formControlProps= {form.control}  
                                        arrayNameFormFieldSelectedImagesProps= {arrayNameFormFieldSelectedImages} 
                                        formProps= {form}  
                                        activeLanguagesProps= {activeLanguages} 
                                        // pathsProductsProps= {pathsProducts} 
                                        baseLanguageCodeProps= {baseLanguageCode}                                         
                                        /> */}

          {FormReactHooksNoTranslateData({ formControlProps: form.control , arrayNameFormFieldNoTranslateDataProps: arrayNameFormFieldNoTranslateData, getActiveCurrencyProps: getActiveCurrency, formProps: form, activeLanguagesProps: activeLanguages, baseLanguageCodeProps: baseLanguageCode })}
         
         
        {/* <Button type='button' variant={"default"} className='w-80 text-3xl md:text-3xl bg-red-400' size={"lg"}  onClick={() => setIsOpen(true)} >#Upload images</Button> */}

          { activeLanguages.map((activeLanguage, index) => (
            <EditorComponentForm key={index*3} languageCodeProps={activeLanguage.code}  fromEditorJsonProps={fromEditorJson} setFromEditorJsonProps={setFromEditorJson} updateStateProps={updateLexical} />
            )) }
          
          <Button type='button' variant={"default"} className='w-80 text-3xl md:text-3xl bg-teal-400' size={"lg"}  onClick={() => setIsOpenSelectImages(true)} >#Select images</Button>
          <Button type='submit' variant={"default"} className='w-80 text-3xl md:text-3xl' size={"lg"}>#Впирод</Button>          
          <div>SelectCategory={selectCategory?.map((item, index) => (<div key={index}>{item}</div>))}</div>
          <AddNameSet dataNameSetProps={JSON.stringify(dataNameSet)}/>
        </form>
      </Form>
      </div>
    </div>
  );
}


export default FormFieldsCyclic
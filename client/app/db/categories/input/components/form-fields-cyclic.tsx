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
import { categoryInputFormFieldsNameJson,
         categoryInputFormFieldsDescriptionJson, 
         categoryInputFormFieldsNoTranslateData,
         categoryInputFormFieldsSeoJson,
         categoryInputFormFieldsNameSetParametrsJson, 
         categoryInputFormFieldsSelectedImages} from '@/settings/category-input-form-fields'
// import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import { Button } from '@/components/ui/button'
// import GetTypeField from '@/app/db/categories/input/components/get-type-field'
// import axios from 'axios'
// import { JsonValue } from '@prisma/client/runtime/library'
// import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
// import { LexicalComposer } from '@lexical/react/LexicalComposer';
// import {useSharedHistoryContext} from './editor/package/context/SharedHistoryContext';
// import {useLexicalEditable} from '@lexical/react/useLexicalEditable';
// import {useSettings} from './editor/package/context/SettingsContext';
// import { $generateHtmlFromNodes } from '@lexical/html';
// import type { EditorThemeClasses, LexicalEditor, SerializedEditorState, SerializedLexicalNode } from 'lexical';
// import { divide } from 'lodash';  //lodash A modern JavaScript utility library delivering modularity, performance & extras.
import { iCategoriesFormFieldsCyclicProps, iIdNameCategories, iJsonLangCategories, iJsonNameCategories } from '@/types'
import { Modal } from '@/components/modal/modal'
import { Upload } from '@/components/modal/upload'
import FormReactHooksNoTranslateData  from './form-react-hooks-notranslatedata'
import FormReactHooksNameSetParametrs from './form-react-hooks-namesetparametrs'
import FormReactHooksSeo from './form-react-hooks-seo'
import FormReactHooksDescription  from './form-react-hooks-description'
import FormReactHooksName from './form-react-hooks-name'
import FormReactHooksSelectedImages from './form-react-hook-select-images'
import EditorComponentForm from './editor/editor-component-form'
import { SelectImage } from '@/components/modal/select-image';
import { typeFromEditorJson } from '@/types/editor';
import { set } from 'lodash';
import { EditorState } from 'lexical';


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

const FormFieldsCyclic : React.FC<iCategoriesFormFieldsCyclicProps> = function  (
  {
    activeLanguagesProps, baseLanguageProps,  getPathsCategoriesProps
  }
) {
  const activeLanguages = use(activeLanguagesProps); // передаем функ => Promise
  const baseLanguage = use(baseLanguageProps); // передаем функ => Promise
  const pathsCategories = use(getPathsCategoriesProps); // передаем функ => Promise
  // const [isOpen, setIsOpen] = useState(false)
  const [isClickSaveEditor, setIsClickSaveEditor] = useState(true)
  const [isOpenSelectImages, setIsOpenSelectImages] = useState(false)
  const [selectedImage, setSelectedImage] = useState <iSelectedImages[] | undefined>([])
  // const [fromEditor, setFromEditor] = useState("")
  const [fromEditorJson, setFromEditorJson] = useState<iFromEditorJson[]>()  
  // const [fromEditorJson, setFromEditorJson] = useState<SerializedEditorState<SerializedLexicalNode>[]>([])
  const [updateLexical, setUpdateLexical] = useState(false)
  
  var saveEditor : iFromEditorJson = {}      
  const [fromEditorLngJson, setFromEditorLngJson] = useState <iFromEditorJson>({}) 

  var baseLanguageCode : string = "ru";
  baseLanguage ?  baseLanguageCode = baseLanguage.code : baseLanguageCode = "ru";
  const nameFieldForm: INameFieldFormZod = {}; //формирование названий полей формы, для zod
  const defaultFieldForm: INameFieldForm = {}; //формирование значений по умолчанию полей формы
  const arrayNameFormFieldNameJson: Array<iArrayNameFormField> = []; //пустой начальный массив полей nameJson
  const arrayNameFormFieldDescriptionJson: Array<iArrayNameFormField> = []; //пустой начальный массив полей descriptionJson
  const arrayNameFormFieldSeoJson: Array<iArrayNameFormField> = []; //пустой начальный массив полей seoJson
  const arrayNameFormFieldNameSetParametrsJson: Array<iArrayNameFormField> = []; //пустой начальный массив полей nameSetParametrsJson
  const arrayNameFormFieldSelectedImages: Array<iArrayNameFormField> = []; //пустой начальный массив полей SelectedImages
  const arrayNameFormFieldNoTranslateData: Array<iArrayNameFormField> = []; //пустой начальный массив полей noTranslateData

  activeLanguages.map((lang) => {
    categoryInputFormFieldsNameJson[lang.code].map(
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

  activeLanguages.map((lang) => {
    categoryInputFormFieldsDescriptionJson[lang.code].map(
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
    categoryInputFormFieldsSeoJson[lang.code].map((element, indexsort) => {
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

  activeLanguages.map((lang) => {
    categoryInputFormFieldsNameSetParametrsJson[lang.code].map(
      (element, indexsort) => {
        nameFieldForm[element.namefield + lang.code] = element.zod; // формируем название полей и валидацию zod
        defaultFieldForm[element.namefield + lang.code] = element.defaultfield; // формируем дефолтные значения полей
        arrayNameFormFieldNameSetParametrsJson.push({
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

  selectedImage && selectedImage.map((elementTop, index) => {  
    activeLanguages.map((lang) => {
    categoryInputFormFieldsSelectedImages[lang.code].map(
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

  categoryInputFormFieldsNoTranslateData[baseLanguageCode].map(
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


  function clickSaveEditor() {
    setUpdateLexical(!updateLexical)
    setIsClickSaveEditor(false)
  }

    const handleDataChange = (dataToSave: EditorState, lng: string) => {
       setFromEditorLngJson(prevState => ({ ...prevState, [lng]: dataToSave, })); 
    };


  const onSubmitWork = async (data: z.infer<typeof formSchema>) => {
    setUpdateLexical(!updateLexical)  
       console.log('JSON.stringify(saveEditor22222222222', JSON.stringify(saveEditor));
    const dataAppendJson = JSON.stringify(data);
    const fromEditorJsonAppendJson = JSON.stringify(fromEditorLngJson);
    const selectedImageJson = JSON.stringify(selectedImage);

    toast.success(`God : `, { duration: 7000 });
    const formData = new FormData();
    formData.append("data", dataAppendJson);
    formData.append("fromEditorJson", fromEditorJsonAppendJson);
    formData.append("selectedImageJson", selectedImageJson);

    try {      
      toast.success(`Dog :  `, { duration: 7000 });
      // console.log(`!!! Data:`);
      // ************ console.dir(nameFieldForm, { depth: null })
      // console.dir(data, { depth: null });
      // console.dir(fromEditorJson, { depth: null });
      const response = await fetch('/api/inputcategory', {
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
          {FormReactHooksName({ formControlProps: form.control, arrayNameFormFieldNameJsonProps: arrayNameFormFieldNameJson, formProps: form, activeLanguagesProps: activeLanguages, pathsCategoriesProps: pathsCategories, baseLanguageCodeProps: baseLanguageCode })}
          {FormReactHooksDescription({ formControlProps: form.control, arrayNameFormFieldDescriptionJsonProps: arrayNameFormFieldDescriptionJson, formProps: form, activeLanguagesProps: activeLanguages, pathsCategoriesProps: pathsCategories, baseLanguageCodeProps: baseLanguageCode })}
          {FormReactHooksSeo({ formControlProps: form.control, arrayNameFormFieldSeoJsonProps: arrayNameFormFieldSeoJson, formProps: form, activeLanguagesProps: activeLanguages, pathsCategoriesProps: pathsCategories, baseLanguageCodeProps: baseLanguageCode })}
          {FormReactHooksNameSetParametrs({ formControlProps: form.control, arrayNameFormFieldNameSetParametrsJsonProps: arrayNameFormFieldNameSetParametrsJson, formProps: form,  activeLanguagesProps: activeLanguages, pathsCategoriesProps: pathsCategories, baseLanguageCodeProps: baseLanguageCode })}  
    
          <FormReactHooksSelectedImages selectedImageProps = {selectedImage}  
                                        setSelectedImageProps = {setSelectedImage} 
                                        changePositionSelectedImagesProps = {changePositionSelectedImages}  
                                        deleteItemSelectedImagesProps = {deleteItemSelectedImages}  
                                        formControlProps= {form.control}  
                                        arrayNameFormFieldSelectedImagesProps= {arrayNameFormFieldSelectedImages} 
                                        formProps= {form}  
                                        activeLanguagesProps= {activeLanguages} 
                                        pathsCategoriesProps= {pathsCategories} 
                                        baseLanguageCodeProps= {baseLanguageCode}                                         
                                        />
          {FormReactHooksNoTranslateData({ formControlProps: form.control , arrayNameFormFieldNoTranslateDataProps: arrayNameFormFieldNoTranslateData, formProps: form, activeLanguagesProps: activeLanguages, pathsCategoriesProps: pathsCategories, baseLanguageCodeProps: baseLanguageCode })}
         
        {/* <Button type='button' variant={"default"} className='w-80 text-3xl md:text-3xl bg-red-400' size={"lg"}  onClick={() => setIsOpen(true)} >#Upload images</Button> */}


            { activeLanguages.map((activeLanguage, index) => (
            <EditorComponentForm key={index*3} 
            languageCodeProps={activeLanguage.code}  
            fromEditorJsonProps={fromEditorJson} 
            setFromEditorJsonProps={setFromEditorJson}          
            setFromEditorLngJsonProps={handleDataChange} 
            updateStateProps={updateLexical} />
            )) 
            }  
          
          <Button type='button' variant={"default"} className='w-80 text-3xl md:text-3xl bg-teal-400' size={"lg"}  onClick={() => clickSaveEditor()} >#SaveEditor</Button>
          <Button type='button' variant={"default"} className='w-80 text-3xl md:text-3xl bg-teal-400' size={"lg"}  onClick={() => setIsOpenSelectImages(true)} >#Select images</Button>
          <Button type='submit' disabled={isClickSaveEditor} variant={"default"} className='w-80 text-3xl md:text-3xl' size={"lg"}>#Впирод</Button>        
         
          {/* {fromEditorLngJson && <p>fromEditorLngJson: {JSON.stringify(fromEditorLngJson)}</p> }         */}
        </form>
      </Form>
      </div>
    </div>
  );
}

export default FormFieldsCyclic
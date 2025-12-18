'use client'
import type {JSX} from 'react';
import { use, useState } from 'react'
import React from 'react'
import { $Enums, L18n } from '@prisma/client'
import { z } from 'zod'
import { iArrayNameFormField, INameFieldForm, INameFieldFormZod, iSelectedImages } from '@/types'
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
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import GetTypeField from '@/app/db/categories/input/components/get-type-field'
import axios from 'axios'
// import { JsonValue } from '@prisma/client/runtime/library'
import { iFormFieldsCyclicProps, iIdNameCategories, iJsonLangCategories, iJsonNameCategories } from '@/types'
import { Modal } from '@/components/modal/modal'
import { Upload } from '@/components/modal/upload'
import FormReactHooksNoTranslateData  from './form-react-hooks-notranslatedata'
import FormReactHooksNameSetParametrs from './form-react-hooks-namesetparametrs'
import FormReactHooksSeo from './form-react-hooks-seo'
import FormReactHooksDescription  from './form-react-hooks-description'
import FormReactHooksName from './form-react-hooks-name'
import FormReactHooksSelectedImages from './form-react-hook-select-images'
import LexicalComponentForm from './lexical/lexical-component-form'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import {useSharedHistoryContext} from './lexical/package/context/SharedHistoryContext';
import {useLexicalEditable} from '@lexical/react/useLexicalEditable';
import {useSettings} from './lexical/package/context/SettingsContext';

import { $generateHtmlFromNodes } from '@lexical/html';
import type { EditorThemeClasses, LexicalEditor, SerializedEditorState, SerializedLexicalNode } from 'lexical';
import { SelectImage } from '@/components/modal/select-image';


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

const FormFieldsCyclic : React.FC<iFormFieldsCyclicProps> = function  (
  {
    activeLanguagesProps, baseLanguageProps,  getPathsCategoriesProps, 
  }
) {
  const activeLanguages = use(activeLanguagesProps); // передаем функ => Promise
  const baseLanguage = use(baseLanguageProps); // передаем функ => Promise
  const pathsCategories = use(getPathsCategoriesProps); // передаем функ => Promise
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenSelectImages, setIsOpenSelectImages] = useState(false)
  // const [dataURN, setDataURN] = useState('/uploads') // /uploads
  const [selectedImage, setSelectedImage] = useState <iSelectedImages[]>()
  const [fromEditor, setFromEditor] = useState("")
  const [fromEditorJson, setFromEditorJson] = useState<SerializedEditorState<SerializedLexicalNode>>()
  const [lexicalEditor, setLexicalEditor] = useState ()
  const [updateLexical, setUpdateLexical] = useState(false)
  


     //     const htmlContent = convertLexicalToHtml(lexicalEditor); 
         

// *************Lexical
  //  const {historyState} = useSharedHistoryContext();
  //   const {
  //     settings: {
  //       isCollab,
  //       isAutocomplete,
  //       isMaxLength,
  //       isCharLimit,
  //       hasLinkAttributes,
  //       isCharLimitUtf8,
  //       isRichText,
  //       showTreeView,
  //       showTableOfContents,
  //       shouldUseLexicalContextMenu,
  //       shouldPreserveNewLinesInMarkdown,
  //       tableCellMerge,
  //       tableCellBackgroundColor,
  //       tableHorizontalScroll,
  //       shouldAllowHighlightingWithBrackets,
  //       selectionAlwaysOnDisplay,
  //     },
  //   } = useSettings();
  //   // const isEditable = useLexicalEditable();
  //   const placeholder = isCollab
  //     ? 'Enter some collaborative rich text...'
  //     : isRichText
  //     ? 'Enter some rich text...'
  //     : 'Enter some plain text...';
  //   const [floatingAnchorElem, setFloatingAnchorElem] =
  //     useState<HTMLDivElement | null>(null);
  //   const [isSmallWidthViewport, setIsSmallWidthViewport] =
  //     useState<boolean>(false);
  //     // *************************************
  //   // const [editor] = useLexicalComposerContext();
  // const [editor] = useLexicalComposerContext();
// *************end Lexical


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
  
  // const { control, handleSubmit } = useForm<iFormData>( {
  // });

  // const { fields, append, remove, move, update, insert } = useFieldArray({
  //   control: form.control as any,  //TODO: any????
  //   name: 'reactHookSelectedImages'   // имя массива полей в форме
  // });


//  // Функция для добавления новый полей в форму
//     const addInFormSelectedImage = () => {
//         append({questionText: '', options: []})
//     }



  const onSubmitWork = async (data: z.infer<typeof formSchema>) => {
      setUpdateLexical(!updateLexical)  

       console.log('fromEditor', fromEditor);

    const dataAppendJson = JSON.stringify(data);
    const fromEditorJsonAppendJson = JSON.stringify(fromEditorJson);

    toast.success(`God : `, { duration: 7000 });
    const formData = new FormData();
    formData.append("data", dataAppendJson);
    formData.append("fromEditorJson", fromEditorJsonAppendJson);
      //  console.dir(formData, { depth: null });
      //  console.log('formData11', formData.getAll("fromEditorJson"));
        console.log(console.log(...formData.entries()));

    // formData.append("fromEditorJson", JSON.stringify(fromEditorJson));
    

    // for (const item of data) {
    //   formData.append(item[0], item[1]);
    // }

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



      // ********** setLoading( value =>  value = true );


      // await axios
      //   .post(`/api/input`, data)
      //   .then((responseRoute) => {
      //     console.log(
      //       ` responseRouteCategoryInput ------------- ${responseRoute.data} `
      //     );        
      //     toast.success(` ${responseRoute.data} `, { duration: 7000 });
      //   })



        // *****************.then( () => {setLoading( value =>  value = false ); })


        // .catch((error) => {
        //   toast.error(`Error response result: ${error}`, { duration: 7000 });
        // });


      // **********.finally( () => {setLoading( value =>  value = false ); })

      // const toastMessage = JSON.stringify(data, null, 2);

      // reset({
      //   ...containerServiceSwitchNameField,
      //   dateOrder: new Date(),
      //   customer: '',
      //   email: '',
      //   emailSec: 'my@m.m',
      //   address: '',
      //   phone: '',
      //   note: ''

      //  } );

      // setTimeout( ( ) => {
      //   router.push(`/${language}/form`);
      //   window.location.reload();
      //  }, 7000)

      // setLoading( value =>  value = false );

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


  
   function OutEditorState({editorTextProps, editorTextJsonProps} : {editorTextProps: string, editorTextJsonProps: SerializedEditorState<SerializedLexicalNode> | undefined} ) {
    return (
      <div className='w-min border-2 border-stone-300 rounded-sm p-4 mt-4'>
        {`EditorState:${editorTextProps}`}
        <span><br/><br/>*****************************************************<br/><br/></span>
        {`EditorStateJson:${ JSON.stringify(editorTextJsonProps) || editorTextJsonProps}`}
      </div>
    )
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
          {FormReactHooksSelectedImages({ formControlProps: form.control, arrayNameFormFieldSelectedImagesProps: arrayNameFormFieldSelectedImages, formProps: form,  activeLanguagesProps: activeLanguages, pathsCategoriesProps: pathsCategories, baseLanguageCodeProps: baseLanguageCode })}  
          {FormReactHooksNoTranslateData({ formControlProps: form.control , arrayNameFormFieldNoTranslateDataProps: arrayNameFormFieldNoTranslateData, formProps: form, activeLanguagesProps: activeLanguages, pathsCategoriesProps: pathsCategories, baseLanguageCodeProps: baseLanguageCode })}
          
        <Button type='button' variant={"default"} className='w-80 text-3xl md:text-3xl bg-red-400' size={"lg"}  onClick={() => setIsOpen(true)} >#Upload images</Button>
        {/* {FormReactHookSelectImages({ formControlProps: form.control , formProps: form, activeLanguagesProps: activeLanguages, pathsCategoriesProps: pathsCategories, baseLanguageCodeProps: baseLanguageCode, selectedImageProps: selectedImage, setSelectedImageProps : () => setSelectedImage,  addInFormSelectedImageProps: () =>  addInFormSelectedImage(), appendProps: append })} */}
          <LexicalComponentForm  setFromEditorProps={setFromEditor} setFromEditorJsonProps={setFromEditorJson} updateStateProps={updateLexical} />
          <Button type='button' variant={"default"} className='w-80 text-3xl md:text-3xl bg-teal-400' size={"lg"}  onClick={() => setIsOpenSelectImages(true)} >#Select images</Button>
          <Button type='submit' variant={"default"} className='w-80 text-3xl md:text-3xl' size={"lg"}>#Впирод</Button>
          {/* <Button type='button' variant={"default"} className='w-80 text-3xl md:text-3xl' size={"lg"} onClick={() => hundleOnClickButtonSubmit()}>FromEdit</Button> */}
          {/* <OutEditorState editorTextProps={fromEditor} editorTextJsonProps={fromEditorJson} /> */}

        </form>
      </Form>
      </div>
    </div>
  );
}


export default FormFieldsCyclic
'use client';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
  
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Download, X, ImageDown, FolderOutput, FolderPlus, Folder, ImagePlus  } from 'lucide-react';
import CardImageUpload from '@/components/form/card-image-upload';
import { iArrayNameFormField, INameFieldForm, INameFieldFormZod, iSelectedImages } from '@/types'
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image'
import { Separator } from "../ui/separator";
import CardImageCheckbox from "../form/card-image-checkbox";
import { NextResponse } from "next/server";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { ToastProvider } from "@/providers/toast-provider";
import CardImageCheckboxCycle from "@/app/db/categories/input/components/card-image-checkbox-cycle";
import { CreateFolder } from "../actions/create-folder";
import { Modal } from '@/components/modal/modal'
import { Upload } from '@/components/modal/upload'
import { setNodeIndentFromDOM } from "lexical";
import { setEngine } from "crypto";

interface FilesState {
  [index: number]: FileObj
}

interface FileObj {
  name: string;
  size: number;
  type: string;
  src: string | ArrayBuffer | null ;
  alt: string;
}

interface iGetList {
  path: filePath,
 // fileArr: fileArr,
  directoryArr: directoryArr,
  message: 'Get list of files successfully!',
  status: 200
}

interface filePath {
  path: string
}
interface fileArr {
  fileArr: string[]
}
interface directoryArr {
  directoryArr: string[]
}


export  function SelectImage(
  {onCloseProps,   
   selectedImageProps, 
   setSelectedImageProps
  } : 
  {onCloseProps: () => void,
   selectedImageProps: iSelectedImages[] | undefined,
   setSelectedImageProps: Dispatch<SetStateAction<iSelectedImages[] | undefined>> // React.Dispatch<SetStateAction<string[]>>
  }){    
   // const [fileArr, setFileArr] = useState <string[]> ([]); // Array files from server
    const [directoryArr, setDirectoryArr] = useState <string[]> ([]); // Array directories from server

    const [pathArray, setPathArray] = useState <string[]> (['']);  // Array steps path step path  
    const [galleryImages, setGalleryImages] = useState <iSelectedImages[]>() // Array iSelectedImages (ULID URL URLthumb)
    const [newGalleryImages, setNewGalleryImages] = useState <iSelectedImages[]>() // Array iSelectedImages (ULID URL URLthumb)

    const [isOpen, setIsOpen] = useState(false)

    const [files, setFiles] = useState <File[]> ([]); 
    const [error, setError] = useState('');  // error message
    const [srcObj, setSrcObj] = useState <FilesState[]> ([]); 
    const [uploadedImage, setUploadedImage] = useState([]);


  const getList = (dataURN: string)  => {   // f.e. dataURN = ""  "/uploads"  "/namedirectory/aaa/bbb/ccc" 
  const params = new URLSearchParams();
  params.append('dataURN', dataURN);
  fetch(`/api/images?${params.toString()}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json',
    //   'Accept': 'application/json'
    },
  }).then((response : Response) => {
    return response.json();
  }).then((data) => {    
    // data.fileArr && setFileArr(data.fileArr);
    data.directoryArr && setDirectoryArr(data.directoryArr);
    data.galleryImages && setGalleryImages(data.galleryImages);    
    data.newGalleryImages && setNewGalleryImages(data.newGalleryImages);    
    return data;
  }).catch((error) => {
    console.error(error);  })
}

  useEffect(() =>  getList(pathArray.join('')), [pathArray]);
  // useEffect(() =>  getList(pathArray.join('')), [selectedImageProps]);  
  useEffect(() =>  getList(pathArray.join('')), []);

 function upFolder (addURN: string) {  
  setPathArray(pathArray => [...pathArray, addURN]);
 }

 function downFolder () {
  if (pathArray.length > 1) {
    setPathArray(pathArray => pathArray.slice(0, pathArray.length - 1))    
    }    
  else{ 
    toast.success(`This is the first directory : `, { duration: 5000 });  }  
 }



    function onDeleteImg(index: number) {
        setUploadedImage((prevImages) => prevImages.filter((_, i) => i !== index));
    }

    function onDeleteImgSrs(index: number) {
        setSrcObj((prevImages) => prevImages.filter((_, i) => i !== index));
        setFiles((prevImages) => prevImages.filter((_, i) => i !== index));
    }


  // const handleFileChange = (event : React.FormEvent<HTMLFormElement> ) : void => {
  const handleFileChange = (event : ChangeEvent<HTMLInputElement> ) : void => {
     event.preventDefault();
    const target = event.target as HTMLInputElement;
    if (target.files) {
    // console.log("files.length",target.files.length);
    // console.log("Array.from(e.target.files)",Array.from(target.files));    
    setFiles(Array.from(target.files));  //Array.from(e.target.files)
    setSrcObj([]);    
    // TODO Check for notNULL      
    Array.from(target.files).map((file , index ) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {         
        if (!!e.target && !!e.target.result) {
          setSrcObj(srcObj => [...srcObj, {name: file.name, size: file.size, type: file.type, src: e.target!.result, alt: ''}]);          
        }     
      };      
      reader.readAsDataURL(file);      
    });   
  }
  };


  const handleSubmit = async (event:  React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    if (files.length === 0) {
      setError('Please select a file to upload.');
      return;    }
    const formData = new FormData();
    for (const file of files) {
      formData.append('image', file);// Необходимо ипользовать одинаковый ключ для всех файлов
    }
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      //   console.dir(response, { depth: null } );
      const data = await response.json();
        console.dir(data, { depth: null });
      if (response.ok) {      
        setSelectedImageProps(data.selectedImages);  
        //setUploadedImage(data.url);
          console.dir(data.url, { depth: null }); 
        setSrcObj([]);        
        setError('');
        onCloseProps();
      } else {
        setError(data.error || 'An error occurred during upload.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    }
  };


  return (
    <div >
     <div onClick={onCloseProps} className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/50">
     <div onClick={(e) => e.stopPropagation()} >
     <Toaster />
     <ToastProvider /> 

    <Modal>              
      {isOpen && <Upload galleryImagesProps={galleryImages}
                         setGalleryImagesProps={setGalleryImages}
                         newGalleryImagesProps={newGalleryImages}
                         setNewGalleryImagesProps={setNewGalleryImages}
                         onCloseProps={() => setIsOpen(false)}  
                         setSelectedImageProps={setSelectedImageProps} 
                         pathArrayProps = {pathArray}/>} 
    </Modal>

    <Card className="w-[80vw] max-w-[1800px]  h-svh max-h-max border-2 rounded-sm mt-6 bg-gray-100 border-red-400 overflow-scroll ">      
  
    <CardTitle className="flex flex-row text-start ml-6 mb-1 mt-4 p-0 ">
      <span className="flex">Выбор файлов с сервера:</span>
      <span className="flex  font-light ml-4">выберите файлы для загрузки c сервера.</span>
      <Button variant="outline" onClick={onCloseProps} className="ml-auto mt-0 mr-4 flex justify-items-end ">X</Button> 
    </CardTitle>

    <div className="flex flex-row items-end justify-end w-[90%]  py-1 px-4 my-2 ">
      <span className="flex ml-2 w-10/12 "><div className="text-gray-500">{pathArray.join('')}</div></span>
      <span className="flex ml-2 w-2/12 ">
        <Button variant="link" size="lg" className="h-6! w-6! text-lg " onClick={() => setIsOpen(true)}>
          <ImagePlus size={24} className="h-6! w-6! text-lg " />Download image
        </Button>
      </span>
      <span className="flex ml-2 w-2/12 ">
      <CreateFolder 
                   pathArrayProps={pathArray} 
                   galleryImagesProps={galleryImages} 
                   setGalleryImagesProps={setGalleryImages} 
                   newGalleryImagesProps={newGalleryImages} 
                   setNewGalleryImagesProps={setNewGalleryImages} 
                   directoryArrProps={directoryArr} 
                   setDirectoryArrProps={setDirectoryArr}/>
      </span>
    </div>

    <CardContent className="pt-4 pl-4 pr-2 pb-2">

    <Separator className="bg-gray-400"/>

    <input type="button" id="folder-output" name="folder-output" onClick={()=>downFolder()} className="hidden"/>
    <div className="pt-2 px-2 my-0 inline-flex items-center"> 
      <Label htmlFor="folder-output"> 
        <span className="inline-flex items-center font-bold  cursor-pointer pl-1">
          <FolderOutput /><span className="pl-2">. .</span>
        </span>
      </Label>
    </div>

    <form onSubmit={onCloseProps}>  
      <input type="file" id="file-upload-multiple" onChange={handleFileChange} className="hidden"  multiple accept="image/*" />
       {error && <p style={{ color: 'red' }}>{error}</p>}         
        </form>
      </CardContent>

    <CardContent className="pl-2 pr-2 pb-2"> 
      <CardImageCheckboxCycle         
        selectedImageProps={selectedImageProps}
        setSelectedImageProps={setSelectedImageProps}
        galleryImagesProps={galleryImages}
        setGalleryImagesProps={setGalleryImages} 
        newGalleryImagesProps={newGalleryImages}
        setNewGalleryImagesProps={setNewGalleryImages}       
        directoryArrProps={directoryArr} 
        upFolderProps={upFolder} />
    </CardContent>

  <input type="button" id="select-files" name="select-files" onClick={onCloseProps} className="hidden"/>
    <Label htmlFor="select-files" className="flex items-center justify-center center cursor-pointer">         
      <div className="flex flex-row items-center justify-center w-2/6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-sm">
        <span><Download size={20} className="mr-2"/></span>
        <span>Выбрать файлы</span>
      </div>        
      </Label>

    <CardFooter className="flex-col gap-2">        
    </CardFooter>
    </Card>
    </div>

</div>
</div>
  )
}

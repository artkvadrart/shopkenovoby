'use client';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Download, X, ImageDown } from 'lucide-react';
import CardImageUpload from '@/components/form/card-image-upload';
import { iArrayNameFormField, INameFieldForm, INameFieldFormZod, iSelectedImages } from '@/types'
import { ChangeEvent, SetStateAction, useState } from 'react';
import Image from 'next/image'
import path from "path";
import { log } from "console";

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

export  function Upload(
  {onCloseProps,    
   setSelectedImageProps,
   pathArrayProps,
   galleryImagesProps,
   setGalleryImagesProps,
   newGalleryImagesProps,
   setNewGalleryImagesProps
  }: 
  {onCloseProps: () => void,   
   setSelectedImageProps(value: iSelectedImages): void, // React.Dispatch<SetStateAction<string[]>>
   pathArrayProps: string[],
   galleryImagesProps: iSelectedImages[] | undefined,
   setGalleryImagesProps: Function,
   newGalleryImagesProps: iSelectedImages[] | undefined,
   setNewGalleryImagesProps(value: iSelectedImages[]): void
   }){
  
    const [files, setFiles] = useState <File[]> ([]);          
    const [error, setError] = useState('');
    const [srcObj, setSrcObj] = useState <FilesState[]> ([]); 
    const [uploadedImage, setUploadedImage] = useState([]);
   
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
      return;
    }

    const formData = new FormData();
    for (const file of files) {
      formData.append('image', file);// Необходимо ипользовать одинаковый ключ для всех файлов
    }
    formData.append('pathsaveimages', `${pathArrayProps.join('')}`)
    console.log('pathsaveimages', `${pathArrayProps.join('')}`);
    

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      //   console.dir(response, { depth: null } );

      const data = await response.json();
        console.dir(data, { depth: null });
      if (response.ok) {      
        setNewGalleryImagesProps(data.newGalleryImages);  
        setGalleryImagesProps(data.galleryImages);  
        // setSelectedImageProps(data.newGallery);  
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
     <div onClick={onCloseProps} className="overflow-scroll  fixed inset-0 z-150 flex items-center justify-center bg-gray-800/50">
    <div onClick={(e) => e.stopPropagation()}>
    <Card  className="w-ulfl max-w-lg border-2 bg-gray-100 border-red-400 ">
      
      <Button variant="outline" onClick={onCloseProps} className="ml-auto mt-2 mr-2 flex justify-items-end ">X</Button> 
       <CardTitle className="text-start ml-6">Загрузка файлов на сервер.</CardTitle>
      <CardHeader>        
        <CardDescription>
          Выберите файлы для загрузки на сервер (удерживайте CNTRL для выбора нескольких файлов).
        </CardDescription>
        <CardDescription>
          Файлы автоматически добавятся в форму.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
                  
       <Label htmlFor="file-upload-multiple">         
        <div className="flex flex-row items-center justify-center w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded-sm">
          <span><Download size={20} className="mr-2"/></span>
          <span>Выбрать файлы</span>
        </div>        
      </Label>
      
      <input type="file" id="file-upload-multiple" onChange={handleFileChange} className="hidden"  multiple accept="image/*" />
      
      {error && <p style={{ color: 'red' }}>{error}</p>}     

      { srcObj && srcObj.map((src : any, index : number) => <div key={index}>  <CardImageUpload  onDelete={() => onDeleteImgSrs(index)} srcProps={src['src']} nameProps={src['name']} sizeProps={src['size']} typeProps={src['type']} altProps="Picture of the author" widthProps={150} heightProps={150} key={index}/></div> ) } 

      { uploadedImage && uploadedImage.map((src : any, index : number) => <div key={index}> <CardImageUpload onDelete={()=> onDeleteImg(index)} srcProps={src} nameProps={src['name']} sizeProps={src['size']} typeProps={src['type']} altProps="Picture of the author" widthProps={150} heightProps={150} key={index}/> </div> )}
      
      <Button size="lg" type="submit" className="w-full bg-teal-600 hover:bg-teal-700"> <ImageDown size={30} className="mr-2"/>Загрузить файлы </Button>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        

        
      </CardFooter>
    </Card>
    </div>
</div>
</div>
  )
}

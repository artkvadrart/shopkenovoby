'use client';
import CardImageUpload from '@/components/form/card-image-upload';
// import { url } from 'inspector';
import { SetStateAction, useState } from 'react';
import Image from 'next/image'

interface FilesState {
  [key: number]: FileObj 
  [Symbol.iterator](): Iterator<FileObj>;
}

interface FileObj {
  name: string;
  size: number;
  type: string;
  src: string | ArrayBuffer | null;
  alt: string;
}

export default function UploadForm() {
  const [files, setFiles] = useState <File[]> ([]);
  const [src, setSrc] = useState();
  // const [srcImages, setSrcimages] = useState([]);
  const [srcObj, setSrcobj] = useState <FilesState> ([]); 
  const [error, setError] = useState('');
  const [uploadedImage, setUploadedImage] = useState([]);
  // var reader = new FileReader();


  // const handleFiles = (files) => {
  //   var reader = new FileReader();
  //  // reader.onload = ( uploadImage(image.name))

  //  reader.onload = (function (aImg) {
  //     return function (e) {
  //       aImg.src = e.target.result;
  //     };
  //   })(new Image());
                  
  //   reader.readAsDataURL(image);    
  //     return (
  //        <img src={image} alt="Uploaded" width="200" key={index} /> 
  //       )    
  // };

  const handleFileChange = (event : React.FormEvent<HTMLFormElement> ) => {
     event.preventDefault();
    const target = event.target as HTMLInputElement;
    if (target.files) {
    console.log("files.length",target.files.length);
    console.log("Array.from(e.target.files)",Array.from(target.files));    
    setFiles(Array.from(target.files));  //Array.from(e.target.files)
    setSrcobj([]);
    
    // TODO Check for notNULL   
    // files.forEach((files, index) => {     
    Array.from(target.files).map((files , index ) => {
      var nameFile = files.name;
      var sizeFile = files.size;  
      var typeFile = files.type; 

      var reader = new FileReader();
      reader.onload = (event) => { 
         
        if (event.target && event.target.result) {
          setSrcobj(srcObj => [...srcObj, {name: nameFile, size: sizeFile, type: typeFile, src: event.target.result, alt: ''}]);          
        }
     
      };      
      reader.readAsDataURL(files);      
    });
   // setFile(e.target.files[0]);
  }
  };



  const uploadImage = async (nameImage: string) => {
    try {
      const response = await fetch(nameImage, {
        method: "GET",
      });

      const data = await response.json();
      if (response.ok) {
        setUploadedImage(data.url);
        console.log(data.url);

        setError("");
      } else {
        setError(data.error || "An error occurred during upload.");
      }
    } catch (err) {
      setError("An unexpected error occurred1.");
    }
  };


  const handleSubmit = async (event:  React.FormEvent<HTMLFormElement> ) => {
  // const handleSubmit = async (e: { preventDefault: () => void; }) => {
    event.preventDefault();



    if (files.length === 0) {
      setError('Please select a file to upload.');
      return;
    }

    //  if (selectedFiles.length === 0) {
    //   alert('Пожалуйста, выберите файлы для загрузки.');
    //   return;
    // }

    const formData = new FormData();
     files.forEach((files, index) => {
      formData.append(`image`, files); // Используйте одинаковый ключ для всех файлов
      console.log(`Файл ${index + 1}: ${index + 1}`);
    });


    // formData.append('image' , file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

         console.dir(response, { depth: null } );

      const data = await response.json();
        console.dir(data, { depth: null });
      if (response.ok) {
          // console.dir("data:",data);                       
        setUploadedImage(data.url);
          console.dir(data.url, { depth: null }); 
         setSrcobj([]);    
        setError('');
      } else {
        setError(data.error || 'An error occurred during upload.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    }
  };


  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} multiple accept="image/*" />
      <button type="submit">Upload Image</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}     

      { srcObj && srcObj.map((src : any, index : number) => <div key={index}>  <CardImageUpload srcProps={src['src']} nameProps={src['name']} sizeProps={src['size']} typeProps={src['type']} altProps="Picture of the author" widthProps={150} heightProps={150} key={index}/> </div> ) } 
      { uploadedImage && uploadedImage.map((src : any, index : number) => <div key={index}> <CardImageUpload srcProps={src} nameProps={src['name']} sizeProps={src['size']} typeProps={src['type']} altProps="Picture of the author" widthProps={150} heightProps={150} key={index}/> </div> )}
      <button type="submit">Upload Image</button>
    </form>
    </div>
  );
}

import { writeFile, mkdir } from 'fs/promises';
import { url } from 'inspector';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { ulid, isValid } from 'ulid';
import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';
import { log } from 'console';
import { iSelectedImages } from '@/types';
import { is } from 'zod/v4/locales';
import { urlToHttpOptions } from 'url';

// for select-image
export async function GET(request: Request) {
  try {
   const fileArr : string[] = []
   const directoryArr : string[] = []
   const fileArrURN : string[] = []
   const directoryArrURN : string[] = []
   
   const galleryImages :iSelectedImages[] =  [];  
   
   const searchParams = new URL(request.url).searchParams;
  
   const dataURN : string = searchParams.get('dataURN') || ''; // ex folder
   const pathStartImages : string = process.env.SERVER_PATH_START_IMAGES || '';
   const filePath = path.join(process.cwd(), pathStartImages, dataURN);
    
    console.log('GET process.cwd() = ',process.cwd());
    console.log('GET process.env.SERVER_PATH_START_IMAGES = ',process.env.SERVER_PATH_START_IMAGES);
    console.log('GET dataURN = ',dataURN);
    console.log('GET filePath = ',filePath);
    // process.cwd() = /home/derwt/PROJECT/shop.kenovo.by/client
    // process.env.SERVER_PATH_START_IMAGES = /public/images
    // dataURN =  
    // filePath = /home/derwt/PROJECT/shop.kenovo.by/client/public/images
   
   const listDirFile =  fs.readdirSync(filePath, { withFileTypes: true }); 
   listDirFile.forEach(function(result) {
    // Разделяем массив на файлы и каталоги.
    result.isFile() ? fileArr.push(result.name) : directoryArr.push('/' + result.name) 


    if(result.isFile()){
      // отбираем файлы  с расширением webp    (basename.endsWith('-thumb')) URL URLTHUMB .ENV FOR BACKEND !!!!!!!
      const ext = path.extname(result.name).toLowerCase();
      const basename = path.basename(result.name, ext);
      if(ext === '.webp' && isValid(basename) && process.env.NEXT_PUBLIC_FRONTEND_PATH_START_IMAGES){ {


      const fileContent = fs.readFileSync(filePath + '/' + basename + '.json', 'utf8');
      const fileContentObjJson  = JSON.parse(fileContent);

        const galleryItem =  {
          isNew: false,
          originalname: fileContentObjJson.originalname,
          ulid: basename,
          url: process.env.NEXT_PUBLIC_FRONTEND_PATH_START_IMAGES + dataURN + '/' + basename + '.webp',       
          urlThumb: process.env.NEXT_PUBLIC_FRONTEND_PATH_START_IMAGES +  dataURN +  '/' + basename + 'thumb.webp'
        }
        galleryImages.push(galleryItem);    }
    }
}})

const newGalleryImages : iSelectedImages[] = [];
  
//     TODO:   DELETE ?????
  //  const imageFiles = fileArr.filter(file => {
  //   // Получаем расширение файла в нижнем регистре
  //   console.log('file',file);    
  //   const extImage = path.extname(file).toLowerCase();   
  //   // Проверяем, является ли расширение одним из распространенных для изображений
  //   return extImage === '.png' || extImage === '.jpg' || extImage === '.jpeg' || extImage === '.gif' || extImage === '.bmp'|| extImage === '.webp' || extImage === '.svg';
  // });

 
    return NextResponse.json(
      {   
        galleryImages: galleryImages,
        newGalleryImages: newGalleryImages,     
        path: filePath,
        // fileArr: imageFiles,
        directoryArr: directoryArr,   
        message: 'Get list of files successfully!',
        status: 200
       }      
    );
  } catch (error) {
    // handle any unknown error
    return NextResponse.json(
      { error: 'Error get list of files.' },
      { status: 500 }
    );
  }
}



export async function POST(request : Request) {
  try {
    const { dirName, dirNameCurrent } = await request.json(); // Получаем данные из JSON   
        
    const pathStartImages : string = process.env.SERVER_PATH_START_IMAGES || '';
    const directoryPath = path.join(process.cwd(), pathStartImages, dirName);
    const directoryPathCurrent = path.join(process.cwd(), pathStartImages, dirNameCurrent);  
     const galleryImages :iSelectedImages[] =  [];  

    const fileArr : string[] = []
    const directoryArr : string[] = []
    // const fileArrURN : string[] = []
    // const directoryArrURN : string[] = []   


    //  console.log('request.json()',request);
    console.log('POST process.cwd() = ', process.cwd()); // /home/derwt/PROJECT/shop.kenovo.by/client
    console.log('POST process.env.SERVER_PATH_START_IMAGES = ', process.env.SERVER_PATH_START_IMAGES);
    console.log('POST dirName = ', dirName);
    console.log('POST dirNameCurrent = ', dirNameCurrent);
    console.log('POST directoryPath = ', directoryPath);
    console.log('POST directoryPathCurrent = ', directoryPathCurrent);

// POST process.cwd() =  /home/derwt/PROJECT/shop.kenovo.by/client
// POST process.env.SERVER_PATH_START_IMAGES =  /public/images
// POST dirName =  /uploads/11451
// POST dirNameCurrent =  /uploads
// POST directoryPath =  /home/derwt/PROJECT/shop.kenovo.by/client/public/images/uploads/11451
// POST directoryPathCurrent =  /home/derwt/PROJECT/shop.kenovo.by/client/public/images/uploads
// GET process.cwd() =  /home/derwt/PROJECT/shop.kenovo.by/client
// GET process.env.SERVER_PATH_START_IMAGES =  /public/images
// GET dataURN =  /folder1/folder2/folder3/folder4/folder5
// GET filePath =  /home/derwt/PROJECT/shop.kenovo.by/client/public/images/folder1/folder2/folder3/folder4/folder5
// GET /api/images?dataURN=folder1%2Ffolder2%2Ffolder3%2Ffolder4%2Ffolder5 500 in 12ms (compile: 5ms, render: 7ms)

    // Проверяем, существует ли каталог
    if (fs.existsSync(directoryPath)) {
      return NextResponse.json({ message: `Каталог '${dirName}' уже существует!` });
    }

    // Создаем каталог
    fs.mkdirSync(directoryPath, { recursive: true }); // Создаем каталог
    
   const listDirFileCurrent =  fs.readdirSync(directoryPathCurrent, { withFileTypes: true });
  listDirFileCurrent.forEach(function(result) {
    // Разделяем массив на файлы и каталоги.
    result.isFile() ? fileArr.push(result.name) : directoryArr.push('/' + result.name)

    // Разделяем массив на файлы и каталоги. Отбираем Файлы ulidname.webp и ulidname-thumb.webp в отдельные массивы.
    if(result.isFile()){
      // (basename.endsWith('-thumb'))
      const ext = path.extname(result.name).toLowerCase();
      const basename = path.basename(result.name, ext);
      // URL URLTHUMB .ENV FOR BACKEND !!!!!!!
      if(ext === '.webp' && isValid(basename) && process.env.NEXT_PUBLIC_FRONTEND_PATH_START_IMAGES && directoryPath){ {

      const fileContent = fs.readFileSync(directoryPathCurrent + '/' + basename + '.json', 'utf8');
      const fileContentObjJson  = JSON.parse(fileContent);

        const galleryImagesItem : iSelectedImages  =  {
          isNew: false,
          originalname: fileContentObjJson.originalname,
          ulid: basename,
          url: process.env.NEXT_PUBLIC_FRONTEND_PATH_START_IMAGES + dirNameCurrent + '/' + basename + '.webp',        
          urlThumb: process.env.NEXT_PUBLIC_FRONTEND_PATH_START_IMAGES + dirNameCurrent + '/' + basename + 'thumb.webp'
        }
        galleryImages.push(galleryImagesItem);    }
    }
}})
      const newGalleryImages : iSelectedImages[] =  []

    return NextResponse.json(
      {
        galleryImages: galleryImages,
        newGalleryImages: newGalleryImages, 
        path: dirNameCurrent,
        directoryArr: directoryArr,        
        status: 200,
        message: `Каталог '${dirName}' успешно создан!` 
        });
  } catch (error : any) {
    return NextResponse.json({ message: 'Ошибка создания каталога', error: error.message }, { status: 500 });
  }
}
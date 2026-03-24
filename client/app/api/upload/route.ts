import { writeFile, mkdir } from 'fs/promises';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { isValid, ulid } from 'ulid';
import { ImageMagick, MagickFormat, initializeImageMagick, Magick, Quantum } from '@imagemagick/magick-wasm';
import { readFileSync } from 'fs';
import { ImageMagickResize, ImageMagickThumbnail } from '@/utils/image-magick';
import { iSelectedImages, iListFoldersFiles } from '@/types/images';



export async function POST(request: Request) {
  try {
    const selectedImages :iSelectedImages[] =  [];
    const galleryImages :iSelectedImages[] =  [];
    const newGalleryImages :iSelectedImages[] =  [];
    const iListFoldersFiles :iListFoldersFiles[] = []

    const formData = await request.formData(); // Получаем данные формы
    const files = formData.getAll('image') as File[];
    const pathToSaveImage = formData.get('pathsaveimages') as string;
    console.log('files', files);
    files.map((file) => {
      console.log('file.name', file.name);
      console.log('file.size', file.size);
    })
    
    // ***********start galleryImages  
    const fileArr : string[] = []
    const directoryArr : string[] = []    
    const pathStartImages : string = process.env.SERVER_PATH_START_IMAGES || '';
    const filePath = path.join(process.cwd(), pathStartImages, pathToSaveImage);
    const listDirFileCurrent =  fs.readdirSync(filePath, { withFileTypes: true });
      listDirFileCurrent.forEach(function(result) {
        // Разделяем массив на файлы и каталоги.
        result.isFile() ? fileArr.push(result.name) : directoryArr.push('/' + result.name)
    
        // Разделяем массив на файлы и каталоги. Отбираем Файлы ulidname.webp и ulidname-thumb.webp в отдельные массивы.
        if(result.isFile()){
          // (basename.endsWith('-thumb'))
          const ext = path.extname(result.name).toLowerCase();
          const basename = path.basename(result.name, ext);
          // URL URLTHUMB .ENV FOR BACKEND !!!!!!!
          if(ext === '.webp' && isValid(basename) && process.env.NEXT_PUBLIC_FRONTEND_PATH_START_IMAGES && filePath){ {
    
          const fileContent = fs.readFileSync(filePath + '/' + basename + '.json', 'utf8');
          const fileContentObjJson  = JSON.parse(fileContent);

    
            const galleryImagesItem : iSelectedImages =  {
              isNew: false,
              originalname: fileContentObjJson.originalname,
              ulid: basename,
              url: process.env.NEXT_PUBLIC_FRONTEND_PATH_START_IMAGES + pathToSaveImage + '/' + basename + '.webp',        
              urlThumb: process.env.NEXT_PUBLIC_FRONTEND_PATH_START_IMAGES + pathToSaveImage + '/' + basename + 'thumb.webp'
            }
            galleryImages.push(galleryImagesItem);    }
        }
    }})
    // ***********end galleryImages



    if (!files || files.length === 0) { return NextResponse.json({ success: false, message: 'Нет файлов для загрузки.' }); }
    for (const file of files) {
      // console.log(`Имя файла: ${file.name}, Размер: ${file.size} байт`);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const pathStartImagesServer : string = process.env.SERVER_PATH_START_IMAGES || '';
    const pathStartImagesFrontend : string = process.env.NEXT_PUBLIC_FRONTEND_PATH_START_IMAGES || '';

    var nameUlid :string = ulid().toLowerCase(); 
    const fileNameUlid = `${nameUlid}.${file.name.split('.').pop()}`; // формируем  имяULID + расширения файла-изображения (pop отсекает и возвращает остаток)
    const fileNameUlidWebp = `${nameUlid}.webp`; // формируем  имяULID+webp  файла-изображения webp
    const fileNameUlidThumbnailWebp = `${nameUlid}thumb.webp`; // формируем  имяULID+webp  файла-изображения webp
    const fileNameUlidJson = `${nameUlid}.json`; // формируем  имяULID+webp  файла-изображения webp
    // const fileNameUlidHeroImage1280x720Webp = `${nameUlid}_he.webp`;    
    
    console.log('pathsaveimages',pathToSaveImage);
    console.log('pathStartImagesServer',pathStartImagesServer);
    console.log('pathStartImagesFrontend',pathStartImagesFrontend);
    console.log('fileNameUlid',fileNameUlid);
    console.log('fileNameUlidWebp',fileNameUlidWebp);
    console.log('fileNameUlidThumbnailWebp',fileNameUlidThumbnailWebp);
    console.log('process.cwd()',process.cwd());
    console.log('pathToSaveImage',pathToSaveImage);


  
    newGalleryImages.push({
      isNew: true,
      originalname: file.name,
      ulid: nameUlid, 
      url: `${pathStartImagesFrontend}${pathToSaveImage}` + '/' + fileNameUlidWebp,  
      urlThumb: `${pathStartImagesFrontend}${pathToSaveImage}` + '/' + fileNameUlidThumbnailWebp,
                        })

    const filePath = path.join(process.cwd(), pathStartImagesServer,  pathToSaveImage, '/' , fileNameUlid);
    const filePathWebp = path.join(process.cwd(), pathStartImagesServer,  pathToSaveImage, '/' , fileNameUlidWebp);
    const filePathThumbnailWebp = path.join(process.cwd(), pathStartImagesServer, pathToSaveImage, '/' , fileNameUlidThumbnailWebp);
    const filePathJson = path.join(process.cwd(), pathStartImagesServer, pathToSaveImage, '/' , fileNameUlidJson);
    
 
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, buffer);
    await writeFile(filePathJson, `{"originalname": "${file.name}", "size": "${file.size}", "ulid": "${nameUlid}", "url": "${pathStartImagesFrontend}${pathToSaveImage}/${fileNameUlidWebp}", "urlThumb": "${pathStartImagesFrontend}${pathToSaveImage}/${fileNameUlidThumbnailWebp}"}`);


   ImageMagickResize(
    '/node_modules/@imagemagick/magick-wasm/dist/magick.wasm', // path to the wasm file '/node_modules/@imagemagick/magick-wasm/dist/magick.wasm'
    buffer, // the image buffer
    false, // whether to convert the image to grayscale  
    75, // the quality of the image (default 75)
    1280,  // the width of the image for Resize
    720,  // the height of the image for Resize
    0,  // the rotation of the image 
    'WEBP', // the format of the image (WEBP, AVIF, JPEG,JPG, PNG, GIF, TIFF, etc.)
    filePathWebp, // the path to the image output (path.join(process.cwd(), 'public/images/uploads/', fileNameUlidWebp);)  
  )

  ImageMagickThumbnail(
      // magick -define jpeg:size=200x200 hatching_orig.jpg  -thumbnail 100x100^ \
      //     -gravity center -extent 100x100  cut_to_fit.gif
    '/node_modules/@imagemagick/magick-wasm/dist/magick.wasm', // path to the wasm file '/node_modules/@imagemagick/magick-wasm/dist/magick.wasm'
    buffer, // the image buffer
    false, // whether to convert the image to grayscale  
    75, // the quality of the image (default 75)
    0,  // the rotation of the image 
    300, // the size of the thumbnail (squared)
    'WEBP', // the format of the image (WEBP, AVIF, JPEG,JPG, PNG, GIF, TIFF, etc.)
    filePathThumbnailWebp, // the path to the image output (path.join(process.cwd(), 'public/images/uploads/', fileNameUlidThumbnailWebp);)  
  )
    }





        // TODO: remove ulid url  urlThumb
    return NextResponse.json(
      { 
        // selectedImages: selectedImages,
        // gallery: gallery,
        newGalleryImages: newGalleryImages,
        galleryImages: galleryImages,
        // ulid: filesUlid,
        // url: filesURL,
        // urlThumb: filesThumbURL,        
        message: 'File uploaded successfully!',
        status: 200
       }     
    );
  } catch (error) {
    // handle any unknown error
    return NextResponse.json(
      { error: 'Error uploading file.' },
      { status: 500 }
    );
  }
}



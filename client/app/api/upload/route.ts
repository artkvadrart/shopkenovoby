import { writeFile, mkdir } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';
import { ulid } from 'ulid';
import { ImageMagick, MagickFormat, initializeImageMagick, Magick, Quantum } from '@imagemagick/magick-wasm';
import { readFileSync } from 'fs';
import { ImageMagickResize, ImageMagickThumbnail } from '@/utils/image-magick';
import { iSelectedImages, iListFoldersFiles } from '@/types/images';



export async function POST(request: Request) {
  try {
    const selectedImages :iSelectedImages[] =  [];
    const filesUlid :string[] = [] // массив для хранения ULID загруженных файлов
    const filesURL :string[] = [] // массив для хранения URL-адресов загруженных файлов
    const filesThumbURL :string[] = [] // массив для хранения URL-адресов загруженных файлов
    const iListFoldersFiles :iListFoldersFiles[] = []

    // const filePath = path.join(process.cwd(), 'data.txt'); // Или другой путь к файлу
    // const fileContent = fs.readFileSync(filePath, 'utf-8');
    

    const formData = await request.formData(); // Получаем данные формы
    const files = formData.getAll('image') as File[];
    const pathToSaveImage = formData.get('pathsaveimages') as string;
    console.log('pathsaveimages',pathToSaveImage);
    

    
    if (!files || files.length === 0) { return NextResponse.json({ success: false, message: 'Нет файлов для загрузки.' }); }
    
    for (const file of files) {
      // console.log(`Имя файла: ${file.name}, Размер: ${file.size} байт`);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    var nameUlid :string = ulid(); 
    const fileNameUlid = `${nameUlid}.${file.name.split('.').pop()}`; // формируем  имяULID - без расширения  файла-изображения
    const fileNameUlidWebp = `${nameUlid}.webp`; // формируем  имяULID+webp  файла-изображения webp
    const fileNameUlidThumbnailWebp = `${nameUlid}THUMB.webp`; // формируем  имяULID+webp  файла-изображения webp
    // const fileNameUlidHeroImage1280x720Webp = `${nameUlid}_he.webp`;    
    //filesURL.push('/uploads/' + fileNameUlid);
    filesUlid.push(nameUlid);   // массив для хранения ULID загруженных файлов
    filesURL.push(`/images/${pathToSaveImage}` + fileNameUlidWebp); // массив для хранения URL-адресов загруженных файлов
    filesThumbURL.push(`/images/${pathToSaveImage}` + fileNameUlidThumbnailWebp); // массив для хранения ThumbURL-адресов загруженных файлов
    // filesURL.push('/images/uploads/' + fileNameUlidHeroImage1280x720Webp);
    selectedImages.push({ulid: nameUlid, 
                         url: `/images/${pathToSaveImage}` + fileNameUlidWebp,  
                         urlThumb: `/images/${pathToSaveImage}` + fileNameUlidThumbnailWebp,
                        })

    const filePath = path.join(process.cwd(), `public/images/${pathToSaveImage}`, fileNameUlid);
    const filePathWebp = path.join(process.cwd(), `public/images/${pathToSaveImage}`, fileNameUlidWebp);
    const filePathThumbnailWebp = path.join(process.cwd(), `public/images/${pathToSaveImage}`, fileNameUlidThumbnailWebp);
    // const filePathHeroImage1280x720Webp = path.join(process.cwd(), `public/images/${pathToSaveImage}/`, fileNameUlidHeroImage1280x720Webp);  
 
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, buffer);


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
        selectedImages: selectedImages,
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



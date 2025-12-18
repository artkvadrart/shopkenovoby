import { writeFile, mkdir } from 'fs/promises';
import { url } from 'inspector';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { ulid } from 'ulid';
import { SearchParamsContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';
import { log } from 'console';

// for select-image
export async function GET(request: Request) {
  try {
   const fileArr : string[] = []
   const directoryArr : string[] = []
   const fileArrURN : string[] = []
   const directoryArrURN : string[] = []   
   
   const searchParams = new URL(request.url).searchParams;
   const dataURN = searchParams.get('dataURN');
    console.log('dataURN=========================',dataURN);
   
   const filePath = path.join(process.cwd(), `public${process.env.PATH_START_IMAGES}${dataURN}`);
    console.log('filePath=========================',filePath);
   
   const listDirFile =  fs.readdirSync(filePath, { withFileTypes: true });

  // const files = fs.readdirSync(directoryPath);

  // 2. Фильтруем массив, оставляя только файлы с изображениями
   listDirFile.forEach(function(result) {
    result.isFile() ? fileArr.push(result.name) : directoryArr.push(result.name)
    result.isFile() ? fileArrURN.push(`public${process.env.PATH_START_IMAGES}`+result.name) : directoryArrURN.push(`public${process.env.PATH_START_IMAGES}`+result.name)
  //  console.log(result.name);
  //  console.log(` - isFile: ${result.isFile()}`);
  //  console.log(` - isDirectory: ${result.isDirectory()}`);
});
  
// console.log('listDirFile=',listDirFile);
 
   const imageFiles = fileArr.filter(file => {
    // Получаем расширение файла в нижнем регистре
    console.log('file',file);    
    const ext = path.extname(file).toLowerCase();
    // Проверяем, является ли расширение одним из распространенных для изображений
    return ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif' || ext === '.bmp'|| ext === '.webp' || ext === '.svg';
  });

 
    return NextResponse.json(
      {         
        path: filePath,
        fileArr: imageFiles,
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
    const { dirName } = await request.json(); // Получаем данные из JSON
    const directoryPath = path.join(process.cwd(), `public${process.env.PATH_START_IMAGES}`, dirName);
     
    console.log('directoryPath',directoryPath);
    
    // Проверяем, существует ли каталог
    if (fs.existsSync(directoryPath)) {
      return NextResponse.json({ message: `Каталог '${dirName}' уже существует!` });
    }

    // Создаем каталог
    // fs.mkdirSync(directoryPath);

    fs.mkdirSync(directoryPath, { recursive: true }); // Создаем каталог

    return NextResponse.json({ message: `Каталог '${dirName}' успешно создан!` });
  } catch (error : any) {
    return NextResponse.json({ message: 'Ошибка создания каталога', error: error.message }, { status: 500 });
  }
}
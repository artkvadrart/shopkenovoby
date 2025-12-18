import { writeFile, mkdir } from 'fs/promises';
import { url } from 'inspector';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { ulid } from 'ulid';


// export const GET = async (req: NextRequest) => server.handleWeb(req);
// export const PATCH = async (req: NextRequest) => server.handleWeb(req);
// export const POST = async (req: NextRequest) => server.handleWeb(req);
// export const DELETE = async (req: NextRequest) => server.handleWeb(req);
// export const OPTIONS = async (req: NextRequest) => server.handleWeb(req);
// export const HEAD = async (req: NextRequest) => server.handleWeb(req);

export async function GET(request: Request) {
  try {
   const fileArr : string[] = []
   const directoryArr : string[] = []
   const filePath = path.join(process.cwd(), 'public/uploads/');
   const listDirFile =  fs.readdirSync(filePath, { withFileTypes: true });

   listDirFile.forEach(function(result) {
    result.isFile() ? fileArr.push(result.name) : directoryArr.push(result.name)
   console.log(result.name);
   console.log(` - isFile: ${result.isFile()}`);
   console.log(` - isDirectory: ${result.isDirectory()}`);
});
  
console.log('listDirFile=',listDirFile);
   
 
    return NextResponse.json(
      {         
        fileArr: fileArr,
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
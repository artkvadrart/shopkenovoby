import fs from 'fs'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const path = '.'+url.pathname
  const ext = url.pathname.substring(url.pathname.lastIndexOf('.')) // length-3

  try {
    const fd = fs.readFileSync(path)
    let type = ''
    if(ext == '.jpg' || ext == '.jpeg') type = 'image/jpeg'
    if(ext == '.png') type = 'image/png'
    if(ext == '.svg') type = 'image/svg+xml'
    if(ext == '.gif') type = 'image/gif'
    if(ext == '.webp') type = 'image/webp' 

    return new NextResponse(fd,{status: 200, headers: {'Content-Type': type}})
  } catch  {
    return new NextResponse('Not found',{status: 404})
  }  
}
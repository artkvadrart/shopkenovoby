'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { iSelectedImages } from "@/types"
import { FolderPlus } from "lucide-react"
import { Span } from "next/dist/trace"
import { useState } from "react"

export function CreateFolder(
  { 
    pathArrayProps,
    galleryImagesProps,
    setGalleryImagesProps,
    newGalleryImagesProps,
    setNewGalleryImagesProps,
    directoryArrProps,
    setDirectoryArrProps,


  }: {
    pathArrayProps:string[],
    galleryImagesProps:iSelectedImages[] | undefined,
    setGalleryImagesProps:Function,
    newGalleryImagesProps: iSelectedImages[] | undefined,
    setNewGalleryImagesProps(value: iSelectedImages[]): void
    directoryArrProps:string[],
    setDirectoryArrProps:Function
  }

) {
  const [inputNameFolder, setInputNameFolder] = useState  <string> ('')
  const [message, setMessage] = useState('');
 

 const createFolder = (newFolderName: string) => {
fetch('/api/images', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ dirName: `${pathArrayProps.join('')}/${newFolderName}`, 
                         dirNameCurrent: `${pathArrayProps.join('')}` }),
})
.then(response => response.json())
.then((data) => {   
  setMessage(data.message)     
    data.directoryArr && setDirectoryArrProps(data.directoryArr);    
    data.newGalleryImages && setNewGalleryImagesProps(data.newGalleryImages);
    data.galleryImages && setGalleryImagesProps(data.galleryImages);
    console.log('data.directoryArr',data.directoryArr);    
    console.log('data.galleryImages',data.galleryImages);    
    // let fullFileArr : string[] = []
    // data.fileArr && data.fileArr.map((item: string) => fullFileArr.push( `${process.env.NEXT_PUBLIC_PATH_START_IMAGES}${pathArray.join('')}/${item}`))
    // setFulPathArray(fullFileArr);        
    return data;
  }



);
  }

  return (
    <Dialog>
      <DialogTrigger asChild >         
        <Button variant="link" size="lg" className="h-6! w-6! text-lg "><FolderPlus size={24} className="h-6! w-6! text-lg " />Add folder</Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-md z-150">
        <DialogHeader>
          <DialogTitle>Create folder</DialogTitle>
          <DialogDescription>
            Input name of folder to create
          </DialogDescription>
          <DialogDescription className="text-red-600">
             {message ? <span className="text-red-600">{message}</span> : <span className="text-white">Message</span>}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"              
              // readOnly
              onChange={(e) => setInputNameFolder(e.target.value)}              
              placeholder="Input name of folder"
              value={inputNameFolder}
              type="text"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"

            />
          </div>
        </div>
        <DialogFooter className="flex flex-row  justify-center justify-items-center gap-12 sm:justify-center ">
          <Button type="button" className="flex w-2/6 justify-center items-center bg-teal-200 text-base  border-2 border-gray-300 font-medium tracking-wide antialiased rounded-lg px-4 py-2 h-9 cursor-pointer hover:shadow-lg hover:font-bold hover:shadow-gray-500/40" onClick={() => createFolder(inputNameFolder)}>Create</Button>
          <DialogClose type="button"  className=" flex w-2/6  justify-center items-center bg-blue-200 text-base border-2 border-gray-300 font-medium shadow-sm tracking-wide antialiased rounded-lg px-4 py-2 h-9 cursor-pointer hover:shadow-lg hover:font-bold hover:shadow-gray-500/40">Exit</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

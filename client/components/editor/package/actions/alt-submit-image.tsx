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
import { Download, FolderPlus } from "lucide-react"
import { useState } from "react"
import { InsertImagePayload } from "../plugins/ImagesPlugin"

export function AltSubmitImage(
  { 
    languageProps,
    selectedImageProps,
    setSelectedImageProps,
    onClickProps,
  }: {
    languageProps: string,
    selectedImageProps:iSelectedImages | undefined,
    setSelectedImageProps:Function,
    onClickProps : (payload: InsertImagePayload) => void
  }

) {
  const [inputAltTags, setInputAltTags] = useState  <string> ('')
  const [message, setMessage] = useState('');
  const srcUrl = selectedImageProps?.url as string;



  return (
    <Dialog>
      <DialogTrigger asChild >         
        <Button variant="link" size="lg" className="h-6! w-6! text-lg z-150"><Download size={24} className="h-6! w-6! text-lg " />Выбрать</Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-md z-150">
        <DialogHeader>
          
          <DialogTitle>  Input &lt;alt&gt; tag </DialogTitle>
          <DialogDescription>
            Input <span className="font-bold font-mono pl-2 pr-2">&lt;alt&gt;</span> tag (alternative text) for SEO (125-150 characters).
          </DialogDescription>
           <DialogDescription>
            E.g. "Golden retriever puppy chasing a red ball".
          </DialogDescription>
          <DialogDescription className="text-red-600">
             {message ? <span className="text-red-600">{message}</span> : <span className="text-white">Message</span>}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-10 items-center">
          <div className="grid ">
            {/* <Label htmlFor="altInput" className="sr-only"> */}
               <div className="toolbar-itemmin-w-auto  rounded-lg font-semibold">{languageProps.toLowerCase()}:</div>
              {/* Alt tags (alternative text)
            </Label> */}
             </div>
            
            
               <div className="grid col-span-9">
            <Input
              id="altInput"              
              // readOnly
              onChange={(e) => setInputAltTags(e.target.value)}              
              placeholder="Golden retriever puppy chasing a red ball"
              value={inputAltTags}
              type="text"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
            </div>
          
         
        </div>

            <DialogDescription>
            <img src={selectedImageProps?.urlThumb} alt={inputAltTags} className="rounded-sm ml-auto mr-auto" />
          </DialogDescription>
        <DialogFooter className="flex flex-row  justify-center justify-items-center gap-12 sm:justify-center ">
          <Button type="button" className="flex w-2/6 justify-center items-center bg-teal-200 text-base  border-2 border-gray-300 font-medium tracking-wide antialiased rounded-lg px-4 py-2 h-9 cursor-pointer hover:shadow-lg hover:font-bold hover:shadow-gray-500/40" onClick={() => onClickProps({altText: inputAltTags, src: srcUrl })}>OK</Button>
          <DialogClose type="button"  className=" flex w-2/6  justify-center items-center bg-blue-200 text-base border-2 border-gray-300 font-medium shadow-sm tracking-wide antialiased rounded-lg px-4 py-2 h-9 cursor-pointer hover:shadow-lg hover:font-bold hover:shadow-gray-500/40">Cancel</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

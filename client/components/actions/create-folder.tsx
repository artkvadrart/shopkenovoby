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
import { FolderPlus } from "lucide-react"
import { Span } from "next/dist/trace"
import { useState } from "react"

export function CreateFolder(
  { directoryArrProps }: { directoryArrProps:string[] }
) {
  const [inputNameFolder, setInputNameFolder] = useState  <string> ('')
  const [message, setMessage] = useState('');
 

 const createFolder = (newFolderName: string) => {
fetch('/api/images', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ dirName: `${directoryArrProps.join('/')}/${newFolderName}` }),
})
.then(response => response.json())
.then(data =>setMessage(data.message));
  }

  return (
    <Dialog>
      <DialogTrigger asChild >         
        <Button variant="link" size="lg" className="!h-6 !w-6 text-lg "><FolderPlus size={24} className="!h-6 !w-6 text-lg " />Add folder</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
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
        <DialogFooter className="sm:justify-start">
          
          {/* <DialogClose asChild> <Button type="button" variant="secondary"> Close </Button> </DialogClose> */}
          <Button type="button" onClick={() => createFolder(inputNameFolder)}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

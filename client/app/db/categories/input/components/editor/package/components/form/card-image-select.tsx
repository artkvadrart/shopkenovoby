import { Button } from "@/components/ui/button"
import { ChevronDownIcon, ChevronRightIcon, ChevronUpIcon, Trash2, X } from "lucide-react"
import Image from 'next/image'

const CardImageSelect = (
  { onDelete, srcProps, nameProps, sizeProps, typeProps, altProps, widthProps, heightProps, errorProps, messageProps, className  }: 
  { onDelete?: () => void | undefined, srcProps: string, nameProps: string, sizeProps?: string, typeProps?: string, altProps: string, widthProps?: number, heightProps?: number, errorProps?: string, messageProps?:string, className?: string }
) => {
  return (
    <div>
      <div className="p-2 m-2 bg-white flex flex-row border rounded-sm shadow-lg">
        <div className="flex flex-col ml-4 my-4 place-content-between" >  
        <Button variant="secondary" disabled size="icon" className="size-10"><ChevronUpIcon /></Button>
        <Button variant="secondary" size="icon" className="size-10"><ChevronDownIcon /></Button>
      </div> 
      <div className="ml-4 my-4" >  
       <Image
       className="rounded-lg"
        src={srcProps}
        alt={altProps}
        width={widthProps}
        height={heightProps}
       />
      </div>     

    <div className="mx-2 my-4 text-sm text-muted-foreground" >
      <div className=" text-black  text-sm text-muted-foreground" > {nameProps} </div>
        format: {typeProps} <br/> size: {sizeProps}  
        {errorProps && <div className=" text-red-600" ><p>Error: {errorProps}</p></div> }
        {messageProps && <div className=" text-green-600" ><p>{messageProps}</p></div> }       
      </div>      
      <div className="ml-8 mr-4 my-4 place-content-start" >
        <Button onClick={onDelete} type="button" variant="outline" size="icon" className="size-10"><X /></Button>
      </div>            
    </div>
    </div>
  )
}

export default CardImageSelect
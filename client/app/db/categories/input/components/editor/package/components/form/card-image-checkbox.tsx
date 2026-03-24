import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDownIcon, ChevronRightIcon, ChevronUpIcon, Trash2, X } from "lucide-react"
import Image from 'next/image'
import { iSelectedImages } from "@/types"
import { check } from "zod"

const CardImageCheckbox = (
  { 
    onCheckedImagesProps,
    selectedImageProps,
    setSelectedImageProps,   
    originalNameProps, 
    srcProps, 
    nameProps, 
    sizeProps, 
    typeProps, 
    altProps, 
    widthProps, 
    heightProps, 
    errorProps, 
    messageProps, 
    className  }: 
  { 
    onCheckedImagesProps: Function,
    selectedImageProps: iSelectedImages[] | undefined,
    setSelectedImageProps: Function,    
    originalNameProps : string, 
    srcProps: string, 
    nameProps: string, 
    sizeProps?: string, 
    typeProps?: string, 
    altProps: string, 
    widthProps?: number, 
    heightProps?: number, 
    errorProps?: string, 
    messageProps?:string, 
    className?: string }
) => {

  const defaultChecked = (idUlid: string) => {
    const checked = selectedImageProps?.some((selectedImage) => {
      return selectedImage.ulid === idUlid
    })
    return checked
  }

  return (
    <div>
      <div className="p-0 m-0 flex flex-col ">
        <div className="flex flex-row ml-2 my-4 place-content-between">
          <div className="p-0 m-2 bg-white flex flex-col border border-gray-400/50 rounded-xs shadow-lg">
            <div className="flex relative justify-center p-0">
              {srcProps && <img src={srcProps} alt={'altProps'} width={'144'} height={'144'} className="rounded-sm max-w-full h-36 impotant"></img>}

              {/* <Button onClick={onDelete} type="button" variant="outline" size="icon" className="size-8 absolute top-2 right-2"><X /></Button> */}
              {/* <Checkbox onCheckedChange={onDelete} id="checkbox" name="checkbox"  type="button"  className="size-12 absolute top-8 right-12 bg-teal-500/50"/> */}
              <Checkbox 
                onCheckedChange={(checked) => onCheckedImagesProps(nameProps, checked)} 
                // checked={false}
                id={nameProps}
                defaultChecked={defaultChecked(nameProps)}
                name={nameProps} 
                value={nameProps} 
                type="button" 
                className="absolute top-2 right-2 size-10 bg-teal-100/60 border-gray-500 shadow-sm shadow-black/80 hover:bg-red-200/80  hover:shadow-sm hover:shadow-red-500/30 data-[state=checked]:border-red-600 data-[state=checked]:bg-red-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700" 
              />
            </div>

            <div className="flex" >
              <div className="flex flex-col mx-1 my-1 text-xs w-[130] items-center align-middle justify-center" >                
                <div className=" w-[130] text-black font-normal text-xs wrap-anywhere" > {nameProps} </div>
                <div className=" w-[130] pt-2 text-black font-semibold text-xs wrap-anywhere" > {originalNameProps} </div>
                
                {errorProps && <div className=" text-red-600" ><p>Error: {errorProps}</p></div>}
                {messageProps && <div className=" text-green-600" ><p>{messageProps}</p></div>}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CardImageCheckbox
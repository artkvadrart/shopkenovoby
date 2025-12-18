import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronDownIcon, ChevronRightIcon, ChevronUpIcon, Trash2, X } from "lucide-react"
import Image from 'next/image'

const CardImageCheckbox = (
  { onDelete, srcProps, nameProps, sizeProps, typeProps, altProps, widthProps, heightProps, errorProps, messageProps, className  }: 
  { onDelete?: () => void | undefined, srcProps: string, nameProps: string, sizeProps?: string, typeProps?: string, altProps: string, widthProps?: number, heightProps?: number, errorProps?: string, messageProps?:string, className?: string }
) => {
  return (
    <div>
      <div className="p-2 m-2 flex flex-col ">
        <div className="flex flex-row ml-4 my-4 place-content-between">
          <div className="p-2 m-2 bg-white flex flex-col border rounded-sm shadow-lg">
            <div className="flex relative  justify-center">
              {srcProps && <img src={srcProps} alt={'altProps'} width={'144'} height={'144'} className="rounded-sm max-w-full h-36 impotant"></img>}

              {/* <Button onClick={onDelete} type="button" variant="outline" size="icon" className="size-8 absolute top-2 right-2"><X /></Button> */}
              {/* <Checkbox onCheckedChange={onDelete} id="checkbox" name="checkbox"  type="button"  className="size-12 absolute top-8 right-12 bg-teal-500/50"/> */}
              <Checkbox onCheckedChange={onDelete} id="checkbox" name="checkbox" type="button" className=" absolute top-2 right-2 size-10 bg-teal-100/60 border-gray shadow-sm shadow-black/80 hover:bg-teal-200/80  hover:shadow-sm hover:shadow-teal-500/30 data-[state=checked]:border-teal-600 data-[state=checked]:bg-teal-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700" />
            </div>

            <div className="flex" >
              <div className="mx-2 my-2 text-xs text-muted-foreground" >
                <div className=" text-black  text-xs " > {nameProps} </div>
                format: {typeProps} <br /> size: {sizeProps}
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
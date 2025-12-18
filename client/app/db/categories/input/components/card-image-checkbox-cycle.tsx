import CardImageCheckbox from "@/components/form/card-image-checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Folder } from "lucide-react";


const CardImageCheckboxCycle = (
    {fulPathArrayProps, 
    // pathArrayProps, 
    //  fileArrProps, 
     directoryArrProps, 
     upFolderProps}: 
    {fulPathArrayProps: string[], 
     // pathArrayProps: string[], 
      // fileArrProps: string[], 
      directoryArrProps: string[], 
      upFolderProps: Function }
    // fileArrProps: string[], directoryArrProps: string[]
  ) => {
    // useEffect(() => getList(dataURNProps)), [];
    // getList(dataURNProps)
    // const [checked, setChecked] = useState(false);
    // const handleChange = () => {
    //   setChecked(!checked);
    // };
    return (
      <div  className="overflow:scroll overscroll-behavior:contain  ">
        <div className="flex flex-row">
          {directoryArrProps.length>0 && directoryArrProps.map((directtory, index) => (
            <div key={index}>
            <input type="button" id={`folder-${directtory}`} name={`folder-${directtory}`} onClick={()=>upFolderProps(`${directtory}`)} className="hidden"/>
            <div className="pt-2 px-2 my-0 "> 
              <Label htmlFor={`folder-${directtory}`}> 
                 <span className="inline-flex items-center font-bold  hover:text-sky-700  cursor-pointer">            
                   <Folder /><span className="uppercase text-sm mr-4">&nbsp;{` ${directtory}`}</span>
                </span>
              </Label>
            </div>
              <div key={index} className="flex flex-col w-1/6 items-start justify-start ms-8"> </div>
            </div>

        ))} 
        </div>
        <Separator className="bg-gray-400"/>
        <div className="flex flex-row">
      
        {fulPathArrayProps && fulPathArrayProps.map((file, index) => (                   
        <div key={index*10}>         
          <CardImageCheckbox  
            srcProps={`${file}`} 
            nameProps={`${file}`} 
            sizeProps={`sizeProps`} 
            typeProps={`typeProps`} 
            altProps={`altProps`} />
        </div>        
        ))}

        </div>        
      </div>
    );
  };
  export default CardImageCheckboxCycle
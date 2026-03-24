import CardImageCheckbox from "@/components/form/card-image-checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { iSelectedImages } from "@/types";
import { Folder, Cannabis } from "lucide-react";
import { Dispatch, SetStateAction } from "react";


const CardImageCheckboxCycle = (
    {       
      selectedImageProps,
      setSelectedImageProps,
      galleryImagesProps,      
      setGalleryImagesProps,
      newGalleryImagesProps,
      setNewGalleryImagesProps,         
      directoryArrProps, 
      upFolderProps
    }: 
    { 
      selectedImageProps: iSelectedImages[] | undefined,
      setSelectedImageProps: Dispatch<SetStateAction<iSelectedImages[] | undefined>>
      galleryImagesProps: iSelectedImages[] | undefined,
      setGalleryImagesProps: Dispatch<SetStateAction<iSelectedImages[] | undefined>>
      newGalleryImagesProps: iSelectedImages[] | undefined,
      setNewGalleryImagesProps: Dispatch<SetStateAction<iSelectedImages[] | undefined>>
      directoryArrProps: string[], 
      upFolderProps: Function }    
  ) => { 
  function onCheckedImages(idUlid: string, checked: boolean) {


    // const hasUserWithId2 = users.some(user => user.id === 2);
    const foundGalleryImages = galleryImagesProps?.find(galleryImagesProps => galleryImagesProps.ulid === idUlid);
    const newFoundGalleryImages = newGalleryImagesProps?.find(newGalleryImagesProps => newGalleryImagesProps.ulid === idUlid);

    console.log('foundGalleryImages', foundGalleryImages);
    console.log('newFoundGalleryImages', newFoundGalleryImages);

    if (checked) {
      foundGalleryImages && setSelectedImageProps((prevImages: iSelectedImages[] | undefined) => prevImages ? [...prevImages, foundGalleryImages] : prevImages);
      newFoundGalleryImages && setSelectedImageProps((prevImages: iSelectedImages[] | undefined) => prevImages ? [...prevImages, newFoundGalleryImages] : prevImages);

    } else {
      setSelectedImageProps(prevImages => prevImages ? prevImages.filter((gallery) => gallery.ulid !== idUlid) : prevImages);
    }

    selectedImageProps?.map((selectedImage) => {
      console.log('selectedImage', selectedImage);
    })


  }
    
    return (
      <div  className="overflow:scroll overscroll-behavior:contain  ">
        <div className="grid grid-cols-7">

          {directoryArrProps.length>0 && directoryArrProps.map((directtory, index) => (
            <div key={index}>
            <input type="button" id={`folder-${directtory}`} name={`folder-${directtory}`} onClick={()=>upFolderProps(`${directtory}`)} className="hidden"/>
            <div className="pt-2 px-2 my-0 "> 
              <Label htmlFor={`folder-${directtory}`}> 
                 <span className="inline-flex items-center font-bold  hover:text-sky-700  cursor-pointer">            
                   <Folder /><span className=" text-sm mr-4">&nbsp;{` ${directtory}`}</span>
                </span>
              </Label>
            </div>
              <div key={index} className="flex flex-col w-1/6 items-start justify-start ms-8"> </div>
            </div>
        ))} 
        </div>

        <Separator className="bg-gray-400"/>
        <form >
          
        <div className="grid grid-cols-7">
                  {newGalleryImagesProps && newGalleryImagesProps.map((item, index) => (                   
        <div key={index*10} className="relative">
            
            <span className="absolute   font-semibold text-2xl text-green-400 top-9 left-8 z-50">New</span>
          <CardImageCheckbox 
            onCheckedImagesProps={onCheckedImages}
            selectedImageProps = {selectedImageProps}
            setSelectedImageProps = {setSelectedImageProps}
            srcProps={`${item.urlThumb}`}
            originalNameProps={`${item.originalname}`} 
            nameProps={`${item.ulid}`} 
            sizeProps={`sizeProps`} 
            typeProps={`typeProps`} 
            altProps={`altProps`} />
        </div>        
        ))}
      
        {galleryImagesProps && galleryImagesProps.map((item, index) => (                   
        <div key={index*10}>         
          <CardImageCheckbox  
            onCheckedImagesProps={onCheckedImages}
            selectedImageProps = {selectedImageProps}
            setSelectedImageProps = {setSelectedImageProps}
            srcProps={`${item.urlThumb}`}
            originalNameProps={`${item.originalname}`}  
            nameProps={`${item.ulid}`} 
            sizeProps={`sizeProps`} 
            typeProps={`typeProps`} 
            altProps={`altProps`} />
        </div>        
        ))}        
       
        </div>        
        </form>
      </div>
    );
  };
  export default CardImageCheckboxCycle
'use client';
import React, { ChangeEvent, FormEvent, MouseEventHandler, useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from "@/components/ui/button"
import { ArrowUpIcon } from 'lucide-react'
import Image from 'next/image'
import { Folder } from 'lucide-react';

export default function SelectFromServer() {
const [address, setAddress] = useState ('/api/select');
const [listDir, setListDir] = useState([]);
const [listFile, setListFile] = useState([]);
const [open, setOpen] = useState (false);
const [error, setError] = useState('');


  async function getListDirectoriesFiles ()  {
    try {
      console.log('address2=',address);
         
      const response = await fetch(address, { method: "GET", });

      const data = await response.json();
      if (response.ok) {
        console.log("OK");
        console.dir(data, { depth: null }); 
        console.dir(data.directoryArr, { depth: null }); 
        console.dir(data.fileArr, { depth: null }); 
        setListDir(data.directoryArr);        
        setListFile(data.fileArr);        
        setError("");
        console.dir(listDir, { depth: null }); 
        return data;
      } else {
        setError(data.error || "An error occurred during upload.");
      }
    } catch (err) {
      setError("An unexpected error occurred1.");
    }
    
  }

  const openModal = async (event : FormEvent<HTMLFormElement>) => {   
    
    //Open modal window
    setOpen(true)
    console.log('Open modal window');
    console.log('address=',address);
    const dataList = await getListDirectoriesFiles()
          console.dir(dataList, { depth: null }); 



   // Get list of directories and files
   // throw new Error('Function not implemented.');
  }


  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    throw new Error('Function not implemented.');
  }


  function handleFileChange(event: ChangeEvent<HTMLInputElement>): void {
    throw new Error('Function not implemented.');
  }


  return (
    <div>
<Button variant="outline" onClick={openModal}>ButtonOnClick</Button>
  <form onSubmit={handleSubmit}>
    <div className="flex flex-wrap items-center gap-2 md:flex-row">      
      {/* <Button variant="outline" size="icon" aria-label="Submit"> <ArrowUpIcon /> </Button> */}
    </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}    
       {listDir && listDir.map((item, index) => (<div className='flex' key={index}> <Folder size={50}/> {item} </div>))} 
       {listFile && listFile.map((item, index) => (<div className='flex' key={index}>  <img key={index*1000} className="rounded-lg" src={'/uploads/'+item} alt={"-------"}  width={150} height={150} /> {item} </div>))} 

      <button type="submit">Select </button>
  </form>
</div>

  )
}







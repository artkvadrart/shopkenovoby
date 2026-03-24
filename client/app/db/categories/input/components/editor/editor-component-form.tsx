 'use client'
import React from "react";
 import "./package/index.css";
 import dynamic from 'next/dynamic';
import type { EditorState, EditorThemeClasses, LexicalEditor, SerializedEditorState, SerializedLexicalNode } from 'lexical';
import { iFromEditorJson } from "@/types";
import { ulid } from 'ulid';


 const PlaygroundApp = dynamic(() => import('./package/App'), {
   ssr: false, // This disables server-side rendering for the component
 });


export default function EditorComponentForm(
    {
      languageCodeProps,     
      fromEditorJsonProps,
      setFromEditorJsonProps,
     //     fromEditorLngJsonProps,
    setFromEditorLngJsonProps,
      updateStateProps }: 
    {
      languageCodeProps: string,    
      fromEditorJsonProps: iFromEditorJson[] | undefined,
      setFromEditorJsonProps(value: iFromEditorJson[] | undefined):  void, 
    //       fromEditorLngJsonProps: iFromEditorJson[],
          setFromEditorLngJsonProps(dataToSave: EditorState, lng: string) : void
      updateStateProps: boolean}  
) {
  return (
    <div>
      <React.StrictMode>
    <PlaygroundApp languageCodeProps={languageCodeProps} 
                   fromEditorJsonProps={fromEditorJsonProps}  setFromEditorJsonProps={setFromEditorJsonProps} 
                 //  fromEditorLngJsonProps={fromEditorLngJsonProps}
                    setFromEditorLngJsonProps={setFromEditorLngJsonProps}
                   updateStateProps={updateStateProps}/>
    </React.StrictMode>
    </div>
  );
}
// setSelectedImageProps(value: iSelectedImages[]): void // React.Dispatch<SetStateAction<string[]>>
 'use client'
import React from "react";
 import "./package/index.css";
 import dynamic from 'next/dynamic';
import type { EditorThemeClasses, LexicalEditor, SerializedEditorState, SerializedLexicalNode } from 'lexical';
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
      updateStateProps }: 
    {
      languageCodeProps: string,    
      fromEditorJsonProps: iFromEditorJson[] | undefined,
      setFromEditorJsonProps(value: iFromEditorJson[] | undefined):  void,    
      updateStateProps: boolean}  
) {
  return (
    <div>
      <React.StrictMode>
    <PlaygroundApp languageCodeProps={languageCodeProps} fromEditorJsonProps={fromEditorJsonProps}  setFromEditorJsonProps={setFromEditorJsonProps} updateStateProps={updateStateProps}/>
    </React.StrictMode>
    </div>
  );
}
// setSelectedImageProps(value: iSelectedImages[]): void // React.Dispatch<SetStateAction<string[]>>
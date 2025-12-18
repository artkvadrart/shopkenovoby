 'use client'
import React from "react";
 import "./package/index.css";
 import dynamic from 'next/dynamic';
import type { EditorThemeClasses, LexicalEditor, SerializedEditorState, SerializedLexicalNode } from 'lexical';


 const PlaygroundApp = dynamic(() => import('./package/App'), {
   ssr: false, // This disables server-side rendering for the component
 });


export default function LexicalComponentForm(
    {setFromEditorProps,
    setFromEditorJsonProps,
    updateStateProps }: 
   {setFromEditorProps(value: string):  void,
    setFromEditorJsonProps(value: SerializedEditorState<SerializedLexicalNode>):  void,
    updateStateProps: boolean}
  // {convertLexicalToHtmlProps}: 
  // {convertLexicalToHtmlProps:(editor: LexicalEditor) => string}
  // editorProps:  LexicalEditor} 
  // convertLexicalToHtmlProps:  (editor: LexicalEditor) => string
) {
  return (
    <div id="root">
      <React.StrictMode>
    <PlaygroundApp setFromEditorProps={setFromEditorProps} setFromEditorJsonProps={setFromEditorJsonProps} updateStateProps={updateStateProps}/>
    </React.StrictMode>
    </div>
  );
}
// setSelectedImageProps(value: iSelectedImages[]): void // React.Dispatch<SetStateAction<string[]>>
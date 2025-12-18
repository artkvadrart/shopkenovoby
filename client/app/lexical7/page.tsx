 'use client'
import React from "react";
 import "./package/index.css";
 import dynamic from 'next/dynamic';


 const PlaygroundApp = dynamic(() => import('./package/App'), {
   ssr: false, // This disables server-side rendering for the component
 });


export default function App() {
  return (
    <div id="root">
      <React.StrictMode>
    <PlaygroundApp />
    </React.StrictMode>
    </div>
  );
}

'use client'
 
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'
 
export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter()
 return (
 // createPortal(  
     <div  >
      {/* <button onClick={() => { router.back() }} >
        Close modal (router.back())
      </button> */}
      <div>{children}</div>
    </div>
 // (document.querySelector('#modal-root') as Element | null)?.appendChild(...);
   )
}

//overscroll-behavior: contain
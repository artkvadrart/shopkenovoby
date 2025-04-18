import type { Metadata } from "next";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/db/app-sidebar"
import Header from "@/components/db/header";
import NavLeftMenu from "@/components/db/nav-left-menu";
// import "./globals.css";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <div>
    <Header />
    <div id='root_main' className='md:flex md:flex-row w-screen '>
        <div id='item_left_main' className='md:flex md:flex-row md:justify-start md:bg-violet-400'>
          <NavLeftMenu active={"true"} />
        </div>
        <div id='item_right_main' className='md:flex md:flex-row md:w-full  md:justify-start ' >
        {children} 
        </div>
      </div>
    </div>
  );
}

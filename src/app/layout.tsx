import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import SideMenu from "@/components/side-menu";
import dotenv from 'dotenv';

dotenv.config();



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Photo App with AI",
  description: "Photo App with AI, using Cloudinary API",
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="border-b">
          <div className="flex h-16 items-center px-4 container mx-auto">
            <Image src="/album.png"  width="50"  height="50" alt="photo app"/>
            Photo App
            <div className="ml-auto flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="https://avatars.githubusercontent.com/u/143041994?s=400&u=2714c3dff820cbafd989c4a31f85603f6823edb8&v=4" alt="@shadcn"/>
                <AvatarFallback>Max</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        <div className="flex">
          <SideMenu />

          <div className="w-full px-4 pt-8">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

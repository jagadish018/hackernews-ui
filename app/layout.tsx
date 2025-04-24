
import "./globals.css";
import { PropsWithChildren } from "react";
import { Inter } from "next/font/google";
import { Providers } from "./providers";


const inter = Inter({ subsets: ["latin"] });
export default function RootLayout(props: PropsWithChildren) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Providers>{props.children}</Providers>
      </body>
    </html>
  );
}

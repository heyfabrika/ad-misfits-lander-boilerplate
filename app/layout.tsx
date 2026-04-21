import { DM_Sans, Geist_Mono, Syne } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "dark scroll-smooth antialiased",
        dmSans.variable,
        syne.variable,
        fontMono.variable
      )}
    >
      <body className="font-sans">{children}</body>
    </html>
  )
}

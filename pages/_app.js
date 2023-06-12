import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { ChakraProvider } from '@chakra-ui/react'
import localFont from 'next/font/local'
const malenpan_normal = localFont({ src: '../public/maledpan.woff2' })
const malenpan_bold = localFont({ src: '../public/maledpan-bold.woff2' })

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
        <main className={malenpan_normal.className}>
      <ChakraProvider>
      <Component {...pageProps} />
      </ChakraProvider>
      </main>
    </SessionProvider>
  )
}
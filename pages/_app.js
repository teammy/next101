import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { ChakraProvider,extendTheme  } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    body: 'fc_iconic_normal, system-ui, sans-serif',
    heading: 'fc_iconic_normal, "Arial", sans-serif',
  },
});

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  )
}
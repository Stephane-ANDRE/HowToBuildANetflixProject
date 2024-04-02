// Import global styles
import "@/styles/globals.css";

// Import necessary types from Next.js
import type { AppProps } from "next/app";

// Import the SessionProvider from next-auth/react for managing user sessions
import { SessionProvider } from 'next-auth/react';

// App component function declaration, taking AppProps as input
export default function App({ 
  Component,  // The main component to render
  pageProps: { // Destructuring pageProps
    session,   // Extracting the session from pageProps
    ...pageProps // Keeping other pageProps intact
  }
}: AppProps) { /* Specifying the type of the props, which is AppProps
   Return statement rendering the SessionProvider component
   and passing the session as a prop*/
  return (
    <SessionProvider session={session}>
      {/* Render the main component (Component) */}
      {/* and pass other pageProps */}
      <Component {...pageProps} />
    </SessionProvider>
  )
}

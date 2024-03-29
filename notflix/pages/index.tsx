//import Navbar component
import Billboard from "@/components/Billboard";
import NavBar from "@/components/Navbar";

// Importing Next.js NextPageContext type
import { NextPageContext } from "next"; 

// Importing getSession and signOut functions from next-auth/react
import { getSession } from "next-auth/react"; 

// This function is used to fetch server-side data before rendering the page
export async function getServerSideProps(context: NextPageContext) {
  // Getting the user's session using getSession function
  const session = await getSession(context);

  // If there is no session (user is not authenticated), redirect to the "/auth" page
  if (!session) {
    return {
      redirect: {
        // Redirect destination
        destination: "/auth", 
        // Indicating it's not a permanent redirect
        permanent: false, 
      },
    };
  }

  // If user is authenticated, return empty props object
  return {
    props: {},
  };
}

// Default Home component representing the home page of the application
export default function Home() {
 

  return (
    <>
      <NavBar />
      <Billboard />
    </>
  );
}

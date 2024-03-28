// Importing useCurrentUser hook for managing current user data
import useCurrentUser from "@/hooks/useCurrentUser";
// Importing Next.js NextPageContext type
import { NextPageContext } from "next"; 
// Importing getSession and signOut functions from next-auth/react
import { getSession, signOut } from "next-auth/react"; 

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
  // Using useCurrentUser hook to fetch current user data
  const { data: user } = useCurrentUser();

  return (
    <>
      {/* Title of the page */}
      <h1 className="text-2xl text-green-500">Notflix</h1>
      
      {/* Displaying current user's name */}
      <p className="text-white">Logged in as: {user?.name}</p>
      
      {/* Button for logging out, onClick event calls signOut function */}
      <button className="h-10 w-full bg-white" onClick={() => signOut()}> Logout!</button>
    </>
  );
}

// Import the NextApiRequest type from the "next" library
import { NextApiRequest } from "next";

// Import the getSession function from the "next-auth/react" library
import { getSession } from "next-auth/react";

// Import the Prisma database instance from the "@/lib/prismadb" file
import prismadb from "@/lib/prismadb";

// Define an asynchronous function named servAuth that takes a NextApiRequest parameter
const servAuth = async (req: NextApiRequest) => {
    // Retrieve the user session from the incoming request
    const session = await getSession({ req });

    // Check if the user is not signed in by verifying if their email is not present in the session
    if (!session?.user?.email) {
        // Throw an error indicating that the user is not signed in
        throw new Error("Not signed in");
    }

    // Retrieve the current user's information from the database using their email
    const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email,
        }
    });

    // Check if the current user does not exist in the database
    if (!currentUser) {
        // Throw an error indicating that the user is not signed in
        throw new Error("Not signed in");
    }

    // If the user is signed in and exists in the database, return an object containing the current user's information
    return { currentUser };
};

// Export the servAuth function as the default export of this module
export default servAuth;

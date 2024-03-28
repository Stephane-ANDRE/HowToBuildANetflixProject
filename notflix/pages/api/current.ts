// Importing required types from Next.js
import { NextApiRequest, NextApiResponse } from "next"; 

// Importing a function for authentication
import servAuth from "@/lib/servAuth"; 

// Defining the default export of the API handler function
export default async function handler(req:NextApiRequest, res: NextApiResponse) { 
    // Checking if the HTTP method is not GET
    if (req.method != "GET") { 
         // Returning a 'Method Not Allowed' response
        return res.status(405).send("Wrong Method");
    }

    try {
        // Authenticating the user and extracting currentUser 
        const {currentUser}= await servAuth(req); 
        return res.status(200).json(currentUser);
        } catch (error) { 
        console.log(error); 
        return res.status(500).end();
    }
}

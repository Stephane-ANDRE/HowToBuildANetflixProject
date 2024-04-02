import { NextApiRequest, NextApiResponse } from "next";
// Importing Prisma database instance
import prismadb from "@/lib/prismadb"; 
// Importing authentication service
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// Checking if the request method is not GET
    if (req.method !== "GET") { 
        return res.status(405).send("Wrong Method"); 
        
    }
    try {
        // Authenticating the request
        await serverAuth(req, res);
        // Counting the total number of movies in the database 
        const movieCount = await prismadb.movie.count(); 
        // Generating a random index within the range of movie count
        const randomIndex = Math.floor(Math.random() * movieCount); 

        // Fetching random movie from the database
        const randomMovies = await prismadb.movie.findMany({ 
            //Limiting the result to one movie
            take: 1,
            // Skipping random number of movies before fetching 
            skip: randomIndex 
        });

        return res.status(200).json(randomMovies[0]); 

    } catch (error) { 
        console.log(error); 
        return res.status(400).end(); 
    }
}

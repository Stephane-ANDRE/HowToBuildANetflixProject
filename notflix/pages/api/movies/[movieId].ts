import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Ensure only GET requests are allowed
    if (req.method !== "GET") {
        return res.status(405).end();
    }

    try {
        // Authenticate the user
        await serverAuth(req, res);
        
        // Extract the movieId from the query parameters
        const { movieId } = req.query;

        // Check if movieId is not a string or is undefined
        if (typeof movieId !== "string" || !movieId) {
            throw new Error("Invalid Id");
        }

        // Find the movie with the provided movieId
        const movie = await prismadb.movie.findUnique({
            where: {
                id: movieId
            }
        });

        // If no movie found with the provided movieId, throw an error
        if (!movie) {
            throw new Error("Invalid Id");
        }

        // Return the movie details in the response
        return res.status(200).json(movie);
    } catch (error) {
        // Log any errors and return a 400 status code in case of failure
        console.log(error);
        return res.status(400).end();
    }
}

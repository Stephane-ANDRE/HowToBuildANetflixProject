import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).end();
    }
    try {
        // Authenticate the user
        const { currentUser } = await serverAuth(req, res);

        // Retrieve the favorite movies of the authenticated user from the database
        const favoriteMovies = await prismadb.movie.findMany({
            where: {
                id: {
                    in: currentUser?.favoriteIds,
                }
            }
        });

        // Return the favorite movies as JSON response
        return res.status(200).json(favoriteMovies);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}

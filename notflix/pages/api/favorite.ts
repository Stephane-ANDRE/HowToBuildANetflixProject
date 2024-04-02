import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Check if the request method is POST
        if (req.method === "POST") {
            // Authenticate the user
            const { currentUser } = await serverAuth(req, res);
            
            // Extract the movieId from the request body
            const { movieId } = req.body;

            // Check if the movie with the given ID exists
            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId,
                }
            });

            // Throw an error if the movie does not exist
            if (!existingMovie) {
                throw new Error("Invalid ID");
            }

            // Update the user's favoriteIds to include the new movieId
            const user = await prismadb.user.update({
                where: {
                    email: currentUser.email || "",
                },
                data: {
                    favoriteIds: {
                        push: movieId,
                    }
                }
            });

            // Return the updated user as JSON response
            return res.status(200).json(user);
        }

        // Check if the request method is DELETE
        if (req.method === "DELETE") {
            // Authenticate the user
            const { currentUser } = await serverAuth(req, res);
            
            // Extract the movieId from the request body
            const { movieId } = req.body;

            // Check if the movie with the given ID exists
            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId,
                }
            });

            // Throw an error if the movie does not exist
            if (!existingMovie) {
                throw new Error("Invalid ID");
            }

            // Remove the movieId from the user's favoriteIds
            const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

            // Update the user's favoriteIds without the removed movieId
            const updatedUser = await prismadb.user.update({
                where: {
                    email: currentUser.email || "",
                },
                data: {
                    favoriteIds: updatedFavoriteIds,
                }
            });

            // Return the updated user as JSON response
            return res.status(200).json(updatedUser);
        }

        // If the request method is neither POST nor DELETE, return a 405 Method Not Allowed status
        return res.status(405).end();
    } catch (error) {
        // Log any errors and return a 400 Bad Request status in case of failure
        console.log(error);
        return res.status(400).end();
    }
}

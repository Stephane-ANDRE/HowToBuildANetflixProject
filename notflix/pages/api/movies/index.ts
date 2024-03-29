import { NextApiRequest, NextApiResponse } from "next";

import prismadb from "@/lib/prismadb";
import servAuth from "@/lib/servAuth";

export default async function handler(req:NextApiRequest, res:NextApiResponse)  {
// Checking if the HTTP method is not GET
if (req.method != "GET") { 
    // Returning a 'Method Not Allowed' response
   return res.status(405).send("Wrong Method");
}
try {
    await servAuth(req);

    const movies = await prismadb.movie.findMany()

    return res.status(200).json(movies);

} catch (error) {
    console.log(error); 
        return res.status(400).end();
}
}
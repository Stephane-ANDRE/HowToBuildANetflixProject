// CONFIGURATION OF AUTHENTICATION WITH NEXTAUTH FOR NEXT.JS APP //

/*IMPORTANT DETAILS:
First:
[...] => explains to Next.js that it's a dynamic route capable of accepting various URL segments
based on the URL structure. This approach is often used to create pages 
requiring flexible management of URL parameters, such as article detail pages, user profile pages, etc.
Second: I followed the tuto and I was blocked at "Favorites and My list Functionnality". 
I didn't understand why the code doesn't work  and i can see working into the video.
I found my answer on discord.. because I am using a newest version of Next and NextAuth, I have to adapt the code
and I followed the explanation.
I saw those modification on Antonio repo's but I didn't understand why he made those.
So next step for me: if I see modifications in the code.. read the doc to understand why was it necessary
*/

// Import Modules
import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Import function "compare" from bcrypt
import { compare } from "bcrypt";

// Import providers from Google and GitHub
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@next-auth/prisma-adapter";

// Import prismadb to connect to the database with Prisma
// with the client instance stocked in the global.prismadb
import prismadb from "@/lib/prismadb";

export const authOptions: AuthOptions = {


// Export the nextAuth instance with different providers configuration inside the object:
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || ""
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
          }),
        Credentials({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                },
                password: {
                    label: "Password",
                    type: "password",
                }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and Password required");
                }

                const user = await prismadb.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });
                if (!user || !user.hashedPassword) {
                    throw new Error("There is no account with this email")
                }

                const isCorrectPassword = await compare(
                    credentials.password, user.hashedPassword
                );

                if (!isCorrectPassword) {
                    throw new Error("Your password is incorrect");
                }
                return user;
            }
        })
    ],
    pages: {
        signIn: "/auth",
    },
    debug: process.env.NODE_ENV === "development",

    // Adapter configuration for NextAuth to use Prisma as the data source
    adapter: PrismaAdapter(prismadb),

    session: {
        strategy: "jwt",
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET
};
export default NextAuth(authOptions);

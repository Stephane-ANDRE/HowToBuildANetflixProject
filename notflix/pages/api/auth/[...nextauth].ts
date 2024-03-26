// CONFIGURATION OF AUTHENTICATION WITH NEXTAUTH FOR NEXT.JS APP //

//Import Modules
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

//Import function "compare" from bcrypt
import {compare} from "bcrypt";

//Import prismadb to connect to the database with Prisma
//with the client instance stocked in the global.prismadb
import prismadb from "@/lib/prismadb";

//Export the nextAuth instance with a configuration  inside the object:
export default NextAuth({
    providers: [
        Credentials({
            id:"credentials",
            name: "Crediantials",
            credentials:{
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
                        email:credentials.email
                    }
                });
                if (!user || !user.hashedPassword) {
                    throw new Error("There is no account with this email")
                }

                const isCorrectPassword = await compare(
                    credentials.password, user.hashedPassword
                    );

                    if (!isCorrectPassword) {
                        throw new Error ("Your password is incorrect");
                    }
                    return user;
            }
        })
    ],
    pages: {
        signIn: "/auth",
    },
    debug: process.env.NODE_ENV === "development",

    session: {
        strategy:"jwt",
    },
    jwt:{
        secret:process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET
})
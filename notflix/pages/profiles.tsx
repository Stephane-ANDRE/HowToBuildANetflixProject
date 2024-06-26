// Importing data from useCurrentUser
import useCurrentUser from "@/hooks/useCurrentUser";

import { NextPageContext } from "next";

// Importing session from next-auth
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

// Retrieving data from the server
export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    // Redirecting to the authentication page if the user is not logged in
    if (!session) {
        return {
            redirect: {
                destination: "/auth",
                permanent: false,
            }
        };
    }

    // It's important to return an empty props object
    return {
        props: {}
    };
}

const Profiles = () => {
    // Using the useCurrentUser hook to fetch user data
    const { data: user } = useCurrentUser();
    const router = useRouter()

    return (
        <div className="flex items-center h-full justify-center">
            <div className="flex flex-col">
                <h1 className="text-3xl md:text-6xl text-white text-center"> Who is watching Notflix?</h1>
                <div className="flex items-center justify-center gap-8 mt-10">
                    {/* Profile component */}
                    <div onClick={() => router.push("/")}>
                        <div className="group flex-row w-44 mx-auto">
                            {/* Profile image */}
                            <div 
                                className="
                                    w-44
                                    h-44
                                    rounded-md
                                    flex
                                    items-center
                                    justify-center
                                    border-2
                                    border-transparent
                                    group-hover:cursor-pointer
                                    group-hover:border-white
                                    overflow-hidden
                                "
                            >
                                <img src="/images/default-red.png" alt="Profile" />
                            </div>
                            {/* Profile name */}
                            <div
                                className="
                                    mt-4
                                    text-gray-400
                                    text-2xl
                                    text-center
                                    group-hover:text-white
                                "
                            >
                                {/* Displaying user's name */}
                                {user ?.name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profiles;

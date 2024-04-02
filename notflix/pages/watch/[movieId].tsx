import React from "react";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";

import useMovie from "@/hooks/useMovie";

const Watch = () => {
    const router = useRouter();
    const { movieId } = router.query;

    // Fetch movie data based on the movieId from the router query
    const { data } = useMovie(movieId as string);

    return (
        <div className="h-screen w-screen bg-black">
            <nav className="
                fixed
                w-full
                p-4
                z-10
                flex
                flex-row
                items-center
                gap-8
                bg-black
                bg-opacity-10
            ">
                {/* Navigate back to the home page */}
                <AiOutlineArrowLeft
                    onClick={() => router.push("/")}
                    className="text-white cursor-pointer"
                    size={40}
                />
                <p className="text-white text-1xl md:text-3xl font-bold">
                    <span className="font-light">Watching:</span> {data?.title}
                </p>
            </nav>
            {/* Display the video player */}
            <video
                autoPlay
                controls
                className="h-full w-full"
                src={data?.videoURL}
            ></video>
        </div>
    );
};

export default Watch;

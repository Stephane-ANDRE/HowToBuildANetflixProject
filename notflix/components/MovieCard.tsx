import React from "react";

//import play icon
import { BsFillPlayFill } from "react-icons/bs";

// Define props expected by the MovieCard component
interface MovieCardProps {
    // Data object containing movie information
    data: Record<string, any>; 
}

// MovieCard functional component
const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
    return (
        <div className="group bg-zinc-900 col-span relative h-[12vw]">

            {/* Movie thumbnail */}
            <img
                className="
                    cursor-pointer
                    object-cover
                    transition
                    duration
                    shadow-xl
                    rounded-md
                    group-hover:opacity-90
                    sm:group-hover:opacity-0
                    delay-300
                    w-full
                    h-[12vw]
                "
                src={data.thumbnailURL}
                alt="movie_thumbnail"
            />

            {/* Details overlay */}
            <div 
                className="
                    opacity-0
                    absolute
                    top-0
                    transition
                    duration-200
                    z-10
                    invisible
                    sm:visible
                    delay-300
                    w-full
                    scale-0
                    group-hover:scale-110
                    group-hover:-translate-y-[6vw]
                    group-hover:translate-x-[2vw]
                    group-hover:opacity-100
                "
            >

                {/* Movie thumbnail (on hover) */}
                <img
                    className="
                        cursor-pointer
                        object-cover
                        transition
                        duration-200
                        delay-300
                        shadow-xl
                        rounded-t-md
                        w-full
                        h-[12vw]
                    "
                    src={data.thumbnailURL}
                    alt="movie_thumbnail"
                />

                {/* Movie details */}
                <div 
                    className="
                        z-10
                        bg-zinc-800
                        p-2
                        lg:p-4
                        absolute
                        w-full
                        transition
                        shadow-md
                        rounded-b-md
                    "
                >

                    {/* Play button */}
                    <div className="flex flex-row items-center gap-3">
                        <div
                            className="
                                cursor-pointer
                                w-6
                                h-6
                                lg:w-10
                                lg:h-10
                                bg-white
                                rounded-full
                                flex
                                justify-center
                                items-center
                                transition
                                hover:bg-neutral-400
                            "
                            onClick={() => {}}
                        >
                            <BsFillPlayFill size={30} />
                        </div>
                    </div>

                    {/* Movie year */}
                    <p className="text-green-400 font-semibold mt-4">
                        New <span className="text-white">2024</span>
                    </p>

                    {/* Movie duration */}
                    <div className="flex flex-row mt-4 gap-2 items-center">
                        <p className="text-white text-[10px] lg:text-sm">{data.duration}</p>
                    </div>
                    
                    {/* Movie genre */}
                    <div className="flex flex-row mt-4 gap-2 items-center">
                        <p className="text-white text-[10px] lg:text-sm">{data.genre}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;

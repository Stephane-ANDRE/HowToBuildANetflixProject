import React from "react";

// lodash is a JS library helping by offering
// functions to manipulate arrays, objects, strings, functions, etc.
import { isEmpty } from "lodash";

//importing MovieCard component
import MovieCard from "./MovieCard";

// Define the props expected by the MovieList component
interface MovieListProps {
    // An array of movie data
    data: Record<string, any>[]; 
    title: string; 
}

// MovieList functional component
const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
    // Check if the data array is empty
    if (isEmpty(data)) {
        return null; 
    }
    
    // If data is not empty, render the movie list
    return (
        <div className="px-4 md:px-12 mt-4 space-y-8">
            <div>
                {/* Render the title of the movie list */}
                <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
                    {title}
                </p>
                {/* Render a grid layout for movie cards */}
                <div className="grid grid-cols-4 gap-2">
                    {/* Iterate over each movie and render a MovieCard component */}
                    {data.map((movie) => (
                        <MovieCard key={movie.id} data={movie} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieList;

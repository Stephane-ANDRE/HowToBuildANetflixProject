import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { useRouter } from "next/router";

interface PlayButtonProps {
    movieId: string;
}
// PlayButton component
const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
    // useRouter hook to access Next.js router
    const router = useRouter();
  
    // Render the PlayButton component
    return (
      <button
        onClick={() => router.push(`/watch/${movieId}`)}
        className="
          bg-white
          rounded-md
          py-1 md:py-2
          px-2 md:px-4 
          w-auto
          text-xs lg:text-lg
          font-semibold
          flex
          flex-row
          items-center
          hover:bg-neutral-300transition
          "
      >
        <BsFillPlayFill size={25} className="mr-1" />
        Play
      </button>
    );
  };
  
  // Export the PlayButton component
  export default PlayButton;
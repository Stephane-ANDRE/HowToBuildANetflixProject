import axios from "axios";
import React, {useCallback, useMemo} from "react";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";

// Define the props interface for the FavoriteButton component
interface FavoriteButtonProps {
  movieId: string;
}

// FavoriteButton component
const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  // Custom hook to mutate favorites
  const { mutate: mutateFavorites } = useFavorites();
  // Custom hook to fetch current user data
  const { data: currentUser, mutate } = useCurrentUser();

  // Check if the current movie is a favorite
  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  // Toggle favorite status
  const toggleFavorites = useCallback(async () => {
    let response;

    // Check if the movie is already a favorite
    if (isFavorite) {
      response = await axios.delete('/api/favorite', { data: { movieId } });
    } else {
      response = await axios.post('/api/favorite', { movieId });
    }

    // Update favoriteIds based on the response data
    const updatedFavoriteIds = response?.data?.favoriteIds;

    // Update the current user's favoriteIds
    mutate({ 
      ...currentUser, 
      favoriteIds: updatedFavoriteIds,
    });

    // Update the favorites list
    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  // Determine the icon to display based on the favorite status
  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  // Render the FavoriteButton component
  return(
    <div
      onClick={toggleFavorites}
      className="
        cursor-pointer
        group/item
        w-6
        h-6
        lg:w-10
        lg:h-10
        border-white
        border-2
        rounded-full
        flex
        justify-center
        items-center
        transition
        hover:border-netural-300
      "
    >
      <Icon className="text-white" size={25} />
    </div>
  );
};

// Export the FavoriteButton component
export default FavoriteButton;
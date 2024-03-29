import useSwr from "swr";
// Importing the fetcher function from the fetcher module
import fetcher from "@/lib/fetcher";

// Custom hook for fetching current user data
const useCurrentUser = () => {
  // Using the useSWR hook to fetch current user data from the /api/current endpoint
  const { data, error, isLoading, mutate } = useSwr("./api/current", fetcher);
  
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;

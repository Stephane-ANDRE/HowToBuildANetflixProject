// Import the necessary dependencies
import useSwr from "swr";
import fetcher from "@/lib/fetcher";

// Define the custom hook useCurrentUser
const useCurrentUser = () => {
  // Use the useSwr hook to fetch user data
  const { data, error, isLoading, mutate } = useSwr("/api/current", fetcher);
  
  // Return the user data, error, loading state, and mutate function
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

// Export the useCurrentUser hook
export default useCurrentUser;

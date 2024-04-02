// Import the necessary dependency
import { create } from "zustand";

// Define the interface for the modal store
export interface ModalStoreInterface {
    movieId?: string;
    isOpen: boolean;
    openModal: (movieId: string) => void;
    closeModal: () => void;
};

// Create the custom hook useInfoModal using Zustand
const useInfoModal = create<ModalStoreInterface>((set) => ({
    movieId: undefined, // Initialize movieId as undefined
    isOpen: false, // Initialize isOpen as false
    openModal: (movieId: string) => set({ isOpen: true, movieId }),
    closeModal: () => set({ isOpen: false, movieId: undefined }),
}));

// Export the useInfoModal hook
export default useInfoModal;

import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FavoritesState {
  favorites: string[];
  toggleFavorite: (code: string) => void;
  loadFavorites: () => Promise<void>;
}

const FAVORITES_STORAGE_KEY = "@favorites";

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],

  toggleFavorite: async (code: string) => {
    const currentFavorites = get().favorites;
    const isFavorite = currentFavorites.includes(code);

    const newFavorites = isFavorite
      ? currentFavorites.filter((fav) => fav !== code)
      : [...currentFavorites, code];

    set({ favorites: newFavorites });
    await AsyncStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(newFavorites)
    );
  },

  loadFavorites: async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      if (storedFavorites) {
        set({ favorites: JSON.parse(storedFavorites) });
      }
    } catch (error) {
      console.error("Erro ao carregar favoritos:", error);
    }
  },
}));

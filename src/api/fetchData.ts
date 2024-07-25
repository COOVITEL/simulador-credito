import { getPopularMovies } from "./callDatas";

export const fetchMovies = async (url: string) => {
    try {
      const results = await getPopularMovies(url);
      return results
    } catch (err) {
      console.error('Error fetching movies:', err);
    } finally {
    }
  };
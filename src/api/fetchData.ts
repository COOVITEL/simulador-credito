import { getDatas } from "./callDatas";

export const fetchDatasSimualdor = async (url: string) => {
    try {
      const results = await getDatas(url);
      return results
    } catch (err) {
      console.error('Error fetching movies:', err);
    }
};
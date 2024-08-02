import { Tasas } from "../store/types";

export function FindTasa(list: Tasas[], type: string, score: number) {
    const filList = list.filter(data => data.perfil == parseInt(type))
                        .find(current => score <= current.maxScore && score > current.minScore)?.piso
    return filList
}
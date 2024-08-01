import { Tasas } from "../store/types";

export function FindFondo(list: Tasas[], type: string, score: number) {
    const filList = list.filter(data => data.perfil == parseInt(type))
                        .find(current => score <= current.maxScore && score > current.minScore)?.fg
    return filList
}
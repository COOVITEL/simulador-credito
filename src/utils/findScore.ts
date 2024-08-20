import { Tasas } from "../store/types";

export function FindScore(list: Tasas[], type: string, score: number) {
    // Esta funcion busca el plazo minimo para los perfiles de la solicitud
    // Dependiendo del score y tipo de afiliacion
    const filList = list.filter(data => data.perfil == parseInt(type))
                        .find(current => score <= current.maxScore && score > current.minScore)?.plazo
    return filList
}
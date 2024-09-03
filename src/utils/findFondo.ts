import { Tasas } from "../store/types";

export function FindFondo(list: Tasas[], type: string, score: number) {
    // Esta funcion busca el porcentaje del fondo de garantias para los perfiles de la solicitud
    // Dependiendo del score y tipo de afiliacion
    const filList = list.filter(data => data.perfil == parseInt(type))
                        .find(current => score <= current.maxScore && score > current.minScore)?.fg
    return filList
}
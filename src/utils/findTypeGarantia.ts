import { Tasas } from "../store/types";

export function FindTypeGarantia(list: Tasas[], type: string, score: number) {
    // Esta funcion busca el porcentaje del fondo de garantias para los perfiles de la solicitud
    // Dependiendo del score y tipo de afiliacion
    const typeGarantia = list.filter(data => data.perfil == parseInt(type))
                        .find(current => score <= current.maxScore && score > current.minScore)?.garantia
    return typeGarantia
}
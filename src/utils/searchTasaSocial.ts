import { Sociales } from "../store/types";

export function searchTasaSocial(list: Sociales, cuota: number) {
    // Esta funcion busca el valor de la tasa para las lineas no sociales
    let tasa = 0
    // Dependiendo del numero de cuotas del credito a solicitar
    if (cuota > 1 && cuota < 13) {
        tasa = list.tasa6
    } else if (cuota >= 13 && cuota <= 24) {
        tasa = list.tasa12
    } else if (cuota >= 25 && cuota <= 36) {
        tasa = list.tasa24
    } else if (cuota >= 37 && cuota <= 48) {
        tasa = list.tasa36
    } else if (cuota >= 49 && cuota <= 60) {
        tasa = list.tasa48
    } else if (cuota >= 61 && cuota <=   72) {
        tasa = list.tasa60
    } else if (cuota >= 73 && cuota <= 84) {
        tasa = list.tasa72
    } else {
        tasa = 0
    }
    return tasa
}
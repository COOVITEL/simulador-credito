import { Fidelizacion } from "../store/types";

export function searchTasaFide(list: Fidelizacion, cuota: number) {
    // Esta funcion busca la tasa de la linea de fidelizacion, dependiendo del numero de cuotas del credito
    let tasa = 0
    if (cuota > 0 && cuota < 9) {
        tasa = list.tasa6
    } else if (cuota >= 9 && cuota < 19) {
        tasa = list.tasa12
    } else if (cuota >= 19 && cuota < 30) {
        tasa = list.tasa24
    } else if (cuota >= 30 && cuota < 42) {
        tasa = list.tasa36
    } else if (cuota >= 42 && cuota < 54) {
        tasa = list.tasa48
    } else if (cuota >= 54 && cuota < 66) {
        tasa = list.tasa60
    } else if (cuota >= 66) {
        tasa = list.tasa72
    } else {
        tasa = 0
    }
    return tasa
}
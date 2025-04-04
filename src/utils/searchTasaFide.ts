import { Fidelizacion } from "../store/types";

export function searchTasaFide(list: Fidelizacion, cuota: number) {
    // Esta funcion busca la tasa de la linea de fidelizacion, dependiendo del numero de cuotas del credito
    let tasa = 0
    if (cuota > 0 && cuota <= 6) {
        tasa = list.tasa6
    } else if (cuota > 6 && cuota <= 12) {
        tasa = list.tasa12
    } else if (cuota > 12 && cuota <= 24) {
        tasa = list.tasa24
    } else if (cuota > 24 && cuota <= 36) {
        tasa = list.tasa36
    } else if (cuota > 36 && cuota <= 48) {
        tasa = list.tasa48
    } else if (cuota > 48 && cuota <= 60) {
        tasa = list.tasa60
    } else if (cuota > 60 && cuota <= 72) {
        tasa = list.tasa72
    } else {
        tasa = 0
    }
    return tasa
}
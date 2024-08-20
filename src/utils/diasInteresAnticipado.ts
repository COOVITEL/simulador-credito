export function diasInteres(monto: number, tasa: number): number {
    // Esta funcion calcula los intereses anticipados en base a los dias del proximo pago de la cuota
    const today = new Date();
    // Se calculan los dias del dia actual
    const numberDay = today.getDate()
    // Se calcula el interes
    const interes = monto * (tasa / 100)
    let different = 0
    // Se calculan los dias de interes hasta la fecha del proximo corte el cual es el 5 del siguiente mes o del mismo en caso de que sea entre el 1 y 5 del mes
    different = 30 - numberDay + 5
    const interesTotal = interes * (different / 30)
    const setValue = interesTotal.toFixed(0)
    // Se retorna el interes de el numero de dias faltante
    return parseInt(setValue)
}
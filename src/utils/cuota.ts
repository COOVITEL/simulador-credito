export function PagoMensual(monto: number, tasa: number, plazo: number) {
    // Esta funcion calcula el valor de la cuota mensual en base al monto, tasa y plazo del credito
    const currentTasa = parseFloat(tasa.toFixed(3))
    // const tasaMes = (currentTasa / 100) + 0.00088 
    const tasaMes = (currentTasa / 100) + 0.0123 
    let cuota = (monto * tasaMes * Math.pow(1 + tasaMes, plazo)) / (Math.pow(1 + tasaMes, plazo) - 1);
    const currentCuota = cuota.toFixed(0)
    return parseInt(currentCuota);
}

export function PagoMensual(monto: number, tasa: number, plazo: number) {
    const currentTasa = parseFloat(tasa.toFixed(3))
    const tasaMes = (currentTasa / 100) + 0.00088
    let cuota = (monto * tasaMes * Math.pow(1 + tasaMes, plazo)) / (Math.pow(1 + tasaMes, plazo) - 1);
    const currentCuota = cuota.toFixed(0)
    return parseInt(currentCuota);
}




    // const porcentajeTasa = tasa / 100
    // const totalTasa = (porcentajeTasa + (88 / 100000))
    // const tasaElevada = (totalTasa + 1) ** plazo
    // const num = monto * totalTasa * tasaElevada
    // const den = tasaElevada - 1
    // const valor = Math.floor(num / den)
    // const res = parseInt(((332 / 100000000) * monto).toFixed(0))
    // const valorTotal = valor} 
    // return valorTotal
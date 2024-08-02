export function PagoMensual(monto: number, tasa: number, plazo: number) {
    const porcentajeTasa = tasa / 100
    const totalTasa = (porcentajeTasa + (88 / 100000))
    const tasaElevada = (totalTasa + 1) ** plazo
    const num = monto * totalTasa * tasaElevada
    const den = tasaElevada - 1
    const valor = Math.floor(num / den)
    // const res = parseInt(((332 / 100000000) * monto).toFixed(0))
    const valorTotal = valor

    return valorTotal
}
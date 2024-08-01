export function PagoMensual(monto: number, tasa: number, cuota: number) {
    const porcentajeTasa = tasa / 100
    const tasaElevada = (porcentajeTasa + 1) ** cuota
    const num = monto * porcentajeTasa * tasaElevada
    const den = tasaElevada - 1
    const seguro = monto * 0.00088
    const value = seguro + Math.floor(num / den)
    return value
}
export function diasInteres(monto: number, tasa: number): number {
    const today = new Date();
    const numberDay = today.getDate()
    const interes = monto * (tasa / 100)
    let different = 0
    different = 30 - numberDay + 5
    const interesTotal = interes * (different / 30)
    const setValue = interesTotal.toFixed(0)
    return parseInt(setValue)
}
export function MontoMax(capacidad: number, tasa: number, cuotas: number) {
    const porcentajeTasa = tasa / 100;
    const seguro = 88 / 100000
    const total = porcentajeTasa - seguro
    const tasaElevada = capacidad * (1 - (1 + total) ** -cuotas);
    const newValue = Math.floor(tasaElevada / porcentajeTasa).toString()
    const size = newValue.length
    const start = newValue.slice(0, size - 5)
    // const end = newValue.slice(size - 6, size)
    const newNum = `${start}00000`
    return parseInt(newNum)
}
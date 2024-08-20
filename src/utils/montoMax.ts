export function MontoMax(capacidad: number, tasa: number, cuotas: number) {
    // Esta funcion calcula el monto maximo a solicitar
    const porcentajeTasa = tasa / 100;
    const seguro = 88 / 100000
    // Tasa + el seguro que es el  0.0000088
    const total = porcentajeTasa - seguro
    const tasaElevada = capacidad * (1 - (1 + total) ** -cuotas);
    const newValue = Math.floor(tasaElevada / porcentajeTasa).toString()
    const size = newValue.length
    const start = newValue.slice(0, size - 5)
    const newNum = `${start}00000`
    // El valor se redondea a miles de pesos
    return parseInt(newNum)
}
export function CapacidadPago(salary: number, others: number, debit: number, salud: number, type: string, descuento: number) {
    let value = 0
    if (type === "Libranza") {
        value = ((salary - salud) * 0.5) - debit - descuento - 10000
    } else {
        value = (((salary - salud)) * 0.7) - debit + others - descuento - 10000
    }
    return value
}
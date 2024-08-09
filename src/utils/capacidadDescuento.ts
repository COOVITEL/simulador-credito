export function CapacidadDescuento(salary: number, others: number, debit: number, salud: number, type: string, descuento: number) {
    let value = 0
    const name = type.split("-")[1]
    if (name === "Pensionado Libranza" || name === "Empleado Convenio") {
        value = ((salary - salud) * 0.5) - debit - descuento - 10000
    } else {
        const value = (((debit + salud + descuento) / (salary + others)) * 100).toFixed(0)
        const setValue = parseInt(value)
        if (setValue > 70) {
            return 0
        } else {
            const newValue = salary + others
            const useValue = setValue * newValue / 100

            const use = parseInt(useValue.toFixed(0))
            const save =parseInt((newValue * 0.3).toFixed(0))
            const total = newValue - use - save
            return total - 10000
        }
    }
    return value
}

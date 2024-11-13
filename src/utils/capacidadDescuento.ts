export function CapacidadDescuento(salary: number, others: number, debit: number, salud: number, type: string, descuento: number) {
    // Esta funcion calcula la capacidad de descuento en base a los ingresos, descuento y tipo de afiliacion
    let value = 0
    const name = type.split("-")[1]
    if (name === "Pensionado Libranza" || name === "Empleado Convenio Publico" || name === "Empleado Convenio Privado") {
        // Si cumple esta condicion la capacidad de descuento es el 50% del salario menos salud y pension
        // A ese subtotal se le descuentan debitos y descuentos, junto con 10.000 peses que se le dejan a los asociados
        value = ((salary - salud) * 0.5) - debit - descuento - 10000
    } else {
        // En caso de que se otro tipo de afiliacion
        const value = (((debit + salud + descuento) / (salary + others)) * 100).toFixed(0)
        // Se determina la capacidad de pago
        const setValue = parseInt(value)
        if (setValue > 70) {
            // Si es mayor al 70 porciento, determina que no posee capacidad de pago
            return 0
        } else {
            // Si es menor, la capacidad de pago es el 30% de los ingresos sin tener en cuenta los debitos o descuentos
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

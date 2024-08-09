export function CapacidadPago(centrales: number, descuento: number, salario: number, otros: number) {
    const debit = parseInt((centrales + descuento).toFixed(0))
    const ingresos = parseInt((salario + otros).toFixed(0))
    const total = debit / ingresos
    return ((1 - total) * 100).toFixed(2)

}
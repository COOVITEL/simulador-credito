export function CapacidadPago(centrales: number, descuento: number, salario: number, otros: number, salud: number, ahorro: number) {
    const debit = parseInt((centrales + descuento + salud + ahorro).toFixed(0))
    const ingresos = parseInt((salario + otros).toFixed(0))
    const total = debit / ingresos
    return ((total) * 100).toFixed(2)

}
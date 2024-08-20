export function CapacidadPago(centrales: number, descuento: number, salario: number, otros: number, salud: number, ahorro: number) {
    // Esta funcion determina la capacidad de pago del asociado

    // Esta determina el total de ingresos y debitos
    const debit = parseInt((centrales + descuento + salud + ahorro).toFixed(0))
    const ingresos = parseInt((salario + otros).toFixed(0))
    const total = debit / ingresos
    // Retorna el porcentaje de los debitos sobre los ingresos
    return ((total) * 100).toFixed(2)

}
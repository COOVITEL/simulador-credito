export function ahorroMensual(salary: number, date: string) {
    // Esta funcion calcula el ahorro mensual de los asociados, dependiendo del año de afiliacion.
    const year = date.split("-")[0]
    const minSalary = 1000000
    // Control dependiendo del año de ingreso del asociado 
    if (parseInt(year) > 2021) {
        // Si es mayor al 2021 es el 0.02 del salario
        return salary * 0.02
    } else {
        // Si es menor dependiendo del rango de salario es un porsentaje del salario minimo en base a 1.000.000
        if (salary >= minSalary && salary <= (minSalary * 2)) {
            return salary * 0.05
        } else if (salary > (minSalary * 2) && salary <= (minSalary * 5)) {
            return minSalary * 0.1
        } else if (salary > (minSalary * 5) && salary <= (minSalary * 7)) {
            return minSalary * 0.12
        } else if (salary > (minSalary * 7) && salary <= (minSalary * 9)) {
            return minSalary * 0.15
        } else if (salary > (minSalary * 9)) {
            return minSalary * 0.18
        }
    }
}
export function ahorroMensual(salary: number, date: string) {
    const year = date.split("-")[0]
    const minSalary = 1000000
    if (parseInt(year) > 2021) {
        return salary * 0.02
    } else {
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
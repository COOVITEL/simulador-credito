export default function Saludypension(salary: number, type: string, typeContrato: string) {
    // Esta funcion calcula el valor de salud y pension para los asocuados
    const smmlv = parseInt(import.meta.env.VITE_SMMLV)
    let porcentaje = 0
    const typeAfi = type.split("-")[1]
    // El porcentaje de salud y pension depende el tipo de perfil del asociado
    if (typeAfi === "Pensionado Libranza") {
        if (salary <= smmlv) {
            porcentaje = 4
        } else if (salary > smmlv && salary <= (3 * smmlv)) {
            porcentaje = 10
        } else {
            porcentaje = 12
        }
        if (typeContrato === "Fopep") {
            porcentaje = 12
        }
    } else if (typeAfi === "Independiente con Garantía Real" || typeAfi === "Independiente sin Garantía Real") {
        porcentaje = 24
    } else {
        porcentaje = 8
    }
    const value = (salary * porcentaje) / 100
    return value
}
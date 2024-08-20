export default function Saludypension(salary: number, type: string) {
    // Esta funcion calcula el valor de salud y pension para los asocuados
    let porcentaje = 0
    const typeAfi = type.split("-")[1]
    // El porcentaje de salud y pension depende el tipo de perfil del asociado
    if (typeAfi === "Pensionado Libranza") {
        porcentaje = 10
    } else if (typeAfi === "Independiente") {
        porcentaje = 24
    } else {
        porcentaje = 8
    }
    const value = (salary * porcentaje) / 100
    return value
}
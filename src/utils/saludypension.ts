export default function Saludypension(salary: number, type: string) {
    let porcentaje = 0
    const typeAfi = type.split("-")[1]
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
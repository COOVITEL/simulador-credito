export function maxValueFide(value: string, porcentaje: string) {
    const cadenaSinPuntos = value.replace(/\./g, '');
    const numeroFinal = parseInt(cadenaSinPuntos, 10);
    const numPorcentaje = parseInt(porcentaje)
    const setPor = numPorcentaje / 100
    const maxValue = setPor * numeroFinal
    return maxValue
}
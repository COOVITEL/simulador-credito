export function maxValueFide(value: string, porcentaje: string) {
    // Esta funcion calcula el valor maximo a solicitar dependiendo a el valor de aportes y el porcentaje a prestar
    const cadenaSinPuntos = value.replace(/\./g, '');
    const numeroFinal = parseInt(cadenaSinPuntos, 10);
    const numPorcentaje = parseInt(porcentaje)
    const setPor = numPorcentaje / 100
    const maxValue = setPor * numeroFinal
    return maxValue
}
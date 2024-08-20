export function tasaAnual(tasa: number): number {
    // Esta funcion calcula la tasa anual en base a la tasa nominal
    const anual = ((1 + tasa / 100) ** 12) - 1;
    return anual * 100;
}

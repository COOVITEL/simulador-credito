export function tasaAnual(tasa: number): number {
    const anual = ((1 + tasa / 100) ** 12) - 1;
    return anual * 100;
}

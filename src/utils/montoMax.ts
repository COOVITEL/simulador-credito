export function MontoMax(capacidad: number, tasa: number, cuotas: number) {
    const porcentajeTasa = tasa / 100;

    const tasaElevada = capacidad * (1 - (1 + porcentajeTasa) ** -cuotas);
    
    return (Math.floor(tasaElevada / porcentajeTasa));
}
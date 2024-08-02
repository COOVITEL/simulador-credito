export function antiguedad(time: string): { message: string; number: number } {
    const current = new Date();
    const start = new Date(time);
  
    // Calcular la diferencia en milisegundos
    const different = current.getTime() - start.getTime();
    // Convertir la diferencia a días
    const daysDifference = Math.floor(different / (1000 * 60 * 60 * 24));
  
    // Calcular la diferencia en meses
    const startYear = start.getFullYear();
    const endYear = current.getFullYear();
    const startMonth = start.getMonth();
    const endMonth = current.getMonth();
  
    const month = (endYear - startYear) * 12 + (endMonth - startMonth);
  
    return { message: `Antigüedad ${month} Meses / ${daysDifference} Días`, number: month };
  }
  
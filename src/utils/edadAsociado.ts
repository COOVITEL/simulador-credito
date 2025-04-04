export function calculateYears(fecha: string) {
    const fechaNacimiento = new Date(fecha);
    const hoy = new Date();
  
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    const dia = hoy.getDate() - fechaNacimiento.getDate();
  
    // Restar un año si el cumpleaños aún no ha ocurrido este año
    if (mes < 0 || (mes === 0 && dia < 0)) {
        return edad - 1 >= 70;
    }
  
    return edad >= 70;
  }
  
  
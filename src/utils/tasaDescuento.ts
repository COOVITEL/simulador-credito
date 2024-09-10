import { Descuento, Descuentos, DescuentosPlazo } from "../store/types"

export function calTasaDescuento(descuentos: Descuentos, cdat: number, cooviahorro: number, aportes: number, score: number, cuotas: number, descuentoMax: any, porcentaje: number, type: string) {
    // Esta funcion calcula el descuento de la tasa para las lineas nosociales
    // Este calculo se da con base al score, numero de cuotas, perfil, ahorros, cdat y cooviahorros
    let tasaPlazo = 0
    const typePerson = type.split("-")[0]
    const desPlazos: DescuentosPlazo[] = descuentos.plazo
    const listPlazos = desPlazos
    .filter((data: DescuentosPlazo) => data.asociado == parseInt(typePerson))
    .find((d: DescuentosPlazo) =>  cuotas >= d.plazoMin && cuotas <= d.plazoMax)
    if (listPlazos) {
        tasaPlazo = listPlazos.ajuste
    }
    // Busca el porcentaje de descuento para cada uno de los casos
    const desScore = descuentoMax.filter((des: Descuento) => des.name == "Score")[0]?.value
    const desAporte = descuentoMax.filter((des: Descuento) => des.name == "Aportes")[0]?.value
    const desCdat = descuentoMax.filter((des: Descuento) => des.name == "Cdat")[0]?.value
    const desCoovi = descuentoMax.filter((des: Descuento) => des.name == "Cooviahorro")[0]?.value
    const desPlazo = descuentoMax.filter((des: Descuento) => des.name == "Plazo")[0]?.value
    
    // Calcula el porcentaje de descuento, en base al descuento por tipo y al porcentaje maximo de la linea
    const tasaScore = (desScore / 100) * porcentaje * (score / 100)
    const tasaAporte = (desAporte / 100) * porcentaje * (aportes / 100)
    const tasaCdat = (desCdat / 100) * porcentaje * (cdat / 100)
    const tasaCoovi = (desCoovi / 100) * porcentaje * (cooviahorro / 100)
    const tasaPla = (desPlazo / 100) * porcentaje * (tasaPlazo / 100)
    const totalDescuento = (tasaScore + tasaAporte + tasaCdat + tasaCoovi + tasaPla)
    // Retorna la suma de los descuentos para cada uno de los tipos de descuento
    return totalDescuento
}
import { Descuento, Descuentos, DescuentosPlazo } from "../store/types"

export function calTasaDescuento(descuentos: Descuentos, cdat: number, cooviahorro: number, aportes: number, score: number, cuotas: number, descuentoMax: any, porcentaje: number, type: string) {
    let tasaPlazo = 0
    const typePerson = type.split("-")[0]
    const listPlazos = descuentos.plazo.filter((data: DescuentosPlazo) => data.asociado == parseInt(typePerson))
                        .find((d: DescuentosPlazo) =>  cuotas >= d.plazoMin && cuotas <= d.plazoMax)
    if (listPlazos) {
        tasaPlazo = listPlazos.ajuste
    }
    const desScore = descuentoMax.filter((des: Descuento) => des.name == "Score")[0]?.value

    const desAporte = descuentoMax.filter((des: Descuento) => des.name == "Aportes")[0]?.value
    const desCdat = descuentoMax.filter((des: Descuento) => des.name == "Cdat")[0]?.value
    const desCoovi = descuentoMax.filter((des: Descuento) => des.name == "Cooviahorro")[0]?.value
    const desPlazo = descuentoMax.filter((des: Descuento) => des.name == "Plazo")[0]?.value
    
    const tasaScore = (desScore / 100) * porcentaje * (score / 100) / 100
    const tasaAporte = (desAporte / 100) * porcentaje * (aportes / 100) / 100
    const tasaCdat = (desCdat / 100) * porcentaje * (cdat / 100) / 100
    const tasaCoovi = (desCoovi / 100) * porcentaje * (cooviahorro / 100) / 100
    const tasaPla = (desPlazo / 100) * porcentaje * (tasaPlazo / 100) / 100
    const totalDescuento = (tasaScore + tasaAporte + tasaCdat + tasaCoovi + tasaPla)
    return totalDescuento
}
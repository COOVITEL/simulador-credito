import React, { useEffect, useState } from "react"
import useSimulatorStore from "../store/store"
import { FindFondo } from "../utils/findFondo"
import { setValue } from "../utils/setValue"
import { CapacidadDescuento } from "../utils/capacidadDescuento"
import { MontoMax } from "../utils/montoMax"
import { PagoMensual } from "../utils/cuota"
import { NoSociales } from "../store/types"
import { calTasaDescuento } from "../utils/tasaDescuento"
import { FindTasa } from "../utils/findTasa"
import { FindScore } from "../utils/findScore"
import { CapacidadPago } from "../utils/capacidadPago"

interface ControlsProps {
    montoControl: boolean
}

export default function Nosociales({ montoControl }: ControlsProps) {
    const {
        nosociales,
        score,
        tasas,
        inputAfiliacion,
        updateFondo,
        updateTasa,
        updatePorcentajeDescuento,
        tasa,
        capacidadPago,
        cuota,
        updateCuota,
        salary,
        others,
        debit,
        saludypension,
        ahorroMensual,
        monto,
        updateMonto,
        updateCapacidadPago,
        updateMontoMax,
        montoMax,
        updatePagoMensual,
        cuotaMaxima,
        garantia,
        valorCentrales,
        updateCuotaMaxima,
        descuentos,
        cdat,cooviahorro, aportes, maximoDescuento, porcentajeDescuento, desScore, updateBeneficioTasa, updateTasaDescuento, tasaDescuento
    } = useSimulatorStore()

    const [selectOption, setSelectOption] = useState("")
    const [maxCuotas, setMaxCuotas] = useState(0)
    const [controlMax, setControlMax] = useState(false)
    const [tasaTecho, setTasaTecho] = useState(0)
    const [controlCapacidad, setControlCapacidad] = useState(false)


    useEffect(() => {
        setSelectOption("")
        updateCuota(0)
    }, [nosociales, salary, others, debit, valorCentrales, score])

    // Este useEffect actualiza los datos del tipo de crediuto seleccionado
    useEffect(() => {
        // Filtra y actualiza el valor del fondo y el score en caso de que existan
        const currentFondo = FindFondo(tasas, inputAfiliacion, score)
        const currentScore = FindScore(tasas, inputAfiliacion, score)
        if (currentScore) {
            if (currentScore < cuotaMaxima) {
                updateCuotaMaxima(currentScore)
            }
        }
        if (currentFondo) updateFondo(currentFondo)
        // Si se encuentra los datos se busca la tasa del tipo de credito dependiendo del tipo de afiliacion , score con las lista de tasas
        const currentTasa = FindTasa(tasas, inputAfiliacion, score)
        const tipoCredito = selectOption.split("-")[0]
        const current = nosociales.filter(type => type.name == tipoCredito)[0]
        if (current && currentTasa) {
            // Calcula la tasa de descuento para la linea (tasa techo - tasa piso del asociado)
            let porcentajeTasaDescuento = 0
            if (tasaTecho > currentTasa) {
                porcentajeTasaDescuento = Number((tasaTecho - currentTasa).toFixed(2))
            }
            updatePorcentajeDescuento(porcentajeTasaDescuento)
            setMaxCuotas(current.plazo)
        }
        // Se determina la capacidad de Descuento y pago con la tasa que se determino
        const capacidad = CapacidadDescuento(salary, others, debit, saludypension, inputAfiliacion, ahorroMensual).toFixed(0)
        updateCapacidadPago(parseInt(capacidad))
        if (inputAfiliacion.split("-")[1] === "Independiente" && garantia === "Garantia Real") {
            updateCuotaMaxima(84)
        }
    }, [selectOption])

    // En este useEffect cada que cambia el numero de cuotas se actualiza el Monto maximo a solicitar
    useEffect(() => {
        const valueCoovi = parseInt(cooviahorro.split("-")[0])
        const valueCdat = parseInt(cdat.split("-")[0])
        const valueAportes = parseInt(aportes.split("-")[0])
        const descuento = calTasaDescuento(descuentos, valueCdat, valueCoovi, valueAportes, desScore, cuota, maximoDescuento, porcentajeDescuento, inputAfiliacion)
        const totalTasa = tasaTecho - descuento
        updateMontoMax(MontoMax(capacidadPago, totalTasa, cuota))
        updateMonto(0)
        updateBeneficioTasa(descuento)
        // Se actualiza una nueva tasa con descuento si existe
        updateTasaDescuento(tasa - descuento)
    }, [cuota])

    // Este useEffect controla y cambia cada vez que cambia el valor del monto
    useEffect(() => {
        // Si monto no existe limpia el pago mensual, en caso de que luego de poner un monto, y luego se borre limpie el valor de pago pensual
        if (isNaN(monto)) {
            updatePagoMensual(0)
        } else {
            // En este if se buscan los datos ingresado que generan un descuento en la tasa y se calcula el descuento, sobre el descuento maximo a obtener
            if (tasaDescuento > 0) {
                // Si la tasa descuento existe se limpia el valor de pago mensual en caso de que alla sido calculada antes
                updatePagoMensual(PagoMensual(monto, tasaDescuento, cuota))
            } else {
                // Si no se pasa la tasa actual para hallar el pago mensual
                updatePagoMensual(PagoMensual(monto, tasa, cuota))
            }
            // Se busca el porcentaje del fondo de garantias segun el caso o tipo de asociado
            const typeAfi = inputAfiliacion.split("-")[0];
            const currentFondo = FindFondo(tasas, typeAfi, score)
            // Si existe el valor del fondo se calcula el valor de fondo de garantias sobre el monto solicitado
            if (currentFondo) {
                const porcentajeFondo = ((currentFondo / 100) * monto).toFixed(0)
                updateFondo(parseInt(porcentajeFondo))
            }
        }
    }, [monto])

    // Este handle actualiza el tipo de credito en caso de que cambie
    const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        setSelectOption(value)
        // Tasa techo para la linea
        const tasaT = value.split("-")[1]
        setTasaTecho(Number(tasaT))
        updateTasa(Number(tasaT))
    }

    // Este handleCuotas actualiza en valor ingresado en el numero de cuotas
    const handleChangeCuotas = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        updateCuota(parseInt(value))
        let moreHigt = 0
        // Revisa que el numero de cuotas no se mayor al permitido por el tipo de perfil o por el tipo de credito
        if (cuotaMaxima < maxCuotas) {
            moreHigt = cuotaMaxima
        } else {
            moreHigt = maxCuotas
        }
        if (parseInt(value) > moreHigt) {
            updateCuota(moreHigt)
        }
    }

    // Este handleMonto guarda y controla el monto ingresado a solicitar
    const handleChangeMonto = (event: React.ChangeEvent<HTMLInputElement>) => {
        const cleanValue = event.target.value.replace(/\./g, '')
        const value = parseInt(cleanValue)
        updateMonto(value)
        // Revisa que el monto no se mayor al monto maximo calculado anterior mente dependiendo su capacidad de pago, tasa y cuotas
        if (value > montoMax) {
            setControlMax(true)
            updateMonto(montoMax)
        } else {
            setControlMax(false)
        }
        const cap = Number(CapacidadPago(valorCentrales, debit, salary, others, saludypension, ahorroMensual))
        if (cap > 70) {
            updateMonto(0)
            setControlCapacidad(true)
        }
    }

    return (
        <div className="w-full flex flex-col justify-center items-center mt-5 gap-4 border-2 border-gray-300 rounded-3xl shadow-2xl pb-10 p-6">
            <h3 className="text-4xl m-2 font-bold text-[#2D2D83]">Lineas No Sociales</h3>
            <div
                className="w-[500px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
                duration-300 ease-in-out hover:border-blue-500 focus-within:border-blue-500 focus-within:shadow-xl shadow-blue-400">
                <label className="text-sm text-gray-400" htmlFor="typeCredit">Tipo de Credito:</label>
                <select
                    className="px-3 focus:outline-none text-xl w-full font-semibold"
                    name="typeCredit" id="typeCredit" onChange={handleChangeSelect} value={selectOption} required>
                    <option key="empty-type-1" value=""> -- Seleccione de credito -- </option>
                    {nosociales.map((data: NoSociales) => (
                        <option key={`${data.name}-${data.id}`} value={`${data.name}-${data.techoNMV}`}>{data.name}</option>
                    ))}
                </select>
            </div>

            <div
                className="w-[500px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
                duration-300 ease-in-out hover:border-blue-500 focus-within:border-blue-500 focus-within:shadow-xl shadow-blue-400">
                <label className="text-sm text-gray-400" htmlFor="cuotas">Cuotas</label>
                <input
                    className="px-3 focus:outline-none text-xl w-full font-semibold"
                    onChange={handleChangeCuotas}
                    value={cuota>0 ? cuota : ""}
                    type="number"
                    id="cuotas"
                    name="cuotas"
                    placeholder="Cuotas"
                    required/>
            </div>

            <span className="font-semibold">El numero maximo de cuotas segun su perfil es: {cuotaMaxima}</span>
            <span className="font-semibold">El numero maximo de cuotas para esta linea es: {maxCuotas}</span>

            <div
                className="w-[500px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
                duration-300 ease-in-out hover:border-blue-500 focus-within:border-blue-500 focus-within:shadow-xl shadow-blue-400">
                <label className="text-sm text-gray-400" htmlFor="monto">Monto a Solicitar</label>
                <input
                    className="px-3 focus:outline-none text-xl w-full font-semibold"
                    onChange={handleChangeMonto}
                    value={monto > 0 ? setValue(monto.toString()) : ""}
                    type="text"
                    id="monto"
                    name="monto"
                    placeholder="Monto"
                    required/>
            </div>
            {controlCapacidad&&<span className="text-red-400 font-semibold text-xl">No posee Capacidad de Pago</span>}
            {montoControl&&<span className="text-red-400 font-bold text-2xl">El monto minimo a solicitar es de $1.300.000</span>}
            {controlMax&&capacidadPago>0&&<span className="font-semibold">{`Su monto maximo a solicitar es de $${setValue(montoMax.toString())}`}</span>}
            {capacidadPago<0&&<span className="text-xl text-red-400 font-bold">No cuenta con capacidad de pago</span>}
        </div>
    )
}
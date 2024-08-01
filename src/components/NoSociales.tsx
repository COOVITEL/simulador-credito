import React, { useEffect, useState } from "react"
import useSimulatorStore from "../store/store"
import { FindFondo } from "../utils/findFondo"
import { setValue } from "../utils/setValue"
import { CapacidadPago } from "../utils/capacidadPago"
import { MontoMax } from "../utils/montoMax"
import { PagoMensual } from "../utils/cuota"
import { NoSociales } from "../store/types"
import { calTasaDescuento } from "../utils/tasaDescuento"

export default function Nosociales() {
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
        formadepago,
        updateCapacidadPago,
        updateMontoMax,
        montoMax,
        updatePagoMensual,
        descuentos,
        cdat,cooviahorro, aportes, maximoDescuento, porcentajeDescuento, desScore, updateBeneficioTasa, updateTasaDescuento, tasaDescuento
    } = useSimulatorStore()

    const [selectOption, setSelectOption] = useState("")
    const [maxCuotas, setMaxCuotas] = useState(0)
    const [controCuotas, setControlCuotas] = useState(false)
    const [controlMax, setControlMax] = useState(false)

    useEffect(() => {
    }, [nosociales])

    useEffect(() => {
        const currentFondo = FindFondo(tasas, inputAfiliacion, score)
        if (currentFondo) updateFondo(currentFondo)
        const current = nosociales.filter(type => type.name == selectOption)[0]
        if (current) {
            updateTasa(current.techoNMV)
            updatePorcentajeDescuento(current.descuentos)
            setMaxCuotas(current.plazo)
        }
        updateCapacidadPago(CapacidadPago(salary, others, debit, saludypension, formadepago, ahorroMensual))
    }, [selectOption])

    useEffect(() => {
        updateMontoMax(MontoMax(capacidadPago, tasa, cuota))
    }, [cuota])

    useEffect(() => {
        if (isNaN(monto)) {
            updatePagoMensual(0)
        } else {
            if (inputAfiliacion.length > 0) {
                const valueCoovi = parseInt(cooviahorro.split("-")[0])
                const valueCdat = parseInt(cdat.split("-")[0])
                const valueAportes = parseInt(aportes.split("-")[0])
                const descuento = calTasaDescuento(descuentos, valueCdat, valueCoovi, valueAportes, desScore, cuota, maximoDescuento, porcentajeDescuento, inputAfiliacion)
                updateBeneficioTasa(descuento)
                updateTasaDescuento(tasa - descuento)
            }
            if (tasaDescuento > 0) {
                updatePagoMensual(PagoMensual(monto, tasa - tasaDescuento, cuota))
            } else {
                updatePagoMensual(PagoMensual(monto, tasa, cuota))
            }
            const typeAfi = inputAfiliacion.split("-")[0];
            const currentFondo = FindFondo(tasas, typeAfi, score)
            if (currentFondo) {
                updateFondo(currentFondo / 100 * monto)
            }
        }
    }, [monto])

    const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        setSelectOption(value)
    }

    const handleChangeCuotas = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        updateCuota(parseInt(value))
        if (parseInt(value) > maxCuotas) {
            setControlCuotas(true)
            updateCuota(maxCuotas)
        }
    }

    const handleChangeMonto = (event: React.ChangeEvent<HTMLInputElement>) => {
        const cleanValue = event.target.value.replace(/\./g, '')
        const value = parseInt(cleanValue)
        updateMonto(value)
        if (value > montoMax) {
            setControlMax(true)
            updateMonto(montoMax)
        } else {
            setControlMax(false)
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
                    name="typeCredit" id="typeCredit" onChange={handleChangeSelect}>
                    <option key="empty-type-1" value=""> -- Seleccione de credito -- </option>
                    {nosociales.map((data: NoSociales) => (
                        <option key={`${data.name}-${data.id}`} value={data.name}>{data.name}</option>
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
                    max={maxCuotas}
                    name="cuotas"
                    placeholder="Cuotas"
                    required/>
            </div>

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

            {/* <span>{`Salario: ${salary}`}</span> */}
            {/* <span>{`Tasa: ${tasa}`}</span> */}
            {/* <span>{`Descuento tasa: ${beneficionTasa}`}</span> */}
            {/* <span>{`Otros ingresos ${others}`}</span> */}
            {/* <span>{`Debitos: ${debit}`}</span> */}
            {/* <span>{`Salud y pension: ${saludypension}`}</span> */}
            {/* <span>{`Ahorro Mensual: ${ahorroMensual}`}</span> */}
            {controlMax&&<span>{`Su monto maximo a solicitar es de $${setValue(montoMax.toString())}`}</span>}
            {/* <span>{`Capacidad de descuento por nomina: ${setValue(capacidadPago.toString())}`}</span> */}
            {/* <span>{`El valor de su cuota es: $${setValue(pagoMensual.toString())}`}</span> */}
            {/* <span>{`Monto maximo: $${setValue(montoMax.toString())}`}</span> */}
            {/* <span>Valor fondo de garantias: ${setValue(fondo.toString())}</span> */}
            {/* <span>Valor a desembolsar: ${setValue((monto - fondo).toString())}</span> */}
            {controCuotas&&<span>El numero maximo de cuotas es: {maxCuotas}</span>}
        </div>
    )
}
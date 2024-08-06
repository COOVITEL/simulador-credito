import React, { useEffect, useState } from "react"
import useSimulatorStore from "../store/store"
import { FindFondo } from "../utils/findFondo"
import { setValue } from "../utils/setValue"
import { CapacidadPago } from "../utils/capacidadPago"
import { MontoMax } from "../utils/montoMax"
import { PagoMensual } from "../utils/cuota"
import { NoSociales } from "../store/types"
import { calTasaDescuento } from "../utils/tasaDescuento"
import { FindTasa } from "../utils/findTasa"

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
        // formadepago,
        updateCapacidadPago,
        updateMontoMax,
        montoMax,
        updatePagoMensual,
        cuotaMaxima,
        descuentos,
        cdat,cooviahorro, aportes, maximoDescuento, porcentajeDescuento, desScore, updateBeneficioTasa, updateTasaDescuento, tasaDescuento
    } = useSimulatorStore()

    const [selectOption, setSelectOption] = useState("")
    const [maxCuotas, setMaxCuotas] = useState(0)
    const [controlMax, setControlMax] = useState(false)


    useEffect(() => {
    }, [nosociales])

    useEffect(() => {
        const currentFondo = FindFondo(tasas, inputAfiliacion, score)
        if (currentFondo) updateFondo(currentFondo)
        const currentTasa = FindTasa(tasas, inputAfiliacion, score)
        if (currentTasa) updateTasa(currentTasa)
        const current = nosociales.filter(type => type.name == selectOption)[0]
        if (current) {
            updatePorcentajeDescuento(current.descuentos)
            setMaxCuotas(current.plazo)
        }
        updateCapacidadPago(CapacidadPago(salary, others, debit, saludypension, inputAfiliacion, ahorroMensual))
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
                updatePagoMensual(PagoMensual(monto, tasaDescuento, cuota))
            } else {
                updatePagoMensual(PagoMensual(monto, tasa, cuota))
            }
            const typeAfi = inputAfiliacion.split("-")[0];
            const currentFondo = FindFondo(tasas, typeAfi, score)
            if (currentFondo) {
                const porcentajeFondo = ((currentFondo / 100) * monto).toFixed(0)
                updateFondo(parseInt(porcentajeFondo))
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
        let moreHigt = 0
        if (cuotaMaxima < maxCuotas) {
            moreHigt = cuotaMaxima
        } else {
            moreHigt = maxCuotas
        }
        if (parseInt(value) > moreHigt) {
            updateCuota(moreHigt)
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

            {controlMax&&<span className="font-semibold">{`Su monto maximo a solicitar es de $${setValue(montoMax.toString())}`}</span>}

        </div>
    )
}
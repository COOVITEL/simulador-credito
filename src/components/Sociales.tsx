import React, { useEffect, useState } from "react"
import useSimulatorStore from "../store/store"
import { Sociales } from "../store/types"
import { searchTasaSocial } from "../utils/searchTasaSocial"
import { CapacidadDescuento } from "../utils/capacidadDescuento"
import { MontoMax } from "../utils/montoMax"
import { setValue } from "../utils/setValue"
import { PagoMensual } from "../utils/cuota"
import { FindFondo } from "../utils/findFondo"

export default function Social() {

    const {
        sociales,
        salary,
        others,
        debit,
        saludypension,
        capacidadPago,
        updateCapacidadPago,
        montoMax,
        updateMontoMax,
        tasa,
        updateTasa,
        cuota,
        updateCuota,
        inputAfiliacion,
        monto,
        updateMonto,
        updatePagoMensual,
        ahorroMensual,
        updateFondo,
        tasas,
        score,
        cuotaMaxima
    } = useSimulatorStore()
    const [currentType, setCurrentType] = useState<Sociales>()
    const [listSociales, setListSociales] = useState<Sociales[]>([])
    const [selectOption, setSeletOption] = useState("")
    const [maxCuotas, setMaxCuotas] = useState(0)
    const [controlMax, setControlMax] = useState(false)

    useEffect(() => {
        if (sociales) setListSociales(sociales)
    }, [sociales])

    useEffect(() => {
        const current = sociales.filter(social => social.name == selectOption)[0]
        if (current) {
            setMaxCuotas(current.plazoMax)
            setCurrentType(current)
            const capa = CapacidadDescuento(salary, others, debit, saludypension, inputAfiliacion, ahorroMensual).toFixed(0)
            updateCapacidadPago(parseInt(capa))
        }
    }, [selectOption, debit, saludypension, cuota])

    useEffect(() => {
        updateMontoMax(MontoMax(capacidadPago, tasa, cuota))
        updateMonto(0)
    }, [tasa, capacidadPago, cuota, inputAfiliacion, debit, others])

    useEffect(() => {
        if (isNaN(monto)) {
            updatePagoMensual(0)
        } else {
            updatePagoMensual(PagoMensual(monto, tasa, cuota))
            const typeAfi = inputAfiliacion.split("-")[0];
            const currentFondo = FindFondo(tasas, typeAfi, score)
            if (currentFondo) {
                const porcentajeFondo = ((currentFondo / 100) * monto).toFixed(0)
                updateFondo(parseInt(porcentajeFondo))
            }
        }
    }, [monto])

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSeletOption(event.target.value)
        setMaxCuotas(0)
        updateCuota(0)
        updateTasa(0)
    }

    const handleChangeCuotas = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateCuota(parseInt(event.target.value))
        if (currentType) updateTasa(searchTasaSocial(currentType, parseInt(event.target.value)))
        if (parseInt(event.target.value) > maxCuotas) {
            updateCuota(maxCuotas)
            if (currentType) updateTasa(searchTasaSocial(currentType, maxCuotas))
        }
        if (cuotaMaxima < maxCuotas) {
            if (parseInt(event.target.value) > cuotaMaxima) {
                updateCuota(cuotaMaxima)
            }
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
            <h3 className="text-4xl m-2 font-bold text-[#2D2D83]">Lineas Sociales</h3>

            <div
                className="w-[500px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
                duration-300 ease-in-out hover:border-blue-500 focus-within:border-blue-500 focus-within:shadow-xl shadow-blue-400">
                <label className="text-sm text-gray-400" htmlFor="typeCredit">Tipo de Credito:</label>
                <select
                    className="px-3 focus:outline-none text-xl w-full font-semibold"
                    name="typeCredit" id="typeCredit" onChange={handleSelectChange}>
                    <option key="empty-type-1" value=""> -- Seleccione de credito -- </option>
                    {listSociales.map((data: Sociales) => (
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
            <span  className="font-semibold">El numero maximo de cuotas segun la linea es: {maxCuotas}</span>
            <span  className="font-semibold">El numero maximo de cuotas segun su perfil es: {cuotaMaxima}</span>

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
            {controlMax&&<span  className="font-semibold">{`Su monto maximo a solicitar es de $${setValue(montoMax.toString())}`}</span>}
        </div>
    )
}
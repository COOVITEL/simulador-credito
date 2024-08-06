import React, { useEffect, useState } from "react"
import useSimulatorStore from "../store/store"
import { Fidelizacion } from "../store/types"
import { setValue } from "../utils/setValue"
import { searchTasaFide } from "../utils/searchTasaFide"
import { CapacidadPago } from "../utils/capacidadPago"
import { MontoMax } from "../utils/montoMax"
import { PagoMensual } from "../utils/cuota"

export default function Fidelizaciones() {

    const {
        fidelizacion,
        salary,
        others,
        debit,
        tasa,
        saludypension,
        ahorroMensual,
        capacidadPago,
        updateCuota,
        updateTasa,
        updateCapacidadPago,
        updateMontoMax,
        cuota,
        montoMax,
        cuotaMaxima,
        updatePagoMensual,
        updateMonto, monto, updateGarantia, inputAfiliacion,
    } = useSimulatorStore()
    const [listFideliacion, setListFidelizacion] = useState<Fidelizacion[]>([])
    const [aportesValue, setAportesValue] = useState("")
    const [montoValue, setMontoValue] = useState("")
    const [selectedOption, setSelectedOption] = useState("");
    const [porcentaje, setPorcentaje] = useState(0)
    const [maxCuotas, setMaxCuotas] = useState(0)
    const [cuotas, setCuotas] = useState(0)
    const [currentType, setCurrentType] = useState<Fidelizacion>()
    const [maxValueAportes, setMaxValueAportes] = useState(0)
    const [controlCuotas, setControlCuotas] = useState(false)
    const [controlMonto, setControlMonto] = useState(false)

    
    useEffect(() => {
        if (fidelizacion) setListFidelizacion(fidelizacion)
    }, [fidelizacion])

    useEffect(() => {
        const type = fidelizacion.filter(fide => fide.name == selectedOption)[0]
        updateGarantia("Aportes")
        setCurrentType(type)
        updateCapacidadPago(CapacidadPago(salary, others, debit, saludypension, inputAfiliacion, ahorroMensual))
    }, [selectedOption])

    useEffect(() => {
        updateMontoMax(MontoMax(capacidadPago, tasa, cuota))
    }, [cuotas, selectedOption])

    useEffect(() => {
        updatePagoMensual(PagoMensual(monto, tasa, cuota))
    }, [monto])

    const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        setSelectedOption(value)
        const currentPorcentaje = fidelizacion.filter(fide => fide.name == event.target.value)[0].porcentaje
        const currentPlazoMax = fidelizacion.filter(fide => fide.name == event.target.value)[0].plazoMax
        setPorcentaje(currentPorcentaje)
        setMaxCuotas(currentPlazoMax)
    };

    const handleChangeAportes = (event: React.ChangeEvent<HTMLInputElement>) => {
        const setAportes = event.target.value
        setAportesValue(setValue(setAportes))
        const value = setAportes.replace(/\./g, '')
        const curValue = (porcentaje / 100) * parseInt(value)
        setMaxValueAportes(curValue)
    }

    const handleChangeCuotas = (event: React.ChangeEvent<HTMLInputElement>) => {
        setControlCuotas(true)
        const value = event.target.value
        updateCuota(parseInt(value))
        setCuotas(parseInt(value))
        if (currentType) updateTasa(searchTasaFide(currentType, parseInt(value)))
        let moreHigt = 0
        if (cuotaMaxima < maxCuotas) {
            moreHigt = cuotaMaxima
        } else {
            moreHigt = maxCuotas
        }
        if (parseInt(value) > moreHigt) {
            setCuotas(moreHigt)
            updateCuota(moreHigt)
        }
    }

    const handleChangeMonto = (event: React.ChangeEvent<HTMLInputElement>) => {
        setControlMonto(true)
        const value = event.target.value
        const setCurrentValue = value.replace(/\./g, '')
        updateMonto(parseInt(setCurrentValue))
        setMontoValue(setValue(value))
        let morehigt = 0
        console.log(montoMax)
        console.log(maxValueAportes)
        if (maxValueAportes < montoMax) {
            morehigt = maxValueAportes
        } else {
            morehigt = montoMax
        }
        console.log(morehigt)
        if (parseInt(setCurrentValue) > morehigt) {
            updateMonto(morehigt)
            setMontoValue(setValue(morehigt.toString()))
        }
    }


    return (
        <div className="w-full flex flex-col justify-center items-center mt-5 gap-4 border-2 border-gray-300 rounded-3xl shadow-2xl p-6 pb-10">
            <h3 className="text-4xl m-2 font-bold text-[#2D2D83]">Fidelización</h3>
            <div
                className="w-[500px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
                duration-300 ease-in-out hover:border-blue-500 focus-within:border-blue-500 focus-within:shadow-xl shadow-blue-400">
                <label className="text-sm text-gray-400" htmlFor="typeCredit">Años de Vinculación:</label>
                <select
                    className="px-3 focus:outline-none text-xl w-full font-semibold text-center"
                    name="typeCredit" id="typeCredit" onChange={handleChangeSelect}>
                    <option key="empty-type-1" value=""> -- Seleccione un rango -- </option>
                    {listFideliacion.map((data: any) => (
                        <option key={`${data.name}-${data.id}`} value={data.name}>{data.name}</option>
                    ))}
                </select>

            </div>

            <div
                className="w-[500px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
                duration-300 ease-in-out hover:border-blue-500 focus-within:border-blue-500 focus-within:shadow-xl shadow-blue-400">
                <label className="text-sm text-gray-400" htmlFor="numberAportes">Cantidad de Aportes</label>
                <input
                    className="px-3 focus:outline-none text-xl w-full font-semibold"
                    onChange={handleChangeAportes}
                    value={aportesValue}
                    type="text"
                    id="numberAportes"
                    name="numberAportes"
                    placeholder="Aportes"
                    required/>
            </div>
            <div
                className="w-[500px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
                duration-300 ease-in-out hover:border-blue-500 focus-within:border-blue-500 focus-within:shadow-xl shadow-blue-400">
                <label className="text-sm text-gray-400" htmlFor="cuotas">Cuotas</label>
                <input
                    className="px-3 focus:outline-none text-xl w-full font-semibold"
                    onChange={handleChangeCuotas}
                    value={cuotas>0 ? cuotas : ""}
                    type="number"
                    max={maxCuotas}
                    id="cuotas"
                    name="cuotas"
                    placeholder="Cuotas" required/>
            </div>
            {controlCuotas&&<span className="font-semibold">El numero maximo de cuotas segun su perfil es: {cuotaMaxima}</span>}
            {controlCuotas&&<span>El numero maximo de cuotas para esta linea es: {maxCuotas}</span>}
            <div
                className="w-[500px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
                duration-300 ease-in-out hover:border-blue-500 focus-within:border-blue-500 focus-within:shadow-xl shadow-blue-400">
                <label className="text-sm text-gray-400" htmlFor="monto">Monto a Solicitar</label>
                <input
                    className="px-3 focus:outline-none text-xl w-full font-semibold"
                    onChange={handleChangeMonto}
                    value={montoValue}
                    type="text"
                    id="monto"
                    name="monto"
                    placeholder="Monto"
                    required/>
            </div>

            {controlMonto&&<span>El monto maximo a solicitar segun sus aportes es: ${setValue(maxValueAportes.toString())}</span>}
            {controlMonto&&<span>{`Monto maximo segun su capacidad de endeudamiento: $${setValue(montoMax.toString())}`}</span>}
        </div>

    )
}
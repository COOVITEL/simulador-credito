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
        formadepago,
        capacidadPago,
        updateCuota,
        updateTasa,
        updateCapacidadPago,
        updateMontoMax,
        cuota,
        montoMax,
        pagoMensual,
        updatePagoMensual,
        updateMonto, monto
    } = useSimulatorStore()
    const [listFideliacion, setListFidelizacion] = useState<Fidelizacion[]>([])
    const [aportesValue, setAportesValue] = useState("")
    const [montoValue, setMontoValue] = useState("")
    const [selectedOption, setSelectedOption] = useState("");
    const [porcentaje, setPorcentaje] = useState(0)
    const [maxValue, setMaxValue] = useState("")
    const [maxCuotas, setMaxCuotas] = useState(0)
    const [cuotas, setCuotas] = useState(0)
    const [controlCuotas, setControlCuotas] = useState(false)
    const [currentType, setCurrentType] = useState<Fidelizacion>()
    const [maxValueAportes, setMaxValueAportes] = useState(0)
    
    useEffect(() => {
        if (fidelizacion) setListFidelizacion(fidelizacion)
    }, [fidelizacion])

    useEffect(() => {
        const type = fidelizacion.filter(fide => fide.name == selectedOption)[0]
        setCurrentType(type)
        updateCapacidadPago(CapacidadPago(salary, others, debit, saludypension, formadepago, ahorroMensual))
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
        setMaxValueAportes((porcentaje / 100) * parseInt(value))
    }

    const handleChangeCuotas = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        updateCuota(parseInt(value))
        setCuotas(parseInt(value))
        if (currentType) updateTasa(searchTasaFide(currentType, parseInt(value)))
        if (parseInt(value) > maxCuotas) {
            setControlCuotas(true)
            setCuotas(maxCuotas)
            updateCuota(maxCuotas)
            if (currentType) updateTasa(searchTasaFide(currentType, maxCuotas))
        } else {
            setControlCuotas(false)
        }
    }

    const handleChangeMonto = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        const setCurrentValue = value.replace(/\./g, '')
        updateMonto(parseInt(setCurrentValue))
        setMontoValue(setValue(value))
        if (parseInt(setCurrentValue) > maxValueAportes) {
            setMontoValue(setValue(maxValueAportes.toString()))
            updateMonto(maxValueAportes)
        }
        if (parseInt(setCurrentValue) > montoMax) {
            setMontoValue(setValue(montoMax.toString()))
            updateMonto(montoMax)
        }
    }


    return (
        <div className="flex flex-col justify-center items-center mt-5 gap-4">
            <h3 className="text-3xl m-2 text-black font-bold">Fidelización</h3>

            <div className="w-full flex justify-between">
                <label htmlFor="typeCredit">Años de Vinculación:</label>
                <select name="typeCredit" id="typeCredit" onChange={handleChangeSelect}>
                    <option key="empty-type-1" value=""> -- Seleccione un rango -- </option>
                    {listFideliacion.map((data: any) => (
                        <option key={`${data.name}-${data.id}`} value={data.name}>{data.name}</option>
                    ))}
                </select>

            </div>

            <div className="flex w-full justify-between">
                <label htmlFor="numberAportes">Cantidad de Aportes</label>
                <input 
                    onChange={handleChangeAportes}
                    value={aportesValue}
                    className="px-4 py-1"
                    type="text"
                    id="numberAportes"
                    name="numberAportes"
                    placeholder="Aportes"
                    required/>
            </div>
            <div className="flex w-full justify-between">
                <label htmlFor="cuotas">Cuotas</label>
                <input
                    onChange={handleChangeCuotas}
                    value={cuotas>0 ? cuotas : ""}
                    className="px-4 py-1"
                    type="number"
                    max={maxCuotas}
                    id="cuotas"
                    name="scocuotasre"
                    placeholder="Cuotas" required/>
            </div>

            {controlCuotas&&<span>El numero maximo de cuotas es: {maxCuotas}</span>}
            <div className="flex w-full justify-between">
                <label htmlFor="monto">Monto a Solicitar</label>
                <input
                    onChange={handleChangeMonto}
                    value={montoValue}
                    className="px-4 py-1"
                    type="text"
                    id="monto"
                    name="monto"
                    placeholder="Monto"
                    required/>
            </div>

            <span>El monto maximo a solicitar segun sus aportes es: ${setValue(maxValueAportes.toString())}</span>
            <span>Porcentaje: {porcentaje}</span>
            <span>Cuotas maxima: {maxCuotas}</span>
            <span>{`Salario: ${salary}`}</span>
            <span>{`Otros ingresos ${others}`}</span>
            <span>{`Debitos: ${debit}`}</span>
            <span>{`Tasa: ${tasa}`}</span>
            <span>{`Salud y pension: ${saludypension}`}</span>
            <span>{`Ahorro Mensual: ${ahorroMensual}`}</span>
            <span>{`Forma de pago: ${formadepago}`}</span>
            <span>{`Capacidad de descuento por nomina: ${setValue(capacidadPago.toString())}`}</span>
            <span>{`Monto maximo segun su capacidad de endeudamiento: $${setValue(montoMax.toString())}`}</span>
            <span>{`El valor de su cuota es: $${setValue(pagoMensual.toString())}`}</span>

        </div>

    )
}
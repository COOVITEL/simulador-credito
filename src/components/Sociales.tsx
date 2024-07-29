import React, { useEffect, useState } from "react"
import useSimulatorStore from "../store/store"
import { Sociales } from "../store/types"
import { searchTasaSocial } from "../utils/searchTasaSocial"
import { CapacidadPago } from "../utils/capacidadPago"
import { MontoMax } from "../utils/montoMax"
import { setValue } from "../utils/setValue"
import { PagoMensual } from "../utils/cuota"

export default function Social() {

    const {
        sociales,
        salary,
        others,
        debit,
        saludypension,
        formadepago,
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
        pagoMensual,
        updatePagoMensual,
        ahorroMensual,
    } = useSimulatorStore()
    const [currentType, setCurrentType] = useState<Sociales>()
    const [listSociales, setListSociales] = useState<Sociales[]>([])
    const [selectOption, setSeletOption] = useState("")
    const [maxCuotas, setMaxCuotas] = useState(0)
    const [controCuotas, setControlCuotas] = useState(false)
    const [controlMax, setControlMax] = useState(false)

    useEffect(() => {
        if (sociales) setListSociales(sociales)
    }, [sociales])

    useEffect(() => {
        const current = sociales.filter(social => social.name == selectOption)[0]
        if (current) {
            setMaxCuotas(current.plazoMax)
            setCurrentType(current)
            updateCapacidadPago(CapacidadPago(salary, others, debit, saludypension, formadepago, ahorroMensual))
        }
    }, [selectOption, formadepago, debit, saludypension, cuota])

    useEffect(() => {
        updateMontoMax(MontoMax(capacidadPago, tasa, cuota))
        updateMonto(0)
    }, [tasa, capacidadPago, cuota, inputAfiliacion, debit, others])

    useEffect(() => {
        if (isNaN(monto)) {
        updatePagoMensual(0)
        } else {
            updatePagoMensual(PagoMensual(monto, tasa, cuota))
        }
    }, [monto])

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSeletOption(event.target.value)
        setMaxCuotas(0)
        updateCuota(0)
        setControlCuotas(false)
        updateTasa(0)
    }

    const handleChangeCuotas = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateCuota(parseInt(event.target.value))
        if (currentType) updateTasa(searchTasaSocial(currentType, parseInt(event.target.value)))
        if (parseInt(event.target.value) > maxCuotas) {
            setControlCuotas(true)
            updateCuota(maxCuotas)
            if (currentType) updateTasa(searchTasaSocial(currentType, maxCuotas))
        } else {
            setControlCuotas(false)
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
        <div className="flex flex-col justify-center items-center mt-5 gap-4">
            <h3 className="text-3xl m-2 text-black font-bold">Lineas Sociales</h3>

            <div className="w-full flex justify-between">
                <label htmlFor="typeCredit">Tipo de Credito:</label>
                <select name="typeCredit" id="typeCredit" onChange={handleSelectChange}>
                    <option key="empty-type-1" value=""> -- Seleccione de credito -- </option>
                    {listSociales.map((data: any) => (
                        <option key={`${data.name}-${data.id}`} value={data.name}>{data.name}</option>
                    ))}
                </select>
            </div>

            <div className="flex w-full justify-between">
                <label htmlFor="cuotas">Cuotas</label>
                <input
                    onChange={handleChangeCuotas}
                    value={cuota>0 ? cuota : ""}
                    className="px-4 py-1"
                    type="number"
                    id="cuotas"
                    max={maxCuotas}
                    name="scocuotasre"
                    placeholder="Cuotas"
                    required/>
            </div>
            <span>{`Salario: ${salary}`}</span>
            <span>{`Otros ingresos ${others}`}</span>
            <span>{`Debitos: ${debit}`}</span>
            <span>{`Tasa: ${tasa}`}</span>
            <span>{`Salud y pension: ${saludypension}`}</span>
            <span>{`Ahorro Mensual: ${ahorroMensual}`}</span>
            <span>{`Forma de pago: ${formadepago}`}</span>
            <span>{`Capacidad de descuento por nomina: ${setValue(capacidadPago.toString())}`}</span>
            {controCuotas&&<span>El numero maximo de cuotas es: {maxCuotas}</span>}

            <div className="flex w-full justify-between">
                <label htmlFor="monto">Monto a Solicitar</label>
                <input
                    onChange={handleChangeMonto}
                    value={monto > 0 ? setValue(monto.toString()) : ""}
                    className="px-4 py-1"
                    type="text"
                    id="monto"
                    name="monto"
                    placeholder="Monto"
                    required/>
            </div>
            <span>{`Monto maximo: $${setValue(montoMax.toString())}`}</span>
            {controlMax&&<span>{`Su monto maximo a solicitar es de $${setValue(montoMax.toString())}`}</span>}
            <span>{`El valor de su cuota es: $${setValue(pagoMensual.toString())}`}</span>
        </div>
    )
}
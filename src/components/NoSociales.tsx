import React, { useEffect, useState } from "react"
import useSimulatorStore from "../store/store"
import { NoSociales } from "../store/types"
import { FindFondo } from "../utils/findFondo"
import { setValue } from "../utils/setValue"
import { CapacidadPago } from "../utils/capacidadPago"
import { MontoMax } from "../utils/montoMax"

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
        pagoMensual,
        fondo,
        monto,
        updateMonto,
        formadepago,
        updateCapacidadPago,
        updateMontoMax,
        montoMax
    } = useSimulatorStore()

    const [listNosociales, setListNosociales] = useState<NoSociales[]>([])
    const [selectOption, setSelectOption] = useState("")
    const [maxCuotas, setMaxCuotas] = useState(0)
    const [controCuotas, setControlCuotas] = useState(false)

    useEffect(() => {
        if (nosociales) setListNosociales(nosociales)
    }, [nosociales])

    useEffect(() => {
        const currentFondo = FindFondo(tasas, inputAfiliacion, score)
        if (currentFondo) updateFondo(currentFondo)
        const current = nosociales.filter(type => type.name == selectOption)[0]
        if (current) {
            updateTasa(current.techoNMV)
            updatePorcentajeDescuento(current.descuento)
            setMaxCuotas(current.plazo)
        }
        updateCapacidadPago(CapacidadPago(salary, others, debit, saludypension, formadepago, ahorroMensual))
    }, [selectOption])

    useEffect(() => {
        updateMontoMax(MontoMax(capacidadPago, tasa, cuota))
    }, [cuota])

    useEffect(() => {
        
    }, [])

    const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        setSelectOption(value)
    }

    const handleChangeCuotas = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        updateCuota(parseInt(value))
        if (parseInt(value) > maxCuotas) {
            updateCuota(maxCuotas)
        }
    }

    const handleChangeMonto = (event: React.ChangeEvent<HTMLInputElement>) => {
        const cleanValue = event.target.value.replace(/\./g, '')
        const value = parseInt(cleanValue)
        updateMonto(value)
    }

    return (
        <div className="flex flex-col justify-center items-center mt-5 gap-4">
            <h3 className="text-3xl m-2 text-black font-bold">Lineas Sociales</h3>

            <div className="w-full flex justify-between">
                <label htmlFor="typeCredit">Tipo de Credito:</label>
                <select name="typeCredit" id="typeCredit" onChange={handleChangeSelect}>
                    <option key="empty-type-1" value=""> -- Seleccione de credito -- </option>
                    {nosociales.map((data: any) => (
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

            <span>Cuotas maximas: {maxCuotas}</span>

            <span>{`Salario: ${salary}`}</span>
            <span>{`Tasa: ${tasa}`}</span>
            <span>{`Otros ingresos ${others}`}</span>
            <span>{`Debitos: ${debit}`}</span>
            <span>{`Salud y pension: ${saludypension}`}</span>
            <span>{`Ahorro Mensual: ${ahorroMensual}`}</span>
            <span>{`Capacidad de descuento por nomina: ${setValue(capacidadPago.toString())}`}</span>
            <span>{`El valor de su cuota es: $${setValue(pagoMensual.toString())}`}</span>
            <span>{`Monto maximo: $${setValue(montoMax.toString())}`}</span>
            <span>Valor fondo de garantias: ${setValue(fondo.toString())}</span>
            <span>Valor a desembolsar: ${setValue((monto - fondo).toString())}</span>
            {controCuotas&&<span>El numero maximo de cuotas es: {maxCuotas}</span>}
        </div>
    )
}
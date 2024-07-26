import React, { useEffect, useState } from "react"
import useSimulatorStore from "../store/store"
import { Fidelizacion } from "../store/types"
import { setValue } from "../utils/setValue"
import { maxValueFide } from "../utils/maxMontoFideliacion"

export default function Fidelizaciones() {

    const { fidelizacion } = useSimulatorStore()
    const [listFideliacion, setListFidelizacion] = useState<Fidelizacion[]>([])
    const [aportesValue, setAportesValue] = useState("")
    const [montoValue, setMontoValue] = useState("")
    const [selectedOption, setSelectedOption] = useState("");
    const [porcentaje, setPorcentaje] = useState("")
    const [maxValue, setMaxValue] = useState("")
    const [maxCuotas, setMaxCuotas] = useState(0)
    const [controlCuotas, setControlCuotas] = useState(false)
    
    useEffect(() => {
        if (fidelizacion) setListFidelizacion(fidelizacion)
    }, [fidelizacion])

    useEffect(() => {
        const current = fidelizacion.filter(fide => fide.name == selectedOption)
        if (current.length > 0) {
            setPorcentaje(current[0].porcentaje.toString())
            setMaxCuotas(current[0].plazoMax)
        }

    }, [selectedOption])

    const handleChange = (event: any, field: string) => {
        const val = event.target.value
        const newValue = setValue(val)
        if (field == "numberAportes") {
            setAportesValue(newValue)
            const max = maxValueFide(val, porcentaje)
            setMaxValue(setValue(max.toString()))
        } else if (field == "monto") {
            const setValue = val.replace(/\./g, '');
            console.log(setValue)
            const setMonto = maxValue.replace(/\./g, '')
            console.log(setMonto)
            if (parseInt(setValue) > parseInt(setMonto)) {
                console.log("Exede el monto")
                setMontoValue(maxValue)
                return
            }
            setMontoValue(newValue)
        }
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        setAportesValue("")
        setMaxCuotas(0)
    };

    const handleCuotasChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        if (parseInt(value) > maxCuotas) {
            setControlCuotas(true)
        } else {
            setControlCuotas(false)
        }
    }


    return (
        <div className="flex flex-col justify-center items-center mt-5 gap-4">
            <h3 className="text-3xl m-2 text-black font-bold">Fidelización</h3>

            <div className="w-full flex justify-between">
                <label htmlFor="typeCredit">Años de Vinculación:</label>
                <select name="typeCredit" id="typeCredit" onChange={handleSelectChange}>
                    <option key="empty-type-1" value=""> -- Seleccione un rango -- </option>
                    {listFideliacion.map((data: any) => (
                        <option key={`${data.name}-${data.id}`} value={data.name}>{data.name}</option>
                    ))}
                </select>

            </div>

            <div className="flex w-full justify-between">
                <label htmlFor="numberAportes">Cantidad de Aportes</label>
                <input 
                    onChange={(e) => handleChange(e, "numberAportes")}
                    value={aportesValue}
                    className="px-4 py-1"
                    type="text"
                    id="numberAportes"
                    name="numberAportes"
                    placeholder="Aportes"
                    required/>
            </div>

            {porcentaje&&aportesValue&&<span>El monto maximo a solicitar es: ${maxValue}</span>}

            <div className="flex w-full justify-between">
                <label htmlFor="cuotas">Cuotas</label>
                <input onChange={handleCuotasChange} className="px-4 py-1" type="number" id="cuotas" name="scocuotasre" max={maxCuotas} placeholder="Cuotas" required/>
            </div>

            {controlCuotas&&<span>El numero maximo de cuotas es: {maxCuotas}</span>}

            <div className="flex w-full justify-between">
                <label htmlFor="monto">Monto a Solicitar</label>
                <input
                    onChange={(e) => handleChange(e, "monto")}
                    value={montoValue}
                    className="px-4 py-1"
                    type="text"
                    id="monto"
                    name="monto"
                    placeholder="Monto"
                    required/>
            </div>
        </div>

    )
}
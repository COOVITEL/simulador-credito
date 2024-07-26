import React, { useEffect, useState } from "react"
import useSimulatorStore from "../store/store"
import { Sociales } from "../store/types"
import { searchTasaSocial } from "../utils/searchTasaSocial"

export default function Social() {

    const { sociales } = useSimulatorStore()
    const [currentType, setCurrentType] = useState<Sociales>()
    const [listSociales, setListSociales] = useState<Sociales[]>([])
    const [selectOption, setSeletOption] = useState("")
    const [cuotas, setCuotas] = useState("")
    const [maxCuotas, setMaxCuotas] = useState(0)
    const [controCuotas, setControlCuotas] = useState(false)
    const [tasa, setTasa] = useState(0)

    useEffect(() => {
        if (sociales) setListSociales(sociales)
    }, [sociales])

    useEffect(() => {
        const current = sociales.filter(social => social.name == selectOption)[0]
        if (current) {
            setMaxCuotas(current.plazoMax)
            setCurrentType(current)
        }
    }, [selectOption])

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSeletOption(event.target.value)
        setMaxCuotas(0)
        setCuotas("")
        setControlCuotas(false)
        setTasa(0)
    }

    const handleChangeCuotas = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCuotas(event.target.value)
        if (currentType) setTasa(searchTasaSocial(currentType, parseInt(event.target.value)))
        if (parseInt(event.target.value) > maxCuotas) {
            setControlCuotas(true)
            setCuotas(maxCuotas.toString())
        } else {
            setControlCuotas(false)
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
                    value={cuotas}
                    className="px-4 py-1"
                    type="number"
                    id="cuotas"
                    max={maxCuotas}
                    name="scocuotasre"
                    placeholder="Cuotas"
                    required/>
            </div>

            {controCuotas&&<span>El numero maximo de cuotas es: {maxCuotas}</span>}

            <div className="flex w-full justify-between">
                <label htmlFor="monto">Monto a Solicitar</label>
                <input
                    className="px-4 py-1"
                    type="text"
                    id="monto"
                    name="monto"
                    placeholder="Monto"
                    required/>
            </div>

            <span>Tasa: {tasa}</span>

        </div>
    )
}
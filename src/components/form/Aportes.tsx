import React, { useEffect, useState } from "react";
import useSimulatorStore from "../../store/store";
import { Aporte } from "../../store/types";


export default function Aportes() {

    const { descuentos, inputAfiliacion, updateAportes } = useSimulatorStore()
    const [aportes, setAportes] = useState<Aporte[]>([])

    useEffect(() => {
        if (descuentos.aporte) {
            const setApo = descuentos.aporte.filter(apo => apo.asociado == parseInt(inputAfiliacion))
            setAportes(setApo);
        }
    }, [descuentos , inputAfiliacion])

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        updateAportes(event.target.value)
    }
    
    return (
        <div
            className="w-[500px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
            duration-300 ease-in-out hover:border-blue-500 focus-within:border-blue-500 focus-within:shadow-xl shadow-blue-400">
            <label className="text-sm text-gray-400" htmlFor="aportes">Promedio de Aportes:</label>
            <select
                className="px-3 focus:outline-none text-xl w-full font-semibold text-center"
                name="aportes" id="aportes" onChange={handleChange} required>
                <option key="emptyAporte" value="">-- Seleccione un Rango --</option>
                {aportes.map((aporte) => (
                    <option key={aporte.id} value={`${aporte.ajuste}-Entre ${aporte.aporteMin} y ${aporte.aporteMax}`}>Entre {aporte.aporteMin} y {aporte.aporteMax}</option>
                ))}
            </select>
        </div>
    )
}
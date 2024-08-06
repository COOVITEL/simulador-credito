import React from "react"
import useSimulatorStore from "../../store/store"

export default function Years() {

    const { updateAñoAfiliacion } = useSimulatorStore()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateAñoAfiliacion(event.target.value)
    }

    return (
        <div
            className="w-[500px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
            duration-300 ease-in-out hover:border-blue-500 focus-within:border-blue-500 focus-within:shadow-xl shadow-blue-400">
            <label
                className="text-sm text-gray-400"
                htmlFor="years">Fecha de Afiliacion:</label>
            <input
                onChange={handleChange}
                className="px-3 text-left focus:outline-none text-xl w-full font-semibold"
                type="date"
                id="years"
                min="1940"
                max="2024"
                name="years"
                placeholder="Año de Afiliación"
                required/>
        </div>
    )
}

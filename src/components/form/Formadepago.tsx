import React from "react"
import useSimulatorStore from "../../store/store"

export default function FormaPago() {

    const { updateFormadepago } = useSimulatorStore()

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        updateFormadepago(event.target.value)
    }
    return (
        <div
            className="w-[500px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
            duration-300 ease-in-out hover:border-blue-500 focus-within:border-blue-500 focus-within:shadow-xl shadow-blue-400">
            <label className="text-sm text-gray-400" htmlFor="afiliacion">Forma de pago:</label>
            <select
                className="px-3 text-left focus:outline-none text-xl w-full font-semibold text-center"
                onChange={handleSelectChange} name="afiliacion" id="afiliacion" required >
                <option key="type1" value="">-- Seleccione Tipo --</option>
                <option key="type2" value="Libranza">Libranza</option>
                <option key="type3" value="Ventanilla">Ventanilla</option>
            </select>
        </div>
    )
}
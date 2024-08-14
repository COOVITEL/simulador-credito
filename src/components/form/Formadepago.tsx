import React from "react"
import useSimulatorStore from "../../store/store"

export default function FormaPago() {

    const { updateFormadepago, tipoContrato, updateCuotaMaxima, inputAfiliacion } = useSimulatorStore()

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        updateFormadepago(event.target.value)
        if (tipoContrato == "Publico Propiedad / C.Administrativa") {
            updateCuotaMaxima(132)
        }
        if (tipoContrato == "Privado e Indefinido") {
            updateCuotaMaxima(96)
        }
        if (tipoContrato == "Pensionado Ventanilla") {
            updateCuotaMaxima(144)
        }
        if (inputAfiliacion.split("-")[1] == "Independiente") {
            updateCuotaMaxima(60)
        }
    }
    return (
        <div
            className="w-[500px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
            duration-300 ease-in-out hover:border-blue-500 focus-within:border-blue-500 focus-within:shadow-xl shadow-blue-400">
            <label className="text-sm text-gray-400" htmlFor="afiliacion">Forma de pago:</label>
            <select
                className="px-3 focus:outline-none text-xl w-full font-semibold text-center"
                onChange={handleSelectChange} name="formapago" id="formapago" required >
                <option key="type1" value="">-- Seleccione Forma de Pago --</option>
                <option key="type2" value="Libranza">Libranza</option>
                <option key="type3" value="Ventanilla">Ventanilla</option>
            </select>
        </div>
    )
}
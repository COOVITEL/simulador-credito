import React from "react"
import useSimulatorStore from "../../store/store"

export default function FormaPago() {

    const { updateFormadepago } = useSimulatorStore()

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        updateFormadepago(event.target.value)
    }
    return (
        <div className="flex flex-row justify-between my-3">
            <label htmlFor="afiliacion">Forma de pago:</label>
            <select onChange={handleSelectChange} name="afiliacion" id="afiliacion" required >
                <option key="type1" value="">-- Seleccione Tipo --</option>
                <option key="type2" value="Libranza">Libranza</option>
                <option key="type3" value="Ventanilla">Ventanilla</option>
            </select>
        </div>
    )
}
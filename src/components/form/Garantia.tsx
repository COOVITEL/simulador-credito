import { useEffect, useState } from "react"
import useSimulatorStore from "../../store/store"

export default function Garantia() {

    const {updateGarantia, inputAfiliacion, score } = useSimulatorStore()
    const [control, setControl] = useState(false)

    useEffect(() => {
        const type = inputAfiliacion.split("-")[1]
        if (type == "Pensionado Libranza" && score > 689) {
            setControl(true)
        } else {
            setControl(false)
        }
        console.log(inputAfiliacion)
        console.log(score)
    }, [inputAfiliacion, score])

    const handleChangeContrato = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        updateGarantia(value)
    }

    return (
        <div
            className="w-[500px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
            duration-300 ease-in-out hover:border-blue-500 focus-within:border-blue-500 focus-within:shadow-xl shadow-blue-400">
            <label className="text-sm text-gray-400" htmlFor="tipocontraVentanilla">Tipo de Garantia:</label>
            <select
                className="px-3 focus:outline-none text-xl w-full font-semibold text-center"
                onChange={handleChangeContrato} name="tipocontraVentanilla" id="tipocontraVentanilla" required >
                <option key="emptygaran1" value="">-- Seleccione Tipo de Garantia --</option>
                {control&&<option key="emptygaran2" value="Firma">Firma</option>}
                {!control&&<option key="emptygaran2" value="Garantia Real">Garantia Real</option>}
                {!control&&<option key="emptygaran3" value="Codeudor">Codeudor</option>}
                {!control&&<option key="emptygaran4" value="Fondo de Garantias">Fondo de Garantias</option>}                        
            </select>
        </div>
    )
}
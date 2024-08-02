import { useEffect, useState } from "react"
import { setValue } from "../../utils/setValue"
import useSimulatorStore from "../../store/store"

export default function Others() {

    const [others, setOthers] = useState("")
    const { updateOthers, garantia, inputAfiliacion, updateCuotaMaxima } = useSimulatorStore()

    useEffect(() => {
        const type = inputAfiliacion.split("-")[1]
        if (type == "Independiente") {
            if (garantia != "Garantia Real"){
                updateCuotaMaxima(60)
            } else {
                updateCuotaMaxima(84)
            }
        }
    }, [others, garantia])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value
        const newValue = setValue(val)
        setOthers(newValue)
        updateOthers(parseInt(val.replace(/\./g, '')))
    }

    return (
        <div
            className="w-[500px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
            duration-300 ease-in-out hover:border-blue-500 focus-within:border-blue-500 focus-within:shadow-xl shadow-blue-400">
            <label className="text-sm text-gray-400" htmlFor="others">Otros Ingresos:</label>
            <input
                className="px-3 text-center focus:outline-none text-xl w-full font-semibold"
                onChange={handleChange} value={others}
                type="text"
                id="others"
                name="others"
                placeholder="Otros Ingresos"
                required/>
        </div>
    )
}
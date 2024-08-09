import { useEffect, useState } from "react"
import { setValue } from "../../utils/setValue"
import useSimulatorStore from "../../store/store"
import Saludypension from "../../utils/saludypension"
import { ahorroMensual } from "../../utils/ahorroMensual"

export default function Salary() {
    
    const [salaryValue, setSalaryValue] = useState("")
    const { updateSalary, updateSaludypension, inputAfiliacion, updateAhorroMensual, añoafiliacion } = useSimulatorStore()

    useEffect(() => {
        const value = salaryValue.replace(/\./g, '')
        updateSaludypension(Saludypension(parseInt(value), inputAfiliacion))
    }, [inputAfiliacion])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value
        const newValue = setValue(val)
        setSalaryValue(newValue)
        const valueSalary = val.replace(/\./g, '')
        updateSalary(parseInt(valueSalary))
        const ahorroCurrentMensual = ahorroMensual(parseInt(valueSalary), añoafiliacion)?.toFixed(0)
        if (ahorroCurrentMensual) updateAhorroMensual(parseInt(ahorroCurrentMensual))
        if (inputAfiliacion.length > 0) {
            const salud = Saludypension(parseInt(valueSalary), inputAfiliacion).toFixed(0)
            updateSaludypension(parseInt(salud))
        }
    }

    return (
        <div
            className="w-[500px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
            duration-300 ease-in-out hover:border-blue-500 focus-within:border-blue-500 focus-within:shadow-xl shadow-blue-400">
            <label className="text-sm text-gray-400" htmlFor="salary">Salario o Pensión:</label>
            <input
                className="px-3 text-center focus:outline-none text-xl w-full font-semibold"
                onChange={handleChange}
                value={salaryValue}
                type="text"
                id="salary"
                name="salary"
                placeholder="Salario o Pensión"
                required/>
        </div>
    )
}
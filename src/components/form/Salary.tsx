import { useEffect, useState } from "react"
import { setValue } from "../../utils/setValue"
import useSimulatorStore from "../../store/store"
import Saludypension from "../../utils/saludypension"

export default function Salary() {
    
    const [salaryValue, setSalaryValue] = useState("")
    const { updateSalary, updateSaludypension, inputAfiliacion, updateAhorroMensual } = useSimulatorStore()

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
        updateAhorroMensual(parseInt(valueSalary) * 0.02)
        if (inputAfiliacion.length > 0) {
            updateSaludypension(Saludypension(parseInt(valueSalary), inputAfiliacion))
        }
    }

    return (
        <div className="flex flex-row justify-between my-3">
            <label htmlFor="salary">Salario o Pensión:</label>
            <input onChange={handleChange} value={salaryValue} className="px-4 py-1" type="text" id="salary" name="salary" placeholder="Salario o Pensión" required/>
        </div>
    )
}
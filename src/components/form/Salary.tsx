import { useState } from "react"
import { setValue } from "../../utils/setValue"
import useSimulatorStore from "../../store/store"

export default function Salary() {
    
    const [salaryValue, setSalaryValue] = useState("")
    const { updateSalary } = useSimulatorStore()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value
        const newValue = setValue(val)
        setSalaryValue(newValue)
        updateSalary(parseInt(val.replace(/\./g, '')))
    }

    return (
        <div className="flex flex-row justify-between my-3">
            <label htmlFor="salary">Salario o Pensión:</label>
            <input onChange={handleChange} value={salaryValue} className="px-4 py-1" type="text" id="salary" name="salary" placeholder="Salario o Pensión" required/>
        </div>
    )
}
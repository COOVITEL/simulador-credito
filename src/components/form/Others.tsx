import { useState } from "react"
import { setValue } from "../../utils/setValue"
import useSimulatorStore from "../../store/store"

export default function Others() {

    const [others, setOthers] = useState("")
    const { updateOthers } = useSimulatorStore()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value
        const newValue = setValue(val)
        setOthers(newValue)
        updateOthers(parseInt(val.replace(/\./g, '')))
    }

    return (
        <div className="flex flex-row justify-between my-3">
            <label htmlFor="others">Otros Ingresos:</label>
            <input onChange={handleChange} value={others} className="px-4 py-1" type="text" id="others" name="others" placeholder="Otros Ingresos" required/>
        </div>
    )
}
import { useState } from "react"
import { setValue } from "../../utils/setValue"
import useSimulatorStore from "../../store/store"

export default function Debit() {

    const [debit, setDebit] = useState("")
    const { updateDebit } = useSimulatorStore()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value
        const newValue = setValue(val)
        setDebit(newValue)
        updateDebit(parseInt(val.replace(/\./g, '')))
    }

    return (
        <div
            className="w-[500px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
            duration-300 ease-in-out hover:border-blue-500 focus-within:border-blue-500 focus-within:shadow-xl shadow-blue-400">
            <label className="text-sm text-gray-400" htmlFor="debit">Debitos:</label>
            <input
                className="px-3 text-left focus:outline-none text-xl w-full font-semibold"
                value={debit}
                onChange={handleChange}
                type="text"
                id="debit"
                name="debit"
                placeholder="Debitos"
                required></input>
        </div>
    )
}
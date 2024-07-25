import { useState } from "react"
import { setValue } from "../../utils/setValue"

export default function Debit() {

    const [debit, setDebit] = useState("")

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value
        const newValue = setValue(val)
        setDebit(newValue)
    }

    return (
        <div className="flex flex-row justify-between my-3">
            <label htmlFor="debit">Debitos:</label>
            <input value={debit} onChange={handleChange} className="px-4 py-1" type="text" id="debit" placeholder="Debitos" required></input>
        </div>
    )
}
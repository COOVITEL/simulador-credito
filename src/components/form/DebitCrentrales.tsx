import { useEffect, useState } from "react"
import { setValue } from "../../utils/setValue"
import useSimulatorStore from "../../store/store"

export default function DebitCentrales() {

    const [debitCentral, setDebitCentral] = useState("")
    const { updateValorCentrales } = useSimulatorStore()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value
        const newValue = setValue(val)
        setDebitCentral(newValue)
        updateValorCentrales(parseInt(val.replace(/\./g, '')))
    }

    useEffect(() => {
    }, [debitCentral])

    return (
        <div
            className="w-[500px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
            duration-300 ease-in-out hover:border-blue-500 focus-within:border-blue-500 focus-within:shadow-xl shadow-blue-400">
            <label className="text-sm text-gray-400" htmlFor="debit">Valor Cuotas en Centrales de Riesgos:</label>
            <input
                className="px-3 text-center focus:outline-none text-xl w-full font-semibold"
                value={debitCentral}
                onChange={handleChange}
                type="text"
                id="debit"
                name="debit"
                placeholder="Valor centrales"
                required></input>
        </div>
    )
}
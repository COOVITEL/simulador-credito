import { useEffect, useState } from "react";
import useSimulatorStore from "../../store/store";
import { Coovi } from "../../store/types";


export default function Cooviahorro() {

    const { descuentos, updateCooviahorro } = useSimulatorStore()
    const [coovi, setCoovi] = useState<Coovi[]>([])

    useEffect(() => {
        if (descuentos.cooviahorro) {
            setCoovi(descuentos.cooviahorro);
        }
    }, [descuentos])

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        updateCooviahorro(event.target.value)
    }
    
    return (
        <div
            className="w-[500px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
            duration-300 ease-in-out hover:border-blue-500 focus-within:border-blue-500 focus-within:shadow-xl shadow-blue-400">
            <label className="text-sm text-gray-400" htmlFor="cooviahorro">Cuota Cooviahorro:</label>
            <select
                className="px-3 focus:outline-none text-xl w-full font-semibold text-center"
                onChange={handleChange} name="cooviahorro" id="cooviahorro" required>
                <option key="emptyCoovi" value="">-- Seleccione un Rango --</option>
                {coovi.map((coo) => (
                    <option key={coo.id} value={`${coo.ajuste}-Entre ${coo.montoMin} y ${coo.montoMax}`}>Entre {coo.montoMin} y {coo.montoMax}</option>
                ))}
            </select>
        </div>
    )
}
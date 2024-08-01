import { useEffect, useState } from "react";
import useSimulatorStore from "../../store/store";
import { Cdat } from "../../store/types";


export default function Cdats() {

    const { descuentos, updateCdat } = useSimulatorStore()
    const [listCdat, setListCdat] = useState<Cdat[]>([])

    useEffect(() => {
        if (descuentos.cooviahorro) {
            setListCdat(descuentos.cdat);
        }
    }, [descuentos])

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        updateCdat(event.target.value)
    }

    return (
        <div
            className="w-[500px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
            duration-300 ease-in-out hover:border-blue-500 focus-within:border-blue-500 focus-within:shadow-xl shadow-blue-400">
            <label className="text-sm text-gray-400" htmlFor="cdat">Rango Cdat:</label>
            <select
                className="px-3 focus:outline-none text-xl w-full font-semibold text-center"
                onChange={handleChange} name="cdat" id="cdat" required>
                <option key="emptyCoovi" value="">-- Seleccione un Rango --</option>
                {listCdat.map((cdat) => (
                    <option key={cdat.id} value={`${cdat.ajuste}-Entre ${cdat.montoMin} y ${cdat.montoMax}`}>Entre {cdat.montoMin} y {cdat.montoMax}</option>
                ))}
            </select>
        </div>
    )
}
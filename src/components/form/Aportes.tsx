import { useEffect, useState } from "react";
import useSimulatorStore from "../../store/store";
import { Aporte } from "../../store/types";


export default function Aportes() {

    const { descuentos, inputAfiliacion } = useSimulatorStore()
    const [aportes, setAportes] = useState<Aporte[]>([])

    useEffect(() => {
        if (descuentos.aporte) {
            const setApo = descuentos.aporte.filter(apo => apo.asociado == parseInt(inputAfiliacion))
            setAportes(setApo);
        }
    }, [descuentos , inputAfiliacion])

    
    return (
        <div className="flex flex-row justify-between my-3">
            <label htmlFor="aportes">Promedio de Aportes:</label>
            <select name="aportes" id="aportes" required>
                <option key="emptyAporte" value="">-- Seleccione un Rango --</option>
                {aportes.map((aporte) => (
                    <option key={aporte.id} value={aporte.ajuste}>Entre {aporte.aporteMin} y {aporte.aporteMax}</option>
                ))}
            </select>
        </div>
    )
}
import { useEffect, useState } from "react";
import useSimulatorStore from "../../store/store";
import { Coovi } from "../../store/types";


export default function Cooviahorro() {

    const { descuentos } = useSimulatorStore()
    const [coovi, setCoovi] = useState<Coovi[]>([])

    useEffect(() => {
        if (descuentos.cooviahorro) {
            setCoovi(descuentos.cooviahorro);
        }
    }, [descuentos])

    
    return (
        <div className="flex flex-row justify-between my-3">
            <label htmlFor="cooviahorro">Cuota Cooviahorro:</label>
            <select name="cooviahorro" id="cooviahorro" required>
                <option key="emptyCoovi" value="">-- Seleccione un Rango --</option>
                {coovi.map((coo) => (
                    <option key={coo.id} value={coo.ajuste}>Entre {coo.montoMin} y {coo.montoMax}</option>
                ))}
            </select>
        </div>
    )
}
import { useEffect, useState } from "react";
import useSimulatorStore from "../../store/store";
import { Cdat } from "../../store/types";


export default function Cdats() {

    const { descuentos } = useSimulatorStore()
    const [listCdat, setListCdat] = useState<Cdat[]>([])

    useEffect(() => {
        if (descuentos.cooviahorro) {
            setListCdat(descuentos.cdat);
        }
    }, [descuentos])

    
    return (
        <div className="flex flex-row justify-between my-3">
            <label htmlFor="cdat">Rango Cdat:</label>
            <select name="cdat" id="cdat" required>
                <option key="emptyCoovi" value="">-- Seleccione un Rango --</option>
                {listCdat.map((cdat) => (
                    <option key={cdat.id} value={cdat.ajuste}>Entre {cdat.montoMin} y {cdat.montoMax}</option>
                ))}
            </select>
        </div>
    )
}
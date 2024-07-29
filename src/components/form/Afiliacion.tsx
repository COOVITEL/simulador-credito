import React from "react";
import useSimulatorStore from "../../store/store";

interface User {
    name: string;
    id: number;
}

export default function Afiliacion() {
    const { asociados, updateAfiliacion } = useSimulatorStore()

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const typeAfi = event.target.value
        updateAfiliacion(typeAfi)
    }

    return (
        <div className="flex flex-row justify-between my-3">
            <label htmlFor="afiliacion">Tipo de Afiliación:</label>
            <select onChange={handleChange} name="afiliacion" id="afiliacion" required >
                <option key="emptyAfi" value="">-- Seleccione Tipo --</option>
                {asociados.map((typeuser: User, index) => (
                    <option key={`${typeuser.name}-${index}`} value={`${typeuser.id}-${typeuser.name}`}>{typeuser.name}</option>
                ))}
            </select>
        </div>
    )
}
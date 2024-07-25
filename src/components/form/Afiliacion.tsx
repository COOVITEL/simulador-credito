interface User {
    name: string;
}

export default function Afiliacion({ typeUsers }: any) {
    return (
        <div className="flex flex-row justify-between my-3">
            <label htmlFor="afiliacion">Tipo de Afiliación:</label>
            <select name="afiliacion" id="afiliacion" required>
                <option key="emptyAfi" value="">-- Seleccione Tipo --</option>
                {typeUsers.map((typeuser: User) => (
                    <option key={typeUsers.name} value={typeuser.name}>{typeuser.name}</option>
                ))}
            </select>
        </div>
    )
}
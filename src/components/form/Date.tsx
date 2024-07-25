export default function Date() {
    return (
        <div className="flex flex-row justify-between my-3">
            <label htmlFor="date">Fecha de nacimiento:</label>
            <input className="px-4 py-1" type="date" id="date" placeholder="Fecha de Nacimiento" required/>
        </div>
    )
}
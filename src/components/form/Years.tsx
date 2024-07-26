export default function Years() {
    return (
        <div className="flex flex-row justify-between my-3">
            <label htmlFor="years">Año de afiliación:</label>
            <input className="px-4 py-1" type="number" id="years" min="1940" max="2024" name="years" placeholder="Año de Afiliacion" required/>
        </div>
    )
}
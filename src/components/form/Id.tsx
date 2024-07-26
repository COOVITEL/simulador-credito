export default function Id() {
    return (
        <div className="flex flex-row justify-between my-3">
            <label htmlFor="cedula">Numero de Identificacion</label>
            <input className="px-4 py-1" type="number" id="cedula" name="cedula" placeholder="Identificación" required/>
        </div>
    )
}
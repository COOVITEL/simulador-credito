export default function Name() {
    return (
        <div className="flex flex-row justify-between my-3">
            <label htmlFor="name">Nombre Asociado:</label>
            <input className="px-4 py-1" type="text" id="name" name="name" placeholder="Nombre Asociado" required/>
        </div>
    )
}
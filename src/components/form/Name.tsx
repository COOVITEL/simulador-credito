export default function Name() {
    return (
        <div
            className="w-[500px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
            duration-300 ease-in-out hover:border-blue-500 focus-within:border-blue-500 focus-within:shadow-xl shadow-blue-400">
            <label className="text-sm text-gray-400" htmlFor="name">Nombre Asociado:</label>
            <input
                className="px-3 text-left focus:outline-none text-xl w-full font-semibold"
                placeholder="Nombre" 
                type="text" 
                id="name" 
                name="name" 
                required
            />
        </div>
    )
}
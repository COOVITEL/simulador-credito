import useSimulatorStore from "../../store/store";

export default function Asesores() {

  const { asesores } = useSimulatorStore()

  return (
    <div
      className="w-[500px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
            duration-300 ease-in-out hover:border-blue-500 focus-within:border-blue-500 focus-within:shadow-xl shadow-blue-400">
      <label className="text-sm text-gray-400" htmlFor="cdat">Asesor:</label>
      <select
        className="px-3 focus:outline-none text-xl w-full font-semibold text-center"
        name="asesor" id="asesor" required>
        <option key="emptyAsesor" value="">-- Asesor --</option>
        {asesores.map((asesor, index) => (
          <option key={index} value={`${asesor.name}`}>{asesor.name}</option>
        ))}
      </select>
    </div>
  )
}
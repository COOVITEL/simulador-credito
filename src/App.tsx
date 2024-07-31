import { useEffect } from "react"
import { fetchMovies } from "./api/fetchData";
import FormUser from "./components/FormUser";
import useSimulatorStore from "./store/store";


function App() {

  const { updateList } = useSimulatorStore()

  useEffect(() => {
    const url = `http://127.0.0.1:8001/api/simuladorcredito/`

    const fetchAndSetMovies = async () => {
      const result = await fetchMovies(url);
      if (result) {
        const sociales = result.sociales
        const nosociales = result.nosociales
        const fidelizacion = result.fidelizacion
        const tasas = result.tasasnosociales
        const maximos = result.maximoDescuento
        const descuentos = result.descuentos
        const listasociados = result.tiposAsociados
        const salario = result.salariominimo
        updateList({
          listSo: sociales,
          listNoso: nosociales,
          listFide: fidelizacion,
          listTasas: tasas,
          listMax: maximos,
          listDes: descuentos,
          listAso: listasociados,
          salMin: salario
        })
        
      }
    };

    fetchAndSetMovies();
  }, []);

  return (
    <main className="h-full w-full flex justify-center items-center flex-col">
      <h1 className="text-5xl font-bold mt-6">Simulador Credito</h1>
      <FormUser/>
    </main>
  )
}

export default App

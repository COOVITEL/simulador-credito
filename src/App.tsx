import { useEffect } from "react"
import { fetchDatasSimualdor } from "./api/fetchData";
import FormUser from "./components/FormUser";
import useSimulatorStore from "./store/store";


function App() {

  const { updateList } = useSimulatorStore()

  useEffect(() => {
    // const url = `http://127.0.0.1:8000/api/simuladorcredito/`
    const url = `https://adminsimuladores.coovitel.coop/api/simuladorcredito/`

    const fetchDatas = async () => {
      const result = await fetchDatasSimualdor(url);

      if (result) {
        const sociales = result.sociales
        const nosociales = result.nosociales
        const fidelizacion = result.fidelizacion
        const tasas = result.tasasnosociales
        const maximos = result.maximoDescuento
        const descuentos = result.descuentos
        const listasociados = result.tiposAsociados
        const salario = result.salariominimo
        const asesores = result.asesores
        updateList({
          listSo: sociales,
          listNoso: nosociales,
          listFide: fidelizacion,
          listTasas: tasas,
          listMax: maximos,
          listDes: descuentos,
          listAso: listasociados,
          salMin: salario,
          setAsesores: asesores
        })
        
      }
    };

    fetchDatas();
  }, []);

  return (
    <main className="h-full w-full flex justify-center items-center flex-col bg-white">
      <img src="/images/credito.jpg"></img>
      <FormUser/>
    </main>
  )
}

export default App

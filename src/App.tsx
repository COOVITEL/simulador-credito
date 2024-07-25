import { useEffect, useState } from "react"
import { fetchMovies } from "./api/fetchData";
import Fidelizacion from "./components/Fidelizacion";
import FormUser from "./components/FormUser";


function App() {

  const [sociales, setSociales] = useState()
  const [noSociales, setNosociales] = useState()
  const [fidelizacion, setFidelizacion] = useState()
  const [tasas, setTasas] = useState()
  const [maximoDescuento, setMaximoDescuento] = useState()
  const [descuentos, setDescuentos] = useState()
  const [asociados, setAsociados] = useState()

  useEffect(() => {
    const url = `http://127.0.0.1:8000/api/simuladorcredito/`

    const fetchAndSetMovies = async () => {
      const result = await fetchMovies(url);
      if (result) {
        setSociales(result.sociales)
        setNosociales(result.nosociales)
        setFidelizacion(result.fidelizacion)
        setTasas(result.tasasnosociales)
        setMaximoDescuento(result.maximoDescuento)
        setDescuentos(result.descuentos)
        setAsociados(result.tiposAsociados)
      }
    };

    fetchAndSetMovies();
  }, []);

  return (
    <main className="h-full w-full flex justify-center items-center flex-col">
      <h1 className="text-5xl font-bold mt-6">Simulador Credito</h1>
      {asociados&&<FormUser typeUsers={asociados}/>}
      {/* <div>
        {fidelizacion&&<Fidelizacion datas={fidelizacion}/>}
      </div> */}
    </main>
  )
}

export default App

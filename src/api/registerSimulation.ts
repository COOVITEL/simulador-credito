import { Simulacion } from "./mapperSimulation"

export const regisSimulation = async (datas: Simulacion) => {
    const url = "https://adminsimuladores.coovitel.coop/api-registros/registros-creditos/"
    // const url = "http://127.0.0.1:8000/api-registros/registros-creditos/"
    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(datas),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${import.meta.env.VITE_TOKEN}`
            }
        })
        if (!response.ok) {
            throw new Error(`Http error, status: ${response.status}`)
        }
        return `Se realizo el registro de forma exitosa: ${response}`
    } catch(error) {
        console.log(error)
    }
}
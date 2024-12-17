import { Simulacion } from "./mapperSimulation"

export const regisSimulation = async (datas: Simulacion) => {
    const url = "http://127.0.0.1:8000/api-registros/registros-creditos/"
    try {
        const response = await (fetch(url, {
            method: "POST",
            body: JSON.stringify(datas),
            headers: {
                accept: 'application/json',
                Authorization: 'Token c75ac915b957a299350028888cf832efa86e5b1c'
            }
        }))
        if (!response.ok) {
            throw new Error(`Http error, status: ${response.status}`)
        }
        return `Se realizo el registro de forma exitosa: ${response}`
    } catch(error) {
        console.log(error)
    }
}
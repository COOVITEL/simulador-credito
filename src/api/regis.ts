import axios from "axios";

const registros = axios.create({
    baseURL: 'http://127.0.0.1:8000/api-registros/registros-creditos',
    headers: {
        Authorization: 'Token 1b1804aa491561e6d421f805e17763e56e99f2f0'
    }
})

export const postRegister = (datas: any) => registros.post('/', datas)
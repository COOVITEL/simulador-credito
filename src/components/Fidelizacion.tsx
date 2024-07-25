import { useEffect } from "react"

export default function Fidelizacion({ datas }: any) {

    return (
        <div>
            <h3>Fidelizacion</h3>
            <select name="" id="">
                <option value=""></option>
                {datas.map((data: any) => (
                    <option value={data.name}>{data.name}</option>
                ))}
            </select>
        </div>
    )
}
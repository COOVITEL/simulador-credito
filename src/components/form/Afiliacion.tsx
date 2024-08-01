import React, { useState } from "react";
import useSimulatorStore from "../../store/store";
import { tiposPensionados } from "../../utils/tiposPensiones";
import { antiguedad } from "../../utils/antiguedad";

interface User {
    name: string;
    id: number;
}

export default function Afiliacion() {
    const { asociados, updateAfiliacion, updateTipoContrato, updatePagaduria, updateTasaMaxima } = useSimulatorStore()
    const [control, setControl] = useState(0)
    const [time, setTime] = useState(false)
    const [valueTime, setValueTime] = useState("")
    const [controlTime, setControlTime] = useState(false)

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const typeAfi = event.target.value
        updateAfiliacion(typeAfi)
        const currentType = typeAfi.split("-")[1]
        if (currentType == "Empleado Convenio") {
            setControl(1)
            setTime(true)
            setControlTime(true)
        } else if (currentType == "Pensionado Libranza") {
            setTime(false)
            setControl(2)
            setControlTime(false)
            updateTasaMaxima(144)
        } else if (currentType == "Empleado o pensionado Ventanilla") {
            setControl(3)
            setTime(true)
            setControlTime(true)
        } else if (currentType == "Independiente") {
            setTime(false)
            setControlTime(false)
            updateTasaMaxima(84)
            setControl(0)
        }
    }

    const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        updateTipoContrato(value)
        if (value == "Publico Propiedad / C.Administrativa") {
            updateTasaMaxima(132)
        } else if (value == "Privado e Indefinido") {
            updateTasaMaxima(96)
        }
    }

    const handleChangePagaduria = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        updatePagaduria(value)
    }

    const handleChangeAntiguedad = (event: React.ChangeEvent<HTMLInputElement>) => {
        const time = event.target.value
        const timeAntiguedad = antiguedad(time)
        updateTasaMaxima(timeAntiguedad.number)
        setValueTime(timeAntiguedad.message)
    }

    const handleChangeContrato = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        if (value == "Indefinido, Propiedad, Carrera") {
            updateTasaMaxima(72)
        }
    }

    return (
        <div className="flex flex-col gap-6 justify-center items-center">
            <div
                className="w-[500px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
                duration-300 ease-in-out hover:border-blue-500 focus-within:border-blue-500 focus-within:shadow-xl shadow-blue-400">
                <label className="text-sm text-gray-400" htmlFor="afiliacion">Tipo de Afiliación:</label>
                <select
                    className="px-3 focus:outline-none text-xl w-full font-semibold text-center"
                    onChange={handleChange} name="afiliacion" id="afiliacion" required >
                    <option key="emptyAfi" value="">-- Seleccione Tipo Afiliación --</option>
                    {asociados.map((typeuser: User, index) => (
                        <option key={`${typeuser.name}-${index}`} value={`${typeuser.id}-${typeuser.name}`}>{typeuser.name}</option>
                    ))}
                </select>
            </div>
            {control==1&&
            <div className="flex flex-wrap gap-6 justify-center">
                <div
                    className="w-[500px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
                    duration-300 ease-in-out hover:border-blue-500 focus-within:border-blue-500 focus-within:shadow-xl shadow-blue-400">
                    <label className="text-sm text-gray-400" htmlFor="tipocontrato">Tipo de Empleado y Contrato:</label>
                    <select
                        className="px-3 focus:outline-none text-xl w-full font-semibold text-center"
                        onChange={handleChangeSelect}
                        name="tipocontrato"
                        id="tipocontrato"
                        required >
                        <option key="emptytipoempleado" value="">-- Seleccione Tipo de Empleado --</option>
                        <option key="publico1" value="Publico Propiedad / C.Administrativa">Publico Propiedad / C.Administrativa</option>
                        <option key="publico2" value="Publico Provisional / P.Servicios">Publico Provisional / P.Servicios</option>
                        <option key="privado3" value="Privado e Indefinido">Privado e Indefinido</option>
                        <option key="privado4" value="Privado T.fijo / P.Servicios">Privado T.fijo / P.Servicios</option>
                    </select>
                </div>
                <div
                    className="w-[500px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
                    duration-300 ease-in-out hover:border-blue-500 focus-within:border-blue-500 focus-within:shadow-xl shadow-blue-400">
                    <label className="text-sm text-gray-400" htmlFor="antiguedad">Antiguedad Laboral:</label>
                    <input
                        className="px-3 focus:outline-none text-xl w-full font-semibold text-center"
                        type="date"
                        name="antiguedad"
                        id="antiguedad"
                        onChange={handleChangeAntiguedad}/>
                </div>
            </div>
            }
            {control==2&&
            <div
                className="w-[500px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
                duration-300 ease-in-out hover:border-blue-500 focus-within:border-blue-500 focus-within:shadow-xl shadow-blue-400">
                <label className="text-sm text-gray-400" htmlFor="tipopagaduria">Tipo de Pagaduria:</label>
                <select
                    className="px-3 focus:outline-none text-xl w-full font-semibold text-center"
                    onChange={handleChangePagaduria} name="tipopagaduria" id="tipopagaduria" required >
                    <option key="emptytipopen" value="">-- Seleccione Tipo de Pagaduria --</option>
                    {tiposPensionados.map(tipe => (
                        <option key={tipe.name} value={tipe.name}>{tipe.name}</option>
                    ))}
                </select>
            </div>
            }
            {control==3&&
            <div className="flex flex-wrap gap-6 justify-center">
                <div
                    className="w-[500px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
                    duration-300 ease-in-out hover:border-blue-500 focus-within:border-blue-500 focus-within:shadow-xl shadow-blue-400">
                    <label className="text-sm text-gray-400" htmlFor="tipocontraVentanilla">Tipo de Contrato:</label>
                    <select
                        className="px-3 focus:outline-none text-xl w-full font-semibold text-center"
                        onChange={handleChangeContrato} name="tipocontraVentanilla" id="tipocontraVentanilla" required >
                        <option key="emptycontratoventa1" value="">-- Seleccione Tipo de Contrato --</option>
                        <option key="emptycontratoventa2" value="Indefinido, Propiedad, Carrera">Indefinido, Propiedad, Carrera</option>
                        <option key="emptycontratoventa3" value="Provisional, Fijo, P.Servicios">Provisional, Fijo, P.Servicios</option>
                    </select>
                </div>
                <div
                    className="w-[500px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
                    duration-300 ease-in-out hover:border-blue-500 focus-within:border-blue-500 focus-within:shadow-xl shadow-blue-400">
                    <label className="text-sm text-gray-400" htmlFor="antiguedad">Antiguedad Laboral:</label>
                    <input
                        className="px-3 focus:outline-none text-xl w-full font-semibold text-center"
                        type="date" name="antiguedad" id="antiguedad" onChange={handleChangeAntiguedad}/>
                </div>
            </div>
            }
            {controlTime&&<span className="text-center">{valueTime}</span>}
        </div>
    )
}
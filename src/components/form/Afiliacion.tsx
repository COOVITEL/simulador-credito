import React, { useEffect, useState } from "react";
import useSimulatorStore from "../../store/store";
import { tiposPensionados } from "../../utils/tiposPensiones";
import { antiguedad } from "../../utils/antiguedad";

interface User {
    name: string;
    id: number;
}

export default function Afiliacion() {
    const { asociados, updateAfiliacion, updateTipoContrato, updatePagaduria,
        updateCuotaMaxima, updateScoreMin, scoreMin, tipoContrato, updateControlAntiguedad, añoafiliacion, updateAntiguedad
    } = useSimulatorStore()
    const [control, setControl] = useState(0)
    const [valueTime, setValueTime] = useState("")
    const [controlTime, setControlTime] = useState(false)
    const [numberMonths, setNumberMonths] = useState(0)
    const [textAntiguedad, setTextAntiguedad] = useState(false)
    const [ventanilla, setVentanilla] = useState(false)

    useEffect(() => {
    }, [scoreMin])

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setValueTime("")
        const typeAfi = event.target.value
        updateAfiliacion(typeAfi)
        const currentType = typeAfi.split("-")[1]
        setControl(0)
        updateControlAntiguedad(false)
        if (currentType == "Empleado Convenio") {
            setControl(1)
            setControlTime(true)
        } else if (currentType == "Pensionado Libranza") {
            updateAntiguedad("")
            updateControlAntiguedad(false)
            setControl(2)
            setControlTime(false)
            updateCuotaMaxima(144)
            updateScoreMin(-5)
            setNumberMonths(0)
            updateControlAntiguedad(true)
        } else if (currentType == "Empleado o pensionado Ventanilla") {
            setControl(3)
            setControlTime(true)
            updateCuotaMaxima(60)
        } else if (currentType == "Independiente") {
            setControlTime(false)
            updateCuotaMaxima(84)
            updateScoreMin(722)
            setNumberMonths(36)
            setControl(4)
            setControlTime(true)
        }
    }

    const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        updateTipoContrato(value)
        updateControlAntiguedad(false)
        if (value == "Privado e Indefinido") {
            setNumberMonths(6)
            updateCuotaMaxima(96)
            updateScoreMin(600)
        } else if (value == "Publico Propiedad / C.Administrativa") {
            updateScoreMin(550)
            updateCuotaMaxima(132)
            setNumberMonths(1)
        } else if (value == "Privado T.fijo / P.Servicios") {
            updateScoreMin(600)
            setNumberMonths(12)
        } else if (value == "Publico Provisional / P.Servicios") {
            setNumberMonths(12)
            updateScoreMin(550)
        }
    }

    const handleChangePagaduria = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        updatePagaduria(value)
        updateTipoContrato(value)
    }

    const handleChangeAntiguedad = (event: React.ChangeEvent<HTMLInputElement>) => {
        const time = event.target.value
        updateAntiguedad(time)
        const timeAntiguedad = antiguedad(time)
        const timeAfiliacion = antiguedad(añoafiliacion).number
        setValueTime(timeAntiguedad.message)
        if (tipoContrato == "Provisional, Fijo, P.Servicios" || tipoContrato == "Publico Provisional / P.Servicios" || tipoContrato == "Privado T.fijo / P.Servicios") {
            let time = timeAntiguedad.number * 2
            let maxTime = 0
            if (tipoContrato == "Provisional, Fijo, P.Servicios") {
                maxTime = 72
            }
            if (tipoContrato == "Publico Provisional / P.Servicios") {
                if (timeAfiliacion > time) {
                    time = timeAfiliacion
                }
                maxTime = 132
            }
            if (tipoContrato == "Privado T.fijo / P.Servicios") {
                if (timeAfiliacion > time) {
                    time = timeAfiliacion
                }
                maxTime = 132
            }
            
            if (time > maxTime) {
                updateCuotaMaxima(maxTime)
            } else {
                updateCuotaMaxima(time)
            }
        }
        if (timeAntiguedad.number > 0 && timeAntiguedad.number >= numberMonths) {
            if (tipoContrato == "Indefinido, Propiedad, Carrera") {
                updateCuotaMaxima(72)
            }
            updateControlAntiguedad(true)
            setTextAntiguedad(false)
        } else {
            setTextAntiguedad(true)
            updateControlAntiguedad(false)
        }
    }

    const handleChangeContrato = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        setValueTime("")
        setTextAntiguedad(false)
        updateTipoContrato(value)
        updateScoreMin(609)
        setVentanilla(false)
        updateControlAntiguedad(false)
        if (value != "Pensionado Ventanilla") {
            setVentanilla(true)
        }
        if (value == "Pensionado Ventanilla") {
            updateControlAntiguedad(true)
            setTextAntiguedad(false)
            updateCuotaMaxima(72)
            setNumberMonths(6)
        }
        if (value == "Indefinido, Propiedad, Carrera") {
            updateCuotaMaxima(72)
            setNumberMonths(6)
        } else {
            setNumberMonths(12)
        }
    }

    return (
        <div className="flex flex-col gap-6 justify-center items-center">
            <div
                className="w-[450px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
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
                    className="w-[450px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
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
                    className="w-[450px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
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
                className="w-[450px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
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
                    className="w-[450px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
                    duration-300 ease-in-out hover:border-blue-500 focus-within:border-blue-500 focus-within:shadow-xl shadow-blue-400">
                    <label className="text-sm text-gray-400" htmlFor="tipocontraVentanilla">Tipo de Contrato:</label>
                    <select
                        className="px-3 focus:outline-none text-xl w-full font-semibold text-center"
                        onChange={handleChangeContrato} name="tipocontraVentanilla" id="tipocontraVentanilla" required >
                        <option key="emptycontratoventa1" value="">-- Seleccione Tipo de Contrato --</option>
                        <option key="emptycontratoventa2" value="Indefinido, Propiedad, Carrera">Indefinido, Propiedad, Carrera</option>
                        <option key="emptycontratoventa3" value="Provisional, Fijo, P.Servicios">Provisional, Fijo, P.Servicios</option>
                        <option key="emptycontratoventa4" value="Pensionado Ventanilla">Pensionado Ventanilla</option>
                    </select>
                </div>
                {
                ventanilla&&
                <div
                    className="w-[450px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
                    duration-300 ease-in-out hover:border-blue-500 focus-within:border-blue-500 focus-within:shadow-xl shadow-blue-400">
                    <label className="text-sm text-gray-400" htmlFor="antiguedad">Antiguedad Laboral:</label>
                    <input
                        className="px-3 focus:outline-none text-xl w-full font-semibold text-center"
                        type="date" name="antiguedad" id="antiguedad" onChange={handleChangeAntiguedad}/>
                </div>
                }
            </div>
            }
            {control==4&&
                <div
                    className="w-[450px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
                    duration-300 ease-in-out hover:border-blue-500 focus-within:border-blue-500 focus-within:shadow-xl shadow-blue-400">
                    <label className="text-sm text-gray-400" htmlFor="antiguedad">Antiguedad Laboral:</label>
                    <input
                        className="px-3 focus:outline-none text-xl w-full font-semibold text-center"
                        type="date" name="antiguedad" id="antiguedad" onChange={handleChangeAntiguedad}/>
                </div>
            }
            {controlTime&&<span className="text-center">{valueTime}</span>}
            {textAntiguedad&&<span className="text-red-600 text-xl">No cumple con la antiguedad laboral requerida</span>}
        </div>
    )
}
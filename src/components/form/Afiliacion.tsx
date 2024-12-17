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
    const [controlAntiguedad, setControlAntiguedad] = useState(false)

    useEffect(() => {
    }, [scoreMin])

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setValueTime("")
        const typeAfi = event.target.value
        updateAfiliacion(typeAfi)
        const currentType = typeAfi.split("-")[1]
        setControl(0)
        updateControlAntiguedad(false)
        setControlAntiguedad(false)
        if (currentType == "Empleado Convenio Publico") {
            setControl(1)
            setControlTime(true)
        } else if (currentType == "Empleado Convenio Privado") {
            setControl(4)
            setControlTime(true)
        } else if (currentType == "Pensionado Libranza") {
            updateAntiguedad("")
            updateControlAntiguedad(false)
            setControl(2)
            setControlTime(false)
            updateCuotaMaxima(parseInt(import.meta.env.VITE_MAXCUOTAS_PENSIONADO))
            updateScoreMin(parseInt(import.meta.env.VITE_MINSCORE_PENSIONADO))
            setNumberMonths(0)
            updateControlAntiguedad(true)
        } else if (currentType == "Empleado o pensionado Ventanilla") {
            setControl(3)
            setControlTime(true)
            updateCuotaMaxima(parseInt(import.meta.env.VITE_MAXCUOTAS_EMPLEADOPENSIONADOVEN))
        } else if (currentType == "Independiente con Garantía Real") {
            setControlTime(false)
            updateCuotaMaxima(parseInt(import.meta.env.VITE_MAXCUOTAS_INDEPENDIENTE_CON_GARANTIA))
            updateScoreMin(parseInt(import.meta.env.VITE_MINSCORE_INDEPENDIENTE_CON_GARANTIA))
            setNumberMonths(36)
            setControlAntiguedad(true)
            setControlTime(true)
        } else if (currentType == "Independiente sin Garantía Real") {
            setControlTime(false)
            updateCuotaMaxima(parseInt(import.meta.env.VITE_MAXCUOTAS_INDEPENDIENTE))
            updateScoreMin(parseInt(import.meta.env.VITE_MINSCORE_INDEPENDIENTE))
            setNumberMonths(36)
            setControlAntiguedad(true)
            setControlTime(true)
        }
    }

    const handleChangeSelectPublico = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setControlAntiguedad(true)
        const value = event.target.value
        updateTipoContrato(value)
        updateControlAntiguedad(false)
        if (value == "Privado e Indefinido") {
            setNumberMonths(6)
            updateCuotaMaxima(parseInt(import.meta.env.VITE_MAXCUOTAS_PRIVADOEINDEFINIDO))
            updateScoreMin(parseInt(import.meta.env.VITE_MINSCORE_PRIVADOEINDEFINIDO))
        } else if (value == "Publico Propiedad / C.Administrativa") {
            updateScoreMin(parseInt(import.meta.env.VITE_MINSCORE_PUBLICO_PROPIEDAD_CADMINISTRATIVA))
            updateCuotaMaxima(parseInt(import.meta.env.VITE_MAXCUOTAS_PUBLICO_PROPIEDAD_CADMINISTRATIVA))
            setNumberMonths(1)
        } else if (value == "Privado T.fijo / P.Servicios") {
            updateScoreMin(600)
            updateScoreMin(parseInt(import.meta.env.VITE_MINSCORE_PRIVADO_TERMINOFIJO_PSERVICIOS))
            setNumberMonths(12)
        } else if (value == "Publico Provisional / P.Servicios") {
            setNumberMonths(12)
            updateScoreMin(parseInt(import.meta.env.VITE_MINSCORE_PUBLICOPROVISIONAL))
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
                maxTime = 96
            }
            
            if (time > maxTime) {
                updateCuotaMaxima(maxTime)
            } else {
                updateCuotaMaxima(time)
            }
        }
        if (timeAntiguedad.number > 0 && timeAntiguedad.number >= numberMonths) {
            if (tipoContrato == "Indefinido, Propiedad, Carrera") {
                updateCuotaMaxima(parseInt(import.meta.env.VITE_MAXCUOTAS_INDEFINIDO))
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
        updateScoreMin(parseInt(import.meta.env.VITE_MINSCORE))
        setVentanilla(false)
        updateControlAntiguedad(false)
        if (value !== "Pensionado Ventanilla") {
            setVentanilla(true)
        }
        if (value === "Pensionado Ventanilla") {
            updateControlAntiguedad(true)
            setTextAntiguedad(false)
            updateCuotaMaxima(parseInt(import.meta.env.VITE_MAXCUOTAS_PENSIONADO_VENTANILLA))
            setNumberMonths(6)
        }
        if (value == "Indefinido, Propiedad, Carrera") {
            updateCuotaMaxima(parseInt(import.meta.env.VITE_MAXCUOTAS_INDEFINIDO))
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
                        onChange={handleChangeSelectPublico}
                        name="tipocontrato"
                        id="tipocontrato"
                        required >
                        <option key="emptytipoempleado" value="">-- Seleccione Tipo de Empleado --</option>
                        <option key="publico1" value="Publico Propiedad / C.Administrativa">Publico Propiedad / C.Administrativa</option>
                        <option key="publico2" value="Publico Provisional / P.Servicios">Publico Provisional / P.Servicios</option>
                    </select>
                </div>
            </div>
            }
            {control==4&&
            <div className="flex flex-wrap gap-6 justify-center">
                <div
                    className="w-[450px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
                    duration-300 ease-in-out hover:border-blue-500 focus-within:border-blue-500 focus-within:shadow-xl shadow-blue-400">
                    <label className="text-sm text-gray-400" htmlFor="tipocontrato">Tipo de Empleado y Contrato:</label>
                    <select
                        className="px-3 focus:outline-none text-xl w-full font-semibold text-center"
                        onChange={handleChangeSelectPublico}
                        name="tipocontrato"
                        id="tipocontrato"
                        required >
                        <option key="emptytipoempleado" value="">-- Seleccione Tipo de Empleado --</option>
                        <option key="privado3" value="Privado e Indefinido">Privado e Indefinido</option>
                        <option key="privado4" value="Privado T.fijo / P.Servicios">Privado T.fijo / P.Servicios</option>
                    </select>
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
            {controlAntiguedad&&
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
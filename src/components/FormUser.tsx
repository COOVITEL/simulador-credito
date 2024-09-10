import React, { useState } from "react"
import Name from "./form/Name";
import Id from "./form/Id";
import Date from "./form/Date";
import Years from "./form/Years";
import Afiliacion from "./form/Afiliacion";
import Salary from "./form/Salary";
import Others from "./form/Others";
import Debit from "./form/Debit";
import Score from "./form/Score";
import Aportes from "./form/Aportes";
import useSimulatorStore from "../store/store";
import Cooviahorro from "./form/Cooviahorro";
import Cdats from "./form/Cdat";
import Sociales from "./Sociales";
import Fidelizaciones from "./Fidelizacion";
import Nosociales from "./NoSociales";
import { Dialog } from "./Dialog";
import Garantia from "./form/Garantia";
import FormaPago from "./form/Formadepago";
import DebitCentrales from "./form/DebitCrentrales";

export default function FormUser() {

    const { inputAfiliacion, updateDatasAsociado, controlAntiguedad } = useSimulatorStore()
    const [controlType, setControlType] = useState(0)
    const [dialog, setDialog] = useState(false)
    const [contorlMonto, setControlMonto] = useState(false)
    const smmlv = parseInt(import.meta.env.VITE_SMMLV)
    // const smmlv = 1300000
    
    // Controlador para el formulario
    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        // Traemos los datos ingresado en el formulario
        const fields = Object.fromEntries(new window.FormData(event.target))
        const monto = fields.monto
        setControlMonto(false)
        // Este controlador busca que el monto ingresado no sea menor a $1.300.000 el cual es el salario minimo
        if (typeof monto === 'string') {
            const currentMonto = parseInt(monto.replace(/\./g, ''))
            if (currentMonto >= smmlv) {
                setControlMonto(false)
                updateDatasAsociado(fields)
                setDialog(true)
            } else {
                setControlMonto(true)
            }
        }
    }

    return (
        <div className="w-[80%] m-10">
            {dialog&&<Dialog setDialog={setDialog}/>}
            <form className="flex flex-col justify-center items-center gap-10 p-8" action="" onSubmit={handleSubmit}>
                <div className="flex flex-wrap gap-6 justify-center">
                    <Name />
                    <Id />
                </div>
                <div className="flex flex-wrap gap-6 justify-center">
                    <Date />
                    <Years />
                </div>
                <div className="flex flex-wrap gap-6 justify-center">
                    <Afiliacion/>
                </div>
                {
                controlAntiguedad &&
                <div className="flex flex-col gap-8 justify-center items-center">
                    <div className="flex flex-wrap gap-6 justify-center">
                        <FormaPago />
                    </div>
                    <div className="flex flex-wrap gap-6 justify-center">
                        <Score />
                        <Garantia />
                    </div>
                    <div className="flex flex-wrap gap-6 justify-center">
                        <Salary />
                        <Others />
                    </div>
                    <div className="flex flex-wrap gap-6 justify-center">
                        <Debit />
                        <DebitCentrales />
                    </div>
                    <div className="flex flex-wrap gap-6 justify-center">
                        <Cooviahorro />
                        <Cdats />
                    </div>
                    <div className="flex flex-wrap gap-6 justify-center">
                        {inputAfiliacion&&<Aportes />}
                    </div>
                    <div
                        className="w-full flex border-spacing-1 flex-row justify-around bg-gray-200 rounded-lg m-6
                        text-2xl font-semibold border-2 border-gray-300">
                        <button
                            className={controlType === 0 ? 'bg-[#2D2D83] duration-500 text-white w-[33.3%] px-4 py-1 rounded-lg' : `text-[#2D2D83] duration-500 w-[33.3%] px-4 py-1 rounded-lg`}
                            type="button"
                            onClick={() => setControlType(0)}>No Sociales</button>
                        <button
                            className={controlType === 1 ? 'bg-[#2D2D83] duration-500 text-white w-[33.3%] px-4 py-1 rounded-lg' : 'text-[#2D2D83] w-[33.3%] duration-500 px-4 py-1 rounded-lg'}
                            type="button"
                            onClick={() => setControlType(1)}>Sociales</button>
                        <button
                            className={controlType === 2 ? 'bg-[#2D2D83] duration-500 text-white w-[33.3%] px-4 py-1 rounded-lg' : 'text-[#2D2D83] w-[33.3%] duration-500 px-4 py-1 rounded-lg'}
                            type="button"
                            onClick={() => setControlType(2)}>Fidelización</button>
                    </div>
                    {controlType==0&&<Nosociales montoControl={contorlMonto} />}
                    {controlType==1&&<Sociales montoControl={contorlMonto} />}
                    {controlType==2&&<Fidelizaciones montoControl={contorlMonto} />}

                    <button
                    className="bg-[#1D71B9] w-[400px] rounded-xl text-2xl font-semibold text-white py-2 border-2
                    hover:scale-105 hover:bg-[#2D2D83] duration-300">
                        Calcular
                    </button>
                    </div>
                }
            </form>
        </div>
    )
}
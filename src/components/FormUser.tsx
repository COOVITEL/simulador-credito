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
import FormaPago from "./form/Formadepago";
import Fidelizaciones from "./Fidelizacion";
import Nosociales from "./NoSociales";


export default function FormUser() {

    const { inputAfiliacion } = useSimulatorStore()
    const store = useSimulatorStore()
    const [controlType, setControlType] = useState(2)

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        const fields = Object.fromEntries(new window.FormData(event.target))
        console.log(fields)
        console.log(store)
    }

    return (
        <div className="m-10">
            <form className="flex flex-col justify-center bg-slate-200 p-8 rounded-xl border-blue-200 border-2" action="" onSubmit={handleSubmit}>
                <Name />
                <Id />
                <Date />
                <Years />
                <Afiliacion/>
                <FormaPago />
                <Salary />
                <Others />
                <Debit />
                <Score />
                <Cooviahorro />
                <Cdats />
                {inputAfiliacion&&<Aportes />}
                <div className="flex border-spacing-1 flex-row justify-around bg-gray-300 rounded-lg m-6">
                    <button
                        className={controlType === 0 ? 'bg-blue-400 px-4 py-1 rounded-lg' : `px-4 py-1 rounded-lg`}
                        type="button"
                        onClick={() => setControlType(0)}>Fideliacion</button>
                    <button
                        className={controlType === 1 ? 'bg-blue-400 px-4 py-1 rounded-lg' : 'px-4 py-1 rounded-lg'}
                        type="button"
                        onClick={() => setControlType(1)}>Sociales</button>
                    <button
                        className={controlType === 2 ? 'bg-blue-400 px-4 py-1 rounded-lg' : 'px-4 py-1 rounded-lg'}
                        type="button"
                        onClick={() => setControlType(2)}>No Sociales</button>
                </div>
                {controlType==0&&<Fidelizaciones />}
                {controlType==1&&<Sociales />}
                {controlType==2&&<Nosociales />}

                <button>Enviar</button>
            </form>
        </div>
    )
}
import React from "react"
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


export default function FormUser() {

    const { inputAfiliacion } = useSimulatorStore()
    const store = useSimulatorStore()

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        const fields = Object.fromEntries(new window.FormData(event.target))
        console.log(fields)
        console.log(store)
        const garantias = store.fondoGarantias()
        console.log(garantias)
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
                {/* <Fidelizaciones /> */}
                <Sociales />
                <button>Enviar</button>
            </form>
        </div>
    )
}
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


export default function FormUser({ typeUsers }: any) {

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        const fields = Object.fromEntries(new window.FormData(event.target))
        console.log(fields)
    }


    return (
        <div className="m-10">
            <form className="flex flex-col justify-center bg-slate-200 p-8 rounded-xl border-blue-200 border-2" action="" onSubmit={handleSubmit}>
                <Name />
                <Id />
                <Date />
                <Years />
                <Afiliacion typeUsers={typeUsers}/>
                <Salary />
                <Others />
                <Debit />
                <Score />
                <button>Enviar</button>
            </form>
        </div>
    )
}
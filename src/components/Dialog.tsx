import { useEffect } from "react"
import useSimulatorStore from "../store/store"
import { setValue } from "../utils/setValue"

interface DialogProps {
    setDialog: React.Dispatch<React.SetStateAction<boolean>>;
  }

export function Dialog({ setDialog }: DialogProps) {

    const store = useSimulatorStore()

    useEffect(() => {
    }, [store])

    const handleClose = () => {
        setDialog(false)
    }

    const reload = () => {
        window.location.reload()
    }

    return (
        <div className="fixed top-1/2 left-1/2 w-[90%] h-[90%] bg-gray-100 border-2 border-gray-300 rounded-xl
                transform -translate-x-1/2 -translate-y-1/2 shadow-[0_10px_20px_rgba(0,0,0,0.2)]">
            <div className="flex flex-col justify-center items-center">
                <button className="fixed top-4 right-4" onClick={handleClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40"  height="40"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-square-rounded-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10l4 4m0 -4l-4 4" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /></svg>
                </button>
                <button onClick={reload} className="fixed bottom-8 right-16 px-4 py-1 text-lg font-semibold duration-300 text-white rounded-lg bg-[#1D71B9] hover:bg-[#2D2D83]">
                    Nueva Simulacion
                </button>
                <h3 className="text-3xl text-[#2D2D83] font-semibold m-4">Simulacion {store.datasAsociado.name}</h3>
                <div className="w-[80%] flex flex-row justify-between text-lg">
                    <div className="w-[45%] flex flex-col gap-1">
                        <div className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Numero Identificacion: </p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{store.datasAsociado.cedula}</p>
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Fecha nacimiento:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{store.datasAsociado.date}</p>
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Año de afiliación:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{store.datasAsociado.years}</p>  
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Tipo de Afiliación:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{store.datasAsociado.afiliacion.split("-")[1]}</p>  
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Tipo de contrato:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{store.datasAsociado.tipocontrato}</p>  
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Angiguedad Laboral:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{store.datasAsociado.antiguedad}</p>
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Salario:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{store.datasAsociado.salary}</p>  
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Otros Ingreso:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{store.datasAsociado.others}</p>  
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Debitos:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{store.datasAsociado.debit}</p>  
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Salud y Pension:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{setValue(store.saludypension.toString())}</p>  
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Ahorro:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{setValue(store.ahorroMensual.toString())}</p>  
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Capacidad de Pago:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{setValue(store.capacidadPago.toString())}</p>
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Cooviahorro:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{store.cooviahorro.split("-")[1]}</p>  
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Cdat:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{store.cdat.split("-")[1]}</p>  
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Promedio Aportes:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{store.aportes.split("-")[1]}</p>  
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Aportes:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{store.datasAsociado.numberAportes ? store.datasAsociado.numberAportes : "No Aplica"}</p>  
                        </div>
                    </div>
                    <div className="w-[45%] flex flex-col gap-1">
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Linea de Crédito:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{store.datasAsociado.typeCredit}</p>
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Forma de pago:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{store.datasAsociado.formapago}</p>
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Score:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{store.score}</p>
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Monto Solicitado:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{store.datasAsociado.monto}</p>
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Plazo:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{store.datasAsociado.cuotas}</p>
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Tasa Crédito:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{store.tasa}</p>
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Beneficio Tasa:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{store.beneficionTasa}</p>
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Tasa con Beneficio:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{store.tasaDescuento == 0 ? store.tasa : store.tasaDescuento}</p>
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Tarifa Seguro de Vida Deudores:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">0.088% x millon</p>
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Valor Cuota(Seguro Incluído):</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">${setValue(store.pagoMensual.toString())}</p>
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Garantia:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{store.garantia == "" ? store.garantia : "F.G."}</p>
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Valor FG+IVA:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">${setValue(store.fondo.toString())}</p>
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Interes anticipados Presente Mes:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">********</p>
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Monto a desemboldar:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">${setValue((store.monto - store.fondo).toString())}</p>
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Monto maximo a Solicitar:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">${setValue(store.montoMax.toString())}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
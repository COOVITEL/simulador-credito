import { useEffect, useState } from "react"
import useSimulatorStore from "../store/store"
import { setValue } from "../utils/setValue"
import { diasInteres } from "../utils/diasInteresAnticipado";
import { downloadPFD } from "../utils/downloadPDF";
import { CapacidadPago } from "../utils/capacidadPago";
import { calculateYears } from "../utils/edadAsociado";

interface DialogProps {
    setDialog: React.Dispatch<React.SetStateAction<boolean>>;
  }

// Este componente crea y controla el dialog el cual muestra todos los datos en la simulacion en caso de que pase los controles,
// Esto permite al asesor ver si cumple con la necesidad del asociado para que en caso tal pueda hacer cambios en los montos o plazos, o generar el certificado PDF
export function Dialog({ setDialog }: DialogProps) {

    const store = useSimulatorStore()
    const tasaDes = store.tasaDescuento == 0 ? store.tasa.toFixed(3) : store.tasaDescuento.toFixed(3)
    const [loading, setLoading] = useState(false)
    const [controlAge, setControlAge] = useState(false)
    const [controlMonto, setControlMonto] = useState(false)
    const [valorGarantias, setValorGarantias] = useState("")
    const [tipoGarantia, setTipoGarantia] = useState("")

    // HandleDownload llama a la funcion downloadPDF la cual crea y descarga el certificado los los datos de la simulacion
    const handleDownloads = async () => {
        setLoading(true);
        setTimeout(() => {
            downloadPFD({ datas: store })
            setLoading(false);
        }, 2000);
    };

    useEffect(() => {
        if (store.monto >= 150000000) {
            setControlMonto(true)
        }
        const años = calculateYears(store.datasAsociado.date)
        if (años) {
            setControlAge(true)
        }
        console.log(store.garantia)
        // Obtener el mensaje de la garantia
        if (store.garantia == "Fondo de Garantias") {
            setValorGarantias(`$ ${setValue(store.fondo.toString())}`)
            setTipoGarantia("Fondo de Garantias")
        }
        else if (Number(store.tasaAfiancol) > 0) {
            setValorGarantias(`${store.tasaAfiancol}%  mensual sobre saldos de capital`)
            setTipoGarantia("Afiancol")
        }
        else if (store.garantia == "Garantia Real") {
            setValorGarantias("0")
            setTipoGarantia("Garantia Real")
        }
        else if (store.garantia == "Codeudor") {
            setValorGarantias("0")
            setTipoGarantia("Codeudor")
        }
        else if (store.garantia == "Aportes") {
            setValorGarantias("0")
            setTipoGarantia("Aportes")
        } else {
            setValorGarantias("0")
            setTipoGarantia(store.garantia)
        }
        console.log(store.garantia)
    }, [store])

    /// Cierrar el dialog
    const handleClose = () => {
        setDialog(false)
    }

    // Hace un reload of the page para iniciar una nueva simulacion
    const reload = () => {
        window.location.reload()
    }



    return (
        <div className="w-full h-full fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] z-50">
            <div className="fixed top-1/2 left-1/2 w-[90%] h-[90vh] bg-gray-100 border-2 border-gray-300 rounded-xl
                            transform -translate-x-1/2 -translate-y-1/2 shadow-[0_10px_20px_rgba(0,0,0,0.2)]">
              <div className="flex flex-col justify-center items-center gap-6 overflow-y-auto max-h-full pt-56">
                <button className="fixed top-4 right-4" onClick={handleClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40"  height="40"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-square-rounded-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10l4 4m0 -4l-4 4" /><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" /></svg>
                </button>
                <h3 className="text-3xl text-[#2D2D83] font-semibold m-2">Simulacion {store.datasAsociado.name}</h3>
                <div className="w-[80%] flex flex-row justify-between text-md">
                    <div className="w-[48%] flex flex-col gap-1">
                        <div className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Numero Identificacion: </p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{store.datasAsociado.cedula}</p>
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Fecha nacimiento:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{store.datasAsociado.date}</p>
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Fecha de afiliación:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{store.añoafiliacion}</p>  
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Tipo de Afiliación:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{store.datasAsociado.afiliacion.split("-")[1]}</p>  
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Tipo de contrato o Pagaduria:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{store.tipoContrato ? store.tipoContrato : "No Aplica"}</p>  
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Antiguedad Laboral:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{store.antiguedad ? store.antiguedad : "No Aplica"}</p>
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Salario:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">$ {store.datasAsociado.salary}</p>  
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Otros Ingreso:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">$ {store.datasAsociado.others}</p>  
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Valor Cuotas en Desprendibles:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">$ {store.datasAsociado.debit}</p>  
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Valor Cuotas en Centrales:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">$ {store.datasAsociado.debitCentrales}</p>  
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Salud y Pension:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">$ {setValue(store.saludypension.toString())}</p>  
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Aportes Mensual:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">$ {setValue(store.ahorroMensual.toString())}</p>  
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Capacidad de Descuento:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">$ {setValue(store.capacidadPago.toString())}</p>
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Capacidad de Pago:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">
                                {CapacidadPago(store.valorCentrales, store.debit, store.salary, store.others, store.saludypension, store.ahorroMensual)} %
                            </p>
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

                    <div className="w-[48%] flex flex-col gap-1">
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Linea de Crédito:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{store.datasAsociado.typeCredit.split("-")[0]}</p>
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Forma de Pago:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{store.formadepago}</p>
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Score:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{store.score}</p>
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Monto Solicitado:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">$ {store.datasAsociado.monto}</p>
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Plazo:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{store.datasAsociado.cuotas}</p>
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Tasa Crédito:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{store.tasa}% NMV</p>
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Beneficio Tasa:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{
                                store.beneficionTasa ? store.beneficionTasa.toFixed(3) : "0"
                            } %</p>
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Tasa con Beneficio:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">{
                                store.beneficionTasa ? tasaDes : store.tasa.toFixed(3)
                            }% NMV</p>
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Tarifa Seguro de Vida Deudores:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">0.00123%</p>
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Valor Cuota(Seguro Incluído):</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">${setValue(store.pagoMensual.toString())}</p>
                        </div>

                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">
                                {
                                    store.tasaAfiancol > 0 
                                    ? "Tasa Afiancol:"
                                    : "Valor FG+IVA"
                                }
                            </p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">
                                {valorGarantias}
                            </p>
                        </div>

                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Interes anticipados Presente Mes:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">$ {setValue(diasInteres(store.monto, store.tasa).toString())}</p>
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Monto a desemboldar:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">$ 
                                {store.garantia == "Fondo de Garantias" ? setValue((store.monto - store.fondo - diasInteres(store.monto, store.tasa)).toString()) : setValue((store.monto - diasInteres(store.monto, store.tasa)).toString())}
                            </p>
                        </div>
                        <div  className="flex flex-row justify-between border-2 border-gray-500 rounded-lg">
                            <p className="bg-blue-200 w-[50%] px-2 py-1 font-semibold">Tipo de Garantia:</p>
                            <p className="w-[50%] h-full text-center items-center align-middle px-2 py-1 font-semibold">
                                {tipoGarantia}
                            </p>
                        </div>
                    </div>
                </div>
                {
                    (controlMonto && !controlAge) &&
                    <p className="text-red-500 font-bold">Su solicitud supera los $150.000.000 de pesos, recuerde anexar el formato de POLIZA DE VIDA GRUPO DEUDOR MAPFRE SEGUROS COOVITEL.</p>
                }
                {
                    (controlAge && !controlMonto) &&
                    <p className="text-red-500 font-bold">Su edad supera los 70 años, recuerde anexar el formato de POLIZA DE VIDA GRUPO DEUDOR MAPFRE SEGUROS COOVITEL.</p>
                }
                {
                    (controlAge && controlMonto) &&
                    <p className="text-red-500 font-bold">Su solicitud supera los $150.000.000 de pesos y los 70 años, recuerde anexar el formato de POLIZA DE VIDA GRUPO DEUDOR MAPFRE SEGUROS COOVITEL.</p>
                }
                <div className="flex flex-row gap-12">
                    <button onClick={reload} className="px-4 py-1 mb-4 text-lg font-semibold duration-300 text-white rounded-lg bg-[#1D71B9] hover:bg-[#2D2D83]">
                        Nueva Simulacion
                    </button>
                    {
                        (controlAge || controlMonto)
                        &&
                        <a
                            href="/documents/SOLICITUD VIDA GRUPO DEUDORES FORMATO MANUAL.XLSX"
                            target="_black"
                            className="px-4 py-1 mb-4 text-lg font-semibold duration-300 text-white rounded-lg bg-[#1D71B9] hover:bg-[#2D2D83]"
                            >
                            Formato Poliza
                        </a>
                    }
                    <button
                        className="px-4 py-1 mb-4 text-lg font-semibold duration-300 text-white rounded-lg bg-[#1D71B9] hover:bg-[#2D2D83]"
                        onClick={handleDownloads}>
                        {loading ? 'Generando...' : 'Descargar Comprobante'}
                    </button>
                </div>
            </div>
            </div>
        </div>
    )
}
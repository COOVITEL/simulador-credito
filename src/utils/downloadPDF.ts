import jsPDF from "jspdf";
import { setValue } from "./setValue";
import { diasInteres } from "./diasInteresAnticipado";
import { CapacidadPago } from "./capacidadPago";
import { tasaAnual } from "./tasaAnual";

interface DownloadPFDProps {
    datas: any;
  }

export function downloadPFD ( {datas}: DownloadPFDProps) {
  try {

    const doc = new jsPDF();
    
    // Cuadro superior
    doc.roundedRect(10, 10, 190, 28, 2, 2)
    doc.line(10, 32, 200, 32)

    doc.addImage('images/logo.png', 'PNG', 11, -5, 50, 55)

    // Cuadro Izquierdo
    doc.setFillColor(242, 242, 252)
    doc.setDrawColor(0, 0, 0)
    doc.roundedRect(10, 50, 90, 89, 2, 2, 'DF')
    doc.line(49, 50, 49, 139)

    // Cuadro Derecho
    doc.setFillColor(242, 242, 252)
    doc.setDrawColor(0, 0, 0)
    doc.roundedRect(110, 50, 90, 100, 2, 2, 'DF')
    doc.line(154, 50, 154, 117)


    // Cuadro abajo
    doc.setFillColor(242, 242, 252)
    doc.setDrawColor(0, 0, 0)
    doc.roundedRect(30, 165, 150, 28, 2, 2, 'DF')
    doc.line(105, 165, 105, 193)

    // Fecha 
    doc.setFontSize(7)
    const now = new Date()
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hour = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    doc.setFont("helvetica", "bold");
    doc.text(`${day}/${month}/${year}  ${hour}:${min}:${seconds}`, 25, 16)
    doc.setFont("helvetica", "normal");

    doc.setFontSize(11)
    doc.line(65, 10, 65, 32)
    doc.setFont("helvetica", "bold");
    doc.text("FORMATO SIMULADOR DE CREDITO", 75, 23)
    doc.setFont("helvetica", "normal");
    doc.line(152, 10, 152, 32)


    doc.setFontSize(9)
    doc.text("CÓDIGO: COV-GPS-FMT-006", 155, 15)
    doc.line(152, 16, 200, 16)
    doc.text("VERSIÓN: 3", 155, 20)
    doc.line(152, 21.5, 200, 21.5)
    doc.text("FECHA: Agosto 01 de 2024", 155, 25)
    doc.line(152, 26.5, 200, 26.5)
    doc.text("Página 1 de 1", 155, 30)
    
    
    doc.setFontSize(9)
    doc.setFont("helvetica", "bold");
    doc.text("PROCESO: GESTIÓN DE PRODUCTOS Y SERVICIOS", 65, 36)
    
    doc.setFontSize(12)
    doc.text("Información Asociado", 35, 46)
    doc.text("Condiciones de la Simulación", 125, 46)
    doc.setFont("helvetica", "normal");

    // Titulos de cuadro Izquierdo
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9)
    doc.text("Nombre de Asociado", 12, 55)
    doc.setFontSize(9)
    doc.setFont("helvetica", "bold");
    doc.line(10, 56.5, 100, 56.5)
    doc.text("Numero Identificación", 12, 60.5)
    doc.line(10, 62, 100, 62)
    doc.text("Tipo de Asociado", 12, 66)
    doc.line(10, 67.5, 100, 67.5)
    doc.text("Tipo de Contrato", 12, 71.5)
    doc.line(10, 73, 100, 73)
    doc.text("Antiguedad Laboral", 12, 77)
    doc.line(10, 78.5, 100, 78.5)
    doc.text("Salario o Pensión", 12, 82.5)
    doc.line(10, 84, 100, 84)
    doc.text("Otros Ingresos", 12, 88)
    doc.line(10, 89.5, 100, 89.5)
    doc.text("Valor Desprendibles", 12, 93.5)
    doc.line(10, 95, 100, 95)
    doc.text("Valor Centrales", 12, 99)
    doc.line(10, 100.5, 100, 100.5)
    doc.text("Salud y Pensión", 12, 104.5)
    doc.line(10, 106, 100, 106)
    doc.text("Aportes Mensual", 12, 110)
    doc.line(10, 111.5, 100, 111.5)
    doc.setFontSize(8.5)
    doc.text("Capacidad de Descuento", 12, 115.5)
    doc.line(10, 117, 100, 117)
    doc.setFontSize(9)
    doc.text("Capacidad de Pago", 12, 121)
    doc.line(10, 122.5, 100, 122.5)
    doc.text("Cooviahorro", 12, 126.5)
    doc.line(10, 128, 100, 128)
    doc.text("CDAT", 12, 132)
    doc.line(10, 133.5, 100, 133.5)
    doc.text("Promedio Saldo", 12, 137.5)

    // Datos del cuadro izquierdo
    doc.setFontSize(8)
    doc.setFont("helvetica", "normal");
    doc.text(datas.datasAsociado.name, 50, 55)
    doc.setFontSize(9)
    doc.text(datas.datasAsociado.cedula, 50, 60.5)
    doc.text(datas.datasAsociado.afiliacion.split("-")[1], 50, 66)
    const contrato = datas.tipoContrato ? datas.tipoContrato : "No Aplica"
    doc.setFontSize(8)
    doc.text(contrato, 50, 71.5)
    doc.setFontSize(9)
    const antiguedad = datas.antiguedad ? datas.antiguedad : "No Aplica"
    doc.text(antiguedad, 50, 77)
    doc.text(`$ ${datas.datasAsociado.salary}`, 50, 82.5)
    doc.text(`$ ${datas.datasAsociado.others}`, 50, 88)
    doc.text(`$ ${datas.datasAsociado.debit}`, 50, 93.5)
    doc.text(`$ ${datas.datasAsociado.debitCentrales}`, 50, 99)
    doc.text(`$ ${setValue(datas.saludypension.toString())}`, 50, 104.5)
    doc.text(`$ ${setValue(datas.ahorroMensual.toString())}`, 50, 110)
    doc.text(`$ ${setValue(datas.capacidadPago.toString())}`, 50, 115.5)
    doc.text(`${CapacidadPago(datas.valorCentrales, datas.debit, datas.salary, datas.others, datas.saludypension, datas.ahorroMensual)} %`, 50, 121)
    doc.text(datas.cooviahorro.split("-")[1], 50, 126.5)
    doc.text(datas.cdat.split("-")[1], 50, 132)
    doc.text(datas.aportes.split("-")[1], 50, 137.5)


    doc.setFontSize(9)
    doc.setFont("helvetica", "bold");
    doc.text("Linea de Crédito", 112, 55)
    doc.line(110, 56.5, 200, 56.5)
    doc.text("Forma de Pago", 112, 60.5)
    doc.line(110, 62, 200, 62)
    doc.text("Puntaje Score", 112, 66)
    doc.line(110, 62, 200, 62)
    doc.text("Monto Préstamo", 112, 71.5)
    doc.line(110, 67.5, 200, 67.5)
    doc.text("Plazo", 112, 77)
    doc.line(110, 73, 200, 73)
    doc.text("Tasa Crédito", 112, 82.5)
    doc.line(110, 78.5, 200, 78.5)
    doc.text("Beneficio Tasa Asociado", 112, 88)
    doc.line(110, 84, 200, 84)
    doc.text("Tasa con Beneficio", 112, 93.5)
    doc.line(110, 89.5, 200, 89.5)
    doc.setFontSize(8.5)
    doc.text("Tarifa Seguro de Vida", 112, 99)
    doc.line(110, 95, 200, 95)
    doc.text("Valor Cuota(Seguro incluido)", 112, 104.5)
    doc.line(110, 100.5, 200, 100.5)
    doc.setFontSize(9)
    doc.text("Garantia", 112, 110)
    doc.line(110, 106, 200, 106)
    doc.text("Valor FG + IVA", 112, 115.5)
    doc.line(110, 111.5, 200, 111.5)
    doc.text("Fidelización", 145, 121)
    doc.line(110, 117, 200, 117)
    doc.text("Fecha de Fidelización", 120, 126.5)
    doc.text("Valor Aportes", 165, 126.5)
    doc.line(110, 122.5, 200, 122.5)
    doc.line(110, 128, 200, 128)
    doc.text("Ahorro Mensual Coovitel", 137, 137.5)
    doc.line(110, 133.5, 200, 133.5)
    doc.setFontSize(7)
    doc.text("Aportes (74%)", 113, 143)
    doc.text("Ahorro Permanente (18.5%)", 139, 143)
    doc.text("Fondo Mutual (7.5%)", 174, 143)
    doc.line(110, 139, 200, 139)
    doc.line(110, 144.5, 200, 144.5)
    doc.setFontSize(8)
    
    // Datos cuadro Derecho
    doc.setFontSize(9)
    doc.setFont("helvetica", "normal");
    doc.text(datas.datasAsociado.typeCredit, 156, 55)
    doc.text(`${datas.formadepago}`, 156, 60.5)
    doc.text(`${datas.score}`, 156, 66)
    doc.text(datas.datasAsociado.monto, 156, 71.5)
    doc.text(datas.datasAsociado.cuotas, 156, 77)

    doc.setFontSize(8)
    doc.text(`${datas.tasa}% NM  -  ${tasaAnual(datas.tasa).toFixed(2)}% EA`, 156, 82.5)
    const tasaDescuen = datas.beneficionTasa ? datas.beneficionTasa.toFixed(3) : "0"
    doc.text(`${tasaDescuen}% NM`, 156, 88)
    const tasaBeneficio = tasaDescuen == "0" ? datas.tasa.toFixed(2) : datas.tasaDescuento.toFixed(3)
    doc.text(`${tasaBeneficio}% NM  -  ${tasaAnual(tasaBeneficio).toFixed(2)}% EA`, 156, 93.5)
    
    doc.setFontSize(9)
    doc.text("0.088% x millon", 156, 99)
    doc.text(`$ ${setValue(datas.pagoMensual.toString())}`, 156, 104.5)
    doc.text(datas.garantia, 156, 110)
    const fondo = datas.garantia == "Fondo de Garantias" ? setValue(datas.fondo.toString()) : "0"
    doc.text(`$ ${fondo}`, 156, 115.5)
    
    doc.setFont("helvetica", "normal");
    doc.text(`${datas.añoafiliacion}`, 128, 132)
    const aportes = datas.datasAsociado.numberAportes ? datas.datasAsociado.numberAportes : "No Aplica"
    doc.text(aportes, 170, 132)
    const montoAportes = datas.ahorroMensual
    const apor = (montoAportes * (74 / 100)).toFixed(0)
    const aporPerma = (montoAportes * (18.5 / 100)).toFixed(0)
    const mutual = (montoAportes * (7.5 / 100)).toFixed(0)

    doc.text(`$ ${setValue(apor)}`, 116, 148.5)
    doc.text(`$ ${setValue(aporPerma)}`, 148, 148.5)
    doc.text(`$ ${setValue(mutual)}`, 179, 148.5)
    
    doc.setFontSize(6.5)
    doc.text("NOTA: El valor del fondo mutual no es rembolsable.", 130, 153)

    doc.setFontSize(13)
    doc.setFont("helvetica", "bold");
    doc.text("Desembolso Neto Aproximado", 70, 160)
    doc.setFont("helvetica", "normal");
    
    doc.setFontSize(11)
    doc.text("Monto Crédito", 32, 171)
    doc.text(`$ ${datas.datasAsociado.monto}`, 110, 171)
    doc.line(30, 172.5, 180, 172.5)
    doc.text("Intereses Anticipados Presente Mes", 32, 177)
    doc.text(`$ ${setValue(diasInteres(datas.monto, datas.tasa).toString())}`, 110, 177)
    doc.line(30, 178.5, 180, 178.5)
    doc.text("Valor FG + IVA", 32, 183)
    doc.text(`$ ${fondo}`, 110, 183)
    doc.line(30, 184.5, 180, 184.5)
    doc.text("Aproximado Neto a Desembolsar", 32, 189.5)
    const desembolso = datas.garantia == "Fondo de Garantias" ? setValue((datas.monto - datas.fondo - diasInteres(datas.monto, datas.tasa)).toString()) : setValue((datas.monto - diasInteres(datas.monto, datas.tasa)).toString())
    doc.text(`$ ${desembolso}`, 110, 190)
    
    
    
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold");
    doc.text("Validaciones:", 20, 205)
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8)
    doc.text("Demostrar Ingresos Adicionales. /", 20, 210)
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold");
    doc.text("Aceptación de Condiciones", 20, 220)
    doc.setFont("helvetica", "normal");
    doc.setFontSize(5.1)
    doc.text("1) Tengo conocimiento  que si pierdo la  calidad de asociado por retiro  voluntario o exclusión el valor  de mi ahorro se  cruzará  con los valores pendientes  de pago y  si esta operación arroja  un sobrante a mi  favor será", 20, 225)
    doc.text("reintegrado en un periodo máximo de 90 días calendario de acuerdo con el Estatuto de Coovitel. 2) Manifiesto que conozco y acepto, que si pierdo la calidad de Asociado a COOVITEL respecto de la(s) obligación(es) que", 20, 228)
    doc.text("se encuentre(n) pendiente de pago, la Entidad Solidaria cobrará la tasa máxima permitida legalmente para el momento de la desvinculación, por la pérdida de mis derechos como Cooperador; de la misma manera declaro", 20, 231)
    doc.text("que conozco y acepto que las modificaciones pactadas con relación a las tasas de interés, pueden conllevar al incremento en el valor de la cuota y/o incremento del plazo. 3) Declaro que conozco y acepto las condiciones", 20, 234)
    doc.text("del crédito  solicitado. Así mismo declaro que conozco  y acepto el reglamento y la  política de cobranzas, dichos documentos puedo consultarlos en cualquier momento en la página web www.coovitel.coop. 4) Coovitel no", 20, 237)
    doc.text("realiza cobros adicionales  de otros servicios diferentes a  los informados en el presente simulador  sin previa  autorización del  solicitante. 5)  Declaro que conozco y  acepto las condiciones del  Seguro de Vida  Deudores", 20, 240)
    doc.text("Contratado,  que tuve la libertad de  escoger la aseguradora y  que dicho contrato puede  ser consultado en  https://www.coovitel.coop. 6)  Coovitel no realiza cobros  por pagos  anticipados o prepagos  de la operación de", 20, 243)
    doc.text("crédito. 7) En caso  de que el crédito  sea destinado para el pago  de un seguro voluntario: tengo conocimiento  que, si llegare a incurrir en una mora mayor o igual a 30 días de mi obligación ?línea de crédito seguros?, se", 20, 246)
    doc.text("dará la  terminación automática del  contrato de seguros  (póliza) en los  términos del artículo 1068  del código de comercio. En  este caso el valor  de las primas no  devengadas  será reintegrado  por la  aseguradora a  la", 20, 249)
    doc.text("Cooperativa y será cruzado con el saldo de mi obligación crediticia, la cual posterior a su aplicación se dará por terminada.", 20, 252)
    

    doc.setFontSize(12)
    doc.text("Firma:", 20, 265)
    doc.line(35, 265, 100, 265)
    doc.text("CC:", 110, 265)
    doc.line(120, 265, 185, 265)
    
    doc.save('Simulacion.pdf')
  } catch (error) {
    console.log(error)
  }

}
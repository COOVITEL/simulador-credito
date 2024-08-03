import jsPDF from "jspdf";

interface DownloadPFDProps {
    datas: any;
  }

export function downloadPFD( {datas}: DownloadPFDProps) {
    console.log(datas)
    const doc = new jsPDF();
    doc.roundedRect(10, 10, 190, 28, 2, 2)

    doc.setFillColor(242, 242, 252)
    doc.setDrawColor(0, 0, 0)
    doc.roundedRect(10, 50, 90, 88, 2, 2, 'DF')
    doc.line(55, 50, 55, 138)

    doc.setFillColor(242, 242, 252)
    doc.setDrawColor(0, 0, 0)
    doc.roundedRect(110, 50, 90, 88, 2, 2, 'DF')
    doc.line(157, 50, 157, 108)

    // doc.line(100, 20, 100, 100)

    doc.roundedRect(30, 165, 150, 28, 2, 2)
    doc.line(105, 165, 105, 193)

    doc.setFontSize(11)
    doc.text("FORMATO SIMULADOR DE CREDITO", 75, 25)

    doc.setFontSize(9)
    doc.text("CÓDIGO: COV-GPS-FMT-006", 155, 15)
    doc.text("VERSIÓN: 3", 155, 20)
    doc.text("FECHA: Agosto 01 de 2024", 155, 25)
    doc.text("Página 2 de 2", 155, 30)

    doc.setFontSize(9)
    doc.text("PROCESO: GESTIÓN DE PRODUCTOS Y SERVICIOS", 55, 36)

    doc.setFontSize(12)
    doc.text("Informarcion Asociado", 35, 46)
    doc.text("Condiciones de la Simulación", 125, 46)

    doc.setFontSize(9)
    doc.text("Nombre de Asociado", 12, 55)
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
    doc.text("Desuentos o Debitos", 12, 93.2)
    doc.line(10, 95, 100, 95)
    doc.text("Salud y Pensión", 12, 99)
    doc.line(10, 100.5, 100, 100.5)
    doc.text("Aportes Mensual", 12, 104.5)
    doc.line(10, 106, 100, 106)
    doc.text("Fondo de Solidaridad", 12, 109)
    doc.line(10, 110.5, 100, 110.5)
    doc.text("Capacidad de Pago", 12, 114.5)
    doc.line(10, 116, 100, 116)
    doc.text("Cooviahorro", 12, 119)
    doc.line(10, 120.5, 100, 120.5)
    doc.text("CDAT", 12, 124.5)
    doc.line(10, 126, 100, 126)
    doc.text("Promedio Saldo", 12, 129)
    doc.line(10, 130.5, 100, 130.5)
    doc.text("Otros Ingresos", 12, 134.5)


    doc.setFontSize(9)
    doc.text("Linea de Crédito", 112, 55)
    doc.text("Puntaje Score", 112, 60)
    doc.text("Monto Préstamo", 112, 65)
    doc.text("Plazo", 112, 70)
    doc.text("Tasa Crédito", 112, 75)
    doc.text("Beneficio Tasa Asociado", 112, 80)
    doc.text("Tasa con Beneficio", 112, 85)
    doc.setFontSize(8.5)
    doc.text("Tarifa Seguro de Vida Deudores", 112, 90)
    doc.text("Valor Cuota(Seguro incluido)", 112, 95)
    doc.setFontSize(9)
    doc.text("Garantia", 112, 100)
    doc.text("Valor FG + IVA", 112, 105)
    doc.text("Fidelización", 145, 112)
    doc.text("Año de Fidelización", 120, 117)
    doc.text("Valor Aportes", 165, 117)
    doc.text("*********", 128, 122)
    doc.text("*********", 170, 122)
    doc.text("Ahorro Mensual Coovitel", 137, 127)
    doc.setFontSize(7)
    doc.text("Aportes (74%)", 113, 131)
    doc.text("Ahorro Permanente (18.5%)", 139, 131)
    doc.text("Fondo Mutual (7.5%)", 174, 131)
    doc.setFontSize(8)
    doc.text("***********", 116, 136)
    doc.text("***********", 148, 136)
    doc.text("***********", 179, 136)

    doc.setFontSize(6.5)
    doc.text("NOTA: El valor del fondo mutual no es rembolsable.", 130, 142)

    doc.setFontSize(13)
    doc.text("Desembolso Neto Aproximado", 70, 160)

    doc.setFontSize(11)
    doc.text("Monto Crédito", 32, 171)
    doc.text("Intereses Anticipados Presente Mes", 32, 177)
    doc.text("Valor FG + IVA", 32, 183)
    doc.text("Aproximado Neto a Desembolsar", 32, 189)


    doc.setFontSize(12)
    doc.text("Validaciones:", 20, 205)
    doc.setFontSize(8)
    doc.text("Demostrar Ingresos Adicionales. /", 20, 210)
    doc.setFontSize(12)
    doc.text("Aceptación de Condiciones", 20, 220)
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
    doc.text("CC:", 110, 265)












    doc.save('Simulacion.pdf')
}
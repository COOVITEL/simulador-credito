export interface Simulacion {
    name: String;
    document: Number,
    dateborn: String;
    dateafi: String;
    typeAsociado: String;
    typeContract?: String;
    seniority?: String;
    payForm: String;
    score: String;
    warranty: String;
    salary: String;
    others: String;
    cuotasDes: String;
    cuotasCen: String;
    cooviahorro: String;
    cdat: String;
    aportes: String;
    credit: String;
    cuotas: String;
    monto: String;
    createdBy: String;
}

export function MapperSimulation(datas: any) {
    const setDatas: Simulacion = {
        name: datas.name,
        document: datas.cedula,
        dateborn: datas.date,
        dateafi: datas.years,
        typeAsociado: datas.afiliacion,
        payForm: datas.formapago,
        score: datas.score,
        warranty: datas.tipocontraVentanilla,
        salary: datas.salary,
        others: datas.others,
        cuotasDes: datas.debit,
        cuotasCen: datas.debitCentrales,
        cooviahorro: datas.cooviahorro,
        cdat: datas.cdat,
        aportes: datas.aportes,
        credit: datas.typeCredit,
        cuotas: datas.cuotas,
        monto: datas.monto,
        createdBy: "Manuel Rodriguez"
    }
    return setDatas
}
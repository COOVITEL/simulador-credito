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
    linea: String;
    credit: String;
    cuotas: String;
    monto: String;
    createdBy: String;
}

export function MapperSimulation(datas: any) {
    const setDatas: Simulacion = {
        name: datas.name,
        document: datas,
        dateborn: datas,
        dateafi: datas,
        typeAsociado: datas,
        payForm: datas,
        score: datas,
        warranty: datas,
        salary: datas,
        others: datas,
        cuotasDes: datas,
        cuotasCen: datas,
        cooviahorro: datas,
        cdat: datas,
        aportes: datas,
        linea: datas,
        credit: datas,
        cuotas: datas,
        monto: datas,
        createdBy: datas
    }
    return setDatas
}
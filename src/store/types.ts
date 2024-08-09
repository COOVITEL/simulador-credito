export interface SimuladorStore {
    sociales: Sociales[];
    nosociales: NoSociales[];
    fidelizacion: Fidelizacion[];
    tasas: Tasas[];
    maximoDescuento: [];
    descuentos: Descuentos;
    asociados: [];
    salarioMinimo: number;
    inputAfiliacion: string;
    salary: number;
    others: number;
    debit: number;
    saludypension: number;
    formadepago: string;
    capacidadPago: number;
    montoMax: number;
    tasa: number;
    cuota: number;
    monto: number;
    pagoMensual: number;
    ahorroMensual: number;
    score: number;
    fondo: number;
    tipoContrato: string;
    pagaduria: string;
    tasaMaxima: number;
    porcentajeDescuento: number;
    cdat: string;
    cooviahorro: string;
    aportes: string;
    desScore: number;
    beneficionTasa: number;
    tasaDescuento: number;
    datasAsociado: any;
    garantia: string;
    interesAnticipado: number;
    cuotaMaxima: number;
    tipoGarantia: string,
    controlAntiguedad: boolean;
    scoreMin: number;
    añoafiliacion: string;
    antiguedad: string;
    valorCentrales: number;
    updateValorCentrales: (newValue: number) =>void;
    updateAntiguedad: (newValue: string) => void;
    updateAñoAfiliacion: (newValue: string) => void;
    updateControlAntiguedad: (newState: boolean) => void;
    updateScoreMin: (newScore: number) => void;
    updatipoGarantia: (newValue: string) => void;
    updateCuotaMaxima: (newValue: number) => void;
    updateInteresAnticipado: (newValue: number) => void;
    updateGarantia: (newValue: string) => void;
    updateDatasAsociado: (newDatas: any) => void;
    updateTasaDescuento: (newTasa: number) => void;
    updateDesScore: (newValue: number) => void;
    updateCdat: (newValue: string) => void;
    updateCooviahorro: (newValue: string) => void;
    updateAportes: (newValue: string) => void;
    updateBeneficioTasa: (newTasa: number) => void;
    updatePorcentajeDescuento: (newPorcentaje: number) => void;
    updateTasaMaxima: (newTasa: number) => void; 
    updatePagaduria: (newPagaduria: string) => void;
    updateTipoContrato: (newText: string) => void;
    updateFondo: (newFondo: number) => void;
    updateScore: (newScore: number) => void;
    updateAhorroMensual: (newValue: number) => void;
    updatePagoMensual: (newMonto: number) => void;
    updateMonto: (newMonto: number) => void;
    updateCuota: (newCuota: number) => void;
    updateTasa: (newTasa: number) => void;
    updateMontoMax: (newValue: number) => void;
    updateCapacidadPago: (newValue: number) => void;
    updateFormadepago: (newValue: string) => void;
    updateSaludypension: (newValue: number) => void;
    updateSalary: (newSalary: number) => void;
    updateOthers: (newOthers: number) => void;
    updateDebit: (newOthers: number) => void;
    updateAfiliacion: (newValue: string) => void;
    updateList: ({}: any) => void;
}

export interface Descuento {
    id: number,
    name: string,
    value: number

}

export interface DescuentosScore {
    id: number,
    scoreMin: number,
    scoreMax: number,
    ajuste: number,
    asociado: number
}

export interface DescuentosPlazo {
    id: number,
    plazoMax: number,
    plazoMin: number,
    ajuste: number,
    asociado: number
}

export interface Sociales {
    id: number;
    name: string;
    tasa6: number;
    tasa12: number;
    tasa24: number;
    tasa36: number;
    tasa48: number;
    tasa60: number;
    tasa72: number;
    tasa84: number;
    plazoMax: number
}

export interface NoSociales {
    id: number;
    name: string;
    usura: number;
    descuentos: number;
    techoEA: number;
    techoNMV: number;
    plazo: number;
}

export interface Descuentos {
    score: [];
    aporte: Aporte[];
    plazo: [];
    cdat: Cdat[];
    cooviahorro: Coovi[];
}

export interface Fidelizacion {
    id: number;
    name: string;
    porcentaje: number;
    tasa6: number;
    tasa12: number;
    tasa24: number;
    tasa36: number;
    tasa48: number;
    tasa60: number;
    tasa72: number;
    plazoMax: number;
    garantia: string;
}

export interface Aporte {
    id: number;
    aporteMin: string;
    aporteMax: string;
    ajuste: number;
    asociado: number
}

export interface Coovi {
    id: number;
    montoMin: string;
    montoMax: string;
    ajuste: number
}

export interface Cdat {
    id: number;
    montoMin: string;
    montoMax: string;
    ajuste: number
}

export interface Tasas {
    id: number;
    maxScore: number;
    minScore: number;
    fg: number;
    plazo: number;
    garantia: string;
    piso: number;
    perfil: number
}
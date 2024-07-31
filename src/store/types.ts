export interface SimuladorStore {
    sociales: Sociales[];
    nosociales: [];
    fidelizacion: Fidelizacion[];
    tasas: [];
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
    fondoGarantias: () => number;
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
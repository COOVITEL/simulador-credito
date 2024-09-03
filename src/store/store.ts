import { create } from "zustand";
import { SimuladorStore, Descuentos } from "./types";

// Este hoock contiene y crea el estado global para acceder desde cualquier componente y controladores de la app.
const useSimulatorStore = create<SimuladorStore>((set) => ({
    sociales: [],
    nosociales: [],
    fidelizacion: [],
    tasas: [],
    maximoDescuento: [],
    descuentos: {} as Descuentos,
    asociados: [],
    salarioMinimo: 0,
    inputAfiliacion: "",
    salary: 0,
    others: 0,
    debit: 0,
    saludypension: 0,
    formadepago: "",
    capacidadPago: 0,
    montoMax: 0,
    tasa: 0,
    cuota: 0,
    monto: 0,
    pagoMensual: 0,
    ahorroMensual: 0,
    score: 0,
    fondo: 0,
    tipoContrato: "",
    pagaduria: "",
    tasaMaxima: 0,
    porcentajeDescuento: 0,
    beneficionTasa: 0,
    cdat: "",
    cooviahorro: "",
    aportes: "",
    desScore: 0,
    tasaDescuento: 0,
    datasAsociado: {},
    garantia: "",
    interesAnticipado: 0,
    cuotaMaxima: 0,
    tipoGarantia: "",
    controlAntiguedad: false,
    añoafiliacion: "",
    antiguedad: "",
    valorCentrales: 0,
    updateValorCentrales: (newValor: number) => set(() => ({
        valorCentrales: newValor,
    })),
    updateAntiguedad: (newValue: string) => set(() => ({
        antiguedad: newValue
    })),
    updateAñoAfiliacion: (newValue: string) => set(() => ({
        añoafiliacion: newValue
    })),
    updateControlAntiguedad: (newState: boolean) => set(() => ({
        controlAntiguedad: newState
    })),
    scoreMin: 0,
    updateScoreMin: (newValue: number) => set({
        scoreMin: newValue
    }),
    updatipoGarantia: (newValue: string) => set(() => ({
        tipoGarantia: newValue
    })),
    updateCuotaMaxima: (newValue: number) => set(() => ({
        cuotaMaxima: newValue
    })),
    updateInteresAnticipado: (newValue: number) => set(() => ({
        interesAnticipado: newValue
    })),
    updateGarantia: (newValue: string) => set(() => ({
        garantia: newValue
    })),
    updateDatasAsociado: (newDatas: any) => set(() => ({
        datasAsociado: newDatas
    })),
    updateTasaDescuento: (newTasa: number) => set(() => ({
        tasaDescuento: newTasa,
    })),
    updateDesScore: (newValue: number) => set(() => ({
        desScore: newValue
    })),
    updateCdat: (newValue: string) => set(() => ({
        cdat: newValue
    })),
    updateCooviahorro: (newValue: string) => set(() => ({
        cooviahorro: newValue
    })),
    updateAportes: (newValue: string) => set(() => ({
        aportes: newValue
    })),
    updateBeneficioTasa: (newTasa: number) => set(() => ({
        beneficionTasa: newTasa
    })),
    updatePorcentajeDescuento: (newPorcentaje: number) => set(() => ({
        porcentajeDescuento: newPorcentaje,
    })),
    updateTasaMaxima: (newTasa: number) => set(() => ({
        tasaMaxima: newTasa,
    })),
    updatePagaduria: (newPagaduria: string) => set(() => ({
        pagaduria: newPagaduria,
    })),
    updateTipoContrato: (newText: string) => set(() => ({
        tipoContrato: newText,
    })),
    updateFondo: (newFondo: number) => set(() => ({
        fondo: newFondo
    })),
    updateScore: (newScore: number) => set(() => ({
        score: newScore
    })),
    updateAhorroMensual: (newValue: number) => set(() => ({
        ahorroMensual: newValue
    })),
    updatePagoMensual: (newMonto: number) => set(() => ({
        pagoMensual: newMonto,
    })),
    updateMonto: (newMonto: number) => set(() => ({
        monto: newMonto,
    })),
    updateCuota: (newCuota: number) => set(() => ({
        cuota: newCuota,
    })),
    updateTasa: (newTasa: number) => set(() => ({
        tasa: newTasa,
    })),
    updateMontoMax: (newValue: number) => set(() => ({
        montoMax: newValue,
    })),
    updateCapacidadPago: (newValue: number) => set(() => ({
        capacidadPago: newValue,
    })),
    updateFormadepago: (newValue: string) => set(() => ({
        formadepago: newValue,
    })),
    updateSaludypension: (newValue: number) => set(() => ({
        saludypension: newValue,
    })),
    updateSalary: (newSalary: number) => set(() => ({
        salary: newSalary
    })),
    updateOthers: (newOthers: number) => set(() => ({
        others: newOthers
    })),
    updateDebit: (newDebit: number) => set(() => ({
        debit: newDebit
    })),
    updateAfiliacion: (newValue: string) => set(() => ({
        inputAfiliacion: newValue
    })),
    updateList: ({listSo, listNoso, listFide, listTasas, listMax, listDes, listAso, salMin}: any) => set(() => ({
        sociales: listSo,
        nosociales: listNoso,
        fidelizacion: listFide,
        tasas: listTasas,
        maximoDescuento: listMax,
        descuentos: listDes,
        asociados: listAso,
        salarioMinimo: salMin,
    })),
}))

export default useSimulatorStore
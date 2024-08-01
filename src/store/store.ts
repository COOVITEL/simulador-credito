import { create } from "zustand";
import { SimuladorStore, Descuentos } from "./types";


const useSimulatorStore = create<SimuladorStore>((set, get) => ({
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
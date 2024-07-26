import { create } from "zustand";
import { SimuladorStore, Descuentos } from "./types";


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
    }))
}))

export default useSimulatorStore
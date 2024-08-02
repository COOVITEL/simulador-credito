import React, { useEffect, useState } from "react"
import useSimulatorStore from "../../store/store"
import { DescuentosScore } from "../../store/types"

export default function Score() {
    const { updateScore, inputAfiliacion, tasas, descuentos, updateDesScore, garantia } = useSimulatorStore()
    const [scoreMin, setScoreMin] = useState(0)
    const [scoreMax, setScoreMax] = useState(0)
    const [checkScore, setCheckScore] = useState(false)
    const [checkScoreMax, setCheckScoreMax] = useState(false)
    const [valueScore, setValueScore] = useState(0)

    useEffect(() => {
        const personType = inputAfiliacion.split("-")[1]
        if (personType == "Independiente") {
            if (garantia == "Fondo de Garantias" || garantia == "Codeudor") {
                setScoreMin(722)
            } else if (garantia == "Garantia Real"){
                setScoreMin(600)
            }
        }
        if (personType == "Empleado o pensionado Ventanilla") {
            setScoreMin(609)
        }
    }, [garantia, inputAfiliacion])

    const handleChangeScore = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentScore = parseInt(event.target.value)
        updateScore(currentScore)
        setValueScore(currentScore)
        const numberType = inputAfiliacion.split("-")[0]
        const checkList = tasas.filter(type => type.perfil == parseInt(numberType))
        const minScore = checkList[checkList.length - 1].minScore
        setCheckScoreMax(false)
        let min = 0
        if (scoreMin > minScore) {
            min = scoreMin
        } else {
            min = minScore
        }
        if (currentScore < min) {
            setCheckScore(true)
            setScoreMin(min)
        } else {
            setCheckScore(false)
        }
        if (currentScore > 1100) {
            setScoreMax(1100)
            setCheckScoreMax(true)
            setValueScore(1100)
        }
        const desScore: DescuentosScore[] = descuentos.score
        const list = desScore.filter((type: DescuentosScore) => type.asociado == parseInt(numberType))
                        .find((current: DescuentosScore) => currentScore >= current.scoreMin && currentScore <= current.scoreMax)
        if (list) updateDesScore(list.ajuste)
      
    }
    return (
        <div className="flex flex-col">
            <div
                className="w-[500px] group flex flex-col items-start justify-start border-gray-300 border-2 rounded-xl p-2 transition-colors
                duration-300 ease-in-out hover:border-blue-500 focus-within:border-blue-500 focus-within:shadow-xl shadow-blue-400">
                <label className="text-sm text-gray-400" htmlFor="score">Score</label>
                <input
                    onChange={handleChangeScore}
                    value={valueScore>0 ? valueScore : ""}
                    className="px-3 text-cemter focus:outline-none text-xl w-full font-semibold"
                    type="number"
                    id="score"
                    name="score"
                    placeholder="Valor Score"
                    required/>
            </div>
            {checkScore&&<span className="text-center">El score minimo para aplicar segun su perfil es de {scoreMin}</span>}
            {checkScoreMax&&<span className="text-center">El score maximo es {scoreMax}</span>}
        </div>
    )
}
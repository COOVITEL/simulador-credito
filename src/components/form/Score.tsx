import React from "react"
import useSimulatorStore from "../../store/store"

export default function Score() {
    const { updateScore } = useSimulatorStore()

    const handleChangeScore = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateScore(parseInt(event.target.value))
    }
    return (
        <div className="flex flex-row justify-between my-3">
            <label htmlFor="score">Score</label>
            <input onChange={handleChangeScore} className="px-4 py-1" type="number" id="score" name="score" placeholder="Valor Score" required/>
        </div>
    )
}
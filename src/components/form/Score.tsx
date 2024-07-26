export default function Score() {
    return (
        <div className="flex flex-row justify-between my-3">
            <label htmlFor="score">Score</label>
            <input className="px-4 py-1" type="number" id="score" name="score" placeholder="Valor Score" required/>
        </div>
    )
}
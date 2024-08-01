export function antiguedad(time: string) {
        const current = new Date()
        const start = new Date(time)
        const different = current - start
        let daysDifference = Math.floor(different / (1000 * 60 * 60 * 24));
        let startYear = start.getFullYear();
        let endYear = current.getFullYear();
        let startMonth = start.getMonth();
        let endMonth = current.getMonth();
    
        let month = (endYear - startYear) * 12 + (endMonth - startMonth);
    return {'message': `Antiguedad ${month} Meses / ${daysDifference} Dias`, number: month}
}
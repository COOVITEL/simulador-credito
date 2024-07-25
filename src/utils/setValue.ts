export function setValue(str: string) {
    const reverse = str.split('').reverse().join('')
    const setValue = reverse.replace(/\D/g, '')
    const formatVal = setValue.replace(/(\d{3})/g, '\$1.')
    let newVla = formatVal.split('').reverse().join('')
    if (newVla[0] == "."){
        newVla = newVla.slice(1)
      }
    return newVla
  }
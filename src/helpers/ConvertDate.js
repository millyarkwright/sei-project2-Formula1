export const convertDate = (date) => {

  const dateMilli = Date.parse(date)
  const newDate = new Date(dateMilli)
  const finalDate = newDate.toLocaleDateString('en-GB')

  return finalDate

}


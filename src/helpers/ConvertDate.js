export const convertDate = (date) => {

  const dateMilli = Date.parse(date)
  // console.log('date in milliseconds', dateMilli)
  const newDate = new Date(dateMilli)
  // console.log('new Date', newDate)
  const finalDate = newDate.toLocaleDateString('en-GB')
  // console.log('final date', finalDate)

  return finalDate

}


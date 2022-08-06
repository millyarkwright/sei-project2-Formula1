
import { convertDate } from './ConvertDate'

let roundIndex = 0
let raceObj = {}
let nextRace = {}
export const getRound = (round) => {
  roundIndex = round
  return roundIndex
}
export const getRace = (race) => {
  raceObj = race
}

export const nextRaceDisplay = () => {
  nextRace = raceObj[roundIndex]
  console.log('nextRace -->', nextRace.time.split('').slice(0, 5))
  return (
    <p>Upcoming Race (Round {nextRace.round}): {convertDate(nextRace.date)} {nextRace.time.split('').slice(0, 5)} UTC at {nextRace.Circuit.circuitName}, {nextRace.Circuit.Location.country}</p>
  )
}

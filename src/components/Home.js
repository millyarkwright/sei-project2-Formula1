// Import React Hooks and Axios
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


// Import Bootstrap Components
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// import Helpers
import { getRound } from '../helpers/NextRoundDisplay'
import { getRace } from '../helpers/NextRoundDisplay'
import { nextRaceDisplay } from '../helpers/NextRoundDisplay'

const Home = () => {

  // ! STATE -----------------
  // Standings
  const [standings, setStandings] = useState([])
  const [races, setRaces] = useState([])
  const [currentRace, setCurrentRace] = useState([])

  // Errors
  const [errors, setErrors] = useState(false)

  // ! EXECUTION -----------------
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('https://ergast.com/api/f1/2022/driverStandings.json')
        setStandings(data.MRData.StandingsTable.StandingsLists[0].DriverStandings)
        setCurrentRace(data.MRData.StandingsTable.StandingsLists[0])
        getRound(`${data.MRData.StandingsTable.StandingsLists[0].round}`)
      } catch (err) {
        setErrors(true)
      }
    }
    getData()
  }, [])


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('https://ergast.com/api/f1/current.json')
        setRaces(data.MRData.RaceTable.Races)
        getRace(data.MRData.RaceTable.Races)
      } catch (error) {
        setErrors(true)
      }
    }
    getData()
  }, [])


  // ! JSX -----------------
  return (
    <main className='home-container'>
      <div className="next-race-container text-center ">
        {races.length > 0 && nextRaceDisplay()}
      </div>
      <div className="standings-container mb-3">
        <div className="standings-text-wrapper text-center">
          <h1>Current Standings</h1>
          <p>Season {currentRace.season} Round <span>{currentRace.round}</span> / <span>{races.length}</span></p>
        </div>
        <div className="table-wrapper">
          {standings.length > 0 ?
            <Row>
              <div>
                < Row className='table-headers bg-gradient' >
                  <Col className='col-1'>
                    <p>#</p>
                  </Col>
                  <Col className='col-4'>
                    <p>Driver</p>
                  </Col>
                  <Col className='col-3'>
                    <p>Team</p>
                  </Col>
                  <Col className='col-2'>
                    <p>Pts</p>
                  </Col>
                  <Col className='col-2'>
                    <p>Wins</p>
                  </Col>
                </Row>
              </div>

              {standings.map(rank => {
                const { position, points, wins, Driver, Constructors } = rank
                return (
                  <div key={Driver.driverID}>
                    <Row className='table justify-content-center bg-gradient'>
                      <Col className='col-1 text-center my-auto'>
                        <p className=''>{parseFloat(position) === 1 && '🥇'}</p>
                        <p>{parseFloat(position) === 2 && `🥈`}</p>
                        <p>{parseFloat(position) === 3 && `🥉`}</p>
                        <p>{parseFloat(position) >= 4 && position}</p>
                      </Col>
                      <Col className='col-4 text-left my-auto'>
                        <Link to={`/drivers/${Driver.familyName}/${Driver.givenName}`}>
                          <p className='fw-bold fs-7 driver'>{Driver.givenName} {Driver.familyName}</p>
                        </Link>
                      </Col>
                      <Col className='col-3 text-left my-auto'>
                        <p className=''>{Constructors[0].name}</p>
                      </Col>
                      <Col className='col-2 text-center my-auto'>
                        <p>{points}</p>
                      </Col>
                      <Col className='col-2 text-center my-auto'>
                        <p>{wins}</p>
                      </Col>
                    </Row>
                  </div>
                )
              })
              }
            </Row>
            :
            <>
              {errors ? <h2>Something went wrong. Please try again later</h2> : <h2>Loading</h2>}
            </>
          }
        </div>
      </div >

    </main >
  )
}
export default Home

// Import React Hooks and Axios
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'


// Import Bootstrap Components
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const ResultSingle = () => {

  const { seasonNo } = useParams()
  const { roundNo } = useParams()
  const [ result, setResult  ] = useState([])
  const [ raceName, setRaceName ] = useState('')
  const [ errors, setErrors ] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`https://ergast.com/api/f1/${seasonNo}/${roundNo}/results.json`)
        console.log(data)
        setResult(data.MRData.RaceTable.Races[0].Results)
        setRaceName(data.MRData.RaceTable.Races[0].raceName)
      } catch (err) {
        setErrors(true)
      }
    }
    getData()
  }, [seasonNo, roundNo])

  return (
    <main className='home-container'>
      <div className="standings-container mb-3 ">
        <div className="standings-text-wrapper text-center">
          <h1>{raceName} </h1>
          <h2>Round {roundNo} Results</h2>
          <p>Season {seasonNo}</p>
        </div>
        {result.length > 0 ?
          <div className="table-wrapper">
            <Row className="">
              <Row className="table-headers bg-gradient">
                <Col className='col-1'>
                  <p>#</p>
                </Col>
                <Col className='col-4'>
                  <p>Driver</p>
                </Col>
                <Col className='col-3'>
                  <p>Team</p>
                </Col>
                <Col className='col-3'>
                  <p>Time</p>
                </Col>
                <Col className='col-1'>
                  <p>Pts</p>
                </Col>
              </Row>
              {result.map(result => {
                const { position, points, Time, Driver, Constructor, status } = result
                console.log('Status-->', status)
                return (
                  <Row className='table bg-gradient' key={Driver.driverID}>
                    <Col className='col-1 text-center my-auto'>
                      <p>{parseFloat(position) === 1 && '🥇'}</p>
                      <p>{parseFloat(position) === 2 && `🥈`}</p>
                      <p>{parseFloat(position) === 3 && `🥉`}</p>
                      <p>{parseFloat(position) >= 4 && position}</p>
                    </Col>
                    <Col className='col-4 my-auto'>
                      <Link to={`/drivers/${Driver.familyName}/${Driver.givenName}`}>
                        <p className='fw-bold fs-7'>{Driver.givenName} {Driver.familyName}</p>
                      </Link>
                    </Col>
                    <Col className='col-3 my-auto'>
                      <p>{Constructor.name}</p>
                    </Col>
                    <Col className='col-3 my-auto text-center'>
                      <p>{(status === 'Finished') && Time.time}</p>
                      <p>{(status.includes('Lap')) && status}</p>
                      <p>{((status !== 'Finished' && !(status.includes('Lap')))) && 'DNF'}</p>
                    </Col>
                    <Col className='col-1 my-auto text-center'>
                      <p>{points}</p>
                    </Col>
                  </Row>
                )
              })}
            </Row>
          </div>
          :
          <>
            {errors ? <h2>Something went wrong. Please try again later</h2> : <h2>Loading</h2>}
          </>
        }

      </div>

    </main>
  )
}

export default ResultSingle
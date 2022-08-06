// Import Hooks 
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'

// Import Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'


const DriversIndex = () => {

  const [ drivers, setDrivers ] = useState([])
  const [ errors, setErrors ] = useState(false)
  const [ seasons, setSeasons ] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('https://ergast.com/api/f1/2022/driverStandings.json')
        setDrivers(data.MRData.StandingsTable.StandingsLists[0].DriverStandings)
        setSeasons(data.MRData.StandingsTable.season)
      } catch (error) {
        setErrors(true)
      }
    }
    getData()
  }, [])

  return (
    <Container className="drivers-wrapper">
      <div className="header-wrapper text-center">
        <h1 className="fw-bold mt-3">Drivers</h1>
        <p>Season: {seasons}</p>
      </div>
      <Container className="cards-wrapper">
        <Row>
          { drivers.length > 0 
            ?
            drivers.sort((a, b) => {
              return a.Driver.givenName.localeCompare(b.Driver.givenName)
            }).map(driver => {
              const { givenName, familyName, driverId } = driver.Driver
              const { Constructors } = driver
              const constructorName = Constructors[0].name
                return (
                  <Col key={driverId} md="6" lg="4" xxl="3" className='card mb-4'>
                  <Link to={`/drivers/${familyName}/${givenName}`}>
                    <Card.Img className='bg-gradient' variant='top' src={require(`../../images/profiles/${driverId}.png`)} ></Card.Img>
                    <Card.Body className='bg-gradient'>
                      <Card.Title className=''> {givenName} {familyName}</Card.Title>
                      <Card.Subtitle className='fs-7 mt-1'>{constructorName}</Card.Subtitle>
                    </Card.Body>
                  </Link>
                </Col>
                )
            })
            :
            <>
              { errors ? <h2>Something went wrong. Please try again later</h2> : <h2>Loading</h2>}
            </>
          }
        </Row>
      </Container>
    </Container>
  )
}

export default DriversIndex

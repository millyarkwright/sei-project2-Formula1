// Import Hooks 
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'

// Import Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

// import Helpers
import { convertDate } from '../../helpers/ConvertDate'

const Schedule = () => {

  const [races, setRaces] = useState([])
  const [errors, setErrors] = useState(false)
  const [currentSeason, setCurrentSeason] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('http://ergast.com/api/f1/current.json')
        setRaces(data.MRData.RaceTable.Races)
        setCurrentSeason(data.MRData.RaceTable.Races[0].season)
      } catch (error) {
        setErrors(true)
      }
    }
    getData()
  }, [])

  return (
    <>
      <div className="schedule-bg"></div>
      <Container fluid className="schedule-wrapper">
        <div className="header-wrapper text-center">
          <h1 className="fw-bold mt-3">Season Schedule</h1>
          <p>{currentSeason}</p>
        </div>
        <Container className="cards-wrapper">
          <Row>
            {races.length > 0
              ?
              races.map(race => {
                const { country } = race.Circuit.Location
                const { circuitName, circuitId } = race.Circuit
                const { raceName, round, date, season } = race
                const convertedDate = convertDate(date)
                const currentDate = new Date().getTime()
                if (Date.parse(date) < currentDate) {
                  return (
                    <Col key={circuitId} md="6" lg="4" xxl="3" className='card mb-4'>
                      <Link to={`/result/${season}/${round}`}>
                        <Card.Header className="fw-semibold bg-gradient"><p><span>Round :</span> {round}</p><p className="float-right">{convertedDate}</p></Card.Header>
                        <Card.Body className=''>
                          <Card.Title className='fw-semibold'>{country}</Card.Title>
                          <Card.Subtitle>{raceName}</Card.Subtitle>
                          <Card.Text>{circuitName}</Card.Text>
                        </Card.Body>
                        <Card.Img variant='bottom' src={require(`../../images/circuits/${raceName.replaceAll(' ','-')}.png`)}></Card.Img>
                      </Link>
                    </Col>
                  )
                } else {
                  return (
                    <Col key={circuitId} md="6" lg="4" xxl="3" className='card mb-4'>
                      <Card.Header className="fw-semibold unfinished bg-gradient"><p><span>Round :</span> {round}</p><p className="float-right">{convertedDate}</p></Card.Header>
                      <Card.Body className=''>
                        <Card.Title className='fw-semibold'>{country}</Card.Title>
                        <Card.Subtitle>{raceName}</Card.Subtitle>
                        <Card.Text>{circuitName}</Card.Text>
                      </Card.Body>
                      <Card.Img variant='bottom' src={require(`../../images/circuits/${raceName.replaceAll(' ','-')}.png`)}></Card.Img>
                    </Col>
                  )
                }
              })
              :
              <>
                {errors ? <h2>Something went wrong. Please try again later</h2> : <h2>Loading</h2>}
              </>
            }
          </Row>
        </Container>
      </Container>
    </>

  )
}

export default Schedule


// Import React Hooks and Axios
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'


// Import Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// mport Helpers
import { convertDate } from '../../helpers/ConvertDate'

const DriverSingle = () => {

  const { familyName, givenName } = useParams()
  const [standings, setStandings] = useState([])
  const [errors, setErrors] = useState('')
  const [images, setImages] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('https://ergast.com/api/f1/2022/driverStandings.json')
        console.log('profile data', data.MRData.StandingsTable.StandingsLists[0].DriverStandings)
        setStandings(data.MRData.StandingsTable.StandingsLists[0].DriverStandings)
      } catch (err) {
        setErrors(err)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`https://api-formula-1.p.rapidapi.com/drivers/?name=${givenName} ${familyName}`, {
          headers: {
            'x-rapidapi-key': 'a95122eda2mshd3bc01707a66460p19c8d1jsn6044f93df7d4',
            'x-rapidapi-host': 'api-formula-1.p.rapidapi.com'
          }
        })
        console.log('image response', response)
        setImages(response.data.response[0].image)
      } catch (errors) {
        console.log(errors)
      }
    }
    getData()
  }, [givenName, familyName])

  return (

    <Container className="profile-wrapper py-4">
      <Row className="profile-container p-3 py-5 mx-2 bg-gradient justify-content-center">
        <h1 className="text-center fw-bold">Driver Profile</h1>
        {standings.length > 0 ?
          standings.map(item => {
            const { position, points, wins, Driver, Constructors } = item
            const convertedDate = convertDate(Driver.dateOfBirth)
            if (Driver.familyName === familyName && Driver.givenName === givenName) {
              return (
                <Row key={Driver.driverId}>
                  <Col className="profileImage text-center text-lg-start col-5" xs="12" lg="4" xl="4"  >
                    <img className="bg-gradient" src={images} alt='Driver Profile' />
                  </Col>
                  <Col className="profile-details mt-3 mt-lg-0 bg-gradient" xs="12" lg="8" xl="8" pl-lg="0">
                    <Row className='profile-table'>
                      <Col xs="6">
                        <h3 className='fw-semibold'>Name</h3>
                      </Col>
                      <Col xs="6">
                        <h3>{Driver.givenName} {Driver.familyName}</h3>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="6">
                        <h3 className='fw-semibold'>Nationality</h3>
                      </Col>
                      <Col xs="6">
                        <h3>{Driver.nationality}</h3>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="6">
                        <h3 className='fw-semibold'>Date of Birth</h3>
                      </Col>
                      <Col xs="6">
                        <h3 >{convertedDate}</h3>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="6">
                        <h3 className='fw-semibold'>Team</h3>
                      </Col>
                      <Col xs="6">
                        <h3>{Constructors[0].name}</h3>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="6">
                        <h3 className='fw-semibold'>Position</h3>
                      </Col>
                      <Col xs="6">
                        <h3>{position}</h3>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="6">
                        <h3 className='fw-semibold'>Points</h3>
                      </Col>
                      <Col xs="6">
                        <h3>{points}</h3>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="6">
                        <h3 className='fw-semibold'>Wins</h3>
                      </Col>
                      <Col xs="6">
                        <h3>{wins}</h3>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              )
            } else {
               return '' //<h1>No profile data found. Please try again later.</h1>
            }
          })
        :
        <h2 className="text-center">
          {errors ? 'Something went wrong. Please try again later.' : 'Loading'}
        </h2>
        }
      </Row>
    </Container>
  )

}

export default DriverSingle


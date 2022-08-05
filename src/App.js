// Import React Routers
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Import Elements
import PageNavBar from './components/PageNavBar'
import Home from './components/Home'
import Schedule from './components/scheduleResults/Schedule'
import ResultSingle from './components/scheduleResults/ResultSingle'
import DriversIndex from './components/drivers/DriversIndex'
import DriverSingle from './components/drivers/DriverSingle'



function App() {

  // ! JSX
  return (
    <div className='site-wrapper'>
      <BrowserRouter>
        <PageNavBar />
        <Routes>
          <Route path='/' element ={<Home />} />
          <Route path='/schedule' element ={<Schedule />} />
          <Route path='/result/:seasonNo/:roundNo' element ={<ResultSingle />} />
          <Route path='/drivers' element ={<DriversIndex />} />
          <Route path='/drivers/:familyName/:givenName' element ={<DriverSingle />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App

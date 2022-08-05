// Import Link 
import { Link } from 'react-router-dom'

// Import React Bootstrap Components
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const PageNavBar = () => {
  return (
    <Navbar className="bg-gradient" expand="md">
        <Navbar.Brand as={Link} to="/">🏎 <span className="logo">Formula 1</span></Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
            <Nav.Link as={Link} to="/schedule" className='py-2 border-bottom-2'>Schedule</Nav.Link>
            <Nav.Link as={Link} to="/drivers">Drivers</Nav.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default PageNavBar
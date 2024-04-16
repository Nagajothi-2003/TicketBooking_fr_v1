import { Card, Col, Container, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import './App.css';
import Button from 'react-bootstrap/Button';
import { BusFront } from 'lucide-react';
import { Bus } from 'lucide-react';
import { ArrowDownUp } from 'lucide-react';
import { useState } from 'react';
import backgroundImage from './Image/search3.png';
import { MapPin } from 'lucide-react';
import {  InputGroup, Nav, NavDropdown, Navbar, ProgressBar} from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Menu } from 'lucide-react';

const BusSchedule = () => {
  const styles = {
    container: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '90vh',
      // display:'none'
    },
  };
  const boldTextStyle = {
    fontWeight: 'bold',
    fontWeight: "700",
    color: "black"
  };
  const [expanded, setExpanded] = useState(false);
  const handleNavbarToggle = () => {
    setExpanded(!expanded);
  };

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [options, setOptions] = useState([]);
  const [Options2, SetOptions2] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptions, setSelectedOption2] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [filteredOption2, setFilteredOption2] = useState([]);

  const handleReverse = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const fetchOptions = async (input) => {
    try {
      const response = await fetch(`http://localhost:8080/route/api/routes?prefix=${input}`);
      if (!response.ok) {
        throw new Error('Failed to fetch options');
      }
      const data = await response.json();
      setOptions(data);
      // console.log(data);
      setFilteredOptions(data);
      console.log("value", filteredOptions)
      // setShowSuggestions(data.length > 0);
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const fetchOptionS2 = async (destination) => {
    try {
      const response = await fetch(`http://localhost:8080/route/api/routes/destination?Destination=${destination}`);
      if (!response.ok) {
        throw new Error('Failed to fetch options');
      }
      const data = await response.json();
      // console.log(data);
      SetOptions2(data);
      setFilteredOption2(data);
      console.log("value", filteredOption2)
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const handleFromChange = (e) => {
    const inputValue = e.target.value;
    setFrom(inputValue);
    fetchOptions(inputValue);
  };

  const handleToFormchange = (e) => {
    const input = e.target.value;
    setTo(input);
    fetchOptionS2(input);
  };

  const handleOptionSelect2 = (option) => {
    setTo(Options2);
    setFilteredOption2([]);
  };

  const handleOptionSelect = (option) => {
    setFrom(option);
    setFilteredOptions([]);
  };

  const [busSchedules, setBusSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    fetchData();
  };

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const searchData = {
    from: from,
    to: to,
    date: formatDate(date)
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/BusSchedule/busSchedule?origin=${searchData.from}&destination=${searchData.to}&date=${searchData.date}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setBusSchedules(data);
      console.log(data);
    } catch (error) {
      setError(error);
    }
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="position-relative">
      <div className='ouvnR ' style={styles.container} >
        <Container >
          <h1 > 
          <div className='d-flex justify-content-between bai-jamjuree-semibold   '> 
           <div><h1 className='mt-2'> Red<span style={{ color: "green" }}>Bus</span></h1></div>
           <div className='mt-2'>
           <Button variant="primary" onClick={handleShow}><Menu/></Button> 
            <Offcanvas show={show} onHide={handleClose} className="w-sm-60">
        <Offcanvas.Header closeButton className=''>
          <Offcanvas.Title><h1>Red<span style={{ color: "green" }}>Bus</span></h1></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{backgroundColor:'whitesmoke'}}>
        <ul>
          <li>help</li>
          <br></br>
          <li>print ticket</li>
          <br></br>
          <li>cancel ticket</li>
          <br></br>
          <li>Change Travel Date</li>
          <br></br>
          <li>Show my Ticket</li>
          <br></br>
          <li>Email/SMS</li>
          <br></br>
          <li>Login/Sign Up</li>
        </ul>
        </Offcanvas.Body>
            </Offcanvas>
            </div> 
          </div></h1></Container>
        <Container>
          <Row>
            
            <Col lg={5} sm={12} md={6} className='mt-3 '  >
              <div className='shadow-lg  bg-body ' style={{ padding: "15px", borderRadius: "20px", position: "relative" }}   >

                <Form >
                  <Row>
                    <Form.Group className="form__group position-relative">
                      <Form.Label>FROM</Form.Label>
                      <div style={{ borderBottom: "1px solid gray" }} className='d-flex mb-1 justify-content-center align-items-center'>
                        <Bus size={40} color='green' />
                        <Form.Control
                          type="input"
                          value={from}
                          placeholder='Karaikudi'
                          className="mb-1"
                          style={{ border: "none", outline: "none", boxShadow: "none", borderRadius: "none", backgroundColor: "transparent" }}
                          name="name"
                          id="name"
                          onChange={handleFromChange}
                          required
                        />
                      </div>
                      <section className="position-absolute w-50  top-100 start-30 translate-middle-x  shadow  p-3" style={{ zIndex: 100, display: filteredOptions.length > 0 ? 'block' : 'none' }}>
                        {filteredOptions.map((option, index) => (
                          <div key={index}>
                            <MapPin />
                            <span onClick={() => handleOptionSelect(option)}>{option}</span>
                          </div>
                        ))}
                      </section>
                    </Form.Group>
                  </Row>
                  <div className='position-relative' ><div className="arrow-icon "  ><Button onClick={handleReverse} title="Reverse" ><ArrowDownUp size={20} style={{ borderRadius: "50%" }} /></Button></div></div>
                  <Row>
                    <Form.Group className="form__group position-relative">
                      <Form.Label>TO</Form.Label>
                      <div className="d-flex   justify-content-center align-items-center mb-2" style={{ borderBottom: "1px solid gray", position: 'relative', zIndex: 0 }} >
                        <BusFront size={40} color='green' />
                        <Form.Control
                          type="input"
                          placeholder='Karaikudi'
                          className=" mb-1 "
                          style={{ border: "none", outline: "none", boxShadow: "none", borderRadius: "none", backgroundColor: "transparent" }}
                          name="name"
                          id="name"
                          value={to}
                          required
                          onChange={handleToFormchange}
                        />
                      </div>
                      <section className="position-absolute  w-50  top-100 start-30 translate-middle-x  shadow  p-3" style={{ zIndex: 100, display: filteredOption2.length > 0 ? 'block' : 'none' }}>
                        {filteredOption2.map((option, index) => (
                          <div key={index}>
                            <MapPin />
                            <span onClick={() => handleOptionSelect2(option)}>{option}</span>
                          </div>
                        ))}
                      </section>
                    </Form.Group>
                  </Row>

                  <Row>
                    <Form.Group className="form__group">
                      <Form.Label>TRAVEL DATE</Form.Label>
                      <div style={{ borderBottom: "1px solid gray" }} className='mb-2'>
                        <Form.Control
                          type="date"
                          value={date} onChange={(e) => setDate(e.target.value)}
                          className=" mb-1 "
                          style={{ border: "none", outline: "none", boxShadow: "none", borderRadius: "none", backgroundColor: "transparent" }}
                          name="name"
                          id="name"
                          required
                        />
                      </div>
                    </Form.Group>
                  </Row>
                </Form>
                <div className='mt-2 text-center ' style={{fontSize:"13px"}}><span className='p-2' style={{backgroundColor:"rgb(233, 246, 234)",color:"grayS",borderRadius:"10px"}}>Social Distancing</span>Introducing social distancing in select buses. 
                <OverlayTrigger   placement="bottom" overlay={<Tooltip id="tooltip-disabled">Few bus Operator are mainting a gap between seat</Tooltip>}>
                    <span className="d-inline-block mt-2">
                      <span  style={{ pointerEvents: 'none',color:"blue" }}>
                      Know more
                      </span>
                    </span>
                  </OverlayTrigger></div>
                <div className="text-center position-relative fw-bold" style={{ bottom: "-35px" }}><Button onClick={handleSearch} style={{paddingLeft:"25px",paddingRight:"25px",borderRadius:"30px",fontSize:"20px",fontWeight:"bolder"}}>Search bus</Button></div>
              </div>
            </Col>
            <Col className='mt-5' lg={7} sm={12} md={6}>
              <div className='mt-4'>
                <Card className='bg-success text-white ' >

                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                      <Card.Img variant="top" src="holder.js/100px180" />
                      Some quick example text to build on the card title and make up the
                      bulk of the card's content.
                    </Card.Text>

                  </Card.Body>
                </Card>
                <Card className='bg-danger text-white  mt-4' >

                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>                 <Card.Text>
                      <Card.Img variant="top" src="holder.js/100px180" />
                      Some quick example text to build on the card title and make up the
                      bulk of the card's content.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </Col>
            
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default BusSchedule;

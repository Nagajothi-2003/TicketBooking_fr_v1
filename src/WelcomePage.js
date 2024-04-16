// import { Button, Col, Dropdown, Row, Stack } from 'react-bootstrap';
import { Col, Container, InputGroup, Nav, NavDropdown, Navbar, ProgressBar, Row } from 'react-bootstrap';
import backgroundImage from './Image/search3.png';
import forntpage from './Image/forntpage.png'
import icon1 from './Image/icon1.png'
import icon2 from './Image/icon2.png'
import icon3 from './Image/icon3.png'
import icon4 from './Image/icon4.png'
import icon5 from './Image/icon5.png'
import playstore from './Image/googleplayNew.png' 
import appstore from './Image/appstoreNew.png'
import rating2 from './Image/rating2.png'
import rating3 from './Image/rating3.png'
import {  FloatingLabel, Button, FormControl, Card } from 'react-bootstrap';


import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';


const WelcomePage = () => {
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
  const [routes, setRoutes] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8080/route/findAllRoute')
      .then(response => response.json())
      .then(data => {
        setRoutes(data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching routes:', error);
      });
  }, []);
  const boldTextStyle = {
    fontWeight: 'bold',
    fontWeight: "700",
    color: "black"
  };
  const [expanded, setExpanded] = useState(false);
  const handleNavbarToggle = () => {
    setExpanded(!expanded);
  };


    {/* rough */}
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    const [options, setOptions] = useState([]);
    const [Options2, SetOptions2] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOptions, setSelectedOption2] = useState('');
    const handleReverse = () => {
      // Swap "from" and "to" locations
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
        console.log(data)
        setOptions(data);
        console.log("availabale orgins", options);
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
        console.log(data)
        SetOptions2(data);
        console.log("availabale orgins", options);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };
  
    const handleFromChange = (e) => {
      const inputValue = e.target.value;
      setFrom(inputValue);
      console.log(from)
      fetchOptions(inputValue);
    };
    const handleToFormchange = (e) => {
      const input = e.target.value;
      setTo(input);
      fetchOptionS2(input);
    }
    const handleOptionSelect2 = (option) => {
      setSelectedOption2(option);
      setTo(Options2);
      console.log('Selected option:', option);
      SetOptions2([])
    }
    const handleOptionSelect = (option) => {
      setSelectedOption(option);
      setFrom(option)
      console.log('Selected option:', option);
      setOptions([]);
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
        console.log(date);
        const response = await fetch(`http://localhost:8080/BusSchedule/busSchedule?origin=${searchData.from}&destination=${searchData.to}&date=${searchData.date}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBusSchedules(data);
        console.log(data);
        
        // setLoading(false);
      } catch (error) {
        setError(error);
        // setLoading(false);
      }
    };

      {/* rough */}

      
  
 
  return (
    <div>
      <div style={styles.container} className=' d-lg-flex'>
        <div style={{ display: "block",  color: "white", borderRadius: "5px", padding: "4px", gap: "20px" }}>
          <Container>
            <Navbar expand="lg" expanded={expanded} style={{ position: "fixed", top: "0px", left: "0", right: "0", zIndex: "1000" ,backgroundColor:"rgba(0,0,0,0.1)" }} className={expanded ? "blur-background" : ""}>
              <Container>
                <Navbar.Brand href="#home"><div style={boldTextStyle} className="text-bold fs-2">Red<span style={{ color: "green" }}>Bus</span></div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav shadow-none" onClick={handleNavbarToggle} style={{ position: "relative", zIndex: "1000" }} />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto d-flex justify-content-end w-100 " >
                    <Nav.Link href="#home" style={{ color: "black" }} className='fw-semibold fs-6'>help</Nav.Link>
                    <Nav.Link href="#link" style={{ color: "black" }} className='fw-semibold fs-6'>print Ticket</Nav.Link>
                    <Nav.Link href="#linku" style={{ color: "black" }} className='fw-semibold fs-6'>cancel Ticket</Nav.Link>
                    <Nav.Link className='fw-bold fs-5' style={{ color: "black" }} > <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16"><path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" /><path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" /></svg>

                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>

            <div style={{ display: "flex", marginTop: "70px" ,marginLeft:"10px"}} className='d-none d-md-flex'>
              <div><img src={forntpage} style={{ width: "200px", height: "200px" }} className='img-fluid' /></div>
              <div className='d-flex justity-content-center align-items-center'>
                <div style={{ color: "black" }}><span style={{ color: "green", fontWeight: "1000", fontSize: "25px" }}>Fastest Bus Ticket Booking</span><br />redBus is an official TNSTC booking partner</div>
              </div>
            </div>
    {/* rough */}
    {/* <div  className='d-none d-lg-flex'>
        <InputGroup className="">
          <div class="d-flex justify-content-center w-100 " style={{ marginLeft: "auto", marginRight: "auto" }}>
            <InputGroup.Text  >
              <img width="40" height="40" src="https://www.confirmtkt.com/img/icons/ic-search-from-desktop.svg" alt="search" />&nbsp;&nbsp;
              <FloatingLabel controlId='from' label="from">
                <Form.Control placeholder='from' value={from} style={{ border: "none", boxShadow: 'none', textShadow: 'none', minWidth: "250px" }} onChange={(e) => setFrom(e.target.value)}></Form.Control>
              </FloatingLabel>
            </InputGroup.Text>

            <div className='d-flex  ' >
              <Button onClick={handleReverse}  style={{backgroundColor:"green"}} >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrows" viewBox="0 0 16 16">
                  <path d="M1.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L2.707 7.5h10.586l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L13.293 8.5H2.707l1.147 1.146a.5.5 0 0 1-.708.708z" />
                </svg></Button>
            </div>

            <InputGroup.Text >
              <img width="40" height="40" src="https://www.confirmtkt.com/img/icons/ic-search-from-desktop.svg" alt="search" />&nbsp;&nbsp;
              <FloatingLabel controlId='to' label="to">
                <Form.Control placeholder='to' value={to} style={{ border: "none", boxShadow: 'none', textShadow: 'none', minWidth: "250px" }} onChange={(e) => setTo(e.target.value)}></Form.Control>
              </FloatingLabel>
            </InputGroup.Text>
            <InputGroup.Text >

              <FormControl type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ border: "none", boxShadow: 'none', textShadow: 'none', minWidth: "250px" }} />
            </InputGroup.Text >
            <Button className='bg-green' style={{backgroundColor:"green"}} onClick={handleSearch}>Search</Button>
          </div>
        </InputGroup>
      </div> */}
{/* yyty */}
<div class="text-center " style={{marginTop:"60px"}}>
<h3>bus ticket booking</h3>
<h6>24*7 customer service</h6>
</div>
<div className='d-lg-none   d-md-none d-sm-flex' style={{marginTop:"30px"}} >
        <InputGroup.Text >
          <img width="40" height="40" src="https://www.confirmtkt.com/img/icons/ic-search-from-desktop.svg" alt="search" />&nbsp;&nbsp;
          <FloatingLabel controlId="floatingInput" label="form" className=" d-flex  align-items-end  justify-content-end " style={{ overflowX: "none" }} >
            <Form.Control placeholder='from' value={from} style={{ border: "none", boxShadow: 'none', textShadow: 'none' }} onChange={handleFromChange} />
            <span style={{ position: "relative", top: "25px",right:"-6px", background: "white",border:"2px solid green",borderRadius:"4px" }}> <Button onClick={handleReverse} style={{ background: "white", border: "none" }} >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" fill="black" className="bi bi-arrow-down-up" viewBox="0 0 16 16"><path fillRule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5" /></svg></Button></span>
          </FloatingLabel>

        </InputGroup.Text>
        <div type="none" className='shadow  w-50 mt-2 rounded'  >
          <ol>
            {options.map((option, index) => (
              <div key={index} onClick={() => handleOptionSelect(option)} style={{ cursor: "pointer" }}>
                {option}
              </div>
            ))}
          </ol>
        </div>

        <InputGroup.Text >
          <img width="40" height="40" src="https://www.confirmtkt.com/img/icons/ic-search-from-desktop.svg" alt="search" />&nbsp;&nbsp;
          <FloatingLabel controlId="floatingPassword" label="to">onChange={handleToFormchange}
            <Form.Control placeholder='to' value={to} style={{ border: "none", boxShadow: 'none', textShadow: 'none', maxHeight: "60px" }}  />
          </FloatingLabel>
        </InputGroup.Text>
        <div type="none" className='shadow  w-50 mt-2 rounded cursor-pointer'  >
          <ol>
            {Options2.map((option, index) => (
              <div key={index} onClick={() => handleOptionSelect2(option)} style={{ cursor: "pointer" }}>
                {option}
              </div>
            ))}
          </ol>
        </div>
        <InputGroup.Text>
        <FormControl type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ border: "none", boxShadow: 'none', textShadow: 'none',  minHeight: "65px" }} />
        </InputGroup.Text>
     
      <div>
        <ul >
          {options.map((option, index) => (
            <li key={index}>{option
            }</li>
          ))}
        </ul>
        <div className="text-center"><Button onClick={handleSearch}>Search..</Button></div>

      </div>
      </div>

{/* hgjh */}

      <div className="container d-none d-md-flex">
    <Container>
  <div className="row justify-content-center">
    <Row>
      <InputGroup >
      <Col sm={6} md={6} lg={4}>
        <InputGroup.Text>
          <img width="30" height="30" src="https://www.confirmtkt.com/img/icons/ic-search-from-desktop.svg" alt="search" />&nbsp;&nbsp;
          <FloatingLabel controlId='from' label="from">
            <Form.Control placeholder='from' value={from} style={{ border: "none", boxShadow: 'none', textShadow: 'none', minWidth: "150px" }} onChange={(e) => setFrom(e.target.value)}></Form.Control>
          </FloatingLabel>
        </InputGroup.Text>
       
      </Col>
      <div type="none" className='shadow  w-50 mt-2 rounded'  >
          <ol>
            {options.map((option, index) => (
              <div key={index} onClick={() => handleOptionSelect(option)} style={{ cursor: "pointer" }}>
                {option}
              </div>
            ))}
          </ol>
        </div>

        <div className='d-flex  bg-warning'>
          <Button onClick={handleReverse}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrows" viewBox="0 0 16 16">
              <path d="M1.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L2.707 7.5h10.586l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L13.293 8.5H2.707l1.147 1.146a.5.5 0 0 1-.708.708z" />
            </svg>
          </Button>
        </div>
      <Col  sm={6} md={6} lg={4}>
        <InputGroup.Text>
          <img width="30" height="30" src="https://www.confirmtkt.com/img/icons/ic-search-from-desktop.svg" alt="search" />&nbsp;&nbsp;
          <FloatingLabel controlId='to' label="to">
            <Form.Control placeholder='to' value={to} style={{ border: "none", boxShadow: 'none', textShadow: 'none', minWidth: "150px" }} onChange={(e) => setTo(e.target.value)}></Form.Control>
          </FloatingLabel>
        </InputGroup.Text>
        </Col>
        <InputGroup.Text>
        <Col  sm={6} md={6} lg={4}>
          <FormControl type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ border: "none", boxShadow: 'none', textShadow: 'none', minWidth: "200px" }} />
        </Col>
        </InputGroup.Text>
        {/* <Button variant="primary" onClick={handleSearch}>Search</Button> */}
      </InputGroup>
    </Row>
  </div>
  </Container>
</div>

{/* rough */}
          </Container>
        </div>

      </div>

      {/* <h5 className='fw-bold mt-4'>TNSTC OFFERS</h5>
      <Container>
        <h5 className='fw-bold mt-4 fs-5'> Why Book TNSTC bus Ticket on ConfirmTkt</h5>
        <Row className='mt-5'>
          <Col xs={12} lg={6}>
            <div className='d-flex justify-content-start align-content-start gap-2'>
              <div><img src={icon1} minHeight='70px' width='60px'></img></div>
              <div>
                <div className='fw-bold fs-5'> Get Bus Tickets</div>
                <div style={{ color: "gray" }}>With our same Bus alternates and prediction feature, increase your chances of getting confirm Bus tickets.</div>
              </div>
            </div>
          </Col>
          <Col xs={12} lg={6}>
            <div className='d-flex justify-content-start align-content-start gap-2'>
              <div><img src={icon2} minHeight='70px' width='60px'></img></div>
              <div>
                <div className='fw-bold fs-5'> UPI Enabled Secured Payment</div>
                <div style={{ color: "gray" }}>Payment on Confirmtkt is highly secured. Easy UPI and other multiple payment modes available.</div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className='mt-5'>
          <Col xs={12} lg={6}>
            <div className='d-flex justify-content-start align-content-start gap-2'>
              <div><img src={icon4} minHeight='60px' width='50px'></img></div>
              <div>
                <div className='fw-bold fs-5'> Free Cancellation on Bus Tickets</div>
                <div style={{ color: "gray" }}>Get a full refund on Bus tickets by opting our free cancellation feature.</div>
              </div>
            </div>
          </Col>
          <Col xs={12} lg={6}>
            <div className='d-flex justify-content-start align-content-start gap-2'>
              <div><img src={icon3} minHeight='70px' width='50px'></img></div>
              <div>
                <div className='fw-bold fs-5'>Bus Booking & Enquiry Support</div>
                <div style={{ color: "gray" }}>24X7 customer support, for any BUs enquiry & booking related queries call 08068243910.</div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className='mt-5'>
          <Col xs={12} lg={6}>
            <div className='d-flex justify-content-start align-content-start gap-2'>
              <div><img src={icon5} minHeight='60px' width='50px'></img></div>
              <div>
                <div className='fw-bold fs-5'>Instant Refund & Cancellation</div>
                <div style={{ color: "gray" }}>Get an instant refund and book your next Bus ticket easily.</div>
              </div>
            </div>
          </Col>
          <Col xs={12} lg={6}>
            <div className='d-flex justify-content-start align-content-start gap-2'>
              <div><img src={icon4} maxHeight='60px' width='50px' ></img></div>
              <div>
                <div className='fw-bold fs-5'>Live Bus Status Tracking</div>
                <div style={{ color: "gray" }}>Bus status & notification of your Bus tickets.</div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Container className='mt-5'>
        <div style={{ backgroundColor: "#cfe6cd", height: "350px", borderRadius: "50px" }}>
          <Row>
         
            <Col lg={4} md={6} xs={12} >
            <div style={{padding:"20px",marginLeft:"20px"}} className='fs-4  fw-bold'>
                  ENJOY THE APP!!
                </div>
              <div>
                <div style={{ backgroundColor: "white",maxHeight:"250px",maxWidth:"350px", borderRadius: '30px',margin:"10px" ,marginLeft:"10px"}}>
                  <div style={{padding:"10px"}}>
                    <div className='fw-bold fs-4 mt-1'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>&nbsp;&nbsp;Quick Access</div>
                    <div className='fw-bold fs-4 mt-1'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>&nbsp;&nbsp;Superior live tracking</div>
                    <Row class="d-flex justify-content-center  gap-5  mt-1 " >
                      <Col  className=' text-center fw-bold'>
                    <div class="d-flex fw-bold fs-1 justify-content-center ">
                      4.5
                    </div>
                    <div>50M+ downloads</div>
                    <div>Play Store</div>
                    </Col>
                   
                    <Col className='text-center fw-bold'>
                    <div class="d-flex fw-bold fs-1 justify-content-center">
                      4.6
                    </div>
                    <div>50M+ downloads</div>
                    <div>APP Store</div>
                    </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={3}  md={6} xs={12}  className='mt-5  d-flex flex-direction-column align-items-center d-none  d-md-flex'>
              <div style={{padding:"10px"}}>
                <div className='fs-4 fw-bold '>Download the app on</div>
                <div className='mt-5'><img src={playstore} height="60px" width="200px"></img></div>
                <div className='mt-1'><img src={appstore} height="60px" width="200px"></img></div>
              </div>
            </Col>
            <Col lg={4} xs={12} className='mt-5 d-flex flex-direction-column align-items-center  d-none  d-lg-flex '>
            <div>
              <div className='fs-4 fw-bold'>Highest bus booking system</div>
              <div className='d-flex mt-5'>
              <img src={rating3} className='img-fluid d-none' height="150px" width="150px"/>
              <img src={rating2}  height="150px" width="300px"></img>
              </div>
            </div>
            </Col>
          </Row>
        </div>
      </Container>
      <h5 className='fw-bold mt-4'>Official TNSTC Booking Partner</h5> */}
    </div>

  );
}

export default WelcomePage;





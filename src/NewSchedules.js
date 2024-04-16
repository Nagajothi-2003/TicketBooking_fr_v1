import { Container, Navbar, Table } from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";

const NewSchedules = () => {
    const [validated, setValidated] = useState(false);
    const [routeId, setRouteId] = useState('');
    const handleRouteIdChange = (event) => {
        setRouteId(event.target.value);
        console.log(routeId);
        // const selectedRouteId = event.target.value;
        // const selectedRoute = routes.find(route => route.route_id === selectedRouteId);
        // setSelectedRouteName(selectedRoute ? selectedRoute.route_name : '');
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            // event.preventDefault();
            event.stopPropagation();
        }
        // else if (setValidated(true)){
        //     console.log("hi");
        // }
        else{
            setValidated(true);
            const formData =new FormData();
            formData.append("operName",data4.operName);
            formData.append("file",selectedImage);
            formData.append("depTime",data4.depTime);
            formData.append("arrTime",data4.arrTime);
            formData.append("phone",data4.phone);
            formData.append("rating",data4.rating);
            formData.append("seats",data4.seats);
            formData.append("busType",data4.busType);
            formData.append("fare",data4.fare);
            formData.append("duration",data4.duration);
            formData.append("date",data4.date);

        fetch(`http://localhost:8080/file/uploadSchedule/${routeId}`,{
        method:"post",
        body:formData,
        dataType:"jsonp"
      })
      .then(response=>{
        console.log("Data Received"+response.json())
        alert("schedule uploaded successfully")
      })
      .catch((e)=>{
        console.log("error",e)
      })
        }
    };

    const [data4, setData4] = useState({
        operName:'',
        depTime: '',
        arrTime: '',
        phone: '',
        rating: '',
        seats: '',
        busType: '',
        fare: '',
        image: '',
        duration: '',
        date: ''
    });

    const handleChange4 = (event) => {
        const { name, value } = event.target;
        setData4({ ...data4, [name]: value });
    };
    const [selectedImage, setSelectedImage] = useState(null);
    const [routes, setRoutes] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:8080/route/findAllRoute')
        .then(response => response.json())
        .then(data => {
          setRoutes(data);
          console.log("route value",data);
        })
        .catch(error => {
          console.error('Error fetching routes:', error);
        });
    },[]);
    //http://localhost:8080/BusSchedule/delete/359
    //       const deletesche = (Id) => {
    //     try {
    //         const response =  fetch(`http://localhost:8080/BusSchedule/delete/${Id}`, {
    //           method: 'DELETE',
    //         });
    //         if (!response.ok) {
    //           throw new Error('Failed to delete operator');
    //         }
    //         // Remove the deleted operator from the UI
    //         // setOperators(operators.filter(operator => operator.id !== operatorId));
    //       } catch (error) {
    //         console.error('Error deleting operator:', error);
    //       }
    //   }
    const deletesche = (id) => {
        try {
            fetch(`http://localhost:8080/BusSchedule/delete/${id}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete schedule');
                }
                // Refresh schedules after successful deletion
                // You may fetch schedules again from the server or update state accordingly
            })
            .catch(error => {
                console.error('Error deleting schedule:', error);
            });
        } catch (error) {
            console.error('Error deleting schedule:', error);
        }
    };

    return (
        < >
            <Navbar expand="lg" className="bg-primary">
                <Container>
                    <Navbar.Brand className='fw-bold text-white' >AdMin Page</Navbar.Brand>
                </Container>
            </Navbar>

            <h2 className='text-center m-4'>Add Schedule</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                <div style={{ padding: '10px' }}>
                    <Row className="mb-3">
                    <Form.Group as={Col} controlId="validationCustom01">
                            <Form.Label>OperatorNAME</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="operName"
                                value={data4.operName}
                                onChange={handleChange4}
                            />
                            <Form.Control.Feedback type="invalid">please provide the value</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} controlId="validationCustom01">
                            <Form.Label>Depature Time</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="depTime"
                                value={data4.depTime}
                                onChange={handleChange4}
                            />
                            <Form.Control.Feedback type="invalid">please provide the value</Form.Control.Feedback>
                        </Form.Group>
                        </Row>
                        <Row className="mb-3">
                        <Form.Group as={Col} controlId="validationCustom02">
                            <Form.Label>Arrival Time</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="arrTime"
                                value={data4.arrTime}
                                onChange={handleChange4}
                            />
                            <Form.Control.Feedback type="invalid">please provide the value</Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group as={Col} controlId="validationCustomUsername">
                            <Form.Label>phone</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="phone"
                                value={data4.phone}
                                onChange={handleChange4}
                            />
                            <Form.Control.Feedback type="invalid">
                                number is required                            </Form.Control.Feedback>
                        </Form.Group>
                        </Row>
                    <Row className="mb-3">
                   
                        <Form.Group as={Col} controlId="validationCustom03">
                            <Form.Label>rating</Form.Label>
                            <Form.Control required
                                type="text"
                                name="rating"
                                value={data4.rating}
                                onChange={handleChange4} />
                            <Form.Control.Feedback type="invalid">
                                Please provide a rating.
                            </Form.Control.Feedback>
                        </Form.Group>
                    
                        <Form.Group as={Col} controlId="validationCustom04">
                            <Form.Label>seats</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="seats"
                                value={data4.seats}
                                onChange={handleChange4} />
                            <Form.Control.Feedback type="invalid">
                                Please provide a count of seats.
                            </Form.Control.Feedback>
                        </Form.Group>
                        </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="validationCustom05">
                            <Form.Label>busType</Form.Label>
                            <Form.Control required
                                type="text"
                                name="busType"
                                value={data4.busType}
                                onChange={handleChange4} />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid busType.
                            </Form.Control.Feedback>
                        </Form.Group>
                   
                    <Form.Group as={Col} controlId="validationCustom06">
                        <Form.Label>fare</Form.Label>
                        <Form.Control required
                            type="number"
                            name="fare"
                            value={data4.fare}
                            onChange={handleChange4} />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid fare.
                        </Form.Control.Feedback>
                    </Form.Group>
                    </Row>
                    <Row className="mb-3">
                    <Form.Group as={Col} controlId="validationCustom06">
                        <Form.Label>Duration</Form.Label>
                        <Form.Control required
                            type="text"
                            name="duration"
                            value={data4.duration}
                            onChange={handleChange4} />
                        <Form.Control.Feedback type="invalid">
                            Please provide a duration.
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                    
                    <Form.Group as={Col} controlId="validationCustom06">
                        <Form.Label>Date</Form.Label>
                        <Form.Control required
                            type="date"
                            name="date"
                            value={data4.date}
                            onChange={handleChange4} />
                        <Form.Control.Feedback type="invalid">
                            Please provide a date.
                        </Form.Control.Feedback>
                    </Form.Group>
                    </Row>
                    <Row className="mb-3">
                   
                    <Form.Group as={Col} controlId="validationCustom025">
                        <Form.Label>Route Name</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={handleRouteIdChange}>
                          <option value="">Select Route</option>
                          {routes.map(route => (
                            <option key={route.routeId} value={route.routeId}>{route.routeName}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>

                   
                    <Form.Group as={Col} controlId="validationCustom07">
                        {/* <Image /> */}
                        {selectedImage && (
                            <div>
                                <img
                                    alt="not found"
                                    width={"250px"}
                                    src={URL.createObjectURL(selectedImage)}
                                />
                            </div>
                        )}
                        <br />  <br />
                        <Form.Control
                            type="file"
                            name="image"
                            required
                            // value={data3.image}
                            onChange={(event) => {
                                console.log(event.target.files[0]);
                                setSelectedImage(event.target.files[0]);
                            }}
                        />
                         <Form.Control.Feedback type="invalid">
                            Please provide a date.
                        </Form.Control.Feedback>
                    </Form.Group>
                
                    </Row>
                    <Button type="submit">Submit form</Button>
                </div>
            </Form>
      
             

    <Table striped bordered hover>
      <thead>
        <tr>
          <th>RouteName</th>
          <th>Origin</th>
          <th>Destination</th>
          <th>Date</th>
          <th>OperatorName</th>
          <th>DepTime</th>
          <th>ArrTime</th>
          <th>Phone</th>
          <th>Rating</th>
          <th>Seats</th>
          <th>BusType</th>
          <th>Fare</th>
          <th>Duration</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {routes.map((route, index) => (
          route.operatorBusSchedule.map((schedule, innerIndex) => (
            <tr key={innerIndex}>
              {innerIndex === 0 && (
                <React.Fragment>
                  <td rowSpan={route.operatorBusSchedule.length}>{route.routeName}</td>
                  <td rowSpan={route.operatorBusSchedule.length}>{route.origin}</td>
                  <td rowSpan={route.operatorBusSchedule.length}>{route.destination}</td>
                  <td rowSpan={route.operatorBusSchedule.length}>{route.date}</td>
                </React.Fragment>
              )}
              <td>{schedule.operName}</td>
              <td>{schedule.depTime}</td>
              <td>{schedule.arrTime}</td>
              <td>{schedule.phone}</td>
              <td>{schedule.rating}</td>
              <td>{schedule.seats}</td>
              <td>{schedule.busType}</td>
              <td>{schedule.fare}</td>
              <td>{schedule.duration}</td>
              <td>{schedule.date}</td>
               <td>
               <Button onClick={() => deletesche(schedule.id)}>Delete</Button>
              <Button>update</Button></td>
            </tr>
          ))
        ))}
      </tbody>
    </Table>
    <Link to="/NewRoutes"><Button>Back</Button></Link>
        </>
    );
}

export default NewSchedules;
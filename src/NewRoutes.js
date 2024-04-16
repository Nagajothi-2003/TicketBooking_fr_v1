
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const NewRoutes = () => {
    const headerValues = ['routeId','routeName','origin', 'destination', 'date','Actions'];

    const [validated, setValidated] = useState(false);

    const [data3, setData3] = useState({
        routeName: "",
        origin: "",
        destination: "",
        date: "",
    });
    const [saveddata,SetsavedData]=useState([]);
    const handleChange3 = (event) => {
        const { name, value } = event.target;
        setData3({ ...data3, [name]: value });
    };
    const handleDateChange = (event) => {
        setData3({ ...data3, date: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {

            event.stopPropagation();
        }
        // else if(setValidated(true)){
        //     console.log("hi");
        // } 
        else  {
            setValidated(true);

            fetch('http://localhost:8080/route/AddBusRoute', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'post',
                body: JSON.stringify(data3),
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Failed to fetch data');
                    } else {
                        return res.json();
                    }
                })
                .then((FormD) => {
                    SetsavedData(FormD);
                    console.log('the Fetched data is', FormD);
                    alert('Schedule added successfully');
                })
                .catch((e) => {
                    console.log('error', e);
                });
        }

    }; 
    const updateRou = () => {
        console.log("add new rou")
      }
      const deleteOperator = async (id) => {
        try {
          const response = await fetch(`http://localhost:8080/route/delete/${id}`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            throw new Error('Failed to delete operator');
          }
          // Remove the deleted operator from the UI
          // setOperators(operators.filter(operator => operator.id !== operatorId));
        } catch (error) {
          console.error('Error deleting operator:', error);
        }
      };

      const [Routes, setRoutes] = useState([]);
      const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:8080/route/findAllRoute');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
            setRoutes(data); 
            // console.log(Routes);// Assuming your API returns an array of operators
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }





    return (
        < >
            <Navbar expand="lg" className="bg-primary">
                <Container>
                    <Navbar.Brand className='fw-bold text-white' >AdMin Page</Navbar.Brand>
                </Container>
            </Navbar>
            <h2 className='text-center m-4'>Add Route</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "30px" }} className="was-validated">
                <div style={{ padding: "10px" }}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="validationCustom01">
                            <Form.Label>RouteName</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="routeName"
                                value={data3.routeName}
                                onChange={handleChange3}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a routeName
                            </Form.Control.Feedback>                    </Form.Group>

                        <Form.Group as={Col} controlId="validationCustom02">
                            <Form.Label>Orgin</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="origin"
                                value={data3.origin}
                                onChange={handleChange3}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a origin
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} controlId="validationCustomUsername">
                            <Form.Label>Destination</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    required
                                    type="text"
                                    name="destination"
                                    value={data3.destination}
                                    onChange={handleChange3}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a destination
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col} controlId="validationCustom03">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date"
                                value={data3.date}
                                name="date"
                                onChange={handleDateChange}
                                className="form-control"
                                required />
                            <Form.Control.Feedback type="invalid">
                                Please provide a date
                            </Form.Control.Feedback>
                        </Form.Group>

                    </Row>
                </div>
                <Button type="submit">Submit form</Button>
            </Form>
            <Container>

            <Button onClick={fetchData}>view operator</Button>

            <Table responsive>
                <thead>
                    <tr>
                        {headerValues.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))} 
                    </tr> 
                </thead>
                <tbody>
                    {Routes.map(data => (
                        <tr key={data.routeId}>
                            <td>{data.routeId}</td>
                            <td> {data.routeName} </td>
                            <td> {data.origin}</td>
                            <td> {data.destination}</td>
                            <td> {data.date}</td>
                            <td><Button onClick={() => deleteOperator(data.routeId)}>Delete</Button>
                                <Button onClick={updateRou}>update</Button>
                                </td>
                        </tr>
                    ))}

                </tbody>
            </Table>
            </Container>

            <Link to="/NewSchedules"><Button className="bg-primary m-5">ADD Schedule</Button></Link>

        </>
    );
}
export default NewRoutes;

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';

function FormExample() {
  const [validated, setValidated] = useState(false);
  const [data, setData] = useState({
            username: "",
            email: "",
            password: "",
            address: ""
        });
        const navigate = useNavigate();
        const handleChange = (event) => {
            const { name, value } = event.target;
            setData({ ...data, [name]: value });
            console.log(name,value)
        };




const handleSubmit = async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (form.checkValidity() === false) {
    event.stopPropagation();
    setValidated(true);
    return;
  }

  const response = await fetch('http://localhost:8080/Register/Registervalue', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    console.error('Failed to submit form');
    alert("An error occurred while submitting the form");
    return;
  }

  const responseData = await response.json();
  console.log(responseData);
  
  if (responseData.body && responseData.body.username === data.username) {
    alert("Username already exists");
  }else if (responseData.body&&responseData.body.email===data.email){
    alert("email already exists")
    
  }
   else {
    alert("Registered successfully");
    navigate('/Loginpage');
  }
};


  

  return (
<div>
<h1 className='text-center'>Admin page</h1>
          <h5 className='text-center'>Bus Reservation Registration</h5>
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",marginTop:"25px",padding:"10px"}}>
      <div>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Col className="mb-3">
        <Form.Group as={Col}  controlId="validationCustom01">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type="text"
            style={{minWidth:"280px"}}
            name="username" value={data.username}  onChange={handleChange} 
          />
          <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="validationCustom02">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            style={{minWidth:"280px"}}
            name="email" value={data.email}  onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col}  controlId="validationCustomUsername">
          <Form.Label>password</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="password"
              style={{minWidth:"280px"}}
              aria-describedby="inputGroupPrepend"
              required
              name="password" value={data.password}  onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Col>
      <Col className="mb-3">
        <Form.Group as={Col}  controlId="validationCustom03">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text"  style={{minWidth:"300px"}}  name="address" value={data.address}  onChange={handleChange} required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        
      </Col>
     
      <Button type="submit">Submit form</Button>
    </Form>
    </div>
    </div>
    </div>
  );
}

export default FormExample;

  
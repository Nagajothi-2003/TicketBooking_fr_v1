import { useState } from "react";
import { Button, Col, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const Loginpage=()=>{
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
             
              if (name === 'email') {
                console.log("dhi");
                const isValidEmail = /^[a-z]+\d*@gmail\.com$/.test(value);
                console.log(isValidEmail);
                event.target.setCustomValidity(isValidEmail ? '' : 'Invalid email format');
            }
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
        
            const response = await fetch( 'http://localhost:8080/Register/login', {
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
            
            if (responseData.body==null) {
              alert("Username already exists");
            } else {
              alert("login  successfully");
              navigate('/');
            }
          };

    return(
       <div>
        <h1 style={{textAlign:"center",margin:"15px"}}>Login Page</h1>
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",marginTop:"25px",padding:"10px"}}>
      <div>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Col className="mb-3">
       
        <Form.Group as={Col} controlId="validationCustom02">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            style={{minWidth:"280px"}}
            name="email" value={data.email}  onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
              Please enter a valid mail.
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
              Please enter valid password
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Col>

      
     
      <Button type="submit">Submit form</Button>
    </Form>
    </div>
    </div>
    </div>
    );
}
export default Loginpage;



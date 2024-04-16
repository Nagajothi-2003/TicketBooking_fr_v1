import { useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";


const Route=()=>{
  const [val5, setVal5] = useState("");
  const [val6, setVal6] = useState("");
  const [val7, setVal7] = useState("");
  const [val8, setVal8] = useState("");
  const [val9, setVal9] = useState("");
  const [validated, setValidated] = useState(false);
  const handleDateChange = (event) => {
    setData3({ ...data3, date: event.target.value });
  };
  const handleChange3 = (event) => {
    const { name, value } = event.target;
    setData3({ ...data3, [name]: value });
  };
  const [data3, setData3] = useState({
    route_name: "",
    origin: "",
    destination: "",
    duration: "",
    fare: "",
    date: "",
    image:""
  });
  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const headerValues3 = ['Route_id','Route_Name', 'Orgin', 'Destination', 'Duration','date','Fare','Action'];
  const [tableData2, setTableData2] = useState([]);
  const viewRou = ()=>{
     fetch('http://localhost:8080/route/findAllRoute')
     .then(response => {
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }
       return response.json();
     })
     .then(data => {
       setTableData2(data);
       console.log(data);
     })
     .catch(error => {
       console.error('Error fetching data:', error);
     });
  };
  const AddNewRou = async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (form.checkValidity() === false || data3.route_name === "" || data3.origin === "" || data3.destination === "" || data3.duration === "" || data3.fare === "" || data3.date === "") {
        setValidated(true);
        setVal5(data3.route_name === "" ? "input must be filled" : "");
        setVal6(data3.origin === "" ? "input must be filled" : "");
        setVal7(data3.destination === "" ? "input must be filled" : "");
        setVal8(data3.duration === "" ? "input must be filled" : "");
        setVal9(data3.fare === "" ? "input must be filled" : "");
        return;
      }
      setValidated(false);
  
      // Format the date to yyyy-MM-dd format
      const formattedDate = formatDate(data3.date);
  
      // // Send data to your backend using Fetch API
      // try {
      //   const response = await fetch('http://localhost:8080/route/createBusRoute', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({
      //       ...data3,
      //       date: formattedDate // Use the formatted date
      //     })
      //   });
      //   if (!response.ok) {
      //     throw new Error('Failed to add route');
      //   }
      //   alert('Route added successfully');
      //   // Optionally, reset the form after submission
      //   form.reset();
      //   setData3({
      //     route_name: "",
      //     origin: "",
      //     destination: "",
      //     duration: "",
      //     fare: "",
      //     date: ""
          
      //   });
      // } catch (error) {
      //   console.error('Error occurred while adding route:', error);
      // }
      const formData =new FormData();
      formData.append("file",selectedImage);
      formData.append("route_name",data3.route_name)
      formData.append("origin",data3.origin)
      formData.append("destination",data3.destination)
      formData.append("duration",data3.duration)
      formData.append("fare",data3.fare)
      formData.append("date",data3.date)
      fetch("http://localhost:8080/file/uploadProduct",{
        method:"post",
        body:formData,
        dataType:"jsonp"
      })
      .then(response=>{
        console.log("Data Received"+response.json())
        alert("Route uploaded successfully")
      })
      .catch((e)=>{
        console.log("error",e)
      })
      // .finally(()=>{

      // })

  };
  const updateRou = () => {
    console.log("add new rou")
  }
  const [selectedImage, setSelectedImage] = useState(null);
  
  const handleFile = () => {
    console.log("hello world")
    const formData = new FormData();
    formData.append("file", selectedImage);

    fetch("http://localhost:8080/file/upload", {
        method: 'POST',
        body: formData,
        dataType: "jsonp"
    })
    .then(response => response.text())
    .then(
      (text)=>{data3.image=text;
    console.log(text)}
    )
  }
  const [operators, setOperators] = useState([]);
const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/route/findAllRoute');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setOperators(data); // Assuming your API returns an array of operators
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
    return(
        <div>
             <Form noValidate validated={validated} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <div style={{ padding: "10px" }}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationCustom05">
            <Form.Label>Route_Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="route_name"
              value={data3.route_name}
              onChange={handleChange3}
            />
            <div className="text-danger">{val5}</div>
          </Form.Group>

          <Form.Group as={Col} controlId="validationOrgin">
            <Form.Label>Orgin</Form.Label>
            <Form.Control
              type="text"
              required
              name="origin"
              value={data3.origin}
              onChange={handleChange3}
            />
            <div className="text-danger">{val6}</div>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationCustom06">
            <Form.Label>Destination</Form.Label>
            <Form.Control
              required
              type="text"
              name="destination"
              value={data3.destination}
              onChange={handleChange3}
            />
            <div className="text-danger">{val7}</div>
          </Form.Group>
        
          <Form.Group as={Col} controlId="validationCustom07">
            <Form.Label>Duration</Form.Label>
            <Form.Control
              type="text"
              required
              name="duration"
              value={data3.duration}
              onChange={handleChange3}
            />
            <div className="text-danger">{val8}</div>
          </Form.Group>
          </Row>
        <Row>
        <div>
              <input
                type="date"
                value={data3.date}
                name="date"
                onChange={handleDateChange}
                className="form-control"
                required
              />
              {/* <div className="text-danger">Date must be filled</div> */}
            </div>
            
          <Form.Group as={Col} controlId="validationCustom08">
            <Form.Label>Fare</Form.Label>
            <Form.Control
              type="number"
              required
              name="fare"
              value={data3.fare}
              onChange={handleChange3}
            />
            <div className="text-danger">{val9}</div>
          </Form.Group>
        </Row>
        <Row>
            <Form.Group as={Col} controlId="validationCustom09">
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
        <br/>
        <br/>
            <input
          type="file"
          name="image"
          // value={data3.image}
          onChange={(event) => {
            console.log(event.target.files[0]);
            setSelectedImage(event.target.files[0]);
          }}
        />
          </Form.Group>
        </Row>
      </div>
      <div style={{ textAlign: "center", margin: "10px" }}>
        <Button onClick={AddNewRou} >Add New Routes</Button>
         &nbsp;
        <Button onClick={updateRou}>Update Routes</Button> 
      </div>
    </Form>
    <Button onClick={fetchData}>view operator</Button>
                <Table responsive>
                <thead>
                  <tr>
                   
                    {headerValues3.map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                {operators.map(operator => (
                  <tr key={operator.route_id}>
                    <td>{operator.route_id}</td>
                    <td> {operator.route_name} </td>
                    <td> {operator.origin}</td>
                    <td> {operator.destination}</td>
                    <td> {operator.duration}</td>
                    <td> {operator.date}</td>
                    <td> {operator.fare}</td>
                    <td><Button onClick={() => deleteOperator(operator.route_id)}>Delete</Button>
                    <Button onClick={updateRou}>update</Button></td>
                  </tr>
                ))}
                 
                </tbody>
              </Table>  
              <Link to="/BusSchedule"><Button className="bg-primary m-5">ADD Schedule</Button></Link> 
              <Link to="/Operators"><Button>Back</Button></Link>
        </div>
    );
}
export default Route;
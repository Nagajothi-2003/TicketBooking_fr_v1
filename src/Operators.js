import { useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const Operators=()=>{
    const [validated, setValidated] = useState(false);
    const [data2, setData2] = useState({
        operatorName: "",
        contactPhone: ""
      })
    const [tableData1,setTableData1]=useState([]);
    const [val3, Setval3] = useState("");
    const [val4, Setval4] = useState("");
    const updateOpr = (id) => {
        fetch(`http://localhost:8080/Operator/updateOperator/${id}`, {
                  headers:{
                      "Content-Type": "application/json"
                  },
                  method: "post",
                  body: JSON.stringify({operatorId:id})
              })
              .then(response => {
                if (response.ok) {
                  console.log("Data Received " + response);
                  setTableData1(null);
                } else {
                  console.log("Failed to delete data from the database");
                }
              })
              .catch((error) => {
                console.error("Error deleting data:", error);
              });
       }
//  const ViewOper = ()=>{
//   fetch("http://localhost:8080/Operator/findAll")
//   .then((res) => {
//     if (!res.ok) {
//       throw new Error('Failed to fetch data');
//     }
//     else {
//       return res.json();
//     }
//   })
//   .then((FormD) => {
//     console.log("the Fectched data is", FormD);
//   })
//   .then(data => {
//     setTableData1(data);
//     console.log(data);
//   })
//   .catch((e) => {
//     console.log("error", e);
//   })
//  }
//view operators
const [operators, setOperators] = useState([]);
const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/Operator/findAll');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setOperators(data); // Assuming your API returns an array of operators
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


 const handleChange2 = (event) => {
    const { name, value } = event.target;
    setData2({ ...data2, [name]: value });
    console.log(name, value)
  };
  const AddNewOpr = (event) => {
    event.preventDefault();
    if (data2.operatorName == "" || data2.contactPhone == "") {

      const val3 = (data2.operatorName === "") ? "input must be filled" : "";
      Setval3(val3);
      const val4 = (data2.contactPhone === "") ? "input must be filled" : "";
      Setval4(val4);
    } else {
      const val3 = "";
      Setval3(val3);
      const val4 = "";
      Setval4(val4);
      fetch("http://localhost:8080/Operator/CreateOperator",
        {
          headers: {
            "Content-Type": "application/json"
          },
          method: "post",
          body: JSON.stringify(data2)
        })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch data');
          }
          else {
            return res.json();
          }
        })
        .then((FormD) => {
          console.log("the Fectched data is", FormD);
          alert("operator added successfully");

        })
        .catch((e) => {
          console.log("error", e);
        })
    }
  }
 
  const deleteOperator = async (operatorId) => {
    try {
      const response = await fetch(`http://localhost:8080/Operator/delete/${operatorId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete operator');
      }
      // Remove the deleted operator from the UI
      setOperators(operators.filter(operator => operator.id !== operatorId));
    } catch (error) {
      console.error('Error deleting operator:', error);
    }
  };
 
  const headerValues2=['OperatorId','Operator Name','Contact Details','Actions'];
    return(
        <div>
             <div style={{ padding: "10px" }}>
                <Form noValidate validated={validated} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="validationCustom011">
                      <Form.Label>opratorName</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="operatorName" value={data2.operatorName} onChange={handleChange2}
                      />
                      <div className="text-danger" >{val3}</div>
                    </Form.Group>
                    <Form.Group as={Col} controlId="validationCustom27"
                    >
                      <Form.Label>contactPhone</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="contactPhone" value={data2.contactPhone} onChange={handleChange2}
                      />
                      <div className="text-danger">{val4}</div>
                    </Form.Group>
                  </Row>
                  <div style={{ textAlign: "center", margin: "10px" }}><Button type="submit" onClick={AddNewOpr}>Add New operator</Button> &nbsp;<Button >Update Operator</Button></div>
                </Form>
              </div>
              <Button onClick={fetchData}>view operator</Button>
                <Table responsive>
                <thead>
                  <tr>
                    {headerValues2.map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>   
                {operators.map(operator => (
                  <tr key={operator.operatorId}>
                    <td>{operator.operatorName}</td>
                    <td> {operator.operatorId} </td>
                    <td> {operator.contactPhone}</td>
                    <td><Button onClick={() => deleteOperator(operator.operatorId)}>Delete</Button>
                    <Button onClick={updateOpr}>update</Button></td>
                  </tr>
                ))}
                </tbody>
              </Table> 
              <Link to="Route"><Button className="bg-primary m-5">ADD ROUTE</Button></Link> 
        </div>
    );
}
export default Operators;

// import React from 'react';
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
// import Tab from 'react-bootstrap/Tab';
// import Tabs from 'react-bootstrap/Tabs';
// import { useState, useEffect } from "react";
// import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Row from 'react-bootstrap/Row';
// import Image from './Image'
// import Table from 'react-bootstrap/Table';
// import { Alert } from 'react-bootstrap';



// const AdminPagenew = () => {
//   const [val, Setval] = useState("");
//   const [val1, Setval1] = useState("");
//   const [val2, Setval2] = useState("");
//   const [val3, Setval3] = useState("");
//   const [val4, Setval4] = useState("");
//   const [data, setData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     address: ""
//   });
//   const [data2, setData2] = useState({
//     operatorName: "",
//     contactPhone: ""
//   })

// //routes
// const [validated, setValidated] = useState(false);
//   const [data3, setData3] = useState({
//     route_name: "",
//     origin: "",
//     destination: "",
//     duration: "",
//     fare: "",
//     date: "",
//     image:""
//   });
//   const [val5, setVal5] = useState("");
//   const [val6, setVal6] = useState("");
//   const [val7, setVal7] = useState("");
//   const [val8, setVal8] = useState("");
//   const [val9, setVal9] = useState("");

//   const handleChange3 = (event) => {
//     const { name, value } = event.target;
//     setData3({ ...data3, [name]: value });
//   };

//   const handleDateChange = (event) => {
//     setData3({ ...data3, date: event.target.value });
//   };

//   const AddNewRou = async (event) => {
//     event.preventDefault();
//     const form = event.currentTarget;
//     if (form.checkValidity() === false || data3.route_name === "" || data3.origin === "" || data3.destination === "" || data3.duration === "" || data3.fare === "" || data3.date === "") {
//       setValidated(true);
//       setVal5(data3.route_name === "" ? "input must be filled" : "");
//       setVal6(data3.origin === "" ? "input must be filled" : "");
//       setVal7(data3.destination === "" ? "input must be filled" : "");
//       setVal8(data3.duration === "" ? "input must be filled" : "");
//       setVal9(data3.fare === "" ? "input must be filled" : "");
//       return;
//     }
//     setValidated(false);

//     // Format the date to yyyy-MM-dd format
//     const formattedDate = formatDate(data3.date);

//     // Send data to your backend using Fetch API
//     try {
//       const response = await fetch('http://localhost:8080/route/createBusRoute', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           ...data3,
//           date: formattedDate // Use the formatted date
//         })
//       });
//       if (!response.ok) {
//         throw new Error('Failed to add route');
//       }
//       alert('Route added successfully');
//       // Optionally, reset the form after submission
//       form.reset();
//       setData3({
//         route_name: "",
//         origin: "",
//         destination: "",
//         duration: "",
//         fare: "",
//         date: ""

//       });
//     } catch (error) {
//       console.error('Error occurred while adding route:', error);
//     }
//   };

//   const formatDate = (inputDate) => {
//     const date = new Date(inputDate);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//    //image
//    const [selectedImage, setSelectedImage] = useState(null);

//    const handleFile = () => {
//      console.log("hello world")
//      const formData = new FormData();
//      formData.append("file", selectedImage);

//      fetch("http://localhost:8080/file/upload", {
//          method: 'POST',
//          body: formData,
//          dataType: "jsonp"
//      })
//      .then(response => response.text())
//      .then(
//        (text)=>{data3.image=text;
//      console.log(text)}
//      )
//    }
// //finish
// //shedule
// const [operatorId, setOperatorId] = useState([]);
//   const [selectedOperatorId, setSelectedOperatorId] = useState('');
//   const [routeId, setRouteId] = useState('');
//   const [data4, setData4] = useState({
//     depature_time: '',
//     arrival_time: '',
//     bus_number: '',
//     bus_name: '',
//     seats_available: '',
//     bus_type: ''
//   });
//   const [routes, setRoutes] = useState([]);
//   const [errors, setErrors] = useState({
//     depature_time: '',
//     arrival_time: '',
//     bus_number: '',
//     bus_name: '',
//     seats_available: '',
//     bus_type: ''
//   });

//   // useEffect(() => {
//   //   fetch('http://localhost:8080/Operator/findAll')
//   //     .then(response => response.json())
//   //     .then(data => {
//   //       setOperatorId(data);
//   //       console.log(data);
//   //     })
//   //     .catch(error => {
//   //       console.error('Error fetching operators:', error);
//   //     });

//   //   fetch('http://localhost:8080/route/findAllRoute')
//   //     .then(response => response.json())
//   //     .then(data => {
//   //       setRoutes(data);
//   //       console.log(data);
//   //     })
//   //     .catch(error => {
//   //       console.error('Error fetching routes:', error);
//   //     });
//   // }, []);

//   const handleOperatorChange = (event) => {
//     setSelectedOperatorId(event.target.value);
//   };

//   const handleRouteIdChange = (event) => {
//     setRouteId(event.target.value);
//   };

//   const Addsche = (event) => {
//     event.preventDefault();
//     // Validation check before submitting
//     const isValid = validateInputs();
//     if (!isValid) return;

//     fetch(`http://localhost:8080/BusSchedule/createschedule/${selectedOperatorId}/${routeId}`, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       method: 'post',
//       body: JSON.stringify(data4),
//     })
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error('Failed to fetch data');
//       } else {
//         return res.json();
//       }
//     })
//     .then((FormD) => {
//       console.log('the Fetched data is', FormD);
//       alert('Schedule added successfully');
//     })
//     .catch((e) => {
//       console.log('error', e);
//     });
//   };

//   const handleChange4 = (event) => {
//     const { name, value } = event.target;
//     setData4({ ...data4, [name]: value });
//   };

//   // Function to validate inputs
//   const validateInputs = () => {
//     let valid = true;
//     let newErrors = { ...errors };

//     // Validate each input field
//     if (data4.depature_time.trim() === '') {
//       newErrors.depature_time = 'Departure time is required';
//       valid = false;
//     } else {
//       newErrors.depature_time = '';
//     }

//     if (data4.arrival_time.trim() === '') {
//       newErrors.arrival_time = 'Arrival time is required';
//       valid = false;
//     } else {
//       newErrors.arrival_time = '';
//     }

//     if (data4.bus_number.trim() === '') {
//       newErrors.bus_number = 'Bus number is required';
//       valid = false;
//     } else {
//       newErrors.bus_number = '';
//     }

//     if (data4.bus_name.trim() === '') {
//       newErrors.bus_name = 'Bus name is required';
//       valid = false;
//     } else {
//       newErrors.bus_name = '';
//     }

//     if (data4.seats_available.trim() === '') {
//       newErrors.seats_available = 'Seats available is required';
//       valid = false;
//     } else {
//       newErrors.seats_available = '';
//     }

//     if (data4.bus_type.trim() === '') {
//       newErrors.bus_type = 'Bus type is required';
//       valid = false;
//     } else {
//       newErrors.bus_type = '';
//     }

//     setErrors(newErrors);
//     return valid;
//   };


// //finish

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setData({ ...data, [name]: value });
//     console.log(name, value)
//   };
//   const handleChange2 = (event) => {
//     const { name, value } = event.target;
//     setData2({ ...data2, [name]: value });
//     console.log(name, value)
//   };


//   const AddNewOpr = (event) => {
//     event.preventDefault();
//     if (data2.operatorName == "" || data2.contactPhone == "") {

//       const val3 = (data2.operatorName === "") ? "input must be filled" : "";
//       Setval3(val3);
//       const val4 = (data2.contactPhone === "") ? "input must be filled" : "";
//       Setval4(val4);
//     } else {
//       const val3 = "";
//       Setval3(val3);
//       const val4 = "";
//       Setval4(val4);
//       fetch("http://localhost:8080/Operator/CreateOperator",
//         {
//           headers: {
//             "Content-Type": "application/json"
//           },
//           method: "post",
//           body: JSON.stringify(data2)
//         })
//         .then((res) => {
//           if (!res.ok) {
//             throw new Error('Failed to fetch data');
//           }
//           else {
//             return res.json();
//           }
//         })
//         .then((FormD) => {
//           console.log("the Fectched data is", FormD);
//           alert("operator added successfully");


//         })
//         .catch((e) => {
//           console.log("error", e);
//         })
//     }


//   }

//   const deleteOpr = (id) => {
//     console.log("dfjalkj")
//     //  fetch(`http://localhost:8080/Operator/delete/${id}`, {
//     //           headers:{
//     //               "Content-Type": "application/json"
//     //           },
//     //           method: "delete",
//     //           body: JSON.stringify({operatorId:id})
//     //       })
//     //       .then(response => {
//     //         if (response.ok) {
//     //           console.log("Data Received " + response);
//     //           // If deletion from the database was successful, update the UI
//     //           // setTableData1(prevData => prevData.filter(item => item.operatorId !== id));
//     //           setTableData1(null);
//     //         } else {
//     //           console.log("Failed to delete data from the database");
//     //         }
//     //       })
//     //       .catch((error) => {
//     //         console.error("Error deleting data:", error);
//     //       });
//   }
//   const updateOpr = (id) => {
//     fetch(`http://localhost:8080/Operator/updateOperator/${id}`, {
//               headers:{
//                   "Content-Type": "application/json"
//               },
//               method: "post",
//               body: JSON.stringify({operatorId:id})
//           })
//           .then(response => {
//             if (response.ok) {
//               console.log("Data Received " + response);
//               setTableData1(null);
//             } else {
//               console.log("Failed to delete data from the database");
//             }
//           })
//           .catch((error) => {
//             console.error("Error deleting data:", error);
//           });
//    }

//   const deleteRou = (id) => {
//     // fetch(`http://localhost:8080/route/delete/${id}`, {
//     //         headers:{
//     //             "Content-Type": "application/json"
//     //         },
//     //         method: "delete",
//     //         body: JSON.stringify({route_id:id})
//     //     })
//     //     .then(response => {
//     //         console.log("Data Received " + response)
//     //     })
//     //     .catch((e)=>{
//     //       console.log("error",e);
//     //     })
//   }

//   const updateRou = () => {
//     console.log("add new rou")
//   }

//   const deletesche = () => {
//     console.log("add schedule")
//   }
//   const updatesche = () => {
//     console.log("add schedule")
//   }


//   const [tableData, setTableData] = useState([]);
//   const ViewUser = () => {
//     fetch('http://localhost:8080/Register/getVal')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         // Assuming data is an array of objects with the structure { reg_id: number, values: string[] }
//         setTableData(data3);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });

//   }


//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (data.username == "" || data.email == "" || data.password == "" || data.address == "") {
//       const val = (data.username === "") ? "input must be filled" : "";
//       Setval(val);
//       console.log(val);
//       const val1 = (data.email === "") ? "input must be filled" : " ";
//       Setval1(val1);
//       const val2 = (data.password === "") ? "input must be filled" : " ";
//       Setval2(val2);

//     } else {
//       const response = await fetch('http://localhost:8080/Register/Registervalue', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//       });
//       const val = "";
//       Setval(val);
//       const val1 = "";
//       Setval(val1);
//       const val2 = "";
//       Setval2(val2)
//       if (!response.ok) {
//         console.error('Failed to submit form');
//         alert("An error occurred while submitting the form");
//         return;
//       }

//       const responseData = await response.json();
//       console.log(responseData);

//       if (responseData.body && responseData.body.username === data.username) {
//         alert("Username already exists");
//       } else {
//         alert("Registered successfully");
//         // navigate('/Loginpage');
//       }
//     }

//   };

//   const fun = () => {
//     console.log("hii aim ")
//   }

// const handleOperatorIdChange = (event) => {
//         setOperatorId(event.target.value);
//       };
// const [tableData1,setTableData1]=useState([]);
//  const ViewOper = ()=>{
//   fetch('http://localhost:8080/Operator/findAll')
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     setTableData1(data);
//     console.log(data);
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//   });
//  }
//  const [tableData2, setTableData2] = useState([]);
//  const viewRou = ()=>{
//   fetch('http://localhost:8080/route/findAllRoute')
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     setTableData2(data);
//     console.log(data);
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//   });
//  }
//  const [tableData3, setTableData3] = useState([]);
//  const viewSchedule = ()=>{
//   console.log("fetche called");
//   fetch('http://localhost:8080/BusSchedule/getAll')
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     setTableData3(data);
//     console.log(data);
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//   });
//  }
//   const headerValues = ['Username', 'email', 'password', 'address'];
//   const headerValues2=['OperatorId','Operator Name','Contact Details','Actions'];
//   const headerValues3 = ['Route_id','Route_Name', 'Orgin', 'Destination', 'Duration','date','Fare','Action'];
//   const headerValues4 = ['schedule_id','Depature Time', 'Arrival Time', 'bus_number', 'bus_name','date','seats_available','bus_type','Operator ID','Route ID'];

//   return (
//     <div>
//       <Navbar expand="lg" className="bg-primary" style={{ fontSize: "35px" }}>
//         <Container>
//           <Navbar.Brand href="#" class=" text-dark text-decoration-none">Admin panel</Navbar.Brand>
//         </Container>
//       </Navbar>
//       <Container>
//         <div style={{ marginTop: "0px" }}>
//           <Tabs defaultActiveKey="home" id="justify-tab-example" className=" m-2 shadow bg-info" variant="pills" transition={false}>

//             <Tab eventKey="home" title="users">
//               <div style={{ padding: "10px" }}>
//                 <Form noValidate validated={validated} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
//                   <Row className="mb-3">
//                     <Form.Group as={Col} controlId="validationCustom01">
//                       <Form.Label>Username</Form.Label>
//                       <Form.Control
//                         required
//                         type="text"
//                         name="username" value={data.username} onChange={handleChange}
//                       />
//                       <div className="text-danger" >{val}</div>
//                     </Form.Group>
//                     <Form.Group as={Col} controlId="validationCustom026"
//                     >
//                       <Form.Label>Email</Form.Label>
//                       <Form.Control
//                         required
//                         type="email"
//                         name="email" value={data.email} onChange={handleChange}
//                       />
//                       <div className="text-danger">{val1}</div>
//                     </Form.Group>
//                   </Row>
//                   <Row>
//                     <Form.Group as={Col} controlId="validationCustompassword"
//                     >
//                       <Form.Label>password</Form.Label>
//                       <Form.Control
//                         type="password"
//                         required
//                         name="password" value={data.password} onChange={handleChange}
//                       />
//                       <div className="text-danger">{val2}</div>
//                     </Form.Group>

//                     <Form.Group as={Col} controlId="validationCustom03"
//                     >
//                       <Form.Label>Address</Form.Label>
//                       <Form.Control type="text"
//                         name="address" value={data.address} onChange={handleChange} required />
//                       <div className="text-danger">{val2}</div>
//                     </Form.Group>
//                   </Row>

//                   <Col style={{ textAlign: "center" }}> <Button type="submit" onClick={handleSubmit} style={{ textAlign: "center", margin: "10px" }}>Submit form</Button></Col>
//                 </Form>
//               </div>
//               {/* table */}

//               <Button onClick={ViewUser}>view user</Button>
//               <Table responsive>
//                 <thead>
//                   <tr>
//                     <th>reg_id</th>
//                     {headerValues.map((header, index) => (
//                       <th key={index}>{header}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {
//                     Array.isArray(tableData) && tableData.slice(0, 10).map((arr) => (
//                       <tr key={arr.reg_id}>
//                         <td> {arr.reg_id} </td>
//                         <td> {arr.username}</td>
//                         <td> {arr.email}</td>
//                         <td>{arr.password}</td>
//                         <td> {arr.address}</td>
//                       </tr>
//                     ))
//                   }
//                 </tbody>
//               </Table>
//             </Tab>

//             <Tab eventKey="operators" title="Operators">
//               <br />
//               <div style={{ padding: "10px" }}>
//                 <Form noValidate validated={validated} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
//                   <Row className="mb-3">
//                     <Form.Group as={Col} controlId="validationCustom011">
//                       <Form.Label>opratorName</Form.Label>
//                       <Form.Control
//                         required
//                         type="text"
//                         name="operatorName" value={data2.operatorName} onChange={handleChange2}
//                       />
//                       <div className="text-danger" >{val3}</div>
//                     </Form.Group>
//                     <Form.Group as={Col} controlId="validationCustom27"
//                     >
//                       <Form.Label>contactPhone</Form.Label>
//                       <Form.Control
//                         required
//                         type="text"
//                         name="contactPhone" value={data2.contactPhone} onChange={handleChange2}
//                       />
//                       <div className="text-danger">{val4}</div>
//                     </Form.Group>
//                   </Row>
//                   <div style={{ textAlign: "center", margin: "10px" }}><Button type="submit" onClick={AddNewOpr}>Add New operator</Button> &nbsp;<Button >Update Operator</Button></div>
//                 </Form>
//               </div>
//               <Button onClick={ViewOper}>view operator</Button>
//                 <Table responsive>
//                 <thead>
//                   <tr>

//                     {headerValues2.map((header, index) => (
//                       <th key={index}>{header}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   { 
//                     Array.isArray(tableData1) && tableData1.slice(0, 10).map((arr) => (
//                       <tr key={arr.operatorId}>
//                         <td> {arr.operatorId} </td>
//                         <td> {arr.operatorName}</td>
//                         <td> {arr.contactPhone}</td>
//                         <td><Button onClick={deleteOpr(arr.operatorId)}  >Delete</Button>
//                         <Button onClick={updateOpr(arr.operatorId)}>update</Button></td>
//                       </tr>
//                     ))
//                   }
//                 </tbody>
//               </Table>  
//             </Tab>

//             <Tab eventKey="Routes" title="Routes">
//               <br />

//               <Form noValidate validated={validated} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
//       <div style={{ padding: "10px" }}>
//         <Row className="mb-3">
//           <Form.Group as={Col} controlId="validationCustom05">
//             <Form.Label>Route_Name</Form.Label>
//             <Form.Control
//               required
//               type="text"
//               name="route_name"
//               value={data3.route_name}
//               onChange={handleChange3}
//             />
//             <div className="text-danger">{val5}</div>
//           </Form.Group>

//           <Form.Group as={Col} controlId="validationOrgin">
//             <Form.Label>Orgin</Form.Label>
//             <Form.Control
//               type="text"
//               required
//               name="origin"
//               value={data3.origin}
//               onChange={handleChange3}
//             />
//             <div className="text-danger">{val6}</div>
//           </Form.Group>
//         </Row>
//         <Row className="mb-3">
//           <Form.Group as={Col} controlId="validationCustom06">
//             <Form.Label>Destination</Form.Label>
//             <Form.Control
//               required
//               type="text"
//               name="destination"
//               value={data3.destination}
//               onChange={handleChange3}
//             />
//             <div className="text-danger">{val7}</div>
//           </Form.Group>

//           <Form.Group as={Col} controlId="validationCustom07">
//             <Form.Label>Duration</Form.Label>
//             <Form.Control
//               type="text"
//               required
//               name="duration"
//               value={data3.duration}
//               onChange={handleChange3}
//             />
//             <div className="text-danger">{val8}</div>
//           </Form.Group>
//           </Row>
//         <Row>
//         <div>
//               <input
//                 type="date"
//                 value={data3.date}
//                 name="date"
//                 onChange={handleDateChange}
//                 className="form-control"
//                 required
//               />
//               {/* <div className="text-danger">Date must be filled</div> */}
//             </div>

//           <Form.Group as={Col} controlId="validationCustom08">
//             <Form.Label>Fare</Form.Label>
//             <Form.Control
//               type="number"
//               required
//               name="fare"
//               value={data3.fare}
//               onChange={handleChange3}
//             />
//             <div className="text-danger">{val9}</div>
//           </Form.Group>
//         </Row>
//         <Row>
//             <Form.Group as={Col} controlId="validationCustom09">
//             {/* <Image /> */}

//         {selectedImage && (
//           <div>
//             <img
//               alt="not found"
//               width={"250px"}
//               src={URL.createObjectURL(selectedImage)}
//             />

//             <br />
//             <button onClick={() => setSelectedImage(null)}>Remove</button>
//             <button onClick={ handleFile()}>Upload</button>
//           </div>
//         )}
//         <br/>
//         <br/>
//             <input
//           type="file"
//           name="image"
//           // value={data3.image}
//           onChange={(event) => {
//             console.log(event.target.files[0]);
//             setSelectedImage(event.target.files[0]);
//           }}
//         />
//           </Form.Group>
//         </Row>
//       </div>
//       <div style={{ textAlign: "center", margin: "10px" }}>
//         <Button onClick={AddNewRou} >Add New Routes</Button>
//          &nbsp;
//         <Button onClick={updateRou}>Update Routes</Button> 
//       </div>
//     </Form>
//     <Button onClick={viewRou}>view operator</Button>
//                 <Table responsive>
//                 <thead>
//                   <tr>

//                     {headerValues3.map((header, index) => (
//                       <th key={index}>{header}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   { 
//                     Array.isArray(tableData2) && tableData2.slice(0, 10).map((arr) => (
//                       <tr key={arr.route_id}>
//                         <td >{arr.route_id}</td>
//                         <td> {arr.route_name} </td>
//                         <td> {arr.origin} </td>
//                         <td> {arr.destination}</td>
//                         <td> {arr.duration}</td>
//                         <td> {arr.date}</td>
//                         <td> {arr.fare}</td>
//                         <td><Button onClick={deleteRou(arr.route_id)}>Delete</Button>
//                         <Button onClick={updateRou(arr.route_id)}>update</Button></td>
//                       </tr>
//                     ))
//                   }
//                 </tbody>
//               </Table>  


//             </Tab>


//             <Tab eventKey="Bus schedules" title="Bus schedules" >
//               <br />


//             <Form noValidate style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//                   <div style={{ padding: '10px' }}>
//                     <Row className="mb-3">
//                       <Form.Group as={Col} controlId="validationCustom022">
//                         <Form.Label>Depature Time</Form.Label>
//                         <Form.Control
//                           required
//                           type="text"
//                           name="depature_time"
//                           value={data4.depature_time}
//                           onChange={handleChange4}
//                           isInvalid={!!errors.depature_time}
//                         />
//                         <Form.Control.Feedback type="invalid">{errors.depature_time}</Form.Control.Feedback>
//                       </Form.Group>

//                       <Form.Group as={Col} controlId="validationCustomarrivalTime">
//                         <Form.Label>Arrival Time</Form.Label>
//                         <Form.Control
//                           required
//                           type="text"
//                           name="arrival_time"
//                           value={data4.arrival_time}
//                           onChange={handleChange4}
//                           isInvalid={!!errors.arrival_time}
//                         />
//                         <Form.Control.Feedback type="invalid">{errors.arrival_time}</Form.Control.Feedback>
//                       </Form.Group>
//                     </Row>
//                     <Row className="mb-3">
//                       <Form.Group as={Col} controlId="validationCustom023">
//                         <Form.Label>bus_number</Form.Label>
//                         <Form.Control
//                           required
//                           type="text"
//                           name="bus_number"
//                           value={data4.bus_number}
//                           onChange={handleChange4}
//                           isInvalid={!!errors.bus_number}
//                         />
//                         <Form.Control.Feedback type="invalid">{errors.bus_number}</Form.Control.Feedback>
//                       </Form.Group>

//                       <Form.Group as={Col} controlId="validationCustombusName">
//                         <Form.Label>bus_name</Form.Label>
//                         <Form.Control
//                           required
//                           type="text"
//                           name="bus_name"
//                           value={data4.bus_name}
//                           onChange={handleChange4}
//                           isInvalid={!!errors.bus_name}
//                         />
//                         <Form.Control.Feedback type="invalid">{errors.bus_name}</Form.Control.Feedback>
//                       </Form.Group>
//                     </Row>
//                     <Row className="mb-3">
//                       <Form.Group as={Col} controlId="validationCustomseatsAvailable">
//                         <Form.Label>seats_available</Form.Label>
//                         <Form.Control
//                           required
//                           type="text"
//                           name="seats_available"
//                           value={data4.seats_available}
//                           onChange={handleChange4}
//                           isInvalid={!!errors.seats_available}
//                         />
//                         <Form.Control.Feedback type="invalid">{errors.seats_available}</Form.Control.Feedback>
//                       </Form.Group>
//                     </Row>
//                     <Form.Group as={Col} controlId="validationCustombusType">
//                       <Form.Label>bus_type</Form.Label>
//                       <Form.Control
//                         required
//                         type="text"
//                         name="bus_type"
//                         value={data4.bus_type}
//                         onChange={handleChange4}
//                         isInvalid={!!errors.bus_type}
//                       />
//                       <Form.Control.Feedback type="invalid">{errors.bus_type}</Form.Control.Feedback>
//                     </Form.Group>
//                     <Row className="mb-3">
//                       <Form.Group as={Col} controlId="validationCustom024">
//                         <Form.Label>Operator ID</Form.Label>
//                         <Form.Select aria-label="Default select example" onChange={handleOperatorChange}>
//                           <option value="">Select Operator</option>
//                           {operatorId.map(operator => (
//                             <option key={operator.operatorId} value={operator.operatorId}>{operator.operatorName}</option>
//                           ))}
//                         </Form.Select>
//                       </Form.Group> 

//                       <Form.Group as={Col} controlId="validationCustom025">
//                         <Form.Label>Route ID</Form.Label>
//                         <Form.Select aria-label="Default select example" onChange={handleRouteIdChange}>
//                           <option value="">Select Route</option>
//                           {routes.map(route => (
//                             <option key={route.route_id} value={route.route_id}>{route.route_name}</option>
//                           ))}
//                         </Form.Select>
//                       </Form.Group>
//                     </Row>
//                   </div>
//                   <div style={{ textAlign: 'center', margin: '10px' }}>
//                     <Button onClick={Addsche}>Add New</Button> &nbsp;&nbsp;
//                     <Button onClick={deletesche}>Delete </Button> &nbsp;&nbsp;
//                   <Button onClick={updatesche}>Update </Button>
//                   </div>
//                 </Form>
//                 <Button onClick={viewSchedule}>view schedule</Button>
//                 <Table responsive>
//                 <thead>
//                   <tr>

//                     {headerValues4.map((header, index) => (
//                       <th key={index}>{header}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   { 
//                     Array.isArray(tableData3) && tableData3.slice(0, 10).map((arr) => (
//                       <tr key={arr.schedule_id}>
//                         <td >{arr.schedule_id}</td>
//                         <td> {arr.depature_time} </td>
//                         <td> {arr.arrival_time} </td>
//                         <td> {arr.bus_number}</td>
//                         <td> {arr.bus_name}</td>
//                         <td> {arr.seats_available}</td>
//                         <td> {arr.bus_type}</td>
//                         <td><Button onClick={deletesche}>Delete</Button>
//                         <Button onClick={updatesche}>update</Button></td>
//                       </tr>
//                     ))
//                   }
//                 </tbody>
//               </Table>  

//               {/* <div style={{ textAlign: "center", margin: "10px" }}><Button onClick={Addsche}>Add New</Button> &nbsp;<Button onClick={deletesche}>Delete </Button>&nbsp;&nbsp;<Button onClick={updatesche}>Update </Button></div> */}
//             </Tab>

//             <Tab eventKey="Booking details" title="Booking details" >
//               <br />
//               <h1>Booking details here</h1>
//             </Tab>

//           </Tabs>
//         </div>
//       </Container>
//     </div>
//   );
// }

// export default AdminPagenew;
import { useState } from 'react';
import { InputGroup, FloatingLabel, Form, Button, FormControl, Card } from 'react-bootstrap';

function YourComponent() {
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
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <>
      <div className='p-4 ' >
        <InputGroup.Text >
          <img width="40" height="40" src="https://www.confirmtkt.com/img/icons/ic-search-from-desktop.svg" alt="search" />&nbsp;&nbsp;
          <FloatingLabel controlId="floatingInput" label="form" className=" d-flex  align-items-end  justify-content-end " style={{ overflowX: "none" }} >
            <Form.Control placeholder='from' value={from} style={{ border: "none", boxShadow: 'none', textShadow: 'none' }} onChange={handleFromChange} />
            <span style={{ position: "relative", top: "25px",right:"-6px", background: "white",border:"2px solid green",borderRadius:"4px" }}> <Button onClick={handleReverse} style={{ background: "white", border: "none" }} >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" fill="black" className="bi bi-arrow-down-up" viewBox="0 0 16 16"><path fillRule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5" /></svg></Button></span>
          </FloatingLabel>

        </InputGroup.Text>
        <div type="none" className='shadow  w-50 mt-3 rounded'  >
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
          <FloatingLabel controlId="floatingPassword" label="to">
            <Form.Control placeholder='to' value={to} style={{ border: "none", boxShadow: 'none', textShadow: 'none', maxHeight: "60px" }} onChange={handleToFormchange} />
          </FloatingLabel>
        </InputGroup.Text>
        <div type="none" className='shadow  w-50 mt-3 rounded cursor-pointer'  >
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
      </div>
      <div>
        <ul >
          {options.map((option, index) => (
            <li key={index}>{option
            }</li>
          ))}
        </ul>
      </div>
      <div className="text-center"><Button onClick={handleSearch}>Search..</Button></div>

      private String operName;
	private String depTime;
	private String arrTime;
    private String phone;
    private String rating;
	private String seats;
	private String busType;
	private double fare;
	private String image;
	private String duration;
	private String date;

    {busSchedules.length === 0 ? (
    <div className="text-center">
      
      No buses available for the selected route and date.</div>
  ) : (
    busSchedules.map((schedule,index) => (
      <Card key={index} style={{ padding: "5px", margin: "8px" }}>
        <Card.Header as="h4">Featured</Card.Header>
        <Card.Body>
          <Card.Title>{schedule.operName}</Card.Title>
          <Card.Text>
            depature_time: {schedule.depTime}<br />
            arrival_time: {schedule.arrTime}<br />
            rating: {schedule.rating}<br />
            seats_available: {schedule.seats}<br/>
            bustype:{schedule.busType}<br/>
            fare{schedule.fare}<br/>
            duration{schedule.duration}<br/>
            
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    ))
  )}
    </>
  );
}

export default YourComponent;

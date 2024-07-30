
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import WelcomePage from './WelcomePage'
import Adminpage from './AdminPage';
import LoginPage from './LoginPage'
import AdminPageNew from './AdminPageNew'
import BusSchedule from './BusSchedules'
import NewRoutes from './NewRoutes'
import NewSchedules from './NewSchedules'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      {/* <Route path='/' element={  <WelcomePage/>}></Route> */}
      <Route path='/Adminpage/addVehicele' element={<Adminpage/>}></Route>
      <Route path='/Loginpage' element={ <LoginPage/>}></Route>
      <Route path='/Adminpagenew' element={  <AdminPageNew/>}></Route>
      <Route path='/BusSchedule' element={  <BusSchedule/>}></Route>
      <Route path="/NewRoutes" element={<NewRoutes/>}></Route>
      <Route path="/NewSchedules" element={<NewSchedules/>}></Route>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
{/* <Route path='/Operators' element={  <Operators/>}></Route> */}
{/* <Route path='/Operators/Route' element={  <RoutePage/>}></Route>
import Operators from './Operators';
import RoutePage from './Route'; */}
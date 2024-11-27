import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

/* ---- Import Components ---- */
import Home from "./Components/Home/Home";
import User from "./Components/UserDetails/ViewUsers";
import Adduser from "./Components/Add User/AddUser";
import UpdateUser from "./Components/Update User/UpdateUser";
import "react-toastify/dist/ReactToastify.css";
import UserLogin from "./Components/Login/Login";
import UserDashboard from "./Components/Dashboards/UserDashboard";
import Otp from "./Components/OTP_Verify/otp";
import NavBar from "./Components/nav/nav user";
import AddPets from "./Components/Add pets/Addpets";
import ViewPets from "./Components/PetDetails/ViewPets";
import UpdatePet from "./Components/Update pets/UpdatePet";
import Pet from "./Components/PetDetails/ViewPets";
import AdminDashboard from "./Components/Dashboards/AdminDashboard";
import AddAdmin from "./Components/Add User/AddAdmin";
import AdminLogin from "./Components/Login/AdminLogin";
import Updateemployee from "./Components/Update Employees/Updateemployees";
import ViewEmployees from "./Components/EmployeeDetails/ViewEmployees";
import Loginupdate from "./Components/Login/Loginupdate";
import UpdateUseradmin from "./Components/Update User/UpdateUseradmin";
import NavbarAdmin from "./Components/nav/nav admin";
import Petprofile from "./Components/Dashboards/Petprofile";

//product
import Displayproduct from "./Components/MProduct/Displayproduct";
import DisplayDiscount from "./Components/Discount/DisplayDiscount";
import Report from "./Components/Report/Report";
import DisplayReorder from "./Components/Reorder/DisplayReorder";
import AddProduct from "./Components/MProduct/AddProduct";
import UpdateProduct from "./Components/MProduct/UpdateProduct";
import AddDiscount from "./Components/Discount/AddDiscount";
import UpdateDiscount from "./Components/Discount/UpdateDiscount";
import AddReorder from "./Components/Reorder/AddReorder";
import UpdateReorder from "./Components/Reorder/UpdateReorder";
import ProductDashboard from "./Components/Products/ProductDashboard";


//delivery management
import CustomerView from "./Components/CustomerView/CustomerView";
import DelProgressChart from './Components/ChartDel/DelProgressChart';
import AddDelayForm from './Components/AddDelayForm/AddDelayForm';
import DeliveryDashboard from './Components/DeliveryDashboard/DeliveryDashboard';
import AllTracking from "./Components/AllTracking/AllTracking";
import DeliveryDetails from "./Components/DeliveryDetails/DeliveryDetails";
import SendPdf from "./Components/SendPdf/SendPdf";
import AddDelivery from "./Components/AddDelivery/AddDelivery";
import DeliveryTrackingAdd from './Components/DeliveryManagerAdd/DeliveryTrackingAdd';
import DeliveryTrackingUpdate from './Components/DeliveryManagerUpdate/DeliveryTrackingUpdate';
import UpdateDelivery from './Components/UpdateDelivery/UpdateDelivery';
import AllDelay from './Components/AllDelay/AllDelay';

//pet tracking 
import Home1 from "./Components/Home1/Home"
import AddPetRecords from "./Components/AddPetRecords/AddPetRecords"
import PetRecords from "./Components/Pet records/PetRecords"
import UpdatePetRecords from "./Components/UpdatePetRecords/UpdatePetRecords";
import UserReminder from "./Components/Reminder/UserReminder";
import NoteApp from "./Components/NoteApp/NoteApp";
import AddNote from "./Components/NoteApp/AddNote";
import UpdateNote from "./Components/NoteApp/UpdateNote";
import AddDoWarming from "./Components/Do-Warming Records/AddDoWarming";
import DoWarmingRecord from "./Components/Do-Warming Records/DoWarmingRecord";
import UpdateDoWarming from "./Components/Do-Warming Records/UpdateDoWarming";
import TestCrud from "./Components/TestExample/TestCrud";
import Test1 from "./Components/TestExample/Test1";
import AddVaccination from "./Components/VaccinationRecords/AddVaccination";
import VaccinationRecords from "./Components/VaccinationRecords/VaccinationRecords";
import UpdateVaccination from "./Components/VaccinationRecords/UpdateVaccination";
import AddReminder from "./Components/Reminder/AddReminder";
import AddCalorieRecors from "./Components/Calorie Calculator/AddCalorieRecors";
import UserCalorieRecords from "./Components/Calorie Calculator/UserCalorieRecords";
import EditCalorieRecord from "./Components/Calorie Calculator/EditCalorieRecord";


function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mainhome" element={<Home />} />
          <Route path="/userdetails" element={<User />} />
          <Route path="/adduser" element={<Adduser />} />
          <Route path="/userdetails/:id" element={<UpdateUser />} />
          <Route path="/UserLogin" element={<UserLogin />} />
          <Route path="/Otp" element={<Otp />} />
          <Route path="/AddPets" element={<AddPets />} />
          <Route path="/ViewPets" element={<ViewPets />} />
          <Route path="/petdetails" element={<Pet />} />
          <Route path="/UpdatePet/:id" element={<UpdatePet />} />
          <Route path="/NavBar" element={<NavBar />} />
          <Route path="/AddAdmin" element={<AddAdmin />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/Updateemployee/:id" element={<Updateemployee />} />
          <Route path="/ViewEmployees" element={<ViewEmployees />} />
          <Route path="/Loginupdate" element={<Loginupdate />} />
          <Route path="/UpdateUseradmin/:id" element={<UpdateUseradmin />} />
          <Route path="/NavbarAdmin" element={<NavbarAdmin />} />
          <Route path="/UserDashboard/:email" element={<UserDashboard />} />
          <Route path="/AdminDashboard/:email" element={<AdminDashboard />} />
          <Route path="/Petprofile/:microchipId" element={<Petprofile />} />
          
          <Route path="/pdashboard" element={<ProductDashboard />} />
          <Route path="/displayproduct" element={<Displayproduct />} />
          <Route path="/displaydiscount" element={<DisplayDiscount />} />
          <Route path="/report" element={<Report />} />
          <Route path="/displayreorder" element={<DisplayReorder />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/displayproduct/:id" element={<UpdateProduct />} />
          <Route path="/adddiscount" element={<AddDiscount />} />
          <Route path="/displaydiscount/:id" element={<UpdateDiscount />} />
          <Route path="/addreorder" element={<AddReorder />} />
          <Route path="/displayreorder/:id" element={<UpdateReorder />} />
          
          <Route path="/CustomerView/:userEmail" element={<CustomerView/>}/>
          <Route path="/deliverychart" element={<DelProgressChart/>}></Route>
          <Route path="/adddelayform" element={<AddDelayForm />} />
          <Route path="/deldashbord" element={<DeliveryDashboard/>}></Route>
          <Route path="/trackingdetails" element={<AllTracking/>}></Route>
          <Route path="/deliverydetails" element={<DeliveryDetails/>}></Route>
          <Route path="/sendpdf" element={<SendPdf/>}></Route>
          <Route path="/adddelivery" element={<AddDelivery/>}></Route>
          <Route path="/addtracking" element={<DeliveryTrackingAdd/>}></Route>
          <Route path="/trackingdetails/:id" element={<DeliveryTrackingUpdate/>}></Route>
          <Route path="/deliverydetails/:id" element={<UpdateDelivery/>}></Route> 
          <Route path="/delaydetails" element={<AllDelay/>}></Route> 

          <Route path="/" element={<Home1/>}/>
          <Route path="/mainhome" element={<Home1/>}/>
          <Route path="/addpetrecords" element={<AddPetRecords/>}/>
          <Route path="/petrecords" element={<PetRecords/>}/> 
          <Route path="/petrecords/:id" element={<UpdatePetRecords/>}/>
          <Route path="/useReminder" element={<UserReminder/>}/> 
          <Route path="/noteApp" element={<NoteApp/>}/> 
          <Route path="/noteApp/:id" element={<UpdateNote/>}/> 
          <Route path="/addnote" element={<AddNote/>}/>
          <Route path="/addDoWarming" element={<AddDoWarming/>}/>
          <Route path="/doWarmingRecords" element={<DoWarmingRecord/>}/>
          <Route path="/doWarmingRecords/:id" element={<UpdateDoWarming/>}/>
          <Route path="/addvaccinationRecords" element={<AddVaccination/>}/>
          <Route path="/vaccinationRecords/:id" element={<UpdateVaccination/>}/>
          <Route path="/vaccinationRecords" element={<VaccinationRecords/>}/>
          <Route path="/addReminder" element={<AddReminder/>}/>
          <Route path="/caloriecalculator" element={<AddCalorieRecors/>}/>
          <Route path="/calorierecords/:microchipId" element={<UserCalorieRecords/>}/>
          <Route path="/editcaloryrecord/:recordId" element={<EditCalorieRecord />}/>
          <Route 
          path="/calorierecords" 
          element={<UserCalorieRecords microchipId={window.history.state?.microchipId}/>}
          />
          
           <Route path="/test" element={<TestCrud/>}/>
           <Route path="/test1" element={<Test1/>}/> 

          {/* Route for UserDashboard with props */}
          <Route
            path="/UserDashboard"
            element={<UserDashboard email={window.history.state?.email} />}
          />
          <Route
            path="/CustomerView"
            element={<CustomerView userEmail={window.history.state?.userEmail} />}
          />
          <Route
            path="/Petprofile"
            element={
              <Petprofile microchipId={window.history.state?.microchipId} />
            }
          />
          <Route
            path="/AdminDashboard"
            element={<AdminDashboard email={window.history.state?.email} />}
          />
          <Route path="/mainhome" element={<Navigate to="/mainhome" />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;

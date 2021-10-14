import Footer from "./components/footer/Footer";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import MobileLogin from "./pages/Auth/MobileLogin";
import Register from "./pages/Auth/Register";
import Doctors from "./pages/doctors/Doctors";
import MainHeader from "./components/header/MainHeader";
import Home from "./pages/home/Home";
import NodalHeads from "./pages/nodalHeads/NodalHeads";
import RegisterHospital from "./pages/organization/RegisterHospital";
import Diagonstics from "./pages/diagonstics/Diagonstics";
import DiseasesComponent from "./pages/diseases/DiseasesComponent";
import OrganizationDashboard from "./pages/organization/OrganizationDashboard";
import HospitalRoutes from "./secureRoutes/HospitalRoutes";
import LoginRoutes from "./secureRoutes/LoginRoutes";
import MobileAuthRoutes from "./secureRoutes/MobileAuthRoutes";
import DoctorRoutes from "./secureRoutes/DoctorRoutes";
import UserRoutes from "./secureRoutes/UserRoutes";
import UserDashboard from "./pages/user/UserDashboard";
import NotAuthorised from "./utilities/NotAuthorised";
import HealthServices from "./pages/healthServices/HealthServices";
import RegisterDoctor from "./pages/doctors/RegisterDoctor";
import ContactUs from "./pages/contact/ContactUs";
import DoctorDashboard from "./pages/doctors/DoctorDashboard";
import BookAppointment from "./pages/user/BookAppointment";
import DispensaryComponent from "./pages/dispensary/DispensaryComponent";
import JoinRoomPage from "./JoinRoomPage/JoinRoomPage";
import RoomPage from "./RoomPage/RoomPage";
import IntroductionPage from "./IntroductionPage/IntroductionPage";
import ErrorBoundary from "./pages/errorBoundary/ErrorBoundary";
import AnimalPage from "./pages/animal/AnimalPage";
import { useEffect, useState } from "react";
import { checkUserTypeAndReturnData, isAuthenticated, signout } from "./actions/auth";
import { connect } from "react-redux";
import { setUserLoggedIn } from "./store/actions";
import LoadingComponent from "./utilities/LoadingComponent";
import Appointment from "./pages/appointment/Appointment";
import ForgotPassword from "./components/hospitals/ForgotPassword";
import ResetPassword from "./components/hospitals/ResetPassword";
import Vaccine from "./pages/vaccination/vaccine";
const App = (props) => {
  const [loading,setLoading] = useState(true);
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(isAuthenticated()){
      try{
        checkUserTypeAndReturnData(token).then(data =>{
          if(data.success){
            props.setUserLoggedIn(data.user)
            setLoading(false)
          }else if(data.success === false && data.message === "Not Auhtorized"){
            signout()
            setLoading(false)
          }
        })
      }catch(err){
        console.log(err);
        setLoading(false)
      }
    }
    
  },[])
  if(loading){
    return <LoadingComponent />
  }
  return (
    <BrowserRouter>
    <ErrorBoundary>
      <MainHeader />
      <Switch>
        <Route path="/" exact component={Home} />
        <LoginRoutes path="/login/:userType" exact component={MobileLogin} />
        <MobileAuthRoutes
          path="/registration-after-mobile/user/:userId"
          exact
          component={Register}
        />
        <MobileAuthRoutes
          path="/registration-after-mobile/doctor/:userId"
          exact
          component={RegisterDoctor}
        />
        <LoginRoutes path="/hospital-auth" exact component={RegisterHospital} />
        <Route path="/nodal-heads" exact component={NodalHeads} />
        <Route path="/diagonstic-laboratories" exact component={Diagonstics} />
        <Route path="/diseases" exact component={DiseasesComponent} />
        <Route path="/doctors" exact component={Doctors} />
        <Route path="/health-services" exact component={HealthServices} />
        <Route path="/pharmacy" exact component={DispensaryComponent} />
        <Route path="/contact-us" exact component={ContactUs} />
        <HospitalRoutes
          path="/hospital-dashboard/:hospitalId"
          exact
          component={OrganizationDashboard}
        />
        <UserRoutes path="/dashboard/:userId" exact component={UserDashboard} />
        <UserRoutes
          path="/appointment/:doctorId"
          exact
          component={BookAppointment}
        />
        <Route path="/animal/:id" exact component={AnimalPage} />
        <DoctorRoutes
          path="/doctor-dashboard/:doctorId"
          exact
          component={DoctorDashboard}
        />
        <Route path="/join-room">
          <JoinRoomPage />
        </Route>
        <Route path="/room">
          <RoomPage />
        </Route>
        <Route path="/video-page">
          <IntroductionPage />
        </Route>
        <LoginRoutes path="/appointmentInfo/:id" exact component={Appointment} />
        <LoginRoutes path="/forgotPassword" exact component={ForgotPassword} />
        <LoginRoutes path="/reset/:token/:id" exact component={ResetPassword} />
        <Route path="/vaccination" exact component={Vaccine} />
        <Route path="/" component={NotAuthorised} />
        
      </Switch>
      <Footer />
      </ErrorBoundary>
    </BrowserRouter>
  );
};
const mapStateToProps = (state) => ({
  user : state.user.user
})
export default connect(mapStateToProps,{setUserLoggedIn})(App);

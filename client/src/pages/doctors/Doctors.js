import { Container, Header } from "semantic-ui-react";
import classes from "./Doctors.module.css";
import DoctorSearchBox from "../../components/doctors/DoctorsSearchBox";
import { useEffect } from "react";
const Doctors = (props) => {
  useEffect(()=>{
    document.title="Nitimed | Doctors"
  },[])
  return (
    <Container fluid>
      <div className={classes.Doctors_flow}>
        <Header
          style={{ color: "white", fontSize: "2rem", textAlign: "center" }}
        >
          How Nitimed helps in Doctor Consultation ?
        </Header>
        <div className={classes.Doctors_flow_points}>
          <div className={classes.Doctors_flow_point}>Select Doctor</div>
          <div className={classes.Doctors_flow_point}> Book Slot</div>
          <div className={classes.Doctors_flow_point}>Payment</div>
          <div className={classes.Doctors_flow_point}>Do video call</div>
          <div className={classes.Doctors_flow_point}>Problem solved</div>
        </div>
      </div>
      <div className={classes.SearchResults}>
        <DoctorSearchBox category={props.match.params.category}  />
      </div>
    </Container>
  );
};
export default Doctors;

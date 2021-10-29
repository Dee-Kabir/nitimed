import { useState, useEffect } from "react";
import { findDoctorByName, findHospitals } from "../../actions/firebaseapi";
import SearchInput from "../search/SearchInput";
import classes from "../../pages/doctors/Doctors.module.css";
import DoctorCard from "../cards/DoctorCard";
import HospitalCard from "../cards/HospitalCard";
import { isAuthenticated } from "../../actions/auth";
import { Divider, Header, Input, Table } from "semantic-ui-react";
import ErrorComponent from "../../utilities/ErrorComponent";
import TableHeader from "../tableComponents/TableHeader";
import LoadingComponent from "../../utilities/LoadingComponent";
import { connect } from "react-redux";

const DoctorSearchBox = (props) => {
  const [values, setValues] = useState({
    state: "",
    city: "",
    error: "",
  });
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (isAuthenticated() && props.userCity) {
      findDoctors(props.userCity, "city");
    }
  }, [props.userCity]);
  const { state, city, error } = values;
  const [doctorName, setDoctorName] = useState("");
  const [foundPrivateDoctors, setFindPrivateDoctors] = useState("");
  const [foundGovernmentDoctors, setFindGovernmentDoctors] = useState("");
  const [foundHospitals, setFindHospitals] = useState("");
  const handlePlaces = (data) => {
    if (data.category === "state")
      setValues({ state: "", city: "", [data.category]: data.text, error: "" });
    else setValues({ ...values, [data.category]: data.text, error: "" });
  };
  const handleChange = (e) => {
    setDoctorName(e.target.value);
    setValues({ ...values, error: "" });
    setSearched(false);
  };
  const findDoctor = () => {
    setSearched(true);
    if (doctorName !== "") {
      findDoctors(doctorName, "name");
    } else if (city !== "") {
      findDoctors(city, "city");
    } else if (state !== "") {
      findDoctors(state, "state");
    } else {
      setValues({ ...values, error: "Select at least one field" });
    }
  };
  const findDoctors = (value, type) => {
    let result = [];
    let governmentResult = [];
    setLoading(true);
    try{
      findDoctorByName(value, type).then((data) => {
        if(data.success){
          data.doctors && data.doctors.map((da) => {
            if (da.jobType !== "private") {
              governmentResult.push({ ...da});
            } else {
              result.push({ ...da });
            }
          });
          setFindGovernmentDoctors(governmentResult);
          setFindPrivateDoctors(result);
        }else{
          setValues({...values,error: data.message})
        }
        setLoading(false);
      });
      findHospitals(value, type).then((data) => {
        if(data.success)
          setFindHospitals([...data.hospitals]);
        else
        {
          setFindHospitals([]);
          setValues({...values,error: data.message})
        }
        setLoading(false);
      });
      }catch(err){
        console.log(err)
        setLoading(false);
      }
    
  };
  return (!loading ?
    <div className="m-3">
      <Header size="large">Find a Doctor </Header>
      <ErrorComponent error={error} />
     
      <div className={classes.Doctor_SearchBox}>
        <div className={classes.Doctor_SearchBox_state}>
          <SearchInput
            category="states"
            value={state}
            name="state"
            handlePlaces={handlePlaces}
            placeholder="State"
          />
        </div>
        <div style={{ margin: "0 8px", fontWeight: "700" }}>Or</div>
        <div className={classes.Doctor_SearchBox_city}>
          <SearchInput
            category={state}
            value={city}
            name="city"
            handlePlaces={handlePlaces}
            placeholder="District"
          />
        </div>
        <div style={{ margin: "0 8px", fontWeight: "700" }}>Or</div>
        <div className={classes.Doctor_SearchBox_doctor_name}>
          <Input
            style={{ width: "100%" }}
            type="text"
            placeholder="Enter Doctor Name"
            name="doctorName"
            value={doctorName}
            onChange={handleChange}
          />
        </div>
        <button onClick={findDoctor} className={classes.Find_A_Doctor_btn}>
          Find Doctors
        </button>
      </div>
      
        {foundHospitals.length > 0 && <Header>Hospitals</Header>}
       
        {foundHospitals.length > 0 &&
          <Table celled striped>
          <TableHeader headerParams={["#","name","State","District","Mobile no.","Doctors"]} />
          <Table.Body>
          {foundHospitals.map((hosp, _) => (
            <HospitalCard sno={_+1} key={hosp.id} hospital={hosp} />
          ))}
          </Table.Body>
          </Table>
            }
 
        <Divider horizontal/>
        <DoctorCard doctors={foundGovernmentDoctors} searched={searched} heading="Government Doctors" />
        <Divider />
        <DoctorCard doctors={foundPrivateDoctors} searched={searched} heading="Private Doctors" />
    </div> : <LoadingComponent/>
  );
};
const mapStateToProps = state => ({
  userCity: state.user.user && state.user.user.city
})
export default connect(mapStateToProps)(DoctorSearchBox);
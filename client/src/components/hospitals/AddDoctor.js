import { useState,Fragment } from "react";
import { addDoctortoHospital } from "../../actions/firebaseapi";
import { isAuthenticated,checkdoctorb } from "../../actions/auth";
import LoadingComponent from "../../utilities/LoadingComponent";
import RegisterDoctorForm from "../doctors/RegisterDoctorForm";
import ErrorComponent from "../../utilities/ErrorComponent";
import { Header } from "semantic-ui-react";
const AddDoctor = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "", 
    jobType: "",                  //whether public or private
    servingType:"",               // whether serving or retired
    workTime: "",                 //whether full time or parttime
    weekdays: [],             // week days
    consultingTime: "",           // working Time
    speciality: "",
    fee: 0,
    address:"",
    city:"",
    state:"",
    timing: ""
  });
  const { name,
    email,
    phone,
    qualification,
    jobType ,               //whether public or private
    servingType,               // whether serving or retired
    workTime ,                //whether full time or parttime
    weekdays,             // week days
    timing,          // working Time
    speciality,
    fee,
    address,
    state,
    city } = values;
  
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);
  const handleChange = (e) => {
      setValues({...values,[e.target.name]:e.target.value})
      setError("")
      
  }
  const handleSubmit = (e) => {
      e.preventDefault();
      try{
          if(name && email && phone.length === 10 && address && city && state){
            const token = localStorage.getItem('token')
            setLoading(true)
            checkdoctorb(`+91${phone}`).then(data => {
              if(!data.success){
                addDoctortoHospital(isAuthenticated(),{name: name.toUpperCase(),
                  email,
                  phone:'+91'+phone,qualification,jobType,servingType,workTime,weekdays,speciality,fee,
                  address,city,state,timing,},
                  token
                  ).then((doc) => {
                    if(doc.success){
                      setError("")
                      alert("Doctor Added Successfully")
                      window.location.reload()
                    }else{
                      setError(data.message)
                    }
                  setLoading(false)
                  
                })
              }else{
                setError("Mobile Number already registered")
                setLoading(false)
              }
            })
          }else{
            setError("All fields required");
          }
      }catch{
          setLoading(false)
          setError("Error while connecting")
      }
  }
    const handlePlaces = (data) => {
      setValues({...values,[data.category]: data.text})
      setError("");
  } 
  return (!loading ?
    <Fragment>
    {error && <ErrorComponent error={error} />}
    <Header content="Add Doctor" />
      <RegisterDoctorForm handlePlaces={handlePlaces} 
      setValues={setValues} 
      values={values} 
      handleChange={handleChange} 
     handleSubmit={handleSubmit} loading={loading}  addDoctor={true}/>
    </Fragment> : <LoadingComponent loading={loading} />
  );
};
export default AddDoctor;
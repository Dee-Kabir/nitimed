import { useEffect, useState } from "react";
import { getDoctor } from "../../actions/auth";
import RegisterDoctorForm from "./RegisterDoctorForm";
import LoadingComponent from "../../utilities/LoadingComponent";
import classes from "./ShowDoctorInfo.module.css"
import {editDoctor} from "../../actions/firebaseapi"
import ErrorComponent from "../../utilities/ErrorComponent";
import { connect } from "react-redux";
import { setUserLoggedIn } from "../../store/actions";
const EditDoctorInfo = (props) => {
  const {user,loggedInUser} = props;
    const [values,setValues] = useState({
        name: "",
        email: "",
        phone:"",
        qualification: "",
        jobType: "",                  //whether public or private
        servingType:"",                 // whether serving or retired
        fee: "",              
        workTime: "",                 //whether full time or parttime
        weekdays: [],             // week days
        consultingTime: "",           // working Time
        speciality: "",
        address: "",
        state: "",
        city: "", 
        timing: ""
    });
    const {
    name,
    email,
    phone,
    qualification,
    jobType ,               //whether public or private
    servingType,               // whether serving or retired
    workTime ,                //whether full time or parttime
    weekdays,             // week days
    consultingTime,          // working Time
    speciality,
    address,
    state,
    city,
    fee,
    timing
    } = values;
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState("");
    useEffect(()=>{
        loadDoctorInfo()
    },[])
    const handleChange=(e)=>{
        setValues({...values,[e.target.name]: e.target.value})
        setError("")
    }
    const handlePlaces = (data) => {
        setValues({...values,[data.category]: data.text})
        setError("")
    } 
    
    const loadDoctorInfo = () => {
            let {name,
                email,
                phone,
                qualification,
                jobType ,               //whether public or private
                servingType,               // whether serving or retired
                workTime ,                //whether full time or parttime
                weekdays,             // week days
                consultingTime,          // working Time
                speciality,
                address,
                state,
                fee,
                city,timing} = user;
            setValues({...values,name:name,email: email,phone:phone.substr(3,10),qualification:qualification,
                jobType:jobType,servingType: servingType,workTime:workTime,weekdays:weekdays,consultingTime:consultingTime,
                speciality:speciality,address:address,state:state,city:city,fee:fee,timing})    
    }
    const formIsValid = () => {
      if(!name) {
        setError("Name is required")
        return false
      }else if(!email){
        setError("Email is required")
        return false
      }else if(!qualification || !speciality){
        setError("Quaification and speciality is required")
        return false
      }else if(!jobType || !servingType || !workTime){
        setError("select job type, serving type and work time")
        return false
      }else if(weekdays.length===0){
        setError("select working week days")
        return false;
      }else if(!address || !state || !city){
        setError("enter your address,state and city");
        return false
      }else{
        return true
      }
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        
        const id = user.id
        const token = localStorage.getItem('token')
        if(formIsValid()){
          try{
            setLoading(true);
            editDoctor(name,email,id,"+91"+phone,qualification,jobType,servingType,workTime,weekdays,address,speciality,state,city,fee,consultingTime,token).then((data)=>{
              if(data.success){
                getDoctor(id,token).then(data => {
                  if(data.success && loggedInUser.id === id)
                  props.setUserLoggedIn(data.user)
                })
              }else{
                setError(data.message)
              }
              setLoading(false)
            }) 
          }catch(err){
            setLoading(false)
            setError("Try again after some time.")
          }  
        }
    }

    return (!loading ? 
        <div className={classes.RegisterForm} >
        <div className={classes.RegisterForm_Block}>
        <div className={classes.Heading_Add_doctor}>Register on NitiMed</div>
        {error && <ErrorComponent error={error} />}
        <RegisterDoctorForm handleSubmit={handleSubmit} handleChange={handleChange} setValues={setValues} values ={values} 
        handlePlaces={handlePlaces} loading ={loading} edit={true} />
          </div>
        </div> : <LoadingComponent />
      );
} 
const mapStateToProps = state => ({
  loggedInUser: state.user.user
})
export default connect(mapStateToProps,{setUserLoggedIn})(EditDoctorInfo);
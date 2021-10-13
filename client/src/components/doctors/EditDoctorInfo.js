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
    fee
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
                city} = user;
            setValues({...values,name:name,email: email,phone:phone.substr(3,10),qualification:qualification,
                jobType:jobType,servingType: servingType,workTime:workTime,weekdays:weekdays,consultingTime:consultingTime,
                speciality:speciality,address:address,state:state,city:city,fee:fee})    
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        setLoading(true);
        const id = user.id
        const token = localStorage.getItem('token')
          editDoctor(name,email,id,"+91"+phone,qualification,jobType,servingType,workTime,weekdays,address,speciality,state,city,fee,token).then((data)=>{
            if(data.success){
              getDoctor(id,token).then(data => {
                if(data.success && loggedInUser.id === id)
                props.setUserLoggedIn(data.user);
                else{
                  
                }
              })
            }else{
              setError(data.message)
            }
          }).catch((err) => {
            console.log(err)
          })   
          setLoading(false) 
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
import { useEffect, useState } from "react";
import classes from "./RegisterDoctor.module.css";
import { savedoctor, scrollToTop } from "../../actions/firebaseapi";
import LoadingComponent from "../../utilities/LoadingComponent"
import ErrorComponent from "../../utilities/ErrorComponent"
import RegisterDoctorForm from "../../components/doctors/RegisterDoctorForm";
import { connect } from "react-redux";
const RegisterDoctor = (props) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone:"",
    qualification: "", 
    jobType: "",                  //whether public or private
    servingType:"",               // whether serving or retired
    workTime: "",                 //whether full time or parttime
    weekdays: [],             // week days
    speciality: "",
    fee: 0,
    address: "",
    state: "",
    city: "",
    timing: "",
    registrationNumber:"",
    aadharNumber:""
  });
  const [formData, setFormData] = useState(new FormData());
  const {
    name,
    email,
    phone,
    qualification,
    jobType ,               //whether public or private
    servingType,               // whether serving or retired
    workTime ,                //whether full time or parttime
    weekdays,             // week days
    speciality,
    fee,
    address,
    state,
    city,
    timing,
    registrationNumber,
    aadharNumber
  } = values;
  const [loading,setLoading] = useState(false)
  const [photo,setPhoto] = useState("");
  const [proof,setProof] = useState("");
  const [qualificationProof,setQualificationProof] = useState("");
  const [doctorPhoto, setDoctorPhoto] = useState("")
  const [error,setError] = useState("");

  useEffect(()=>{
    document.title = "Nitimed | Register"
    checkmobileNUmber()
  },[])
  useEffect(()=>{
    if(error!==""){
      scrollToTop()
    }
  },[error])
  const checkmobileNUmber = () => {
  formData.set('phone',props.match.params.userId)
      setValues({...values,phone: (props.match.params.userId).substr(3,10)})
  }
  const handlePlaces = (data) => {
    setValues({...values,[data.category]: data.text})
    formData.set(data.category,data.text);
    setError("")
  } 
  const handleChange=(e)=>{
    setValues({...values,[e.target.name]: e.target.value})
    formData.set(e.target.name,e.target.value);
    setError("")
  }
  const handleSubmit = (e) =>{ 
    e.preventDefault()
    if(name && email && phone && qualification && jobType && servingType && workTime && weekdays.length > 0 && speciality && address && state && city && photo && proof && registrationNumber && aadharNumber){
      setLoading(true);
      savedoctor(formData).then((data)=>{
        if(data.success){
          setLoading(false)
          props.history.replace("/login/doctor")
        }else{
          setLoading(false)
          setError(data.message)
        }
      }).catch((err) => {
        setError(err.message)
        setLoading(false)
      })
    }else{
      setError("All marked Fields are required");
    }
  }
  const handleImageChange = (e) => {
    const img = e.target.files[0];
    if (img) {
      if(img.size > 2000000){
        setError( "Image size should be less than 2mb")
      }
      else if(img.type === "image/jpeg" || img.type=== "image/jpg" || img.type==="image/png" ){
        console.log(img)
        if(e.target.name == "photo"){
          setDoctorPhoto(URL.createObjectURL(img));
          setPhoto(img)
          formData.set('photo',img);
        }
        else if(e.target.name == "proof"){
        setQualificationProof(URL.createObjectURL(img))
        setProof(img)
        formData.set('proof',img)
        }
        setError("")
      }
      else{
        setError("Enter a valid image.Either in png, jpeg or jpg format")
      }
    }
  };
  return (!loading ? 
    <div className={classes.RegisterForm} >
    <div style={{marginTop: '71px'}}></div>
    <div className={classes.RegisterForm_Block}>
    <div className={classes.Heading_Add_doctor}>Register on NitiMed</div>
    {error && <ErrorComponent error={error} /> }
    <RegisterDoctorForm edit={false} handleSubmit={handleSubmit} handleChange={handleChange} setValues={setValues} values ={values} 
    handlePlaces={handlePlaces} doctorPhoto ={doctorPhoto} handleImageChange={handleImageChange} qualificationProof={qualificationProof} loading ={loading} formData={formData} />
      </div>
    </div> : <LoadingComponent loading={loading} />
  );
};
const mapStateToProps = (state) => ({
  mobileRegister : state.user.mobileRegister
})
export default connect(mapStateToProps)(RegisterDoctor);

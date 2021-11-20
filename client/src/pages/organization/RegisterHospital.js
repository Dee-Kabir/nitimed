import { useEffect, useState } from "react";
import { loginHospital, registerHospital } from "../../actions/auth";
import LoadingComponent from "../../utilities/LoadingComponent";
import RegisterForm from "../../components/hospitals/RegisterForm";
import LoginForm from "../../components/hospitals/LoginForm";
import ErrorComponent from "../../utilities/ErrorComponent";
import { Radio } from "antd";
import { scrollToTop } from "../../actions/firebaseapi";
import { connect } from "react-redux";
import { setUserLoggedIn } from "../../store/actions";
import { Helmet } from "react-helmet";
import { webName } from "../../Config";
const RegisterHospital = (props) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "", 
    hospitalRegistration: "",
    state: "",
    city:"",
    phone: "",
  });
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [formLogin, setFormLogin] = useState("login");
  const { name, email, password, address, phone,state,city,hospitalRegistration,confirmPassword } = values;
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value});
    setError("")
  };
  useEffect(()=>{
    scrollToTop()
  },[error])
  const handlePlaces = (data) => {
    setValues({...values,[data.category]: data.text})
    setError("")
} 
  const handleSubmit = (e) => {
    e.preventDefault();
    if(checkFormValidity()){
      try {
        setLoading(true)
            registerHospital({name: name.toUpperCase(),
              email: email,
              phone: "+91"+phone,
              address: address,
              state: state.toUpperCase(),
              city: city.toUpperCase(),
              hospitalRegistration: hospitalRegistration,
              password: password
            }).then((data) => {
              if(data.success){
                setValues({
                  name: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                  address: "", 
                  hospitalRegistration: "",
                  state: "",
                  city:"",
                  phone: "",
                })
                setFormLogin("login")
              }else{
                scrollToTop()
                setError(data.message);
              }
            }).catch(err => setError(err))
        setLoading(false);
    }catch{
        setError("Error while connecting")
        scrollToTop()
        setLoading(false)
    }
    }
}
const checkFormValidity = () => {
  if(password !== confirmPassword && password.length < 10){
    setError("password and confirm password should be same of atleast 10 characters")
    return false;
  }else if(name === ""){
    setError("Name is required")
    return false;
  }else if(email === ""){
    setError("Email is required.")
    return false;
  }else if(phone.length !== 10){
    setError("Mobile number should be of 10 digit")
    return false;
  }else if(address === ""){
    setError("Address required")
    return false;
  }else if(city === ""){
    setError("Select District")
    return false;
  }else if(hospitalRegistration === ""){
    setError("Enter your Hospital Registration Number")
    return false;
  }else{
    setError("")
    return true;
  }
}
  const handleloginSubmit = (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      loginHospital(email,password).then((data) => {
        if(data.success){
          localStorage.setItem("token", data.token);
          localStorage.setItem("userInfo", JSON.stringify(data.user));
          props.setUserLoggedIn(data.user)
          localStorage.setItem("userType", "hospital");
          localStorage.setItem("user",data.user.id)
          props.history.replace(`/hospital-dashboard/${data.user.id}?show=info`)
        }else{
          setError(data.message)
        }
        setLoading(false)
      })
    }catch{ setError("Error while connecting")
    setLoading(false)}
  }
  
  return (!loading ? 
    <div style={{marginTop: "96px"}}>
      <Helmet>
      <title>{webName} | Register</title>
      </Helmet>
      <div style={{margin: '16px auto',textAlign: 'center'}}>
        <Radio.Group buttonStyle="solid" value={formLogin}>
        {error && <ErrorComponent error={error} />}
          <Radio.Button style={{width: '100px'}} value="login" onClick={() => setFormLogin("login")}>
            Login
          </Radio.Button>
          <Radio.Button style={{width: '100px'}} value="register" onClick={() => setFormLogin("register")}>
            Register
          </Radio.Button>
        </Radio.Group>
      </div>
      {formLogin==="register" && <RegisterForm handleChange={handleChange} handlePlaces={handlePlaces} handleSubmit={handleSubmit} loading={loading} values={values} />}
      {formLogin==="login" && <LoginForm handleChange={handleChange} handleloginSubmit={handleloginSubmit} loading={loading} email={email} password={password}/>}
    </div> : <LoadingComponent loading={loading} />
  );
};
export default connect(null,{setUserLoggedIn})(RegisterHospital);

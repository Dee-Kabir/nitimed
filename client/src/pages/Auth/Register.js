import { useEffect, useState } from "react";
import { Fragment } from "react";
import RegisterForm from "../../components/user/RegisterForm";
import firebase from "../../firebaseHelper";
import { authenticateUser, register } from "../../actions/auth";
import ErrorComponent from "../../utilities/ErrorComponent";
import LoadingComponent from "../../utilities/LoadingComponent";
import { connect } from "react-redux";
import {setUserMobileNumber,setUserLoggedIn} from "../../store/actions"
import { webName } from "../../Config";
import { scrollToTop } from "../../actions/firebaseapi";
import { Helmet } from "react-helmet";
const Register = (props) => {
  const [values, setValues] = useState({
    name: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    aadharNumber: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { name, phone, address, state, city, aadharNumber } = values;
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setError("");
  };
  const handleBeforeUnload = (e) => {
    e.preventDefault();
    const message =
      "Are you sure you want to leave? The mobile number you entered will be lost.";
    e.returnValue = message;
    return '';
  };
  const checkmobileNUmber = () => {
    let number_mo = props.mobileNumber
    if (number_mo) {
      setValues({
        ...values,
        phone: number_mo.substr(3, 10),
      });
    } else {
      props.history.goBack();
    }
  };
  useEffect(() => {
    checkmobileNUmber();
    window.onbeforeunload = handleBeforeUnload
  }, []);
  useEffect(()=>{
    if(error!==""){
      scrollToTop()
    }
  },[error])
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formIsValid()) {
      setLoading(true);
      var id = props.match.params.userId;
      try {
        firebase.auth().onAuthStateChanged((user) => {
          if (user.phoneNumber === id)
            register({ name, phone, address, state, city,aadharNumber }).then(
              (data) => {
                if(data.success){
                      props.setUserMobileNumber('')
                      authenticateUser(
                        "+91"+phone,
                        "user"
                      ).then((userData) => {
                        if(userData.success){
                          setLoading(false);
                          localStorage.setItem("user", userData.user.id);
                          localStorage.setItem("token",userData.token)
                          props.setUserLoggedIn(userData.user)
                          localStorage.setItem("userType","user" );
                          props.history.replace("/dashboard/"+userData.user.id+"/?show=appointments");
                        }else{
                          setError("Error occurred.")
                          setLoading(false)
                        }
                        
                      })
                }else{
                  setError("Try again after sometime.")
                }
              }
            );
          else {
            props.history.replace("/dnjdfdf");
          }
        });
  } catch (err) {
    setLoading(false);
    setError("Connectivity Problem!!" && err.message);
  }
}else{
  scrollToTop()
}
  }
  const formIsValid = () => {
    if (!name) {
      setError("name is required");
      return false;
    } else if (phone.toString().length != 10) {
      setError("Valid mobile Number is required");
      return false;
    } else if (address==="") {
      setError("Enter address");
    } else if (!state || !city) {
      setError("state and Name required");
    } else {
      return true;
    }
  };
  const handlePlaces = (data) => {
    setValues({ ...values, [data.category]: data.text });
  };
  return !loading ? (
    <Fragment>
    <Helmet>
    <title>{webName} | Register</title>
    </Helmet>
    <div style={{marginTop: '16px'}}></div>
      <ErrorComponent error={error} />
      <RegisterForm
        values={values}
        heading={`Register for ${webName} `}
        handlePlaces={handlePlaces}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Fragment>
  ) : (
    <LoadingComponent loading={loading} />
  );
};
const mapStateToProps = state => ({
  mobileNumber: state.user.mobileRegister
})
export default connect(mapStateToProps,{setUserMobileNumber,setUserLoggedIn})(Register);

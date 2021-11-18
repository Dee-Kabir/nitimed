import { useEffect, useState, Fragment } from "react";
import { authenticateUser,checkUser} from "../../actions/auth";
import firebase from "../../firebaseHelper";
import {scrollToTop, setLanguageCode,sigininWithPhoneNumber,} from "../../actions/firebaseapi";
import MobileAndOtpForm from "../../components/auth/MobileAndOtpForm";
import ErrorComponent from "../../utilities/ErrorComponent";
import { connect } from "react-redux";
import { setUserMobileNumber,setUserLoggedIn } from "../../store/actions";
const MobileLogin = (props) => {
  const {userType} = props.match.params;
  const [values, setValues] = useState({
    phone: "",
    otp: "",
    mobileNumberSubmit: false,
    otpSubmit: false,
    error: false,
    loading: false,
    firebaseEvent: "",
  });
  useEffect(() => {
    document.title = "Nitimed | Login"
    if (
      userType !== "user" &&
      userType !== "doctor"
    ) {
      props.history.replace("/dfdsfs");
    }
  }, []);
  
  const {
    phone,
    otp,
    mobileNumberSubmit,
    otpSubmit,
    error,
    firebaseEvent,
    loading,
  } = values;
  useEffect(()=>{
    if(error!==""){
      scrollToTop()
    }
  },[error])
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value, error: "" });
  };
  const handleMobileNumberSubmit = (e) => {
    e.preventDefault();
    if (phone.toString().length === 10) {
      setValues({ ...values, loading: true });
      try {
        setLanguageCode();
        let recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha", {
          size: "invisible",
        });
        sigininWithPhoneNumber(phone, recaptcha)
          .then((e) => {
            setValues({
              ...values,
              mobileNumberSubmit: true,
              otpSubmit: true,
              firebaseEvent: e,
              loading: false,
            });
          })
          .catch((err) => {
            setValues({
              ...values,
              mobileNumberSubmit: false,
              otpSubmit: false,
              error: "try again" && err.message,
              loading: false,
            });
          });
      } catch (err) {
        setValues({
          ...values,
          error: "error while connecting",
          loading: false,
        });
      }
    } else {
      setValues({
        ...values,
        error: "Enter 10 digit valid Mobile Number",
      });
    }
  };
  const handleotpSubmit = (e) => {
    e.preventDefault();
    if (otp.toString().length === 6) {
      setValues({ ...values, loading: true });
      try {
        firebaseEvent
          .confirm(otp)
          .then((result) => {
            checkUser(result.user.phoneNumber, userType).then(
              (data) => {
                if (!data) {
                  props.setUserMobileNumber(result.user.phoneNumber)
                  setValues({ ...values, loading: false });
                  props.history.replace(
                    `/registration-after-mobile/${userType}/${result.user.phoneNumber}`
                  );
                } else {
                  authenticateUser(
                    result.user.phoneNumber,
                    userType
                  ).then((data) => {
                    if(data.success){
                      localStorage.setItem("user", data.user.id);
                      localStorage.setItem("token",data.token)
                      props.setUserLoggedIn(data.user)
                      localStorage.setItem("userType", userType === "user" ? "user" : "doctor");
                      props.history.replace(`${userType==="user" ? "/" : "/doctor-dashboard/"+data.user.id+"/?show=appointments"}`);
                    }
                    
                  });
                }
              }
            );
          })
          .catch((err) => {
            setValues({
              ...values,
              mobileNumberSubmit: false,
              otpSubmit: false,
              error: "Try again" && err.message,
              phone: "",
              otp: "",
              loading: false,
            });
          });
      } catch (err) {
        setValues({
          ...values,
          error: "Error!!!" && err.message,
          loading: false,
        });
      }
    } else {

      setValues({
        ...values,
        error: "Enter 6 digit valid OTP",
        loading: false,
      });
    }
  };
  return (
    <Fragment>
      <ErrorComponent error={error} />
      <MobileAndOtpForm
        userType = {userType}
        handleChange={handleChange}
        handleMobileNumberSubmit={handleMobileNumberSubmit}
        mobileNumberSubmit={mobileNumberSubmit}
        otpSubmit={otpSubmit}
        handleotpSubmit={handleotpSubmit}
        phone={phone}
        otp={otp}
        loading={loading}
      />
    </Fragment>
  );
};
export default connect(null,{setUserMobileNumber,setUserLoggedIn})(MobileLogin);

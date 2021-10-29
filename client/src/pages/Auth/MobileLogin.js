import { useEffect, useState, Fragment } from "react";
import { authenticateUser,checkUser} from "../../actions/auth";
import firebase from "../../firebaseHelper";
import {setLanguageCode,sigininWithPhoneNumber,} from "../../actions/firebaseapi";
import MobileAndOtpForm from "../../components/auth/MobileAndOtpForm";
import ErrorComponent from "../../utilities/ErrorComponent";
import { connect } from "react-redux";
import { setUserMobileNumber,setUserLoggedIn } from "../../store/actions";
const MobileLogin = (props) => {
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
      props.match.params.userType !== "user" &&
      props.match.params.userType !== "doctor"
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
            checkUser(result.user.phoneNumber, props.match.params.userType).then(
              (data) => {
                if (!data) {
                  props.setUserMobileNumber(result.user.phoneNumber)
                  setValues({ ...values, loading: false });
                  props.history.replace(
                    `/registration-after-mobile/${props.match.params.userType}/${result.user.phoneNumber}`
                  );
                } else {
                  authenticateUser(
                    result.user.phoneNumber,
                    props.match.params.userType
                  ).then((data) => {
                    if(data.success){
                      localStorage.setItem("user", data.user.id);
                      localStorage.setItem("token",data.token)
                      props.setUserLoggedIn(data.user)
                      localStorage.setItem("userType", props.match.params.userType === "user" ? "user" : "doctor");
                      props.history.replace('/');
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
      <div style={{marginTop: '71px'}}></div>
      <ErrorComponent error={error} />
      <MobileAndOtpForm
        userType = {props.match.params.userType}
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

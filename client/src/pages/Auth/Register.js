import { useEffect, useState } from "react";
import { Fragment } from "react";
import RegisterForm from "../../components/user/RegisterForm";
import firebase from "../../firebaseHelper";
import { register } from "../../actions/auth";
import ErrorComponent from "../../utilities/ErrorComponent";
import LoadingComponent from "../../utilities/LoadingComponent";
import { connect } from "react-redux";
import {setUserMobileNumber} from "../../store/actions"
const Register = (props) => {
  const [values, setValues] = useState({
    name: "",
    phone: "",
    address: "",
    state: "",
    city: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { name, phone, address, state, city } = values;
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
    document.title = "Nitimed | Register"
    checkmobileNUmber();
    window.onbeforeunload = handleBeforeUnload
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formIsValid()) {
      setLoading(true);
      var id = props.match.params.userId;
      try {
        firebase.auth().onAuthStateChanged((user) => {
          if (user.phoneNumber === id)
            register({ name, phone, address, state, city }).then(
              (data) => {
                if(data.success){
                  try {
                      props.setUserMobileNumber('')
                      setLoading(false);
                      setError("");
                      props.history.replace("/login/user");
                  } catch (err) {
                    setLoading(false);
                    setError("Connectivity Problem!!" && err.message);
                  }
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
    }
  };
  const formIsValid = () => {
    if (!name) {
      setError("name is required");
      return false;
    } else if (phone.toString().length != 10) {
      setError("Valid mobile Number is required");
      return false;
    } else if (address.length < 20) {
      setError("Enter at least 20 character long address");
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
    <div style={{marginTop: '71px'}}></div>
      <ErrorComponent error={error} />
      <RegisterForm
        values={values}
        heading="Register for NitiMed"
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
export default connect(mapStateToProps,{setUserMobileNumber})(Register);

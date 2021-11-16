import { useEffect, useState } from "react";
import { getUser, isAuthenticated } from "../../actions/auth";
import RegisterForm from "./RegisterForm"
import {editInfo} from "../../actions/firebaseapi"
import ErrorComponent from "../../utilities/ErrorComponent"
import LoadingComponent from "../../utilities/LoadingComponent"
import { connect } from "react-redux";
import {setUserLoggedIn} from '../../store/actions'
const EditAccountInfo = (props) => {
    const [values,setValues] = useState({
        name: "",
        phone: "",
        address: "",
        state: "",
        city: "",
        aadharNumber: "",
        loading: true,
        error: "", 
      });
      const { name,phone, address, loading, error,state,city,aadharNumber } =values;
      const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value, error: "" });
      };
      const handlePlaces = (data) => {
        setValues({...values,[data.category]: data.text,err:""})
    } 
    useEffect(()=>{
        loadUserInfo()
    },[])
    const loadUserInfo = () => {
      let {name,phone,address,state,city,aadharNumber} = props.userData;
      setValues({...values,name:name,phone:phone,address:address,state:state,city:city,loading: false,aadharNumber})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (formIsValid()) {
          setValues({ ...values, loading: true });
          const token = localStorage.getItem('token')
          const id = isAuthenticated()
          try {editInfo(name, address, state, city,id,token,aadharNumber ).then((data) => {
            if(data.success){
              getUser(isAuthenticated(),token).then((data) => {
                if(data.success){
                  props.setUserLoggedIn(data.user)
                  setValues({ ...values, error: "",loading:false});
                }else{
                  setValues({...values,error: data.message,loading:false})
                }
                });
            }else{
              setValues({...values,error: data.message,loading:false})
            }
            })}catch(err) {
              setValues({
                ...values,loading:false,
                error: "Connectivity Problem!!" && err.message,
              });
            }
            
        }
      };
      const formIsValid = () => {
        if (!name) {
          setValues({ ...values, error: "name is required" }); 
          return false;
        }else if(phone.toString().length !== 13){
            setValues({ ...values, error: "Valid phone Number is required" });
            return false;
        }if(address.length < 20){
            setValues({...values,error: "Enter at least 20 character long address"})
        }
        else {
          return true;
        }
      };
    return(!loading ?
        <div>
        {error && <ErrorComponent error={error} />}
        <RegisterForm values={values}
        heading = "Edit Account Information"
        handlePlaces={handlePlaces}
        handleChange={handleChange}
        handleSubmit={handleSubmit} />
        </div> : <LoadingComponent />
    )
} 
const mapStateToProps = state => ({
  userData : state.user.user
})
export default connect(mapStateToProps,{setUserLoggedIn})(EditAccountInfo);
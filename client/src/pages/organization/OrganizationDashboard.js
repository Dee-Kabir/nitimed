import { useState,useEffect,Fragment } from "react";
import { getHospital, isAuthenticated } from "../../actions/auth";
import classes from "../user/UserDashboard.module.css"
import LoadingComponent from "../../utilities/LoadingComponent";
import ShowUserInfo from "../../components/user/ShowUserInfo";
import { editHospitalInfo } from "../../actions/firebaseapi";
import AddDoctor from "../../components/hospitals/AddDoctor";
import Doctors from "./Doctors";
import RegisterForm from "../../components/hospitals/RegisterForm";
import ErrorComponent from "../../utilities/ErrorComponent"
const OrganizationDashboard = (props) => {
    const [values,setValues] = useState({
        user:{},
        loading : false,
    })
    const [showComp,setShowComp] = useState('info')
    const [error, setError] = useState("")
    const changeComponent = (name) => {
        setShowComp(name)
    }
    const {user,loading} = values;
    useEffect(()=>{
        document.title="Nitimed | Dashboard"
        loadUser()
    },[props.location.search])
    const loadUser = () => {
        if(isAuthenticated() != props.match.params.hospitalId){
            window.location.href = "/nvjnvjdv"
        }
        setValues({...values,loading:true})
        const token = localStorage.getItem('token')
        const par = new URLSearchParams(props.location.search).get('show')
        setShowComp(par);
        try{
            getHospital(isAuthenticated(),token).then((data)=>{
            if(data.success){
                setValues({...values,user:data.hospital})
            }else{
                setError("Hospital data not found")
            }   
        })
        }catch(err){
            console.log(err)
        }
        setValues({...values,loading : false})
    }
    const handleChange = (e) => {
        setValues({...values,user:{...user,[e.target.name]:e.target.value}})
    }
    const handlePlaces = (data) => {
        setValues({...values,user: {...user,[data.category]: data.text}})
    } 
    const handleEditSubmit = (e) => {
        e.preventDefault();
        try{
            setValues({...values,error:"",loading:true})
            const token = localStorage.getItem('token')
            editHospitalInfo(user,isAuthenticated(),token).then((data) => {
                setValues({...values,loading:false})
                setError("")
                window.location.reload();
            })
        }catch{
            setValues({...values,loading:false})
            setError("Connectivity error")
        }
    }
    return(!loading ? 
        <div className={classes.Dashboard}>
        <div className={classes.Dashboard_block}>
        <div className={classes.Dashboard_row}>
        <div className={classes.Dashboard_menu_column}>
        <div className={classes.Dashboard_menu_items}>
        <div className={classes.Dashboard_menu_item} onClick={() =>changeComponent('info')}>Hospital Information</div>
        <div className={classes.Dashboard_menu_item} onClick={() => changeComponent('edit')}>Edit Hospital Information </div>
        <div className={classes.Dashboard_menu_item} onClick={() => changeComponent('add')}>Add a doctor</div>
        <div className={classes.Dashboard_menu_item} onClick={() => changeComponent('all')}>All Doctors</div>
        </div>
        </div>
        <div className={classes.Dashboard_info_column}>
        {!loading  ? <Fragment>
            {error && <ErrorComponent error={error} />}
            {showComp === 'info' && <ShowUserInfo user={user}  /> }
            {showComp === 'edit' && <RegisterForm values={user} handleChange={handleChange} handlePlaces={handlePlaces} handleSubmit={handleEditSubmit} loading={loading} edit={true}  />}
            {showComp === 'add' && <AddDoctor/>}
            {showComp === 'all' && <Doctors hospitalId = {user && user.id} history={props.history}/>}
            </Fragment>
            : <LoadingComponent loading={loading} />
            }
        </div>
        </div>
        
        </div>

        </div> : <LoadingComponent loading={loading} />
    )
}
export default OrganizationDashboard;

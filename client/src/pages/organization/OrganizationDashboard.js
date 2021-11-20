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
import { Helmet } from "react-helmet";
import { webName } from "../../Config";
const OrganizationDashboard = (props) => {
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(false)
    const [showComp,setShowComp] = useState('info')
    const [error, setError] = useState("")
    
    useEffect(()=>{
        loadUser()
    },[])

    const changeComponent = (name) => {
        if(name!==showComp){
            props.history.push(`?show=${name}`)
        }
        setShowComp(name)
    }
    const loadUser = () => {
        if(isAuthenticated() != props.match.params.hospitalId){
            window.location.href = "/not-authenticated"
        }
        
        const token = localStorage.getItem('token')
        const par = new URLSearchParams(props.location.search).get('show')
        setShowComp(par);
        try{
            setLoading(true);
            getHospital(isAuthenticated(),token).then((data)=>{
            if(data.success){
                console.log(data.hospital)
                setUser(data.hospital)
            }else{
                setError("Hospital data not found")
            } 
            setLoading(false)
        })
        }catch(err){
            setLoading(false)
        }
    }
    const handleChange = (e) => {
        setUser({...user,[e.target.name]:e.target.value})
    }
    const handlePlaces = (data) => {
        setUser({...user,[data.category]: data.text})
    } 
    const handleEditSubmit = (e) => {
        e.preventDefault();
        try{
            setLoading(true);
            const token = localStorage.getItem('token')
            editHospitalInfo(user,isAuthenticated(),token).then((data) => {
                if(data.success){
                   
                    setError("")
                    window.location.reload();
                }else{
                    setError(data.message)
                }
                setLoading(false);
            })
        }catch{
            setLoading(false)
            setError("Connectivity error")
        }
    }
    return(!loading ? 
        <div className={classes.Dashboard}>
        <Helmet>
        <title>{webName} | Dashboard</title>
        </Helmet>
        <div className={classes.Dashboard_block}>
        <div className={classes.Dashboard_row}>
        <div className={classes.Dashboard_menu_column}>
        <div className={classes.Dashboard_menu_items}>
        <div className={`${classes.Dashboard_menu_item} ${showComp==='info' ? classes.activeComp : ""}`} onClick={() =>changeComponent('info')}>Hospital Information</div>
        <div className={`${classes.Dashboard_menu_item} ${showComp==='edit' ? classes.activeComp : ""}`} onClick={() => changeComponent('edit')}>Edit Hospital Information </div>
        <div className={`${classes.Dashboard_menu_item} ${showComp==='add' ? classes.activeComp : ""}`} onClick={() => changeComponent('add')}>Add a doctor</div>
        <div className={`${classes.Dashboard_menu_item} ${showComp==='all' ? classes.activeComp : ""}`} onClick={() => changeComponent('all')}>All Doctors</div>
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

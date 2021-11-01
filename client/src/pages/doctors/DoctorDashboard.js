import { Fragment, useEffect, useState } from "react"
import { getDoctor } from "../../actions/auth"
import EditDoctorInfo from "../../components/doctors/EditDoctorInfo"
import PendingAppointments from "../../components/doctors/PendingAppointments"
import ShowDoctorInfo from "../../components/doctors/ShowDoctorInfo"
import CompletedAppointments from "../../components/doctors/CompletedAppointments"
import classes from "../../pages/user/UserDashboard.module.css"
import LoadingComponent from "../../utilities/LoadingComponent"
import ErrorComponent from "../../utilities/ErrorComponent"
const DoctorDashboard = (props) => {
    const [values,setValues] = useState({
        info:true,
        edit: false,
        appointments: false,
        appointmentHistory:false,
        user: ""
    })
    const [showComp,setShowComp] = useState('info');
    const [loading,setLoading] = useState(false)
    const [error, setError] = useState("")
    const {user} = values;
    useEffect(()=>{
        document.title = "Nitimed | Dashboard"
        loadUser()
    },[])
    useEffect(()=>{
        const para = new URLSearchParams(props.location.search).get('show')
        setShowComp(para)
    },[props.location.search])
    const changeComponent = (name) => {
        if(name!==showComp){
            props.history.push(`?show=${name}`)
        }
        setShowComp(name)
    }
    const loadUser = () => {
        const token = localStorage.getItem('token')
        setLoading(true)
        try{
            getDoctor(props.match.params.doctorId,token).then(data => {
                if(data.success){
                    setValues({...values,user:data.user})
                }else{
                    setError(data.message)
                }
                setLoading(false)
            })
        }catch(err){
            setLoading(false)
        }
        
    }
    return(!loading ? <Fragment>
        {error && <ErrorComponent error={error} />}
        <div className={classes.Dashboard}>
        <div className={classes.Dashboard_block}>
        <div className={classes.Dashboard_row}>
        <div className={classes.Dashboard_menu_column}>
        <div className={classes.Dashboard_menu_items}>
        <div className={classes.Dashboard_menu_item} onClick={() =>changeComponent('info')}>Account Information</div>
        <div className={classes.Dashboard_menu_item} onClick={() => changeComponent('edit')}>Edit Account Information </div>
        <div className={classes.Dashboard_menu_item} onClick={() => changeComponent('appointments')}>Check pending Appointments</div>
        <div className={classes.Dashboard_menu_item} onClick={() => changeComponent('appointmentHistory')}>Completed Appointments</div>
        </div>
        </div>
        <div className={classes.Dashboard_info_column}>
        {!loading  ? <Fragment>
            {error && <ErrorComponent error={error}/>}
            {showComp==='info' && <ShowDoctorInfo user={user}  /> }
            {showComp==='edit' && <EditDoctorInfo user={user} />}
            {showComp==='appointments' && <PendingAppointments doctorId = {user.id}/>}
            {showComp==='appointmentHistory' && <CompletedAppointments doctorId = {user.id}/>}
            </Fragment>
            : <LoadingComponent loading={loading} />
            }
        </div>
        </div>
        
        </div>

        </div> </Fragment>: <LoadingComponent loading={loading} />
    )
}
export default DoctorDashboard;
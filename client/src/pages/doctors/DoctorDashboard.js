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
        <div className={`${classes.Dashboard_menu_item} ${showComp==='info' ? classes.activeComp : ""}`} onClick={() =>changeComponent('info')}>Account Information</div>
        <div className={`${classes.Dashboard_menu_item} ${showComp==='edit' ? classes.activeComp : ""}`} onClick={() => changeComponent('edit')}>Edit Account Information </div>
        <div className={`${classes.Dashboard_menu_item} ${showComp==='appointments' ? classes.activeComp : ""}`} onClick={() => changeComponent('appointments')}>Pending Appointments</div>
        <div className={`${classes.Dashboard_menu_item} ${showComp==='vaccinations' ? classes.activeComp : ""}`} onClick={() => changeComponent('vaccinations')}>Pending Vaccinations</div>
        <div className={`${classes.Dashboard_menu_item} ${showComp==='inseminations' ? classes.activeComp : ""}`} onClick={() => changeComponent('inseminations')}>Pending Artificial Inseminations</div>
        <div className={`${classes.Dashboard_menu_item} ${showComp==='appointmentHistory' ? classes.activeComp : ""}`} onClick={() => changeComponent('appointmentHistory')}>Completed Appointments</div>
        <div className={`${classes.Dashboard_menu_item} ${showComp==='vaccinationHistory' ? classes.activeComp : ""}`} onClick={() => changeComponent('vaccinationHistory')}>Completed Vaccinations</div>
        <div className={`${classes.Dashboard_menu_item} ${showComp==='inseminationHistory' ? classes.activeComp : ""}`} onClick={() => changeComponent('inseminationHistory')}>Completed Artificial Inseminations</div>
        </div>
        </div>
        <div className={classes.Dashboard_info_column}>
        {!loading  ? <Fragment>
            {error && <ErrorComponent error={error}/>}
            {showComp==='info' && <ShowDoctorInfo user={user}  /> }
            {showComp==='edit' && <EditDoctorInfo user={user} />}
            {showComp==='appointments' && <PendingAppointments category="appointments" status="pendingAppointments" doctorId = {user.id}/>}
            {showComp==='appointmentHistory' && <CompletedAppointments category="appointments" status="completedAppointments" doctorId = {user.id}/>}
            {showComp==='vaccinations' && <PendingAppointments category="vaccinations" status="pendingVaccinations" doctorId = {user.id}/>}
            {showComp==='vaccinationHistory' && <CompletedAppointments category="vaccinations" status="completedVaccinations" doctorId = {user.id}/>}
            {showComp==='inseminations' && <PendingAppointments category="inseminations" status="pendingInseminations" doctorId = {user.id}/>}
            {showComp==='inseminationHistory' && <CompletedAppointments category="inseminations" status="completedInseminations" doctorId = {user.id}/>}
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
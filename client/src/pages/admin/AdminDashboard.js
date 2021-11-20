import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import AdminInfo from "../../components/admin/AdminInfo";
import DoctorsList from "../../components/admin/DoctorsList";
import PendingAppointments from "../../components/admin/PendingAppointments";
import ErrorComponent from "../../utilities/ErrorComponent";
import LoadingComponent from "../../utilities/LoadingComponent";
import classes from "../user/UserDashboard.module.css"
import {Helmet} from "react-helmet"
import { webName } from "../../Config";
const AdminDashboard = (props) => {
    const [values,setValues] = useState({
        info:true,
        doctors: false,
        pendingAppointments:false,
    })
    const [showComp,setShowComp] = useState('info');
    const [loading,setLoading] = useState(false)
    const [error, setError] = useState("")
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
    return(!loading ? <Fragment>
        <Helmet>
        <title>{webName} | Dashboard</title>
        </Helmet>
        {error && <ErrorComponent error={error} />}
        <div className={classes.Dashboard}>
        <div className={classes.Dashboard_block}>
        <div className={classes.Dashboard_row}>
        <div className={classes.Dashboard_menu_column}>
        <div className={classes.Dashboard_menu_items}>
        <div className={classes.Dashboard_menu_item} onClick={() =>changeComponent('info')}>Account Information</div>
        <div className={classes.Dashboard_menu_item} onClick={() => changeComponent('doctors')}>All Doctors</div>
        <div className={classes.Dashboard_menu_item} onClick={() => changeComponent('pendingAppointments')}>Pending Appointments</div>
        </div>
        </div>
        <div className={classes.Dashboard_info_column}>
        {!loading  ? <Fragment>
            {error && <ErrorComponent error={error}/>}
            {showComp==='info' && <AdminInfo user={props.user}  /> }
            {showComp==='doctors' && <DoctorsList setError={setError} district = {props.user.district}/>}
            {showComp==='pendingAppointments' && <PendingAppointments history={props.history} setError={setError} district = {props.user.district}/>}
            </Fragment>
            : <LoadingComponent loading={loading} />
            }
        </div>
        </div>
        
        </div>

        </div> </Fragment>: <LoadingComponent loading={loading} />)
}
const mapStateToProps = (state) => ({
    user : state.user.user
})
export default connect(mapStateToProps)(AdminDashboard);
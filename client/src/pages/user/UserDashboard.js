import classes from "./UserDashboard.module.css"
import ShowUserInfo from "../../components/user/ShowUserInfo";
import EditAccountInfo from "../../components/user/EditAccountInfo";
import AppointmentHistory from "../../components/user/AppointmentHistory";
import { Fragment, useEffect, useState } from "react";
import LoadingComponent from "../../utilities/LoadingComponent";
import AddAnimal from "../../components/user/AddAnimal";
import ShowAnimals from "../../components/animals/ShowAnimals";
import { connect } from "react-redux";
const UserDashboard = (props) =>{
    const [values,setValues] = useState({
        user:"",
        loading : false
    })
    const [showComp,setShowComp] = useState('info')
    const changeComponent = (name) => {
        setShowComp(name);
        props.history.push(`?show=${name}`)
    }
    const {user,loading} = values;
    useEffect(()=>{
        document.title="Nitimed | Dashboard"
        loadUser()
    },[props.user,props.location.search])
    const loadUser = () => {
        if(props.user.id !== props.match.params.userId){
            // props.history.goBack()
        }else{
            const par = new URLSearchParams(props.location.search).get('show')
        setShowComp(par);
        setValues({...values,user:props.user,loading:false})
        }
    }
    return(!loading ? <Fragment>
        <div className={classes.Dashboard}>
        <div className={classes.Dashboard_block}>
        <div className={classes.Dashboard_row}>
        <div className={classes.Dashboard_menu_column}>
        <div className={classes.Dashboard_menu_items}>
        <div className={classes.Dashboard_menu_item} onClick={() =>changeComponent('info')}>Account Information</div>
        <div className={classes.Dashboard_menu_item} onClick={() => changeComponent('edit')}>Edit Account </div>
        <div className={classes.Dashboard_menu_item} onClick={() => changeComponent('appointmentHistory')}>Appointment History</div>
        <div className={classes.Dashboard_menu_item} onClick={() => changeComponent('addAnimal')}>Add Animal</div>
        <div className={classes.Dashboard_menu_item} onClick={() => changeComponent('animals')}>Show Animals</div>
        </div>
        </div>
        <div className={classes.Dashboard_info_column}>
        {!loading  ? <Fragment>
        {showComp === 'info' && <ShowUserInfo user={user}  /> }
        {showComp === 'edit' && <EditAccountInfo props={props} />}
        {showComp === 'appointmentHistory' && <AppointmentHistory userName={user.name}  />}
        {showComp ==='addAnimal' && <AddAnimal userId={user.id} />}
        {showComp === 'animals' && <ShowAnimals userId={user.id} />}
        </Fragment>
        : <LoadingComponent loading={loading} />
        }
        </div>
        </div>
        
        </div>

        </div></Fragment> : <LoadingComponent />
    )
}
const mapStateToProps = state => ({
    user : state.user.user
})
export default connect(mapStateToProps)(UserDashboard);
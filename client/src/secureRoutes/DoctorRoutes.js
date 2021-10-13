import { isAuthenticated } from "../actions/auth"
import {Route,Redirect} from "react-router-dom"
import { connect } from "react-redux"
const DoctorRoutes = (rest) => {
    return (isAuthenticated()) ? <Route {...rest} /> : <Redirect to="/login/doctor" />
}
const mapStateToProps = state => ({
    userType: state.user.user.isAdmin
})
export default connect(mapStateToProps)(DoctorRoutes)
import { connect } from "react-redux"
import { Redirect, Route } from "react-router-dom"
import { isAuthenticated, typeOfUser } from "../actions/auth"

const HospitalRoutes = (props) => {
    return (isAuthenticated() && props.userType===2) ? <Route {...props} /> : <Redirect to="/hospital-auth" />
}
const mapStateToProps = state => ({
    userType : state.user.user.isAdmin
})
export default connect(mapStateToProps)(HospitalRoutes)
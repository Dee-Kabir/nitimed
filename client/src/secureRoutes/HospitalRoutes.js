import { connect } from "react-redux"
import { Redirect, Route } from "react-router-dom"
import { isAuthenticated, typeOfUser } from "../actions/auth"

const HospitalRoutes = (props) => {
    console.log(isAuthenticated(),typeOfUser())
    return (isAuthenticated()) ? <Route {...props} /> : <Redirect to="/hospital-auth" />
}
const mapStateToProps = state => ({
    userType : state.user.user.isAdmin
})
export default connect(mapStateToProps)(HospitalRoutes)
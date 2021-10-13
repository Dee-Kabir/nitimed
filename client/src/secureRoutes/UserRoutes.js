import { isAuthenticated } from "../actions/auth"
import {Route,Redirect} from "react-router-dom"
import { connect } from "react-redux"
const UserRoutes = (props) => {
    return (isAuthenticated() ) ? <Route {...props} /> : <Redirect to="/not-authorised" />
}
const mapStateToProps = state => ({
    isAdmin : state.user.user
})
export default connect(mapStateToProps)(UserRoutes)
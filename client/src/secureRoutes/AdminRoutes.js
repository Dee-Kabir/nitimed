import { isAuthenticated } from "../actions/auth"
import {Route,Redirect} from "react-router-dom"
import { connect } from "react-redux"
const AdminRoutes = (props) => {
    return (isAuthenticated() && props.user.isAdmin===3 ) ? <Route {...props} /> : <Redirect to="/not-authorised" />
}
const mapStateToProps = state => ({
    user : state.user.user
})
export default connect(mapStateToProps)(AdminRoutes)
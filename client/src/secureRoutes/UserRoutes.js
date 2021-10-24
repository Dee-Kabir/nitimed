import { isAuthenticated } from "../actions/auth"
import {Route,Redirect} from "react-router-dom"
import { connect } from "react-redux"
import { useEffect } from "react"
const UserRoutes = (props) => {
    return (isAuthenticated() && props.user.isAdmin===0 ) ? <Route {...props} /> : <Redirect to="/not-authorised" />
}
const mapStateToProps = state => ({
    user : state.user.user
})
export default connect(mapStateToProps)(UserRoutes)
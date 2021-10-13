import { connect } from "react-redux"
import { Redirect, Route } from "react-router-dom"
import { isAuthenticated } from "../actions/auth"

const MobileAuthRoutes = (props) =>{
    return(
        (isAuthenticated() || !props.registeredMobile) ? <Redirect to="/" /> : <Route {...props} />
    )
}
const mapStateToProps = state => ({
    registeredMobile : state.user.mobileRegister
})
export default connect(mapStateToProps)(MobileAuthRoutes);
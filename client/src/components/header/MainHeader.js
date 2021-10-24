import { Fragment, useState } from "react";
import HeaderItem from "./HeaderItem";
import classes from "./MainHeader.module.css";
import AuthButton from "../buttons/AuthButton";
import { Link } from "react-router-dom";
import { signout } from "../../actions/auth";
import {
  Grid,
  Icon,
  Menu,
  Segment,
  Sidebar,
} from "semantic-ui-react";
import { connect } from "react-redux";
import { webName } from "../../Config";
import {Dropdown} from "antd"
import { setUserLoggedOut } from "../../store/actions";
const loginButtons = () =>{
  return(
    <Fragment>
              <AuthButton text="Farmer" to="/login/user" />
              <AuthButton text="Hospital" to="/hospital-auth" />
              <AuthButton text="Doctor" to="/login/doctor" />
            </Fragment>
  )
}
const MainHeader = (props) => {
  const [visible, setVisible] = useState(false);
  const userCircle = () => (
    props.loggedIn && (
      <Link
        className={classes.User_Avatar}
        to={
          props.userType === 0
            ? `/dashboard/${props.loggedIn}?show=info`
            : props.userType === 2
            ? `/hospital-dashboard/${props.loggedIn}?show=info`
            : `/doctor-dashboard/${props.loggedIn}?show=info`
        }
      >
        {props.userName[0].toUpperCase()}
      </Link>
    )
  )
  const NitiVetLogo = <Link to="/">
              <div className={classes.Logo_niti}>
              <img className={classes.Header_Logo_Img} src="https://www.niti.gov.in//sites/default/files/gbb-uploads/NITI-Aayog-logo-d7ykne.png" />
               <span className={classes.Web_Name}>{webName}</span>
              </div>
            </Link>
  
  const mobileHeader = () => {
    return (
      <Fragment>
        <Menu className={classes.mobileHeader}>
          <Menu.Item position="left">
            {NitiVetLogo}
          </Menu.Item>
          <Menu.Item position="right">
          {userCircle()}
            
            <Icon
              name="sidebar"
              size="big"
              onClick={() => setVisible(!visible)}
            />
          </Menu.Item>
        </Menu>
        <Grid columns={1}>
          <Grid.Column>
            <Sidebar.Pushable
              as={Segment}
              style={{
                position: "absolute",
                top: "12px",
                height: "100vh",
                zIndex: "16",
                width: "50vw",
                display: visible ? "block" : "none",
              }}
            >
              <Sidebar
                as={Menu}
                animation="overlay"
                icon="labeled"
                inverted
                onHide={() => setVisible(false)}
                vertical
                visible={visible}
                width="thin"
                style={{ backgroundColor: "rgb(85,26,139)", width: "50vw" }}
              >
                <Menu.Item>
                  <HeaderItem
                    itemHeading="Nodal Heads"
                    itemDesc="Find Nodal Heads"
                    to="/nodal-heads"
                    active="nodal-heads"
                  />
                </Menu.Item>
                <Menu.Item>
                  <HeaderItem
                    itemHeading="Doctors"
                    itemDesc="Book an appointment"
                    to="/doctors"
                    active="doctors"
                  />
                </Menu.Item>
                <Menu.Item>
                  <HeaderItem
                    itemHeading="Diagonstics"
                    itemDesc="Get Lab test done"
                    to="/diagonstic-laboratories"
                    active="diagonsis"
                  />
                </Menu.Item>
                <Menu.Item>
                  <HeaderItem
                    itemHeading="Diseases"
                    itemDesc="Diseases and Symptoms"
                    to="/diseases"
                    active="diseases"
                  />
                </Menu.Item>
                
                <Menu.Item>
                <HeaderItem
            itemHeading="Health Services"
            itemDesc="veterinary health services"
            to="/health-services"
            active="health-services"
          />
                </Menu.Item>
                <Menu.Item>
                <HeaderItem
            itemHeading="Artifical Insemination"
            itemDesc="Book artificial insemination"
            to="/"
            active=""
          />
          </Menu.Item>
          <Menu.Item>
          <HeaderItem
            itemHeading="Vaccination"
            itemDesc="Book vaccination"
            to="/vaccination"
            active="vaccination"
          />
          </Menu.Item>
          <Menu.Item>
                <HeaderItem
                    itemHeading="Contact us"
                    itemDesc="contact us 24 x 7"
                    to="/contact-us"
                    active="contactus"
                  />
                </Menu.Item>
                {props.loggedIn && (
                  <Menu.Item onClick={() => signout()}>
                    <AuthButton text="Logout" to="/" />
                  </Menu.Item>
                )}
                {!props.loggedIn && (
                  <Fragment>
                    <Menu.Item>
                      <AuthButton text="Farmer Login" to="/login/user" />
                    </Menu.Item>
                    <Menu.Item>
                      <AuthButton text="Hospital Login" to="/hospital-auth" />
                    </Menu.Item>
                    <Menu.Item>
                      <AuthButton text="Doctor Login" to="/login/doctor" />
                    </Menu.Item>
                  </Fragment>
                )}
              </Sidebar>
            </Sidebar.Pushable>
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  };
 
  return (
    <Fragment>
      {mobileHeader()}
      <div className={classes.Header}>
        <div className={classes.Header_Logo_Block}>
          {NitiVetLogo}
        </div>
        <div className={classes.Header_Items_Block}>
          
          <HeaderItem
            itemHeading="Nodal Heads"
            itemDesc="Find Nodal Heads"
            to="/nodal-heads"
            active="nodal-heads"
          />
          
          <HeaderItem
            itemHeading="Doctors"
            itemDesc="Book an appointment"
            to="/doctors"
            active="doctors"
          />
          <HeaderItem
            itemHeading="Artifical Insemination"
            itemDesc="Book artificial insemination"
            to="/"
            active=""
          />
          <HeaderItem
            itemHeading="Vaccination"
            itemDesc="Book vaccination"
            to="/vaccination"
            active="vaccination"
          />
        </div>
        <div className={classes.Header_Auth_Block}>
        {!props.loggedIn && (
          <Dropdown overlay={loginButtons} placement="bottomRight">
          <button className={classes.Header_Login}>Login/ Register</button>
          </Dropdown>
          )}
          
          {userCircle()}
          {props.loggedIn && (
            <div onClick={() => {signout() 
            props.setUserLoggedOut()
            }}>
              <AuthButton text="Logout" to="/" />
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};
const mapStateToProps = state => ({
  loggedIn: state.user.user && state.user.user.id,
  userType: state.user.user && state.user.user.isAdmin,
  userName: state.user.user && state.user.user.name
})
export default connect(mapStateToProps,{setUserLoggedOut})(MainHeader);
// <HeaderItem
          //   itemHeading="Pharmacy"
          //   itemDesc="Medicines & health products"
          //   to="/pharmacy"
          //   active="pharmacy"
          // />
          // <HeaderItem
          //   itemHeading="Diagonstics"
          //   itemDesc="Get Lab test done"
          //   to="/diagonstic-laboratories"
          //   active="diagonsis"
          // />
          // <HeaderItem
          //   itemHeading="Diseases"
          //   itemDesc="Diseases and Symptoms"
          //   to="/diseases"
          //   active="diseases"
          // />
          // <HeaderItem
          //   itemHeading="Health Services"
          //   itemDesc="veterinary health services"
          //   to="/health-services"
          //   active="health-services"
          // />
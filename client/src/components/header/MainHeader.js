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
  const userCircle = (
    props.loggedIn && (
      <Link
        className={classes.User_Avatar}
        to={
          props.userType === 0
            ? `/dashboard/${props.loggedIn}?show=info`
            : props.userType === 2
            ? `/hospital-dashboard/${props.loggedIn}?show=info`
            : props.userType ===3 ? `/admin/dashboard/${props.loggedIn}?show=info`
            : `/doctor-dashboard/${props.loggedIn}?show=info`
        }
      >
        {props.userName && props.userName[0].toUpperCase()}
      </Link>
    )
  )
  const NitiVetLogo = 
              <div className={classes.Logo_niti}>
              <a href="https://www.niti.gov.in" target="_blank" rel="noreferrer"><img className={classes.Header_Logo_Img} src="https://www.niti.gov.in//sites/default/files/gbb-uploads/NITI-Aayog-logo-d7ykne.png" /></a>
              <Link to="/"><span className={classes.Web_Name}>{webName}</span></Link>
              </div>
            
  
  const mobileHeader = (
      <Fragment>
        <Menu className={classes.mobileHeader}>
          <Menu.Item position="left">
            {NitiVetLogo}
          </Menu.Item>
          <Menu.Item position="right">
          {userCircle}
            
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
                position: "fixed",
                top: "4px",
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
                style={{ backgroundColor: "#233286", width: "50vw" }}
              >
                <Menu.Item>
                  <HeaderItem
                    itemHeading="Nodal Heads"
                  
                    to="/nodal-heads"
                    active="nodal-heads"
                  />
                </Menu.Item>
                <Menu.Item>
                  <HeaderItem
                    itemHeading="Doctors"
                
                    to="/doctors/appointment"
                    active="doctors"
                  />
                </Menu.Item>
                <Menu.Item>
                  <HeaderItem
                    itemHeading="Diagonstics"
                  
                    to="/diagonstic-laboratories"
                    active="diagonsis"
                  />
                </Menu.Item>
                <Menu.Item>
                  <HeaderItem
                    itemHeading="Diseases"
                   
                    to="/diseases"
                    active="diseases"
                  />
                </Menu.Item>
                
                <Menu.Item>
                <HeaderItem
            itemHeading=" Other Health Services"
        
            to="/health-services"
            active="health-services"
          />
                </Menu.Item>
                <Menu.Item>
                <HeaderItem
            itemHeading="Artifical Insemination"
           
            to="/doctors/artificialInsemination"
            active=""
          />
          </Menu.Item>
          <Menu.Item>
          <HeaderItem
            itemHeading="Vaccination"
     
            to="/doctors/vaccination"
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
                  <Menu.Item onClick={() => {signout() 
                    props.setUserLoggedOut()
                    }}>
                    <HeaderItem
                    itemHeading="Log out"
                    to="/"                      />
                  </Menu.Item>
                )}
                {!props.loggedIn && (
                  <Fragment>
                    <Menu.Item >
                    <HeaderItem  
            to="/login/user" itemHeading="Farmer Login" />
                    </Menu.Item>
                    <Menu.Item>
                      <HeaderItem to="/hospital-auth" itemHeading="Hospital Login"/>
                    </Menu.Item>
                    <Menu.Item>
                      <HeaderItem to="/login/doctor" itemHeading="Doctor Login" />
                    </Menu.Item>
                  </Fragment>
                )}
              </Sidebar>
            </Sidebar.Pushable>
          </Grid.Column>
        </Grid>
      </Fragment>
    );
 
  return (
    <Fragment>
      {mobileHeader}
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
            to="/doctors/appointment"
            active="doctors"
          />
          <HeaderItem
            itemHeading="Artifical Insemination"
            itemDesc="Book artificial insemination"
            to="/doctors/artificialInsemination"
            active=""
          />
          <HeaderItem
            itemHeading="Vaccination"
            itemDesc="Book vaccination"
            to="/doctors/vaccination"
            active="vaccination"
          />
        </div>
        <div className={classes.Header_Auth_Block}>
        {!props.loggedIn && (
          <Dropdown overlay={loginButtons} placement="bottomRight">
          <button className={classes.Header_Login}>Login/ Register</button>
          </Dropdown>
          )}
          
          {userCircle}
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

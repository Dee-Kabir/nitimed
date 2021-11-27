import { Fragment } from "react"
import { Link } from "react-router-dom"
import { webName } from "../../Config"
import classes from "./Footer.module.css"
import {Icon} from"semantic-ui-react"
import { isAuthenticated } from "../../actions/auth"
const Footer = () => {
    return (
        <Fragment>
        <div className={classes.Footer_block}>
            <div className={classes.Footer_menus}>
                <div className={classes.Footer_menu}>
                    <div className={classes.Menu_heading}>{webName}</div>
                    <div className={classes.Menu_Item}><Link to="/faq" >FAQs</Link></div>
                    <div className={classes.Menu_Item}><Link to="/contact-us" >Contact Us</Link></div>
                    {!isAuthenticated() && <div className={classes.Menu_Item}><Link to="/admin/login" >Admin</Link></div>}
                </div>
              
                <div className={classes.Footer_menu}>
                    <div className={classes.Menu_heading}>Address</div>
                    <div className={classes.Menu_Item}><p style={{color:"#fff"}}>Sansad Marg, Sansad Marg Area, New Delhi, Delhi 110001</p></div>
                    <div className={classes.Menu_Item}><p style={{color:"#fff"}}><b>Working days:</b> Mon - Fri   </p></div>
                    <div className={classes.Menu_Item}><p style={{color:"#fff"}}><b>Hours:</b> Open 9AM ⋅ Closes 6PM   </p></div>
                    <div className={classes.Menu_Item}><p style={{color:"#fff"}}><b>Phone:</b> 011 2309 6622</p></div>
                </div>
            </div>
            <div className={classes.Footer_Social}>
                <a href="https://www.youtube.com/channel/UCctkAm71u0Lo1pi-QmKYidQ" target="_blank" rel="noreferrer"><div className={classes.Footer_Icon}><Icon name="youtube" circular /></div></a>
                <a href="https://twitter.com/nitiaayogvet" target="_blank" rel="noreferrer"><div className={classes.Footer_Icon}><Icon name="twitter square" circular /></div></a>
                
            </div>
        </div>
        </Fragment>
    )
}
export default Footer
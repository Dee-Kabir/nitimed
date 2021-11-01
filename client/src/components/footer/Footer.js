import { Fragment } from "react"
import { Link } from "react-router-dom"
import { webName } from "../../Config"
import classes from "./Footer.module.css"
import {Icon} from"semantic-ui-react"
const Footer = () => {
    return (
        <Fragment>
        <div className={classes.Footer_block}>
            <div className={classes.Footer_menus}>
                <div className={classes.Footer_menu}>
                    <div className={classes.Menu_heading}>{webName}</div>
                    <div className={classes.Menu_Item}><Link to="/faq" >FAQs</Link></div>
                    <div className={classes.Menu_Item}><Link to="/" >Terms & Conditions</Link></div>
                    <div className={classes.Menu_Item}><Link to="/contact-us" >Contact Us</Link></div>
                    <div className={classes.Menu_Item}><Link to="/admin/login" >Admin</Link></div>
                </div>
                <div className={classes.Footer_menu}>
                    <div className={classes.Menu_heading}>More</div>
                    <div className={classes.Menu_Item}><Link to="/" >Carrer</Link></div>
                    <div className={classes.Menu_Item}><Link to="/" >Terms & Condition</Link></div>
                    <div className={classes.Menu_Item}><Link to="/" >Github</Link></div>
                </div>
                <div className={classes.Footer_menu}>
                    <div className={classes.Menu_heading}>Address</div>
                    <div className={classes.Menu_Item}><p style={{color:"#fff"}}>Sansad Marg, Sansad Marg Area, New Delhi, Delhi 110001</p></div>
                    <div className={classes.Menu_Item}><p style={{color:"#fff"}}><b>Hours:</b> Open ⋅ Closes 6PM   </p></div>
                    <div className={classes.Menu_Item}><p style={{color:"#fff"}}><b>Phone:</b> 011 2309 6622</p></div>
                </div>
            </div>
            <div className={classes.Footer_Social}>
                <div className={classes.Footer_Icon}><Icon name="youtube" circular /></div>
                <div className={classes.Footer_Icon}><Icon name="twitter square" circular /></div>
                <div className={classes.Footer_Icon}><Icon name="facebook square" circular /></div>
                <div className={classes.Footer_Icon}><Icon name="instagram" circular /></div>
            </div>
        </div>
        </Fragment>
    )
}
export default Footer
import React, { useState } from "react";
import classes from "./aboutUs.module.css"
const AboutUs = (props) => {
    const [more, setMore] = useState(false)
    return(
        <div className={classes.aboutUsContainer} id="about-us" >
        <p className={classes.aboutUs_Heading}>About <span style={{color:"#233286"}}>Us</span></p>
        <p className={classes.AboutUs_desc}>Livestock  has been the biggest contributors to the share of total agriculture GVA in India. Recognising the importance of the animal husbandry, dairy and fisheries sector, number of measures and schemes  have been rolled out to ensure sustainable yields including National Animal Disease Control Programme, Pradhan Mantri Matsya Sampada Yojna.<span>{more ? 
            <span>While all such measures are laudable, certain practical and logistical challenges remain. These include access to preventive and curative livestock health services livestock, information on the latest schemes and insurance, interventions through artificial insemination. With this background and to further streamline the access to livestock related health services, the livestock Wellbeing System has been developed by NITI Aayog. Thorough this user-friendly and local language friendly telemedicine system,  farmer can not only get information for the general wellbeing  of the livestock but also get the benefits of online consultation with veterinary experts within the district to which the farmer belongs.<span style={{cursor:"pointer",color:'blue'}} onClick={()=>setMore(false)}>show less</span></span> : <span style={{cursor:"pointer",color:'blue'}}  onClick={() => setMore(true)}>show more...</span>} </span></p>
        <p></p>
        </div>
        
    )
}
export default AboutUs;
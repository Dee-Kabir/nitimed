import { useEffect, useState } from "react";
import { getServices } from "../../actions/queries";
import ServiceCard from "../cards/ServiceCard";
import classes from "./services.module.css";

const ServicesComponent = () => {
  const [services, setServices] = useState([])
  useEffect(()=>{
    loadServices()
  },[])
  const loadServices = () => {
    try{
      getServices().then((data)=>{
        if(data.success){
          setServices(data.services)
        }
      })
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className={classes.services_box}>
    <p className={classes.Service_box_Heading}>Our <span style={{color:"#233286"}}>Services</span> Include</p>
      <div className={classes.Services}>
        {services && services.map((service, _) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
    </div>
  );
};
export default ServicesComponent;

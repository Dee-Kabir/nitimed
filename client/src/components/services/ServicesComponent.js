import { useEffect, useState } from "react";
import { getServices } from "../../actions/queries";
import ServiceCard from "../cards/ServiceCard";
import classes from "./services.module.css";

const ServicesComponent = () => {
  const [services, setServices] = useState([])
  useEffect(()=>{
    try{
      getServices().then((data)=>{
        if(data.success){
          setServices(data.services)
        }
      })
    }catch(err){
      console.log(err)
    }
  },[])
  return (
    <div className={classes.services_box}>
      <h1 className={classes.Services_heading}>Our Services</h1>
      <div className={classes.Services}>
        {services && services.map((service, _) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
    </div>
  );
};
export default ServicesComponent;

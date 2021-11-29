import TillNowCard from "../cards/TillNowCard";
import classes from "./services.module.css";
import { useEffect, useState } from "react";
import { getTillNow,getRecordsNumber } from "../../actions/queries";

const TillNow = () => {
  const [values, setValues] = useState({
    consultationCompleted: 0,
    inseminationCompleted: 0,
    vaccineAdministered: 0,
    creditCards: 0,
    insuranceRolledOut: 0,
    animalsRegistered: 0
  });
  const [workDone, setWorkDone] = useState([]);
  useEffect(() => {
    getRecords();
    try{
      getTillNow().then(data=>{
        if(data.success){
          setWorkDone(data.tillNow)
        }
      })
    }catch(err){
      console.log(err)
    }
    return setValues({})
  }, []);
  const getRecords = () => {
    try{
      getRecordsNumber().then(data => {
      setValues({...data})
    })
    }catch(err){
      console.log(err)
    }
    
  };
  return (
    <div className={classes.tillnow_box}>
    <p className={classes.Service_box_Heading}>Achievements <span style={{ color: "#233286" }}>Till </span> Now</p>
      <div className={classes.tillnows}>
        {workDone && workDone.map((work, _) => (
          <TillNowCard
            key={work.title}
            service={work}
            numberDone={work && values[work.docName]}
          />
        ))}
      </div>
    </div>
  );
};
export default TillNow;

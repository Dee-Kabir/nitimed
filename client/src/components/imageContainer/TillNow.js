import TillNowCard from "../cards/TillNowCard";
import classes from "./ImageContainer.module.css";
import { useEffect, useState } from "react";
import { getTillNow,getRecordsNumber } from "../../actions/queries";

const TillNow = () => {
  const [values, setValues] = useState({
    consultationCompleted: 0,
    inseminationCompleted: 0,
    vaccineAdministered: 0,
    creditCards: 0,
    insuranceRolledOut: 0,
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
  }, []);
  const getRecords = () => {
    try{
      getRecordsNumber().then(data => {
      setValues({...data})})
    }catch(err){
      console.log(err)
    }
    
  };
  return (
    <div className={classes.TillNow}>
      <div className={classes.TillNow_Heading}>Achievements Till Now</div>
      <div className={classes.TillNow_items}>
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

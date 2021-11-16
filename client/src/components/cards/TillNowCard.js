import classes from "./cards.module.css";

const TillNowCard = ({ service, numberDone }) => {
  return (
    <div
      className={classes.TillNowCard}
    >
      <div className={classes.TillNow_title}>{service.title}</div>
      <div className={classes.TillNow_desc}>{numberDone}</div>
    </div>
  );
};
export default TillNowCard;

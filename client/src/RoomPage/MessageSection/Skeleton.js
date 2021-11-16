import classes from "./Messages.module.css";

const Skeleton = () => (
  <div className={classes.Skeleton}>
    <div className={classes.Skeleton__avatar}></div>
    <div className={classes.Skeleton__author}></div>
    <div className={classes.Skeleton__details}></div>
  </div>
);
export default Skeleton;

import { Link } from "react-router-dom";
import classes from "./AuthButton.module.css"
const AuthButton = ({ text, to }) => {
  return (
      <Link to={to}>
        <button className={classes.Header_Login} >{text}</button>
      </Link>
  );
};
export default AuthButton;
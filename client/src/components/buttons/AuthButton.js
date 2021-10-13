import { Link } from "react-router-dom";
import {Button} from "semantic-ui-react"
const AuthButton = ({ text, to }) => {
  return (
      <Link to={to}>
        <Button color="violet">{text}</Button>
      </Link>
  );
};
export default AuthButton;
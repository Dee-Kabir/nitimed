import { Link } from "react-router-dom";
import { Header, Form, Button } from "semantic-ui-react";
import { webName } from "../../Config";
import classes from "../../pages/organization/RegisterHospital.module.css";
const LoginForm = ({
  handleChange,
  email,
  password,
  handleloginSubmit,
  loading,
}) => {
  return (
    <div className={classes.LoginForm_H}>
          <Form widths="equal" style={{width: '100%'}} onSubmit={handleloginSubmit} loading={loading}>
            <Header className="text-center">Login to {webName} Hospital</Header>
            <Form.Input
              label="Email"
              className={classes.RegisterForm_HInput}
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter Hospital Email"
              required
            />
            <Form.Input
              label="Password"
              className={classes.RegisterForm_HInput}
              type="password"
              name="password"
              value={password}
              onChange={handleChange} 
              placeholder="Enter a password"
              required
            />
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Button
                disabled={loading}
                loading={loading}
                type="submit"
                primary
                
                size="medium"
              >
                Login
              </Button>
            </div>
          </Form>
          <div><Link to="/forgotPassword">Forgot Password?</Link></div>
    </div>
  );
};
export default LoginForm;

import { Button, Form, Header } from "semantic-ui-react";
import classes from "../../pages/organization/RegisterHospital.module.css";
import SearchInput from "../search/SearchInput";
import { Fragment } from "react";
const RegisterForm = ({
  values,
  handleChange,
  handlePlaces,
  handleSubmit,
  loading,
  edit = false,
}) => {
  const {
    name,
    email,
    address,
    password,
    state,
    city,
    phone,
    hospitalRegistration,
    confirmPassword,
  } = values;
  return (
    <div className={classes.RegisterForm_H}>
      {edit && (
        <Header style={{ marginTop: "16px" }} content="Edit Information" />
      )}
      <Form
        widths="equal"
        style={{ width: "100%" }}
        onSubmit={handleSubmit}
        loading={loading}
      >
        {!edit && (
          <Header className="text-center">
            Register Your Hospital with NitiMed
          </Header>
        )}
        <Form.Input
          label="Name"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Enter Hospital Name"
          required
        />

        <Form.Input
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter Hospital Email"
          required
        />

        {!edit && (
          <Fragment>
            <Form.Input
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter a password"
              required
            />
            <Form.Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Enter password again"
              required
            />
          </Fragment>
        )}
        <Form.Input
          label="Registration Number"
          type="text"
          name="hospitalRegistration"
          value={hospitalRegistration}
          onChange={handleChange}
          placeholder="Enter Hospital Registration Number"
          required
        />
        <Form.Input
          label="Address"
          type="text"
          name="address"
          value={address}
          onChange={handleChange}
          placeholder="Enter Hospital Address"
          required
        />

        <div className="required field">
          <label>State</label>
          <div style={{ width: "100%" }}>
            <SearchInput
              category={`states`}
              name="state"
              placeholder="State"
              value={state}
              handlePlaces={handlePlaces}
            />
          </div>
        </div>
        <div className="required field">
          <label>District</label>
          <div style={{ width: "100%" }}>
            <SearchInput
              category={state}
              name="city"
              value={city}
              placeholder="District"
              handlePlaces={handlePlaces}
            />
          </div>
        </div>
        {!edit && <Form.Input
          label="Mobile Number"
          type="tel"
          name="phone"
          value={phone}
          onChange={handleChange}
          pattern="[1-9]{1}[0-9]{9}"
          placeholder="Enter Hospital mobile Number"
          required
        />}
        <div style={{ textAlign: "center" }}>
          <Button
            disabled={loading}
            loading={loading}
            type="submit"
            primary
            size="large"
          >
            {edit ? "Edit" : "Register"}
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default RegisterForm;

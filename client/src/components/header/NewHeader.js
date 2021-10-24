import { Fragment } from "react";
import HeaderItem from "./HeaderItem";
import classes from "./MainHeader.module.css";
const NewHeader = (props) => {
  return (
    <Fragment>
      <div className={classes.NewHeader}>
        <div className={classes.NewHeader_Items_Block}>
          <HeaderItem
            itemHeading="FAQs"
            itemDesc={`FAQ section`}
            to="/faq"
            active="faq"
          />
          <HeaderItem
            itemHeading="Pharmacy"
            itemDesc="Medicines & health products"
            to="/pharmacy"
            active="pharmacy"
          />
          <HeaderItem
            itemHeading="Diagonstics"
            itemDesc="Get Lab test done"
            to="/diagonstic-laboratories"
            active="diagonsis"
          />
          <HeaderItem
            itemHeading="Diseases"
            itemDesc="Diseases and Symptoms"
            to="/diseases"
            active="diseases"
          />
          <HeaderItem
            itemHeading="Health Services"
            itemDesc="veterinary health services"
            to="/health-services"
            active="health-services"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default NewHeader;

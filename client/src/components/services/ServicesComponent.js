import ServiceCard from "../cards/ServiceCard";
import classes from "./services.module.css";
import serviceBlob from "../../assets/Images/blob.svg";
const services = [
  {
    title: "PashuPedia",
    desc: "We provide best health service for your livestock.A great team here is ready for serving you 24 X 7.",
    link: "https://dahd.nic.in/pashupdia",
  },
  {
    title: "Schemes",
    desc: "There are various Schemes for farmers benefit provided by state and central government. You can get Information about them by your Nodal Officer.",
    link: "https://drive.google.com/file/d/1CtKYyE7dgz-BW4QPT3XaZwAiso3E_piE/view",
  },
  {
    title: "Pashu Credit Card",
    desc: "Pashu Credit Card is for getting instant money for getting fodder for your livestocks and various other things without much hassle.",
    link: "https://drive.google.com/file/d/1GBnE_pSdGSh952U2wBqSYL88U_jVwZu5/view",
  },
  {
    desc: "State and Central Government has various schemes for Insuring your livestocks from various unfavourable circumstances.",
    link: "https://drive.google.com/file/d/179WVXW6pqv4D85zGLm4F4AOXksiyDATZ/view",
    title: "Insurance",
  },
];
const ServicesComponent = () => {
  return (
    <div className={classes.services_box}>
      <p className={classes.Service_box_Heading}>
        Our <span style={{ color: "#233286" }}>Services</span> Include
      </p>
      <div className={classes.Services}>
        <div>
          <ServiceCard service={services[0]} />
        </div>
        <div className={classes.services_middle_row}>
          <ServiceCard service={services[1]} />
          <div className={classes.blob}>
            <img
              style={{ height: "300px", width: "300px" }}
              src={serviceBlob}
            />
          </div>
          <ServiceCard service={services[2]} />
        </div>
        <div>
          <ServiceCard service={services[3]} />
        </div>
      </div>
    </div>
  );
};
export default ServicesComponent;

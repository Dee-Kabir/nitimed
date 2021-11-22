import ImageContainer from "../../components/imageContainer/ImageContainer";
import { Fragment } from "react";
import { Divider } from "antd";
import SelectLiveStocks from "../../components/livestocksForm/SelectLiveStocks";
import IMG_7 from "../../assets/Images/IMG_7.jpg"
import IMG_8 from "../../assets/Images/IMG_8.jpg"
import IMG_9 from "../../assets/Images/IMG_9.jpg"
import { Helmet } from "react-helmet";
import { webName } from "../../Config";
const HealthServices = () => {
  return (
    <Fragment>
    <Helmet>
    <title>{webName} | Health Services</title>
    </Helmet>
    <ImageContainer
    imageName1={IMG_7}
    imageName2={IMG_8}
    imageName3={IMG_9}
    mainHeading="Telemedicine for Livestocks - NITIVet"
  />
      <Divider />
      <SelectLiveStocks />
    </Fragment>
  );
};
export default HealthServices;

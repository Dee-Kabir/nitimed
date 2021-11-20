import ImageContainer from "../../components/imageContainer/ImageContainer";
import { Fragment } from "react";
import { Divider } from "antd";
import SelectLiveStocks from "../../components/livestocksForm/SelectLiveStocks";
import { homeImageName1, homeImageName2,homeImageName3, webName} from "../../Config";
import { Helmet } from "react-helmet";
const HealthServices = () => {
  return (
    <Fragment>
    <Helmet>
    <title>{webName} | Health Services</title>
    </Helmet>
    <ImageContainer
    imageName1={homeImageName2}
    imageName2={homeImageName3}
    imageName3={homeImageName1}
    mainHeading="Telemedicine for Livestocks - NITIVet"
  />
      <Divider />
      <SelectLiveStocks />
    </Fragment>
  );
};
export default HealthServices;

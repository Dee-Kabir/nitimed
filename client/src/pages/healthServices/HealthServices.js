import ImageContainer from "../../components/imageContainer/ImageContainer";
import { Fragment } from "react";
import { Divider } from "antd";
import SelectLiveStocks from "../../components/livestocksForm/SelectLiveStocks";
import { homeImageName1, homeImageName2,homeImageName3} from "../../Config";
const HealthServices = () => {
  return (
    <Fragment>
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

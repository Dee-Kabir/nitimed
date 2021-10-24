import ImageContainer from "../../components/imageContainer/ImageContainer";
import { Fragment } from "react";
import { Divider } from "antd";
import SelectLiveStocks from "../../components/livestocksForm/SelectLiveStocks";
import { homeImageName1, homeImageName4,homeImageName5} from "../../Config";
const HealthServices = () => {
  return (
    <Fragment>
      <ImageContainer
        imageName1={homeImageName4}
        imageName2={homeImageName5}
        imageName3={homeImageName1}
        mainHeading="Health services for your livestocks"
      />
      <Divider />
      <SelectLiveStocks />
    </Fragment>
  );
};
export default HealthServices;

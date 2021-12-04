import ImageContainer from "../../components/imageContainer/ImageContainer";
import { Fragment } from "react";
import { Divider } from "antd";
import SelectLiveStocks from "../../components/livestocksForm/SelectLiveStocks";
import IMG_1 from "../../assets/Images/IMG_1.jpg"
import IMG_2 from "../../assets/Images/IMG_2.jpg"
import IMG_3 from "../../assets/Images/IMG_3.jpg"
import IMG_4 from "../../assets/Images/IMG_4.jpg"
import IMG_5 from "../../assets/Images/IMG_5.jpg"
import IMG_6 from "../../assets/Images/IMG_6.jpg"
import IMG_7 from "../../assets/Images/IMG_7.jpg"
import { Helmet } from "react-helmet";
import { MainPageImageHeading, webName } from "../../Config";
const HealthServices = () => {
  return (
    <Fragment>
    <Helmet>
    <title>{webName} | Health Services</title>
    </Helmet>
    <ImageContainer
    images = {[IMG_1,IMG_2,IMG_3,IMG_4,IMG_5,IMG_6,IMG_7]}
    mainHeading={MainPageImageHeading}
  />
      <Divider />
      <SelectLiveStocks />
    </Fragment>
  );
};
export default HealthServices;

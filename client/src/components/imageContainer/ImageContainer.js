import classes from "./ImageContainer.module.css";
import { Carousel } from "antd";
import { Image } from "semantic-ui-react";
const ImageContainer = ({
  imageName1,
  imageName2,
  imageName3,
  mainHeading,
}) => {
  return (
    <div className={classes.imageContainer}>
      <Carousel effect="fade" className={classes.imageContainer_bg} autoplay>
        <Image className={classes.Carousel_Image} src={imageName1} />
        <Image className={classes.Carousel_Image} src={imageName2} />
        <Image className={classes.Carousel_Image} src={imageName3} />
      </Carousel>
      <div className={classes.imageContainer_bg_mask}>
      
      </div>
      <div className={classes.ImageContainer_main_heading}>
        <span>{mainHeading}</span>
      </div>
    </div>
  );
};
export default ImageContainer;


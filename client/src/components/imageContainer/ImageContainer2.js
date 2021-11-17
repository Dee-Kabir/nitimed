import classes from "./ImageContainer.module.css";
import { Carousel } from "antd";
import { Header, Image } from "semantic-ui-react";
const ImageContainer2 = ({
  imageName1,
  imageName2,
  imageName3,
  mainHeading,
}) => {
  return (
      <div className={classes.imageContainer2}>
    <div className={`ui container mt-4`}>
    <div className="row" style={{width: "100%",height: "100%",justifyContent: "space-between"}} >
      <div className="col-sm-8" style={{boxShadow: "0 0 15px #000",padding: "0px"}}>
        <Carousel effect="fade" autoplay style={{height: "auto",width: "100%"}}>
          <Image wrapped className={classes.Carousel_Image2} style={{height: '100%'}} src={imageName1} />
          <Image className={classes.Carousel_Image2} src={imageName2} />
          <Image className={classes.Carousel_Image2} src={imageName3} />
        </Carousel>
      </div>
      <div className="col-sm-4" style={{marginBottom:"32px"}} >
      <Header color="purple" content="Announcements" textAlign="center" className="mt-3" />
        <div className={classes.scroll_container}>
        <div className={classes.scroll_text}>
          This is scrolling text.
          <br/>
          This is scrolling text.
          <br/>
          This is scrolling text.
          <br/>
        </div>
      </div>
      </div>
    </div>
    </div>
    </div>
  );
};
export default ImageContainer2;
// <div className={classes.imageContainer}>
//       <Carousel effect="fade" className={classes.imageContainer_bg} autoplay>
//         <Image className={classes.Carousel_Image} src={imageName1} />
//         <Image className={classes.Carousel_Image} src={imageName2} />
//         <Image className={classes.Carousel_Image} src={imageName3} />
//       </Carousel>
//       <div className={classes.imageContainer_bg_mask}>
      
//       </div>
//       <div className={classes.ImageContainer_main_heading}>
//         <span>{mainHeading}</span>
//       </div>
//     </div>

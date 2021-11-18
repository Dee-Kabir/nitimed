import React from "react";

const ImageContainer = ({
  imageName1,
  imageName2,
  imageName3,
  mainHeading,
}) => {
  return (
    <section className="full-slider-5" style={{height: "calc(100vh - 75px)"}}>
    <div id="carousel-full-slider-5" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
            <li data-target="#carousel-full-slider-5" data-slide-to="0" className="active"></li>
            <li data-target="#carousel-full-slider-5" data-slide-to="1"></li>
            <li data-target="#carousel-full-slider-5" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
            <div className="carousel-item active" style={{backgroundImage: `url(${imageName1})`}}>
                <div className="carousel-caption d-flex justify-content-center align-items-center text-left flex-column  first-slide">
                    <div className="carousel-caption-inner">
                        <h2>Telemedicine for livestocks- NITIVet</h2>
                    </div>
                </div>
            </div>
            <div className="carousel-item" style={{backgroundImage: `url(${imageName2})`}}>
                <div className="carousel-caption d-flex justify-content-center align-items-center text-left flex-column second-slide">
                    <div className="carousel-caption-inner">
                        <h2>Telemedicine for livestocks- NITIVet</h2>
                    </div>
                </div>
            </div>
            <div className="carousel-item" style={{backgroundImage: `url(${imageName3})`}}>
                <div className="carousel-caption d-flex justify-content-center align-items-center text-left flex-column third-slide">
                    <div className="carousel-caption-inner">
                        <h2>Telemedicine for livestocks- NITIVet</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

  );
};
export default ImageContainer;


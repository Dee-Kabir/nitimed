import { Fragment } from "react"
import ImageContainer2 from "../../components/imageContainer/ImageContainer2"
import ServicesComponent from "../../components/services/ServicesComponent"
import TillNow from "../../components/services/TillNow"
import {MainPageImageHeading, webName } from "../../Config"
import AboutUs from "../../components/aboutUs/AboutUs"
import DividerComponent from "../../components/utitlityComp/DividerComponent"
import NewHeader from "../../components/header/NewHeader"
import { Helmet } from "react-helmet"
import IMG_1 from "../../assets/Images/IMG_1.jpg"
import IMG_2 from "../../assets/Images/IMG_2.jpg"
import IMG_3 from "../../assets/Images/IMG_3.jpg"
import IMG_4 from "../../assets/Images/IMG_4.jpg"
import IMG_5 from "../../assets/Images/IMG_5.jpg"
import IMG_6 from "../../assets/Images/IMG_6.jpg"
import IMG_7 from "../../assets/Images/IMG_7.jpg"
const slides=[{image: IMG_1},
{image: IMG_2},
{image: IMG_3},
{image: IMG_4},
{image: IMG_5},
{image: IMG_6},
{image: IMG_7}]

const Home = () => {
    return (
        <Fragment>
        <Helmet>
        <title>{webName} | Home</title>
        </Helmet>
        <NewHeader />
        <ImageContainer2 slides={slides}  mainHeading={MainPageImageHeading}/>
        <br/>
        
        <DividerComponent />
        <ServicesComponent />
        <DividerComponent />
        <TillNow />
        <DividerComponent />
        <AboutUs />
        </Fragment>
    )
}
export default Home
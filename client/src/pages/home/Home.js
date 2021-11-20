import { Fragment } from "react"
import ImageContainer2 from "../../components/imageContainer/ImageContainer2"
import ServicesComponent from "../../components/services/ServicesComponent"
import TillNow from "../../components/services/TillNow"
import { homeImageName1,homeImageName2,homeImageName3,MainPageImageHeading, webName } from "../../Config"
import AboutUs from "../../components/aboutUs/AboutUs"
import DividerComponent from "../../components/utitlityComp/DividerComponent"
import NewHeader from "../../components/header/NewHeader"
import { Helmet } from "react-helmet"
const Home = () => {
    return (
        <Fragment>
        <Helmet>
        <title>{webName} | Home</title>
        </Helmet>
        <NewHeader />
        <ImageContainer2 imageName1={homeImageName1} imageName2={homeImageName2} imageName3={homeImageName3} mainHeading={MainPageImageHeading}/>
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
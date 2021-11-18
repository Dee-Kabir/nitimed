import { Fragment, useEffect } from "react"
import ImageContainer2 from "../../components/imageContainer/ImageContainer2"
import ImageContainer from "../../components/imageContainer/ImageContainer"
import ServicesComponent from "../../components/services/ServicesComponent"
import TillNow from "../../components/services/TillNow"
import { homeImageName1,homeImageName2,homeImageName3,MainPageImageHeading } from "../../Config"
import AboutUs from "../../components/aboutUs/AboutUs"
import DividerComponent from "../../components/utitlityComp/DividerComponent"
import NewHeader from "../../components/header/NewHeader"
const Home = () => {
    useEffect(()=>{
        document.title="Nitimed | Home"
    },[])
    return (
        <Fragment>
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
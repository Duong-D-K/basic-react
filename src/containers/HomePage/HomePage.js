import HomeHeader from "./HomeHeader";
import Carousel from "../../components/Carousel";
import HomeFooter from "./HomeFooter";

const HomePage = () => {
    return (
        <div>
            <HomeHeader isShowBanner={true} />
            <Carousel status="clinics" />
            <Carousel status="specialties" />
            <Carousel status="doctors" />
            <HomeFooter />

        </div>

    );
};

export default HomePage;
import Navigation from "./Navigation";
import HeroSec from "./HeroSec";
import Destinations from "./Destinations";
import Inspo from "./Inspo";
import Stories from "./Stories";
import Footer from "./Footer";

function Home() {
    return (
      <div>
        {/* <Navigation/> */}
        <HeroSec/>
        <Destinations/>
        <Inspo/>
        <Stories/>
        <Footer/>
        {/* <Header/> */}
      </div>
    );
  }
  
  export default Home;
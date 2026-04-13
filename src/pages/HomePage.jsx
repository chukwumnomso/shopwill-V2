import Header from "../components/Header";
import Hero from "../components/Hero";
import PopUp from "../components/PopUp";
import Heading from "../components/Heading";
import HomePageCategory from "../components/HomePageCategory";
import ProdGridSimple from "../components/ProductGridSimple";
import ServicesSlider from "../components/ServicesSlider";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Heading className="text-2xl flex items-center justify-center font-[jost] uppercase my-10">
        men new arrival
      </Heading>
      {/* <ProdGridPaginated tableName="women_store" /> */}
      <ProdGridSimple tableName="men_store" />
      <HomePageCategory />
      <Heading className="text-2xl flex items-center justify-center font-[jost] uppercase my-10">
        women new arrival
      </Heading>
      <ProdGridSimple tableName="women_store" />
    </div>
  );
};

export default HomePage;

import Hero from "../components/Hero";
import Heading from "../components/Heading";
import ProdGridSimple from "../components/ProductGridSimple";
import HomePageCategory from "../components/HomePageCategory";
// import Uploads from "../components/Uploads";
// import ProdGridPaginated from "../components/ProductGridPaginated";
import ViewedProduct from "../components/ViewedProduct";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Heading className="text-xl flex items-center justify-center font-[jost] uppercase my-10 font-light tracking-wider">
        men new arrivals
      </Heading>
      {/* <ProdGridPaginated tableName="products_store" gender="male" /> */}
      <ProdGridSimple tableName="products_store" gender="male" />
      <HomePageCategory />;
      <Heading className="text-xl flex items-center justify-center font-[jost] uppercase my-10 font-light tracking-wider">
        women new arrivals
      </Heading>
      <ProdGridSimple tableName="products_store" gender="female" />
      {/* <Uploads /> */}
    </div>
  );
};

export default HomePage;

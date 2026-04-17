import Hero from "../components/Hero";
import Heading from "../components/Heading";
import ProdGridSimple from "../components/ProductGridSimple";
// import Uploads from "../components/Uploads";
// import ProdGridPaginated from "../components/ProductGridPaginated";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Heading className="text-2xl flex items-center justify-center font-[jost] uppercase my-10">
        men new arrivals
      </Heading>
      {/* <ProdGridPaginated tableName="products_store" gender="male" /> */}
      <ProdGridSimple tableName="products_store" gender="male" />

      <Heading className="text-2xl flex items-center justify-center font-[jost] uppercase my-10">
        women new arrivals
      </Heading>
      <ProdGridSimple tableName="products_store" gender="female" />
      {/* <Uploads /> */}
    </div>
  );
};

export default HomePage;

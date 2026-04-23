import ProdGridPaginated from "../components/ProductGridPaginated";
import TopProductFilter from "../components/TopProductFilter";
import SortBy from "../components/SortBy";
import Heading from "../components/Heading";
import SideFilter from "../components/SideFilter";

const WomenProductPage = () => {
  return (
    <div className="relative overflow-x-hidden">
      <TopProductFilter />
      <SideFilter gender="female" />
      <SortBy />
      <Heading className="text-xl font-light flex items-center justify-center font-[jost] uppercase my-10 tracking-wider">
        for women
      </Heading>
      <ProdGridPaginated tableName="products_store" gender="female" />
    </div>
  );
};

export default WomenProductPage;

import ProdGridPaginated from "../components/ProductGridPaginated";
import TopProductFilter from "../components/TopProductFilter";
import SortBy from "../components/SortBy";

import SideFilter from "../components/SideFilter";

const WomenProductPage = () => {
  return (
    <div className="relative overflow-x-hidden">
      <TopProductFilter />
      <SideFilter gender="female" />
      <SortBy />
      <ProdGridPaginated tableName="products_store" gender="female" />
    </div>
  );
};

export default WomenProductPage;

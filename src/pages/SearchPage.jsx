import ProdGridPaginated from "../components/ProductGridPaginated";
import TopProductFilter from "../components/TopProductFilter";
import SortBy from "../components/SortBy";
import SideFilter from "../components/SideFilter";
import { useSearch } from "../context/SearchContext";

const SearchPage = () => {
  const { searchResult, searchValue } = useSearch();

  return (
    <div>
      <div className="text-center mb-10 text-xl uppercase font-[jost] font-bold">
        search
        <p className="text-sm font-normal capitalize">
          {searchResult.length} results for "{searchValue}"
        </p>
      </div>
      <TopProductFilter />
      <SideFilter gender="all" />
      <SortBy />
      <ProdGridPaginated tableName="products_store" />
    </div>
  );
};

export default SearchPage;

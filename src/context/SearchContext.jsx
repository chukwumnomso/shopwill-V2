import { createContext, useContext, useEffect, useState, useRef } from "react";
import supabase from "../components/supabaseClient";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchLimit, setSearchLimit] = useState(5);
  const debounceTimer = useRef(null);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
      try {
        if (searchValue === "") {
          setSearchResult([]);
          return;
        }

        let query = supabase.from("products_store").select("*");

        if (searchValue) {
          query = query.or(
            `product_name.ilike.%${searchValue}%,category.ilike.${searchValue}%`,
          );
        }

        query = query.limit(searchLimit);

        const { data, error } = await query;

        if (!error && searchValue) {
          setSearchResult(data);
        }
      } catch (err) {
        console.error(err);
      }
    }, 500);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchValue, searchLimit]);

  return (
    <SearchContext.Provider
      value={{
        searchValue,
        setSearchValue,
        searchOpen,
        setSearchOpen,
        searchResult,
        searchLimit,
        setSearchLimit,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error("must be used in within search provider");
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useSearch, SearchProvider };

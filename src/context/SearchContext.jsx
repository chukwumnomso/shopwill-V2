import { createContext, useContext, useEffect, useState, useRef } from "react";
import supabase from "../components/supabaseClient";
import { useSearchParams } from "react-router-dom";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const debounceTimer = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("q") || "";

  const handleSearch = (newQuery) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      q: newQuery,
    });
    console.log(newQuery);
  };

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
      try {
        setIsLoading(true);
        if (searchQuery === "") {
          setSearchResult(null);
          return;
        }

        let query = supabase.from("products_store").select("*");

        if (searchQuery) {
          query = query.or(
            `product_name.ilike.${searchQuery}%,category.ilike.${searchQuery}%`,
          );
        }

        const { data, error } = await query;

        if (!error && searchQuery) {
          setSearchResult(data);
          console.log(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchQuery]);

  return (
    <SearchContext.Provider
      value={{
        // searchValue,
        // setSearchValue,
        searchOpen,
        setSearchOpen,
        searchResult,
        handleSearch,
        searchQuery,
        isLoading,
        // searchLimit,
        // setSearchLimit,
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

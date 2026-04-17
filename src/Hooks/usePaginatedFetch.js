import { useState, useEffect, useCallback } from "react";
import supabase from "../components/supabaseClient";
import { useSort } from "../context/SortContext";
import { useFilter } from "../context/FilterContext";
import { useNavBar } from "../context/NavBarContext";
import { useSearch } from "../context/SearchContext";

const usePaginatedFetch = (tableName, gender, itemsPerPage = 24) => {
  const { category } = useNavBar();
  const { sortConfig } = useSort();
  const { productType, currentPage, setCurrentPage } = useFilter();
  const [products, setProducts] = useState([]);

  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage - 1;

    let query = supabase
      .from(tableName)
      .select("*", { count: "exact" })
      .eq("gender", gender);
    if (productType && productType !== "all") {
      query = query.eq("product_type", productType);
    }
    if (category && category !== "all") {
      query = query.eq("category", category);
    }

    query = query
      .range(start, end)
      .order(sortConfig.field, { ascending: sortConfig.ascending });

    const { data, count, error } = await query;
    if (!error) {
      setProducts(data);
      setTotalCount(count);
      setTotalPages(Math.ceil(count / itemsPerPage));
    }

    setLoading(false);
  }, [
    currentPage,
    itemsPerPage,
    tableName,
    gender,
    productType,
    category,
    sortConfig.field,
    sortConfig.ascending,
  ]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    products,
    loading,
    currentPage,
    totalPages,
    totalCount,
    nextPage,
    prevPage,
    goToPage,
    sortConfig,
  };
};

// const usePaginatedFetch = (tableName, gender, itemsPerPage = 24) => {
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [totalCount, setTotalCount] = useState(0);
//   const [loading, setLoading] = useState(true);

//   const fetchProducts = useCallback(async () => {
//     setLoading(true);

//     const start = (currentPage - 1) * itemsPerPage;
//     const end = start + itemsPerPage - 1;

//     const { data, count, error } = await supabase
//       .from(tableName)
//       .select("*", { count: "exact" })
//       .eq("gender", gender)
//       .range(start, end)
//       .order("created_at", { ascending: false });

//     if (!error) {
//       setProducts(data);
//       setTotalCount(count);
//       setTotalPages(Math.ceil(count / itemsPerPage));
//     }

//     setLoading(false);
//   }, [currentPage, tableName, itemsPerPage, gender]);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   const nextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const goToPage = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   return {
//     products,
//     loading,
//     currentPage,
//     totalPages,
//     totalCount,
//     nextPage,
//     prevPage,
//     goToPage,
//   };
// };

export default usePaginatedFetch;

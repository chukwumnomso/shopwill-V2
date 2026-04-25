import { useCallback, useEffect, useState } from "react";
import { useUrlParams } from "../context/UrlParamsContext";

import supabase from "../components/supabaseClient";

export const usePaginatedFetch = (tableName, itemsPerPage = 8) => {
  const {
    isAscending,
    sort,
    asc,
    category,
    currentPage,
    searchQuery,
    gender,
    searchParams,
    setSearchParams,
    sizes,
  } = useUrlParams();
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2. FIX: Only force page 1 if the 'page' parameter is missing entirely
    if (!searchParams.get("page")) {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        page: 1,
      });
    }
  }, [searchParams, setSearchParams]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage - 1;

    let query = supabase.from(tableName).select("*", { count: "exact" });
    if (gender && gender !== "") query = query.eq("gender", gender);
    if (category && category.length > 0) query = query.in("category", category);
    if (sizes && sizes.length > 0) {
      query = query.overlaps("sizes", sizes);
    }
    if (searchQuery && !gender) {
      query = query.or(
        `product_name.ilike.%${searchQuery}%,category.ilike.${searchQuery}%`,
      );
    }

    query = query.range(start, end);

    if (asc && sort !== "") {
      const isAsc = String(asc) === "true" || isAscending === true;
      query = query.order(sort, { ascending: isAsc });
    }

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
    category,
    sizes,
    searchQuery,
    asc,
    sort,
    isAscending,
  ]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      // 3. Update the URL so the whole app knows the page changed
      setSearchParams({
        ...Object.fromEntries(searchParams),
        page: page,
      });
      // setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) goToPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) goToPage(currentPage - 1);
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
  };
};

// import { useState, useEffect, useCallback } from "react";
// import { useSearchParams } from "react-router-dom";
// import supabase from "../components/supabaseClient";
// import { useSort } from "../context/SortContext";
// import { useFilter } from "../context/FilterContext";
// // import { useNavBar } from "../context/NavBarContext";

// export const usePaginatedFetch = (tableName, gender, itemsPerPage = 24) => {
//   const { setCurrentPage, category } = useFilter();
//   const { isAscending, sort, asc } = useSort();
//   const [products, setProducts] = useState([]);
//   const [totalPages, setTotalPages] = useState(0);
//   const [totalCount, setTotalCount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const searchQuery = searchParams.get("q") || "";

//   const currentPage = Number(searchParams.get("page")) || 1;
//   useEffect(() => {
//     setSearchParams({
//       ...Object.fromEntries(searchParams),
//       page: Number(1),
//     });
//   }, [searchParams, setSearchParams]);

//   const fetchProducts = useCallback(async () => {
//     setLoading(true);

//     const start = (currentPage - 1) * itemsPerPage;
//     const end = start + itemsPerPage - 1;

//     let query = supabase.from(tableName).select("*", { count: "exact" });
//     if (gender && gender !== "") {
//       query = query.eq("gender", gender);
//     }

//     if (category && category !== "all") {
//       query = query.eq("category", category);
//     }

//     if (searchQuery && !gender) {
//       query = query.or(
//         `product_name.ilike.%${searchQuery}%,category.ilike.${searchQuery}%`,
//       );
//     }

//     query = query.range(start, end);

//     if (asc && sort !== "") {
//       const isAsc = String(asc) === "true" || isAscending === true;
//       query = query.order(sort, { ascending: isAsc });
//     }

//     const { data, count, error } = await query;
//     if (!error) {
//       setProducts(data);
//       setTotalCount(count);
//       setTotalPages(Math.ceil(count / itemsPerPage));
//     }

//     setLoading(false);
//   }, [
//     currentPage,
//     itemsPerPage,
//     tableName,
//     gender,
//     category,
//     searchQuery,
//     asc,
//     sort,
//     isAscending,
//   ]);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   const goToPage = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setSearchParams({
//         ...Object.fromEntries(searchParams),
//         page: page,
//       });
//       setCurrentPage(page);
//     }
//   };

//   const nextPage = () => {
//     if (currentPage < totalPages) {
//       goToPage(currentPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 1) {
//       goToPage(currentPage - 1);
//     }
//   };

//   // const goToPage = (page) => {
//   //   if (page >= 1 && page <= totalPages) {
//   //     setSearchParams({});
//   //   }
//   // };

//   return {
//     products,
//     loading,
//     currentPage,
//     totalPages,
//     totalCount,
//     nextPage,
//     prevPage,
//     goToPage,
//     // sortConfig,
//   };
// };

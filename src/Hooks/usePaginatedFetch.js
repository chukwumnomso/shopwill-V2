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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage - 1;
    try {
      setIsLoading(true);
      let query = supabase.from(tableName).select("*", { count: "exact" });
      if (gender && gender !== "") query = query.eq("gender", gender);
      if (category && category.length > 0)
        query = query.in("category", category);
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
      if (error) {
        throw new Error(error.message);
      }
      setProducts(data);
      setTotalCount(count);
      setTotalPages(Math.ceil(count / itemsPerPage));
    } catch (err) {
      console.error("caught error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
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
      const newParams = new URLSearchParams(searchParams);
      newParams.set("page", page);
      setSearchParams(newParams);
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
    isLoading,
    currentPage,
    totalPages,
    totalCount,
    nextPage,
    prevPage,
    goToPage,
    error,
  };
};

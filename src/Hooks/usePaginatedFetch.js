import { useState, useEffect, useCallback } from "react";
import supabase from "../components/supabaseClient";

const usePaginatedFetch = (tableName, itemsPerPage = 24) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage - 1;

    const { data, count, error } = await supabase
      .from(tableName)
      .select("*", { count: "exact" })
      .range(start, end)
      .order("created_at", { ascending: false });

    if (!error) {
      setProducts(data);
      setTotalCount(count);
      setTotalPages(Math.ceil(count / itemsPerPage));
    }

    setLoading(false);
  }, [currentPage, tableName, itemsPerPage]);

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
  };
};

export default usePaginatedFetch;

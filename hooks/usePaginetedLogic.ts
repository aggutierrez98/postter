import { useCallback, useEffect, useMemo, useState } from "react";

export const usePaginatedLogic = (valorCompare: any) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const valor = useMemo(() => {
    return valorCompare;
  }, [valorCompare]);

  useEffect(() => {
    if (loading) {
      setHasMore(false);
    }
  }, [loading]);

  useEffect(() => {
    if (valor) {
      setHasMore(true);
    }
  }, [valor]);

  const loadNextPage = useCallback(() => {
    setLoading(true);
    setPageNumber((prev) => prev + 1);
  }, []);

  return {
    loading,
    setLoading,
    hasMore,
    pageNumber,
    setPageNumber,
    loadNextPage,
  };
};

import { useQuery } from "@tanstack/react-query";

export const useFetchData = (queryKey, queryFn) => {
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn
  });
  return { data, isLoading };
};

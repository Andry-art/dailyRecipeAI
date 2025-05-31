import { QUERY_KEYS } from "@/constants/QueryKeys";
import { fetchFromAsyncStorage } from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";

export const useGetSaved = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.SavedItems],
    queryFn: fetchFromAsyncStorage,
    staleTime: 0,
  });

  return query;
};

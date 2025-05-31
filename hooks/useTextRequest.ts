import { textRequest } from "@/api/textRequest";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SparkMD5 from "spark-md5";

export const useTextRequest = (textIngredients: string) => {
  const queryClient = useQueryClient();

  const hash = SparkMD5.hash(textIngredients);
  const queryKey = [QUERY_KEYS.PhotoRequest, hash];
  const cached = queryClient.getQueryData(queryKey);

  const query = useQuery({
    queryKey: [QUERY_KEYS.PhotoRequest, hash],
    queryFn: ({ signal }) => textRequest(textIngredients, signal),
    enabled: !!textIngredients && !cached,
  });

  return query;
};

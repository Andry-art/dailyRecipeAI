import { fullDescriptionRequest } from "@/api/fullDescriptionRequest";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SparkMD5 from "spark-md5";

export const useFullDescription = (item: string, title: string) => {
  const queryClient = useQueryClient();

  const stableKey = SparkMD5.hash(
    typeof item === "string" ? item : JSON.stringify(item)
  );
  const stableTitle = SparkMD5.hash(title);
  const queryKey = [QUERY_KEYS.FullDescription, stableKey, stableTitle];
  const cached = queryClient.getQueryData(queryKey);

  const query = useQuery({
    queryKey: [QUERY_KEYS.FullDescription, stableKey, stableTitle],
    queryFn: ({ signal }) => fullDescriptionRequest(item, signal),
    enabled: !!stableTitle && !cached,
    staleTime: Infinity,
  });

  return query;
};

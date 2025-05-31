import { photoRequest } from "@/api/photoRequest";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SparkMD5 from "spark-md5";

export const usePhotoRequest = (imageBase64: string) => {
  const queryClient = useQueryClient();

  const hash = SparkMD5.hash(imageBase64);
  const queryKey = [QUERY_KEYS.PhotoRequest, hash];
  const cached = queryClient.getQueryData(queryKey);

  const query = useQuery({
    queryKey: [QUERY_KEYS.PhotoRequest, hash],
    queryFn: ({ signal }) => photoRequest(imageBase64, signal),
    enabled: !!imageBase64 && !cached,
  });

  return query;
};

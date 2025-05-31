import { getImageAI } from "@/api/getImageAI";
import { QUERY_KEYS } from "@/constants/QueryKeys";
import { useQuery } from "@tanstack/react-query";

export const useMealImage = (
  title: string,
  product: string,
  shouldFetch: boolean
) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.MealImage, title],
    queryFn: ({ signal }) => getImageAI(title, product, signal),
    enabled: shouldFetch,
    staleTime: 0,
  });

  return query;
};

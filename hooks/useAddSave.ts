import { QUERY_KEYS } from "@/constants/QueryKeys";
import { TRecipeResponse } from "@/constants/types";
import { addNewSaveItem } from "@/utils/storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddSave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newValue: TRecipeResponse) => {
      return await addNewSaveItem(newValue);
    },
    onSuccess: async (data) => {
      queryClient.setQueryData([QUERY_KEYS.SavedItems], data);
    },
  });
};

import Skeleton from "@/components/Skeleton/Skeleton";
import { memo } from "react";

const loadingSkeleton = new Array(4).fill(0);

const IngredientceSkeleton = () => {
  return (
    <>
      {loadingSkeleton.map((_, i) => (
        <Skeleton key={i} isLoading height={16} width={150} mb={6} />
      ))}
    </>
  );
};

export default memo(IngredientceSkeleton);

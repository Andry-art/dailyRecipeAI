import Skeleton from "@/components/Skeleton/Skeleton";
import { StyleSheet, View } from "react-native";

const loadingSkeleton = new Array(4).fill(0);

const HowCookSkeleton = () => {
  return (
    <>
      {loadingSkeleton.map((_, i) => (
        <View key={i} style={styles.container}>
          <Skeleton isLoading height={15} mb={8} />
          <Skeleton isLoading height={15} mb={8} />
          <Skeleton isLoading height={15} mb={8} />
          <Skeleton isLoading height={15} mb={8} />
          <Skeleton isLoading width={200} height={15} mb={8} />
        </View>
      ))}
    </>
  );
};

export default HowCookSkeleton;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
});

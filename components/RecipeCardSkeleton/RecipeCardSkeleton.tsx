import Skeleton from "@/components/Skeleton/Skeleton";
import { COLORS } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";

const loadingSkeleton = new Array(4).fill(0);

const RecipeCardSkeleton = () => {
  return (
    <>
      {loadingSkeleton.map((_, i) => (
        <View key={i} style={{ marginBottom: 16 }}>
          <View style={styles.containerSkeleton}>
            <View style={styles.titleContainer}>
              <Skeleton isLoading width={90} height={15} />
              <Skeleton isLoading width={40} height={40} br={8} />
            </View>

            <View style={styles.descriptionContainer}>
              <Skeleton isLoading width={150} height={15} mb={8} />
              <Skeleton isLoading height={15} mb={6} />
              <Skeleton isLoading height={15} mb={6} />
            </View>

            <View>
              <Skeleton isLoading width={150} height={15} mb={8} />
              <Skeleton isLoading height={15} mb={6} />
              <Skeleton isLoading height={15} mb={6} />
            </View>
          </View>
        </View>
      ))}
    </>
  );
};

export default RecipeCardSkeleton;

const styles = StyleSheet.create({
  containerSkeleton: {
    backgroundColor: COLORS.secondary,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: 16,
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  saveContaner: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(31, 31, 31, 0.2)",
  },
  descriptionContainer: {
    marginBottom: 8,
  },
});

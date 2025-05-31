import PhotoDetector from "@/app/screens/PhotoDetector/PhotoDetector";
import { Host } from "react-native-portalize";

const MainPage = () => {
  return (
    <Host>
      <PhotoDetector />
    </Host>
  );
};

export default MainPage;

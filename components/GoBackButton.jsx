import { BackSvg } from "../assets/svg/BackSvg";
import { TouchableOpacity } from "react-native";

export const GoBackButton = ({ navigation }) => {
  const handleGoBack = () => {
    if (navigation) {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity style={{ marginLeft: 16 }} onPress={handleGoBack}>
      <BackSvg />
    </TouchableOpacity>
  );
};

import { LogoutSvg } from "../assets/svg/LogoutSvg";
import { TouchableOpacity } from "react-native";

export const LogoutButton = () => {
  return (
    <TouchableOpacity
      style={{ marginRight: 16 }}
      onPress={() => handleLogout()}
    >
      <LogoutSvg />
    </TouchableOpacity>
  );
};

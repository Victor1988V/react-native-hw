import { BasketTabSvg } from "../assets/svg/BasketTabSvg";
import { TouchableOpacity } from "react-native";

export const DeleteButton = () => {
  return (
    <TouchableOpacity onPress={() => handleDelete()}>
      <BasketTabSvg />
    </TouchableOpacity>
  );
};

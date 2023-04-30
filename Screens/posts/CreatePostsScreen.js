import { Camera } from "expo-camera";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
const initialState = {
  photo: null,
  name: null,
  place: null,
};

const initialStateFocus = {
  photo: null,
  name: null,
  place: null,
};

const CreatePostsScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [isFocused, setIsFocused] = useState(initialStateFocus);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const formCompleted = state.photo && state.name && state.place;

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  const handleInputFocus = (input) => {
    setIsFocused({
      ...isFocused,
      [input]: true,
    });
    setIsShowKeyboard(true);
  };
  const handleInputBlur = (input) => {
    setIsFocused({
      ...isFocused,
      [input]: false,
    });
  };

  const onSubmit = () => {
    setState(initialState);
    navigation.navigate("Публикации");
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <View style={styles.form}>
          {!isShowKeyboard && <Camera style={styles.camera}></Camera>}
          <TouchableOpacity style={styles.loadButton}>
            <Text style={styles.buttonTitle}>
              {state.photo ? "Редактировать фото" : "Загрузите фото"}
            </Text>
          </TouchableOpacity>
          <View>
            <TextInput
              style={{
                ...styles.input,
                fontFamily: state.name ? "Roboto-Medium" : "Roboto-Regular",
                borderColor: "#E8E8E8",
              }}
              placeholder="Название..."
              placeholderTextColor="#BDBDBD"
              onFocus={() => {
                handleInputFocus("name");
              }}
              onBlur={() => {
                handleInputBlur("name");
              }}
              value={state.name}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, name: value }))
              }
            />

            <TouchableOpacity
              style={{
                ...styles.input,
                fontFamily: "Roboto-Regular",
                borderColor: "#E8E8E8",
              }}
            >
              <Text>
                <Feather name="map-pin" size={24} color="#BDBDBD" />
              </Text>
              <Text style={{ ...styles.buttonTitle, marginLeft: 8 }}>
                Местность...
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                ...styles.button,
                backgroundColor: formCompleted ? "#FF6C00" : "#F6F6F6",
              }}
              onPress={onSubmit}
            >
              <Text style={styles.buttonTitle}>Опубликовать</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopWidth: 0.5,
    borderTopColor: "#b3b3b3",
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  camera: {
    width: "100%",
    height: 240,
    marginBottom: 8,
    color: "red",
    backgroundColor: "#E8E8E8",
    borderRadius: 40,
  },
  loadButton: {
    marginBottom: 48,
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    marginBottom: 32,
    paddingBottom: 15,
    color: "#212121",
    flexDirection: "row",
  },
  button: {
    borderRadius: 100,
    height: 51,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#BDBDBD",
  },
});

export default CreatePostsScreen;

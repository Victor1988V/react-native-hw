import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  View,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  Platform,
  Dimensions,
  Image,
} from "react-native";

const RegistrationScreen = ({ navigation }) => {
  console.log(Platform.OS);
  const initialState = {
    username: "",
    email: "",
    password: "",
  };

  const initialStateFocus = {
    username: false,
    email: false,
    password: false,
  };

  const [avatar, setAvatar] = useState(true);
  const [showPassword, setShowPassword] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isFocused, setIsFocused] = useState(initialStateFocus);

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

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      keyboardHide
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    if (isShowKeyboard) {
    }
  }, [isShowKeyboard]);

  const handleSubmit = () => {
    console.log("Form data:", state);
    // reset();
    setState({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ImageBackground
        resizeMode="cover"
        source={require("../../assets/img/bg.jpg")}
        style={styles.background}
      >
        <StatusBar style="auto" />
        <View style={styles.parentContainer}>
          {/* <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyContainer}
          > */}
          <View
            style={{
              ...styles.form,
              paddingBottom: isShowKeyboard ? 16 : 78,
            }}
          >
            <View style={styles.avatar}>
              {avatar ? (
                <>
                  <Image
                    style={styles.avatarImage}
                    source={require("../../assets/img/avatar.jpg")}
                  />
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.iconBlock}
                    onPress={() => setAvatar(false)}
                  >
                    <Ionicons
                      style={styles.closeIcon}
                      name="md-close-circle-outline"
                      size={25}
                      color="#E8E8E8"
                    />
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  style={styles.iconBlock}
                  activeOpacity={0.8}
                  onPress={() => setAvatar(true)}
                >
                  <Ionicons
                    style={styles.addIcon}
                    name="md-add-circle-outline"
                    size={25}
                    color="#FF6C00"
                  />
                </TouchableOpacity>
              )}
            </View>

            <Text style={styles.h2}>Регистрация</Text>
            <TextInput
              style={{
                ...styles.input,
                borderColor: isFocused.username ? "#FF6C00" : "#E8E8E8",
                backgroundColor: isFocused.username ? "#fff" : "#F6F6F6",
              }}
              placeholder="Логин"
              placeholderTextColor="#BDBDBD"
              value={state.username}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, username: value }))
              }
              onFocus={() => {
                handleInputFocus("username");
              }}
              onBlur={() => {
                handleInputBlur("username");
              }}
            />
            <TextInput
              style={{
                ...styles.input,
                borderColor: isFocused.email ? "#FF6C00" : "#E8E8E8",
                backgroundColor: isFocused.email ? "#fff" : "#F6F6F6",
              }}
              placeholder="Адрес электронной почты"
              placeholderTextColor="#BDBDBD"
              value={state.email}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, email: value }))
              }
              autoCapitalize="none"
              keyboardType="email-address"
              onFocus={() => {
                handleInputFocus("email");
              }}
              onBlur={() => {
                handleInputBlur("email");
              }}
            />
            <View>
              <TextInput
                style={{
                  ...styles.input,
                  marginBottom: 0,
                  borderColor: isFocused.password ? "#FF6C00" : "#E8E8E8",
                  backgroundColor: isFocused.password ? "#fff" : "#F6F6F6",
                }}
                placeholder="Пароль"
                placeholderTextColor="#BDBDBD"
                value={state.password}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
                secureTextEntry={showPassword}
                onFocus={() => {
                  handleInputFocus("password");
                }}
                onBlur={() => {
                  handleInputBlur("password");
                }}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.buttonShowPassword}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.titleShowPassword}>
                  {showPassword ? "Показать" : "Скрыть"}
                </Text>
              </TouchableOpacity>
            </View>
            {!isShowKeyboard && (
              <>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleSubmit}
                  activeOpacity={0.8}
                >
                  <Text style={styles.buttonText}>Зарегистрироваться</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.linkText}>Уже есть аккаунт? Войти</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          {/* </KeyboardAvoidingView> */}
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  keyContainer: {
    flex: 1,
    // width: "100%",
  },
  background: {
    flex: 1,
    // width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  parentContainer: {
    position: "relative",
    height: "100%",
    width: "100%",
  },
  avatar: {
    position: "absolute",
    top: -60,
    left: Dimensions.get("window").width / 2 - 60,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    zIndex: 1,
  },
  avatarImage: {
    borderRadius: 16,
  },
  closeIcon: {
    position: "absolute",
    right: -13.5,
    bottom: 9,
    zIndex: 2,
  },
  addIcon: {
    top: 84,
    left: 108,
    zIndex: 2,
  },
  form: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 92,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignSelf: "flex-end",
  },
  input: {
    minWidth: "100%",
    height: 50,
    textAlignVertical: "center",
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingVertical: 15,
    // backgroundColor: "#F6F6F6",
    borderWidth: 1,
    // borderColor: "#E8E8E8",
    borderRadius: 8,
    fontFamily: "Roboto-Regular",
    color: "#000",
    fontSize: 16,
  },
  h2: {
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
    fontWeight: 500,
    fontSize: 30,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
  },
  button: {
    flex: -1,
    justifyContent: "center",
    alignItems: "center",
    width: 343,
    height: 50,
    marginTop: 27,
    borderWidth: 1,
    borderRadius: 100,
    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
        borderColor: "#FF6C00",
      },
      android: {
        backgroundColor: "#FF6C00",
        borderColor: "transparent",
      },
    }),
  },
  buttonShowPassword: {
    position: "absolute",
    right: 16,
    top: 14,
  },
  titleShowPassword: {
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
    fontSize: 16,
  },
  buttonText: {
    color: Platform.OS === "ios" ? "#fff" : "#fff",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    includeFontPadding: false,
  },
  linkText: {
    marginTop: 16,
    color: "#1B4371",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Roboto-Regular",
  },
});

export default RegistrationScreen;

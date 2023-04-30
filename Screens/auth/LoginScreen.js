import React, { useState, useEffect } from "react";
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
} from "react-native";

const LoginScreen = ({ navigation }) => {
  console.log("navigation:", navigation);
  console.log(Platform.OS);
  const initialState = {
    email: "",
    password: "",
  };

  const initialStateFocus = {
    email: false,
    password: false,
  };

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
    setState({
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
        <View style={styles.parentContainer}>
          {/* <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyContainer}
          > */}
          <View
            style={{
              ...styles.form,
              paddingBottom: isShowKeyboard ? 16 : 144,
            }}
          >
            <Text style={styles.h2}>Войти</Text>

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
                  <Text style={styles.buttonText}>Войти</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Registration")}
                >
                  <Text style={styles.linkText}>
                    Нет аккаунта? Зарегистрироваться
                  </Text>
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
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  parentContainer: {
    position: "relative",
    height: "100%",
    width: "100%",
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
    paddingTop: 32,
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
    borderWidth: 1,
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

export default LoginScreen;

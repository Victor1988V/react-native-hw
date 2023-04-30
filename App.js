import React, { useState, useEffect, useCallback } from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Platform, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";

export default function App() {
  console.log(Platform.OS);
  const routing = useRoute(true);
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
          "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
          "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <View style={styles.container} onLayout={onLayoutRootView}>
        {routing}
        <StatusBar style="dark" backgroundColor="#fff" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Roboto-Medium",
    fontSize: 18,
    fontWeight: "500",
  },
});

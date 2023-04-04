<script src="http://localhost:8097"></script>;

import React, { useCallback, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { View, StyleSheet } from "react-native";

import { AppContext } from "./context/App.Context";
import { useRoute } from "./router";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const routing = useRoute(isAuth);

  const loadFonts = async () => {
    await Font.loadAsync({
      "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
      "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
      "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    });
    setIsReady(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <AppContext.Provider value={{ isAuth, setIsAuth }}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <NavigationContainer>{routing}</NavigationContainer>
      </View>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

<script src="http://localhost:8097"></script>;

import React, { useCallback, useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { View, StyleSheet } from "react-native";

import { RegistrationScreen } from "./Screens/Auth/RegistrationScreen";
import { LoginScreen } from "./Screens/Auth/LoginScreen";
import { PostsScreen } from "./Screens/MainScreen/PostsScreen";
import { CreatePostsScreen } from "./Screens/MainScreen/CreatePostsScreen";
import { ProfileScreen } from "./Screens/MainScreen/ProfileScreen";

SplashScreen.preventAutoHideAsync();

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator>
      <MainTab.Screen
        options={{ headerShown: false }}
        name="Posts"
        component={PostsScreen}
      ></MainTab.Screen>
      <MainTab.Screen
        options={{ headerShown: false }}
        name="CreatePosts"
        component={CreatePostsScreen}
      ></MainTab.Screen>
      <MainTab.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={ProfileScreen}
      ></MainTab.Screen>
    </MainTab.Navigator>
  );
};

export default function App() {
  const [isReady, setIsReady] = useState(false);

  const routing = useRoute(null);

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
    <View style={styles.container} onLayout={onLayoutRootView}>
      <NavigationContainer>{routing}</NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

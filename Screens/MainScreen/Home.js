import React, { useContext } from "react";

import { View, TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { PostsScreen } from "./PostsScreen";
import { CreatePostsScreen } from "./CreatePostsScreen";
import { ProfileScreen } from "./ProfileScreen";

import { AppContext } from "../../context/App.Context";

// icons import
import { Feather } from "@expo/vector-icons";

const MainTab = createBottomTabNavigator();

export const Home = ({ navigation }) => {
  const { setIsAuth } = useContext(AppContext);

  return (
    <MainTab.Navigator tabBarOptions={{ showLabel: false }}>
      <MainTab.Screen
        options={{
          title: "Публикации",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Roboto-Bold",
            fontSize: 17,
            lineHeight: 22,
          },
          headerStyle: {
            borderBottomColor: "#e5e5e5",
            borderBottomWidth: 1,
          },
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ paddingRight: 16 }}
              onPress={() => setIsAuth(false)}
            >
              <Feather name="log-out" size={24} color="#bdbdbd" />
            </TouchableOpacity>
          ),
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#212121",
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={{
                ...styles.icon,
                backgroundColor: focused ? "#ff6c00" : "#fff",
              }}
            >
              <Feather name="grid" size={size} color={color} />
            </View>
          ),
        }}
        name="Posts"
        component={PostsScreen}
      ></MainTab.Screen>
      <MainTab.Screen
        options={{
          title: "Создать публикацию",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Roboto-Bold",
            fontSize: 17,
            lineHeight: 22,
          },
          headerStyle: {
            borderBottomColor: "#e5e5e5",
            borderBottomWidth: 1,
          },
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ paddingLeft: 20 }}
              onPress={() => navigation.navigate("Posts")}
            >
              <Feather name="arrow-left" size={24} color="#212121" />
            </TouchableOpacity>
          ),
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#212121",
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={{
                ...styles.icon,
                backgroundColor: focused ? "#ff6c00" : "#fff",
              }}
            >
              <Feather name="plus" size={size} color={color} />
            </View>
          ),
        }}
        name="CreatePosts"
        component={CreatePostsScreen}
      ></MainTab.Screen>
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#212121",
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={{
                ...styles.icon,
                backgroundColor: focused ? "#ff6c00" : "#fff",
              }}
            >
              <Feather name="user" size={size} color={color} />
            </View>
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      ></MainTab.Screen>
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    borderRadius: 20,
  },
});

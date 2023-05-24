import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { DefaultPostsScreen } from "../NestedScreens/DefaultPostsScreen";
import { MapScreen } from "../NestedScreens/MapScreen";
import { CommentsScreen } from "../NestedScreens/CommentsScreen";

import { AppContext } from "../../context/App.Context";

import { Feather } from "@expo/vector-icons";

const NestedScreen = createStackNavigator();

export const PostsScreen = () => {
  const { setIsAuth } = useContext(AppContext);

  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultPostsScreen}
        options={{
          headerShow: false,
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
        }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerShow: false,
          title: "Комментарии",
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
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerShow: false,
          title: "Карта",
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
        }}
      />
    </NestedScreen.Navigator>
  );
};

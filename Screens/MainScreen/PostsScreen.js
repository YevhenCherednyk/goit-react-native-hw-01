import React from "react";
import { moduleName } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { DefaultPostsScreen } from "../NestedScreens/DefaultPostsScreen";
import { MapScreen } from "../NestedScreens/MapScreen";
import { CommentsScreen } from "../NestedScreens/CommentsScreen";

const NestedScreen = createStackNavigator();

export const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultPostsScreen}
        options={{ headerShow: false }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{ tittle: "Комментарии" }}
      />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};

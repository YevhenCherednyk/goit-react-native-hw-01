import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export const PostsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Image
          source={require("../../assets/images/user.png")}
          style={styles.avatarImage}
        />
        <View>
          <Text style={styles.name}> Natali Romanova </Text>
          <Text style={styles.email}> email@example.com </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
  },

  info: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
  },

  name: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },

  email: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
});

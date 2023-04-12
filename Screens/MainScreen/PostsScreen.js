import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";

export const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  console.log(route.params);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  // console.log("posts", posts);

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
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
      <FlatList
        style={styles.postsList}
        data={posts}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={styles.postWrapper}>
            <Image source={{ uri: item.photoPath }} style={styles.postPhoto} />
            <Text>{item.postTitle}</Text>
            <Text>{item.postLocation}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
  },

  userContainer: {
    display: "flex",
    marginBottom: 32,
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

  postsList: {
    display: "flex",
    flexDirection: "column",
    gap: 32,
  },

  postWrapper: {
    marginBottom: 32,
  },

  postPhoto: {
    height: 240,
    width: "100%",
    borderRadius: 8,
  },
});

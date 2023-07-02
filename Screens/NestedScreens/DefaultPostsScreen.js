import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { collection, onSnapshot } from "firebase/firestore";

import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { db } from "../../firebase/config";

export const DefaultPostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);

  const { login, email, avatar } = useSelector((state) => state.auth);

  const getAllPosts = async () => {
    await onSnapshot(collection(db, "posts"), (snapshots) => {
      setPosts(snapshots.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <View style={styles.info}>
          <Image source={{ uri: avatar }} style={styles.avatarImage} />
          <View>
            <Text style={styles.name}> {login} </Text>
            <Text style={styles.email}> {email} </Text>
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
            <Text style={styles.postTitle}>{item.postTitle}</Text>
            <View style={styles.descriptionWrapper}>
              <TouchableOpacity
                style={styles.commentsWrapper}
                onPress={() =>
                  navigation.navigate("Comments", {
                    postId: item.id,
                    photo: item.photoPath,
                  })
                }
                activeOpacity={0.8}
              >
                <Feather name="message-circle" size={24} color="#BDBDBD" />
                <Text style={styles.commentsNumber}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.locationWrapper}
                onPress={() =>
                  navigation.navigate("Map", { location: item.location })
                }
                activeOpacity={0.8}
              >
                <Feather name="map-pin" size={24} color="#BDBDBD" />
                <Text style={styles.locationName}>{item.postLocation}</Text>
              </TouchableOpacity>
            </View>
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
    marginBottom: 8,
    width: "100%",
    borderRadius: 8,
  },

  postTitle: {
    marginBottom: 11,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },

  descriptionWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  commentsWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  commentsNumber: {
    marginLeft: 6,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },

  locationWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  locationName: {
    marginLeft: 4,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
    textDecorationColor: "#212121",
  },
});

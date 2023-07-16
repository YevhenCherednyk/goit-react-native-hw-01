import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import * as ImagePicker from "expo-image-picker";

import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { AntDesign, Feather, Octicons } from "@expo/vector-icons";

import { authSignOutUser } from "../../redux/auth/operations";
import { db } from "../../firebase/config";

const initialState = {
  login: "",
  email: "",
  password: "",
  avatar: "",
};

export const ProfileScreen = ({ navigation }) => {
  const [plusIcon, setPlusIcon] = useState("plus");
  const [userPosts, setUserPosts] = useState([]);
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();
  const { login, avatar, userId } = useSelector((state) => state.auth);

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    const postsRef = collection(db, "posts");
    const postsQuery = query(postsRef, where("userId", "==", userId));

    await onSnapshot(postsQuery, (snapshot) => {
      setUserPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  const signOut = () => {
    dispatch(authSignOutUser);
  };

  const plusIconChange = () => {
    if (plusIcon === "plus") {
      setPlusIcon("close");
    }
    setPlusIcon("plus");
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const userImgUri = result.assets[0].uri;

    if (!result.canceled) {
      // setImage(userImgUri);
      setState((prevState) => ({ ...prevState, avatar: userImgUri }));
      setPlusIcon("close");
    }
  };

  const deleteImage = () => {
    // setImage(null);
    setState((prevState) => ({ ...prevState, avatar: null }));
    setPlusIcon("plus");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("../../assets/images/BG.jpg")}
      >
        <View style={styles.wrapper}>
          <View style={styles.avatarWrap}>
            <View style={styles.photoWrap}>
              {avatar && (
                <Image source={{ uri: avatar }} style={styles.image} />
              )}
            </View>
            <TouchableOpacity activeOpacity={0.8}>
              {plusIcon === "plus" ? (
                <AntDesign
                  name="pluscircleo"
                  style={{ ...styles.plusIcon, color: "#FF6C00" }}
                  onPress={pickImage}
                />
              ) : (
                <AntDesign
                  name="closecircleo"
                  style={{ ...styles.plusIcon, color: "#E8E8E8" }}
                  onPress={deleteImage}
                />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{ position: "absolute", right: 16, top: 22 }}
            onPress={signOut}
          >
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          {login && <Text style={styles.pageTitle}>{login}</Text>}
          <SafeAreaView style={styles.listWrapper}>
            <FlatList
              style={{ marginBottom: 32 }}
              data={userPosts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <View style={styles.listWrapper}>
                    <View>
                      <Image
                        style={styles.picture}
                        source={{ uri: item.photoPath }}
                      />
                    </View>
                    <Text style={styles.title}>{item.postTitle}</Text>
                    <View style={styles.descrWraper}>
                      {/* <View style={styles.commentsWrapper}>
                      <View style={styles.commentsWrapper}>
                        <Feather
                          style={styles.commentsIcon}
                          name="message-circle"
                          size={24}
                          color="#FF6C00"
                        />
                        <Text style={styles.commentsCalc}>{item.comments}</Text>
                      </View>
                      <View
                        style={{ ...styles.commentsWrapper, marginLeft: 24 }}
                      >
                        <Feather
                          style={styles.commentsIcon}
                          name="thumbs-up"
                          size={24}
                          color="#FF6C00"
                        />
                        <Text style={styles.commentsCalc}>{item.likes}</Text>
                      </View>
                    </View> */}
                      <View style={styles.locationWrapper}>
                        <Octicons name="location" size={24} color="#BDBDBD" />
                        <Text style={styles.locationText}>
                          {item.postLocation}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  image: {
    flex: 1,
    resizeMode: "cover",
  },

  wrapper: {
    flex: 1,
    position: "relative",
    marginTop: 145,
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
  },

  avatarWrap: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 16,
    position: "absolute",
    top: -60,
    right: "50%",
    transform: [{ translateX: 40 }],
  },

  photoWrap: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    overflow: "hidden",
  },

  plusIcon: {
    fontSize: 25,
    position: "absolute",
    top: -40,
    right: 0,
    transform: [{ translateX: 12 }],
    borderRadius: 50,
    backgroundColor: "#ffffff",
  },

  pageTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    textAlign: "center",

    marginBottom: 32,
  },

  listWrapper: {
    backgroundColor: "#fff",
    marginBottom: 32,
  },

  picture: {
    height: 240,
    width: "100%",
    borderRadius: 8,
    marginBottom: 8,
  },

  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginBottom: 8,
  },

  descrWraper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  commentsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: "auto",
  },
  commentsIcon: {
    marginRight: 6,
  },

  commentsCalc: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },

  locationWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  locationText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    textDecorationColor: "#212121",
    marginLeft: 6,
  },
});

import React, { useState, useContext } from "react";

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

import { AppContext } from "../../context/App.Context";

const posts = [
  {
    id: "1",
    img: require("../../assets/images/postImg1.png"),
    title: "Лес",
    comments: 8,
    likes: 153,
    location: "Ukraine",
  },
  {
    id: "2",
    img: require("../../assets/images/postImg2.png"),
    title: "Закат на Черном море",
    comments: 3,
    likes: 200,
    location: "Ukraine",
  },
  {
    id: "3",
    img: require("../../assets/images/postImg3.png"),
    title: "Старый домик в Венеции",
    comments: 50,
    likes: 200,
    location: "Italy",
  },
];

export const ProfileScreen = ({ navigation }) => {
  const [plusIcon, setPlusIcon] = useState("plus");
  const [image, setImage] = useState(null);
  const { setIsAuth } = useContext(AppContext);

  const plusIconChange = () => {
    if (plusIcon === "plus") {
      console.log("image");
      setPlusIcon("close");
    }
    setImage(null);
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
              {image && <Image source={{ uri: image }} style={styles.image} />}
            </View>
            <TouchableOpacity activeOpacity={0.8}>
              {plusIcon === "plus" ? (
                <AntDesign
                  name="pluscircleo"
                  style={{ ...styles.plusIcon, color: "#FF6C00" }}
                  onPress={plusIconChange}
                />
              ) : (
                <AntDesign
                  name="closecircleo"
                  style={{ ...styles.plusIcon, color: "#E8E8E8" }}
                  onPress={plusIconChange}
                />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => setIsAuth(false)}
            activeOpacity={0.8}
            style={{ position: "absolute", right: 16, top: 22 }}
          >
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Natali Romanova</Text>
          <SafeAreaView style={styles.listWrapper}>
            <FlatList
              style={{ marginBottom: 32 }}
              data={posts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <View style={styles.listWrapper}>
                    <View>
                      <Image style={styles.picture} source={item.img} />
                    </View>
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.descrWraper}>
                      <View style={styles.commentsWrapper}>
                        <View style={styles.commentsWrapper}>
                          <Feather
                            style={styles.commentsIcon}
                            name="message-circle"
                            size={24}
                            color="#FF6C00"
                          />
                          <Text style={styles.commentsCalc}>
                            {item.comments}
                          </Text>
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
                      </View>
                      <View style={styles.locationWrapper}>
                        <Octicons name="location" size={24} color="#BDBDBD" />
                        <Text style={styles.locationText}>{item.location}</Text>
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

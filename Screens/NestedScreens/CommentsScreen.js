import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  FlatList,
} from "react-native";

import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import { db } from "../../firebase/config";

import { format } from "date-fns";

export const CommentsScreen = ({ route }) => {
  const { postId, photo } = route.params;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);

  const { login, avatar } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllComments();
  }, []);

  const uploadCommentToServer = async () => {
    const date = new Date().toString();
    const postDate = format(Date.parse(date), "dd LLLL, yyyy | HH:mm");
    await addDoc(collection(db, "posts", postId, "comments"), {
      comment,
      login,
      avatar,
      postDate,
    });
  };

  const getAllComments = async () => {
    await onSnapshot(
      collection(db, "posts", postId, "comments"),
      (snapshot) => {
        setAllComments(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      }
    );
  };

  const keyboardHide = () => {
    setIsShownKeyboard(false);
    Keyboard.dismiss();
  };

  const createComment = () => {
    uploadCommentToServer();
    keyboardHide();
    setComment("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={{ uri: photo }} />
        </View>

        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View style={styles.commentWrapper}>
              <View style={styles.authorImageWrapper}>
                <Image
                  style={styles.authorImage}
                  source={{ uri: item.avatar }}
                />
              </View>
              <View style={styles.textWrapper}>
                <Text style={styles.text}>{item.comment}</Text>
                <Text style={styles.date}>{item.postDate}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Комментировать..."
            placeholderTextColor="#BDBDBD"
            value={comment}
            onChangeText={(value) => setComment(value)}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.iconWrapper}
            onPress={() => {
              createComment();
            }}
          >
            <AntDesign
              style={[
                styles.icon,
                { transform: [{ translateX: -12 }, { translateY: -12 }] },
              ]}
              name="arrowup"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  wrapper: {
    flex: 1,
    padding: 16,
    paddingTop: 32,
    paddingBottom: 32,
  },
  imageWrapper: {
    width: "100%",
    height: 240,
    marginBottom: 32,
    backgroundColor: "#BDBDBD",
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    backgroundColor: "#FF6C00",
  },
  listWrapper: {
    marginTop: 32,
  },
  commentWrapper: {
    flexDirection: "row",
    marginBottom: 24,
  },
  authorImageWrapper: {
    backgroundColor: "#FF6C00",
    marginRight: 16,
    width: 28,
    height: 28,
    borderRadius: 28 / 2,
  },
  authorImage: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  textWrapper: {
    padding: 16,
    backgroundColor: "#ece8e8",

    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  text: {
    alignSelf: "flex-start",
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
    marginBottom: 8,
  },
  date: {
    alignSelf: "flex-end",
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
  },
  inputWrapper: {
    position: "relative",
    height: 50,
    width: "100%",
    paddingTop: 16,
    paddingBottom: 16,
  },
  input: {
    height: 50,
    borderRadius: 100,
    padding: 16,
    backgroundColor: "#F6F6F6",
    color: "#BDBDBD",
  },
  iconWrapper: {
    position: "absolute",
    top: 24,
    right: 8,
    width: 34,
    height: 34,
    borderRadius: 34 / 2,
    backgroundColor: "#FF6C00",
  },
  icon: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
});

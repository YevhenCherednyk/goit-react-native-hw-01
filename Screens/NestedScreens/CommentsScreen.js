import React from "react";

import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

const comments = [
  {
    id: "1",
    author: "name",
    message: "comment 1",
    postedDate: "24.05.2023",
  },
  {
    id: "2",
    author: "name",
    message: "comment 2",
    postedDate: "24.05.2023",
  },
  {
    id: "3",
    author: "name",
    message: "comment 3",
    postedDate: "24.05.2023",
  },
  {
    id: "4",
    author: "name",
    message: "comment 4",
    postedDate: "24.05.2023",
  },
  {
    id: "5",
    author: "name",
    message: "comment 5",
    postedDate: "24.05.2023",
  },
];

export const CommentsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <ScrollView>
          <View style={styles.imageWrapper}>
            <Image style={styles.image} />
          </View>

          <SafeAreaView style={styles.listWrapper}>
            <ScrollView>
              {comments.map((item) => (
                <View style={styles.commentWrapper} key={item.id}>
                  <View style={styles.authorImageWrapper}>
                    <Image style={styles.authorImage} />
                  </View>
                  <View style={styles.textWrapper}>
                    <Text style={styles.text}>{item.message}</Text>
                    <Text style={styles.date}>{item.postedDate}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </SafeAreaView>
        </ScrollView>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Комментировать..."
            placeholderTextColor="#BDBDBD"
          />
          <View style={styles.iconWrapper}>
            <AntDesign
              style={[
                styles.icon,
                { transform: [{ translateX: -12 }, { translateY: -12 }] },
              ]}
              name="arrowup"
              size={24}
              color="#fff"
            />
          </View>
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

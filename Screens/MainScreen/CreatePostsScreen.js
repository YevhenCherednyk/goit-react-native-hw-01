import React, { useState } from "react";

import {
  View,
  Text,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from "react-native";

import { FontAwesome, Feather } from "@expo/vector-icons";

const initialState = {
  image: null,
  title: "",
  location: "",
};

export const CreatePostsScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);

  const inputHandler = (name, value) => {
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const showKeyboard = () => {
    setIsShownKeyboard(true);
  };

  const keyboardHide = () => {
    setIsShownKeyboard(false);
    Keyboard.dismiss();
  };

  const savePost = () => {
    console.log(state);
    setState(initialState);
  };

  const { image, title, location } = state;

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <KeyboardAvoidingView
        style={styles.container}
        // behavior={Platform.OS === "ios" ? "padding" : ""}
        keyboardVerticalOffset={100}
      >
        <ScrollView>
          {image ? (
            <View style={styles.photoWrapper}>
              {image && <Image sourse={{ uri: image }} style={styles.image} />}
            </View>
          ) : (
            <View style={styles.placeholderImage}>
              <View style={styles.iconWrappper}>
                <FontAwesome name="camera" size={24} color="#BDBDBD" />
              </View>
            </View>
          )}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              setState((prevState) => ({
                ...prevState,
                image: "https://unsplash.com/photos/VUWEvNateeM",
              }))
            }
          >
            <Text style={styles.loadImageText}>
              {!image ? "Загрузите фото" : "Редактировать фото"}
            </Text>
          </TouchableOpacity>
          <View>
            <TextInput
              style={styles.input}
              placeholderTextColor={"#BDBDBD"}
              placeholder="Название..."
              value={title}
              onChangeText={(value) => inputHandler("title", value)}
              onFocus={showKeyboard}
            />

            <View style={styles.inputWrap}>
              <TouchableOpacity activeOpacity={0.8}>
                <Feather
                  name="map-pin"
                  size={24}
                  color="#BDBDBD"
                  style={styles.locationIcon}
                />
              </TouchableOpacity>
              <TextInput
                style={[{ ...styles.input }, { paddingLeft: 28 }]}
                placeholderTextColor={"#BDBDBD"}
                placeholder="Местность..."
                value={location}
                onChangeText={(value) => inputHandler("location", value)}
                onFocus={showKeyboard}
              />
            </View>

            <TouchableOpacity activeOpacity={0.8} style={styles.button}>
              <Text style={styles.buttonTitle} onPress={savePost}>
                Опубликовать
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setState(initialState)}
              style={styles.trashIconWrapper}
            >
              <Feather name="trash-2" size={24} style={styles.trashIcon} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
  },

  photoWrapper: {
    overflow: "hidden",
    width: "100%",
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
  },

  placeholderImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 240,
    marginBottom: 8,
    backgroundColor: "#E8E8E8",
    borderRadius: 8,
  },

  image: {
    flex: 1,
    resizeMode: "cover",
  },

  iconWrappper: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    backgroundColor: "#ffffff",
    borderRadius: 30,
  },

  loadImageText: {
    marginBottom: 32,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },

  input: {
    height: 50,
    paddingVertical: 16,
    marginBottom: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
  },

  inputWrap: {
    position: "relative",
  },

  locationIcon: {
    position: "absolute",
    top: 13,
    left: 0,
  },

  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 120,
    fontFamily: "Roboto-Regular",
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
  },

  buttonTitle: {
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },

  trashIconWrapper: {
    alignItems: "center",
  },

  trashIcon: {
    width: 70,
    height: 40,
    lineHeight: 40,
    textAlign: "center",
    color: "#BDBDBD",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
  },
});

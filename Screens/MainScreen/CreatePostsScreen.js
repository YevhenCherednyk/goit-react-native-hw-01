import React, { useState, useEffect } from "react";

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
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export const CreatePostsScreen = ({ navigation }) => {
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photoPath, setPhotoPath] = useState(null);
  const [postTitle, setPostTitle] = useState("");
  const [postLocation, setPostLocation] = useState("");
  const [type, setType] = useState(Camera.Constants.Type.back);

  const takePhoto = async () => {
    if (camera) {
      const { uri } = await camera.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      setPhotoPath(uri);
    }
  };

  useEffect(() => {
    const statusSetter = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to camera access was denied");
        return;
      }

      setHasPermission(status === "granted");
    };

    statusSetter();
  }, []);

  const showKeyboard = () => {
    setIsShownKeyboard(true);
  };

  const keyboardHide = () => {
    setIsShownKeyboard(false);
    Keyboard.dismiss();
  };

  const sendPost = () => {
    navigation.navigate("Posts", { photoPath, postTitle, postLocation });
    setPhotoPath(null);
    setPostTitle("");
    setPostLocation("");
  };

  if (hasPermission === null) {
    return <View />;
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : ""}
        keyboardVerticalOffset={100}
      >
        <ScrollView>
          <View style={styles.cameraContainer}>
            {photoPath === null &&
              (hasPermission ? (
                <Camera
                  style={styles.camera}
                  type={type}
                  ref={(ref) => {
                    setCamera(ref);
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.iconWrapper}
                    onPress={takePhoto}
                  >
                    <FontAwesome name="camera" size={24} color="#BDBDBD" />
                  </TouchableOpacity>
                </Camera>
              ) : (
                <View style={styles.camera}>
                  <Text style={styles.noAccessText}>No access to camera</Text>
                </View>
              ))}
            {photoPath && (
              <View style={styles.camera}>
                <Image
                  source={{ uri: photoPath }}
                  style={styles.previewPhoto}
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[
                    styles.iconWrapper,
                    { zIndex: 10, backgroundColor: "#ffffff4d" },
                  ]}
                  onPress={async () => {
                    setPhotoPath(null);
                  }}
                >
                  <FontAwesome name="camera" size={24} color="#BDBDBD" />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View>
            <Text style={styles.loadImageText}>
              {!photoPath ? "Загрузите фото" : "Редактировать фото"}
            </Text>
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholderTextColor={"#BDBDBD"}
              placeholder="Название..."
              value={postTitle}
              onChangeText={(value) => setPostTitle(value)}
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
                value={postLocation}
                onChangeText={(value) => setPostLocation(value)}
                onFocus={showKeyboard}
              />
            </View>

            <TouchableOpacity activeOpacity={0.8} style={styles.button}>
              <Text style={styles.buttonTitle} onPress={(sendPost)}>
                Опубликовать
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setPhotoPath(null);
                setPostTitle("");
                setPostLocation("");
              }}
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

  cameraContainer: {
    borderRadius: 10,
    overflow: "hidden",
    width: "100%",
    height: 240,
    marginBottom: 8,
  },

  camera: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },

  noAccessText: {
    alignSelf: "center",
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },

  previewPhoto: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: 240,
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

  iconWrapper: {
    position: "absolute",
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

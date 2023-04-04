import React, { useState, useContext } from "react";
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { AppContext } from "../../context/App.Context";

const initialState = {
  email: "",
  password: "",
};

export const LoginScreen = ({ navigation }) => {
  const { setIsAuth } = useContext(AppContext);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [state, setState] = useState(initialState);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
    setIsAuth(true);
  };

  const onPress = () => setIsShowPassword(!isShowPassword);

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.img}
          source={require("../../assets/images/BG.jpg")}
        >
          <KeyboardAvoidingView
            style={styles.wrapper}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.loginWrapper,
                marginBottom: isShowKeyboard ? -240 : 0,
              }}
            >
              <Text style={styles.loginTittle}>Войти</Text>
              <View style={styles.form}>
                <TextInput
                  style={{
                    ...styles.input,
                    marginBottom: 16,
                    backgroundColor: state.email ? "#fff" : "#f6f6f6",
                    borderColor: state.email ? "#ff6c00" : "#e8e8e8",
                  }}
                  placeholder="Адрес электронной почты"
                  placeholderTextColor="#bdbdbd"
                  value={state.email}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                  }}
                  onChangeText={(value) => {
                    setState((prevState) => ({
                      ...prevState,
                      email: value,
                    }));
                  }}
                ></TextInput>
                <View style={{ position: "relative" }}>
                  <TextInput
                    style={{
                      ...styles.input,
                      backgroundColor: state.password ? "#fff" : "#f6f6f6",
                      borderColor: state.password ? "#ff6c00" : "#e8e8e8",
                    }}
                    placeholder="Пароль"
                    placeholderTextColor="#bdbdbd"
                    secureTextEntry={!isShowPassword}
                    value={state.password}
                    onFocus={() => {
                      setIsShowKeyboard(true);
                    }}
                    onChangeText={(value) => {
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }));
                    }}
                  ></TextInput>
                  <Text
                    style={{
                      ...styles.showPaswordTxt,
                      transform: [{ translateY: -10 }],
                    }}
                    onPress={onPress}
                  >
                    {!isShowPassword ? "Показать" : "Скрыть"}
                  </Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{ ...styles.button, marginTop: 43 }}
                  onPress={() => onSubmit()}
                >
                  <Text style={styles.btnTxt}>Войти</Text>
                </TouchableOpacity>
                <View style={styles.loginTxtWrapper}>
                  <Text style={styles.loginTxt}>Нет аккаунта? </Text>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("Registration")}
                  >
                    <Text style={styles.loginTxt}>Зарегистрироваться</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  img: {
    flex: 1,
    resizeMode: "cover",
  },

  wrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },

  loginWrapper: {
    paddingTop: 32,
    paddingBottom: 144,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
  },

  loginTittle: {
    fontFamily: "Roboto-Medium",
    paddingBottom: 32,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    color: "#212121",
  },

  form: { paddingHorizontal: 16 },

  input: {
    fontFamily: "Roboto-Regular",
    paddingHorizontal: 16,
    fontSize: 16,
    lineHeight: 19,
    borderWidth: 1,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    color: "#212121",
  },

  showPaswordTxt: {
    position: "absolute",
    fontFamily: "Roboto-Regular",
    right: 16,
    top: "50%",
    fontSize: 16,
    lineHeight: 19,
    color: "#1b4371",
  },

  text: {
    color: "#000",
    fontSize: 18,
  },

  button: {
    height: 51,
    backgroundColor: "#ff6c00",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  btnTxt: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#fff",
  },

  loginTxtWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  loginTxt: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1b4371",
  },
});

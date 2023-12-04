import React, { useEffect, useState } from "react"
import {
  View,
  Image,
  KeyboardAvoidingView,
  Pressable,
  Keyboard,
  Platform,
} from "react-native"
import FlashMessage, { showMessage } from "react-native-flash-message"
import LinearGradient from "react-native-linear-gradient"
import { AuthOperationName, useEmailPasswordAuth } from "@realm/react"

import i18n from "config/i18n"
import From from "components/Login/Form"
import { loginStyles, flashStyles, loginFormStyles } from "styles"
import { LoginFormValues } from "types"
import colors from "styles/colors"

const LoginScreen = () => {
  const { logIn, register, result } = useEmailPasswordAuth()

  const [values, setValues] = useState({ email: "", password: "" })

  useEffect(() => {
    if (result.error) {
      if (result.operation === AuthOperationName.LogIn) {
        register(values)

        setTimeout(() => {
          handleError(i18n.t("login.error.title"))
        }, 500)
      }

      if (result.operation === AuthOperationName.Register) {
        handleError(i18n.t("login.error.title"))
      }
    }

    // NOTE: login after registration
    if (result.success && result.operation === AuthOperationName.Register) {
      logIn(values)
    }
  }, [logIn, register, result, values])

  const handleError = (message: string) => {
    showMessage({
      backgroundColor: colors.darkCandyAppleRed,
      color: colors.white,
      message: message,
      type: "default",
    })
  }

  const handleClick = () => {
    Keyboard.dismiss()
  }

  const handleSubmit = (params: LoginFormValues) => {
    setValues(params)
    logIn(params)
  }

  return (
    <View style={loginStyles.root}>
      <FlashMessage
        position="top"
        textStyle={flashStyles.text}
        titleStyle={flashStyles.title}
      />
      <Image
        style={loginStyles.background}
        source={require("../assets/background.png")}
      />
      <LinearGradient
        style={loginStyles.background}
        colors={[
          "rgba(0, 0, 0, 0) 100%)",
          "rgba(0, 0, 0, 0.6) 50%",
          "rgba(0, 0, 0, 1) 0%",
        ]}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={loginFormStyles.root}
      >
        <Pressable
          testID="login-backdrop"
          style={loginStyles.button}
          onPress={handleClick}
        />
        <From
          initialValues={{ ...values }}
          isLoading={result.pending}
          onSubmit={handleSubmit}
        />
      </KeyboardAvoidingView>
    </View>
  )
}

export default LoginScreen

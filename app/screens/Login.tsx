import React, { useEffect, useState } from "react"
import { SafeAreaView, Image } from "react-native"
import FlashMessage, { showMessage } from "react-native-flash-message"
import LinearGradient from "react-native-linear-gradient"
import { AuthOperationName, useEmailPasswordAuth } from "@realm/react"

import i18n from "config/i18n"
import From from "components/Login/Form"
import { loginStyles, flashStyles } from "styles"
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
  }, [result, values])

  const handleError = (message: string) => {
    showMessage({
      backgroundColor: colors.darkCandyAppleRed,
      color: colors.white,
      message: message,
      type: "default",
    })
  }

  const handleSubmit = (values: LoginFormValues) => {
    setValues(values)
    logIn(values)
  }

  return (
    <SafeAreaView style={loginStyles.root}>
      <Image
        style={loginStyles.background}
        source={require("../assets/background.png")}
      />
      <LinearGradient
        style={loginStyles.gradient}
        colors={[
          "rgba(0, 0, 0, 0) 100%)",
          "rgba(0, 0, 0, 0.6) 50%",
          "rgba(0, 0, 0, 1) 0%",
        ]}
      />
      <FlashMessage
        position="top"
        textStyle={flashStyles.text}
        titleStyle={flashStyles.title}
      />
      <From
        initialValues={{ ...values }}
        isLoading={result.pending}
        onSubmit={handleSubmit}
      />
    </SafeAreaView>
  )
}

export default LoginScreen

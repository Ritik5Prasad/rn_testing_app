import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import CustomSafeAreaViewScroll from "../components/global/CustomSafeAreaViewScroll";
import CustomHeading from "../components/global/CustomHeading";
import Input from "../components/ui/Input";
import CustomButton from "../components/ui/CustomButton";
import FooterTextTouchable from "../components/ui/FooterTextTouchable";
import { useDispatch } from "react-redux";

import { navigate } from "../utils/NavigationUtil";
import { AppDispatch } from "../redux/store";
import { loginUser } from "../redux/reducers/userSlice";

interface InputErrors {
  email?: string | null;
  password?: string | null;
  [key: string]: string | null | undefined;
}

const LoginScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<InputErrors>({});
  const [loading, setLoading] = useState(false);

  const handleOnChange = (text: string, input: string) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage: string | null, input: string) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  const validateInputs = () => {
    const newErrors: InputErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inputs.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!emailRegex.test(inputs.email.trim())) {
      newErrors.email = "Please enter a valid email";
    } else {
      newErrors.email = null;
    }

    if (!inputs.password.trim()) {
      newErrors.password = "Enter your password";
    } else {
      newErrors.password = null;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).every((key) => !newErrors[key]);
  };

  const loginHandler = async () => {
    const isValid = validateInputs();

    if (isValid) {
      setLoading(true);
      dispatch(loginUser(inputs)).then(() => {
        navigate("HomeScreen");
      });
      setLoading(false);
    }
  };

  return (
    <CustomSafeAreaViewScroll>
      <CustomHeading title="Login" />
      <View style={styles.inputContainer}>
        <Input
          value={inputs.email}
          onChangeText={(text) => handleOnChange(text, "email")}
          onFocus={() => handleError(null, "email")}
          placeholder="Email"
          error={errors.email}
        />
        <Input
          value={inputs.password}
          onChangeText={(text) => handleOnChange(text, "password")}
          onFocus={() => handleError(null, "password")}
          placeholder="Password"
          error={errors.password}
          secureTextEntry
        />
        <CustomButton
          title="Login"
          testID="Login"
          loading={loading}
          onPress={loginHandler}
        />
      </View>
      <FooterTextTouchable
        text="Don't have an account? Sign Up"
        onPress={() => navigate("RegisterScreen")}
      />
    </CustomSafeAreaViewScroll>
  );
};

const styles = StyleSheet.create({
  inputContainer: { marginTop: 20 },
});

export default LoginScreen;

import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

const Button = ({ buttonText, ...rest }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.button} {...rest}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#a370f7",
    padding: 15,
    borderRadius: 7,
    alignItems: "center",
    marginHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
  },
});

export default Button;

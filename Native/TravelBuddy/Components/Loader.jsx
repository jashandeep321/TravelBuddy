import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LoaderKit from "react-native-loader-kit";

const April18 = () => {
  return (
    <View style={styles.container}>
      <LoaderKit
        style={{ width: 80, height: 80 }}
        name={"BallSpinFadeLoader"}
        color={"#024F55"}
      />
    </View>
  );
};

export default April18;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 600, 
    justifyContent: "center",
    alignItems: "center",
  },
});

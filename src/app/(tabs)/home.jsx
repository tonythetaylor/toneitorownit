import React, { useEffect, useState } from "react";
import HumanPose from "react-native-human-pose";
import { StyleSheet, View, Text, Dimensions, SafeAreaView } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const HomeScreen = () => {
  const [noOfSquats, setNoOfSquats] = useState(0);
  const [hasSit, setHasSit] = useState(false);
  const [hasStand, setHasStand] = useState(false);
  const onPoseDetected = (pose) => {
    // leftHip = 11
    // leftAnkle = 15
    console.log("leftHip", pose[0]?.pose?.leftHip?.y);
    console.log("leftAnkle", pose[0]?.pose?.leftAnkle?.y);
    if (
      pose[0]?.pose?.leftHip?.confidence > 0.5 &&
      pose[0]?.pose?.leftAnkle?.confidence > 0.5
    ) {
      if (
        Math.abs(pose[0]?.pose?.leftHip?.y - pose[0]?.pose?.leftAnkle?.y) < 400
      ) {
        setHasSit(true);
        setHasStand(false);
      }
      if (hasSit) {
        if (
          Math.abs(pose[0]?.pose?.leftHip?.y - pose[0]?.pose?.leftAnkle?.y) >
          400
        ) {
          setHasStand(true);
          setHasSit(false);
        }
      }
    }
  };

  useEffect(() => {
    setNoOfSquats(hasStand ? noOfSquats + 1 : noOfSquats);
  }, [hasStand]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>Track Workout</Text>
      </View>

      <HumanPose
        height={windowHeight}
        width={windowWidth}
        enableKeyPoints={true}
        flipHorizontal={false}
        isBackCamera={false}
        // color={"255, 0, 0"}
        onPoseDetected={onPoseDetected}
      />

      <View style={styles.inputContainer}>
        <Text>No of Squats: {noOfSquats}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // gap:5
  },
  inputContainer: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 5,
    justifyContent: "center",
    backgroundColor: "white",
    fontWeight: "600",
    alignItems: "center",
  },
  panel: {
    fontSize: 20,
    fontWeight: "200",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "gainsboro",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
  },
});
export default HomeScreen;

import { StyleSheet, Text, View } from "react-native";

const ExerciseListItem = ({ item }) => {
    return (
      <View style={styles.exerciseContainer}>
      <Text style={styles.exerciseName}>{item.name} </Text>
      <Text style={styles.exerciseSubtitle}>
        <Text style={styles.subValue}>{item.muscle}</Text> |{" "}
        <Text style={styles.subValue}>{item.equipment}</Text>
      </Text>
    </View>
    )
  }

  const styles = StyleSheet.create({
    exerciseContainer: {
      backgroundColor: "#fff",
      padding: 10,
      borderRadius: 10,
      gap: 5,
    },
    exerciseName: {
      fontSize: 20,
      fontWeight: "500",
    },
    exerciseSubtitle: {
      color: "#0007",
    },
    subValue: {
     textTransform: 'capitalize'
    }
  });

  export default ExerciseListItem;
  
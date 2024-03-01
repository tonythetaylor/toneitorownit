import { StyleSheet, Text, View, FlatList } from "react-native";

const ExerciseListItem = ({ item }) => {
    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }; 
    return (
      <View style={styles.exerciseContainer}>
      <Text style={styles.exerciseName}>{item.name} </Text>
      <Text style={styles.exerciseSubtitle}>
        {capitalizeFirstLetter(item.muscle)} |{" "}
        {capitalizeFirstLetter(item.equipment)}
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
  });

  export default ExerciseListItem;
  
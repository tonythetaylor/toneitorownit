import { Text, View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams, withLayoutContext } from "expo-router";
import exercises from "../../assets/data/exercises.json";
import { Stack } from "expo-router";
import { useState } from "react";
import {gql} from 'graphql-request'
import {useQuery} from '@tanstack/react-query'
import client from '../graphqlClient'
import NewSetInput from "../components/NewSetInput";

const exerciseQuery = gql`
query exercises($name: String) {
  exercises(name: $name) {
    muscle
    name
    instructions
    equipment
  }
}
`

const ExerciseDetailsScreen = () => {
  const {name} = useLocalSearchParams();

  const {data, isLoading, error} = useQuery({
    queryKey: ['exercises', name],
    queryFn: () => client.request(exerciseQuery, {name})
  })
  const [isInstructionExpanded, setIsInstructionExpanded] = useState(false);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
      return <Text>Failed to fetch data</Text>;
  }

  const exercise = data.exercises[0]
  
  if (!exercise) {
    return <Text>Exercise not found</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: exercise.name }} />
      <View style={styles.panel}>
        <Text style={styles.exerciseName}>{exercise.name} </Text>
        <Text style={styles.exerciseSubtitle}>
          <Text style={styles.subValue}>{exercise.muscle}</Text> |{" "}
          <Text style={styles.subValue}>{exercise.equipment}</Text>
        </Text>
      </View>

      <View style={styles.panel}>
        <Text
          style={styles.instructions}
          numberOfLines={isInstructionExpanded ? 0 : 3}
        >
          {exercise.instructions}
        </Text>
        <Text
          onPress={() => setIsInstructionExpanded(!isInstructionExpanded)}
          style={styles.seeMore}
        >
          {isInstructionExpanded ? "See less" : "See more"}
        </Text>
      </View>

      <NewSetInput />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
  },
  panel: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  exerciseContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    gap: 5,
    marginHorizontal: 2,
    // shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: "500",
  },
  exerciseSubtitle: {
    color: "#0007",
  },
  subValue: {
    textTransform: "capitalize",
  },
  instructions: {
    fontSize: 16,
    lineHeight: 22,
  },
  seeMore: {
    alignSelf: "center",
    padding: 5,
    fontWeight: "600",
    color: "gray",
  },
});

export default ExerciseDetailsScreen;

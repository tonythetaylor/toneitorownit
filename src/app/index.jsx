import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import exercises from "../../assets/data/exercises.json";
import ExerciseListItem from "../components/ExcerciseListItem";
import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";
import client from '../graphqlClient'

const exercisesQuery = gql`
query exercises($muscle: String, $name: String){
  exercises(muscle: $muscle, name: $name){
      muscle
      name
      equipment
  }
}
`;
export default function ExercisesScreen() { 
  const { data, isLoading, error } = useQuery({
    queryKey: ["exercises"],
    queryFn: async () => client.request(exercisesQuery),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
      return <Text>Failed to fetch exercises</Text>;
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={data?.exercises}
        contentContainerStyle={{ gap: 10 }}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => <ExerciseListItem item={item} />}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
});

import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { gql } from 'graphql-request';
import graphqlClient from '../graphqlClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const mutationDocument = gql`
mutation insertSet($newSet: NewSet!) {
    insertSet(
      collection: "sets"
      database: "workouts"
      dataSource: "Cluster5"
      document: $newSet
    ) {
      insertedId
    }
  }
`
const NewSetInput = ({ exerciseName }) => {
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const queryClient = useQueryClient();

  const {mutate, error, isError, isPending} = useMutation({
    mutationFn: (newSet)  => graphqlClient.request(mutationDocument, { newSet }),
    onSuccess: () => {
      setReps('');
      setWeight('');
      queryClient.invalidateQueries({ queryKey: ['sets', exerciseName] });
    }
  })
  const addSet = () => {
    const newSet = {
        exercise: exerciseName,
        reps: Number.parseInt(reps),
    }

    if (Number.parseFloat(weight)) {
        newSet.weight = Number.parseFloat(weight)
    }

    mutate(newSet)
    setReps('')
    setWeight('')
  };
  return (
    <View style={styles.container}>
    <View style={styles.row}>
      <TextInput
        value={reps}
        onChangeText={setReps}
        placeholder="Reps"
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        value={weight}
        onChangeText={setWeight}
        placeholder="Weight"
        style={styles.input}
        keyboardType="numeric"
      />
      <Button title={isPending ? 'Adding' : 'Add'} onPress={addSet} />
    </View>
    {isError && <Text style={{ color: 'red'}}>Failed to add to the set</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    // flexDirection: "row",
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gainsboro",
    padding: 10,
    flex: 1,
    borderRadius: 5,
  },
});
export default NewSetInput;

import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { gql } from 'graphql-request';
import { useQuery } from '@tanstack/react-query';
import graphqlClient from '../graphqlClient';
import SetListItem from './SetListItem';

const setsQuery = gql`
query sets($exercise: String!) {
    sets(exercise: $exercise) {
      documents {
        _id
        exercise
        reps
        weight
      }
    }
  }
`;

const SetsList = ({ListHeaderComponent, exerciseName}) => {
  const { data, isLoading } = useQuery({
    queryKey: ['sets', exerciseName],
    queryFn: () => graphqlClient.request(setsQuery, {exercise: exerciseName}),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <FlatList
      data={data.sets.documents}
      ListHeaderComponent={() => (
        <>
          <ListHeaderComponent />
        </>
      )}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <SetListItem set={item} />}
    />
  );
};

export default SetsList;
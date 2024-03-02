import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { gql } from 'graphql-request';
import { useQuery } from '@tanstack/react-query';
import graphqlClient from '../graphqlClient';
import SetListItem from './SetListItem';

const setsQuery = gql`
  query exercises {
    sets {
      documents {
        _id
        exercise
        reps
        weight
      }
    }
  }
`;

const SetsList = ({ListHeaderComponent}) => {
  const { data, isLoading } = useQuery({
    queryKey: ['sets'],
    queryFn: () => graphqlClient.request(setsQuery),
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
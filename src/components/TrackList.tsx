import React from 'react';
import { Text, FlatList, View } from 'react-native';
// import Track from './Track';
import StyledText from './StyledText';

const TrackList = () => {
  // const { repositories } = useRepositories();

  return (
    <>
      <View>
        <StyledText>Hi</StyledText>
      </View>
    </>

    // <FlatList
    //   data={repositories}
    //   ItemSeparatorComponent={() => <Text />}
    //   renderItem={({ item: repo }) => <Track {...repo} />}
    // ></FlatList>
  );
};

export default TrackList;

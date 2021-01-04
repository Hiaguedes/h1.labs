import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  FlatList,
  Platform,
} from 'react-native';
import Header from '../../components/Header';
import Photo from '../../components/Photo';
import Comments from '../../components/Comments';

const Feed = ({route}) => {
  const {user} = route.params;
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    let url = '';
    Platform.OS === 'ios' ? (url = 'localhost') : (url = '10.0.2.2');
    const lerFotos = async () => {
      const fotosURL = await fetch(`http://${url}:3030/feed`);
      const fotosJson = await fotosURL.json();
      setPhotos(fotosJson);
    };
    lerFotos();
  });

  let altura = 0;
  Platform.OS === 'ios' ? (altura = 35) : (altura = 0);
  return (
    <ScrollView style={{marginTop: altura}}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.view}>
        <FlatList
          data={photos}
          keyExtractor={({id}) => id.toString()}
          renderItem={({item}) => (
            <>
              <Header userName={item.userName} userPhoto={item.userURL} />
              <Photo
                photoPost={item.url}
                description={item.description}
                likes={item.likes || 0}
              />
              <Comments userName={user} comment={item.comentarios} />
            </>
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
  },
});

export default Feed;
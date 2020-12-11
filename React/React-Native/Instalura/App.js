import React, {useState, useEffect} from 'react';
import {StyleSheet, View, StatusBar, ScrollView, FlatList} from 'react-native';
import Header from './src/components/Header';
import Photo from './src/components/Photo';

const App = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const lerFotos = async () => {
      const fotosURL = await fetch('http://10.0.2.2:3030/feed');
      const fotosJson = await fotosURL.json();
      setPhotos(fotosJson);
    };
    lerFotos();
  });
  return (
    <ScrollView>
      <StatusBar />
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

export default App;

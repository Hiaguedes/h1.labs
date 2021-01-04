import React, {useState, useRef} from 'react';
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const largura = Dimensions.get('screen').width;

const Comments = ({comment, userName}) => {
  const [comentarioInput, setComentarioInput] = useState('');
  const [comentarios, setComentarios] = useState(comment);
  const inputRef = useRef();
  const adicionarComentario = () => {
    setComentarios([
      ...comentarios,
      {
        date: Date.now(),
        userName: userName,
        text: comentarioInput,
      },
    ]);
  };
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={comentarios}
        keyExtractor={({date}, index) => date.toString() + String(index)}
        renderItem={({item}) => (
          <View style={styles.viewUserComments}>
            <Text style={styles.user}>{item.userName}</Text>
            <Text>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.input}>
        <TextInput
          ref={inputRef}
          placeholder="Deixe seu comentário..."
          onChangeText={(text) => setComentarioInput(text)}
        />
        <TouchableOpacity onPress={adicionarComentario}>
          <Image
            style={styles.send}
            source={require('../../../res/img/send.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 10,
  },
  viewUserComments: {
    flexDirection: 'row',
  },
  user: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  send: {
    width: 10,
    height: 10,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    maxWidth: 0.75 * largura,
  },
});

export default Comments;

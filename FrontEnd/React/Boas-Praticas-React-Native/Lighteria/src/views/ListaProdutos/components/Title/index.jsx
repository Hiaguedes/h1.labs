import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const Title = () => {

    return (
        <View style={styles.containerTitulo}>
        <Text style={styles.title}>Lighteria</Text>
        <View style={{width: 50, 
                      height: 50, 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      borderRadius: 30.,
                      backgroundColor: 'white'}}>
          <Image source={require('../../../../../assets/img/cadeado.png')} style={styles.logo}/>
        </View>
      </View>
        )
};

const styles = StyleSheet.create({
    containerTitulo: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 20,
        alignItems: 'center',
      },
      title: {
        fontSize: 40,
        fontWeight: '800',
        fontFamily: 'openSansBold', 
        textTransform: 'uppercase'
      },
      logo: {
        width: 30,
        height: 30,
      },
})

export default Title;
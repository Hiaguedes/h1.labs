import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Separador = () => {
    return (
        <View style={{justifyContent: 'center',
        alignItems: 'center', 
        paddingHorizontal: 24,
        marginTop: 10}}>
            <View style={styles.separador}/>
            <Text style={styles.textoDescricao}>Categorias</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    separador: {
        height: 1,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.2)',
      },
      textoDescricao: {
        color: 'rgba(0,0,0,0.2)',
        fontFamily: 'openSansRegular',
        paddingHorizontal: 24,
        marginTop: -13,
        fontSize: 16,
        backgroundColor: '#f4f0f4',
      }
})

export default Separador;

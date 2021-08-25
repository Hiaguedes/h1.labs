import React from "react";
import { Text, StyleSheet, View, TextInput, FlatList } from "react-native";
import Button from "../components/Button";

const Home = () => {
  const [newSkill, setNewSkill] = React.useState("");
  const [mySkills, setMySkills] = React.useState([]);

  const SkillsItems = ({ item: { skill } }) => {
    return (
      <Text style={[styles.title, , { backgroundColor: "#222" }]}>{skill}</Text>
    );
  };
  return (
    <>
      <View style={styles.container}>
        <Text style={[styles.title]}>Bem Vindo, Hiago</Text>
        <TextInput
          style={styles.input}
          placeholder="Nova Habilidade"
          placeholderTextColor="#666"
          onChangeText={setNewSkill}
        />

        <Button
          buttonText="Adicionar"
          onPress={() =>
            setMySkills((prevSkill) => [
              ...prevSkill,
              { id: new Date().getTime(), skill: newSkill },
            ])
          }
        />
        {mySkills.length > 0 && (
          <FlatList
            renderItem={SkillsItems}
            data={mySkills}
            keyExtractor={({ id }) => id}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121015",
    flex: 1,
  },
  title: {
    color: "#fff",
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
  input: {
    paddingVertical: 15,
    marginVertical: 15,
    backgroundColor: "#1f1e25",
    color: "#fff",
    fontSize: 18,
    borderRadius: 7,
    marginHorizontal: 20,
    paddingHorizontal: 10,
  },
});

export default Home;

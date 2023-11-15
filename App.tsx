import { Button, StyleSheet, Text, View } from "react-native";
import params from "./src/constants/Params";
import Field from "./src/components/Field";
import React from "react";

export default function App(): JSX.Element {


  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Iniciando o Mines </Text>
      <Text style={styles.instructions}>Tamanho da grade: {params.getRowsAmount()} x {params.getColumnsAmount()}</Text>
      <Field nearMines={0}/>
      <Field nearMines={0} opened={true}/>
      <Field nearMines={1} opened={true}/>
      <Field nearMines={2} opened={true}/>
      <Field nearMines={5} opened={true}/>
      <Field nearMines={6} opened={true}/>
      <Field nearMines={6} mined={true}/>
      <Field nearMines={0} mined={true} opened={true}/>
      <Field nearMines={0} exploded={true} mined={true} opened={true}/>
      <Field nearMines={0} flagged={true}/>
      <Field nearMines={0} flagged={true} opened/>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    fontWeight: "bold"
  }
});

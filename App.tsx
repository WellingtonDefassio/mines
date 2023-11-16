import { Alert, StyleSheet, Text, View } from "react-native";
import params from "./src/constants/Params";
import React, { useState } from "react";
import MineField from "./src/components/MineField";
import { cloneBoard, hasExplosion, invertFlag, openField, showMines, wonGame } from "./src/constants/Functions";

export default function App(): JSX.Element {

  let minesAmount = params.getMinesAmount();
  let initialBoard = params.getInitialBoard(minesAmount);

  const [boardState, setBoardState] = useState(initialBoard);
  const [wonState, setWonState] = useState(false);
  const [lostState, setLostState] = useState(false);

  function onOpenField(row: number, column: number) {
    const board = cloneBoard(boardState);
    openField(board, row, column);
    const lost = hasExplosion(board);
    const won = wonGame(board);
    if (lost) {
      showMines(board);
      Alert.alert("You lose!!");
    }
    if (won) {
      Alert.alert("Congrats you win!!!");
    }
    setBoardState(board);
    setWonState(won);
    setLostState(lost);
  }

  function onLongPress(row: number, column: number) {
    const board = cloneBoard(boardState)
    invertFlag(board, row, column)
    const won = wonGame(board);
    if (won) {
      Alert.alert("Congrats you win!!!");
    }
    setWonState(won)
    setBoardState(board)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Iniciando o Mines </Text>
      <Text style={styles.instructions}>Tamanho da grade: {params.getRowsAmount()} x {params.getColumnsAmount()}</Text>
      <View style={styles.board}>
        <MineField board={boardState} openField={onOpenField} onLongPress={onLongPress}/>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end"
  },
  board: {
    alignItems: "center",
    backgroundColor: "#AAA"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center"
  }
});

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Board } from "../constants/Functions";
import Field from "./Field";

interface MineFieldProps {
  board: Board[][];
  openField: (row: number, column: number) => void;
  onLongPress: (row: number, column: number) => void;
}

export default function MineField(props: MineFieldProps) {

  const rows = props.board.map((row, r) => {
    const columns = row.map((field, c) => {
      return <Field {...field} key={c}
                    onOpen={() => props.openField(r, c)}
                    onLongPress={() => props.onLongPress(r, c)}
      />;
    });
    return <View key={r} style={{flexDirection: "row"}}>{columns}</View>;
  });
  return (
    <View style={styles.container}>
      {rows}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    borderColor: "#EEE"
  }
});

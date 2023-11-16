import React from "react";
import { View, Text, StyleSheet, ColorValue, Button, TouchableWithoutFeedback } from "react-native";
import params from "../constants/Params";
import Mine from "./Mine";
import Flag from "./Flag";

interface FieldProps {

  mined?: boolean;
  opened?: boolean;
  exploded?: boolean;
  nearMines: number;
  flagged?: boolean;
  onOpen: () => void
  onLongPress: () => void

}

export default function Field({ mined, opened, nearMines, exploded,flagged, onOpen, onLongPress }: FieldProps) {

  const styleField: object[] = [styles.field];
  //outros estilos aqui
  if (opened) styleField.push(styles.opened);
  if (exploded) styleField.push(styles.exploded)
  if (flagged) styleField.push(styles.flagged)
  if (!opened && !exploded) styleField.push(styles.regular);

  let color = getColor();

  function getColor(): ColorValue | undefined {
    if (nearMines > 0) {
      if (nearMines == 1) return "#2A28D7";
      if (nearMines == 2) return "#2B520F";
      if (nearMines > 2 && nearMines < 6) return "#F9060A";
      if (nearMines >= 6) return "#F221a9";
    }
    return undefined;
  }


  return (
    <TouchableWithoutFeedback onPress={onOpen} onLongPress={onLongPress}>
    <View style={styleField}>
      {!mined && opened && nearMines > 0 ? <Text style={[styles.label, { color: color }]}>
        {nearMines} </Text> : false}
      {mined && opened ? <Mine/> : false}
      {flagged && !opened ? <Flag/> : false}
    </View>
    </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  field: {
    height: params.blockSize,
    width: params.blockSize,
    borderWidth: params.borderSize
  },
  regular: {
    backgroundColor: "#999",
    borderLeftColor: "#CCC",
    borderTopColor: "#CCC",
    borderRightColor: "#333",
    borderBottomColor: "#333"
  },
  opened: {
    backgroundColor: "#999",
    borderColor: "#777",
    alignItems: "center",
    justifyContent: "center"
  },
  label: {
    fontWeight: 'bold',
    fontSize: params.fontSize,

  },
  exploded: {
    backgroundColor: '#FF0000',
    borderColor: '#FF0000'
  },
  flagged: {

  }
});

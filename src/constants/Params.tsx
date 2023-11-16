import { Dimensions } from "react-native";
import { Board, createMinedBoard } from "./Functions";

const params = {
  blockSize: 30,
  borderSize: 5,
  fontSize: 15,
  headerRatio: 0.15, //Proporção do painel superior na tela
  difficultLevel: 0.1,
  getColumnsAmount() {
    const width = Dimensions.get("window").width;
    return Math.floor(width / this.blockSize);
  },
  getRowsAmount() {
    const totalHeight = Dimensions.get("window").height;
    const borderHeight = totalHeight * (1 - this.headerRatio);
    return Math.floor(borderHeight / this.blockSize);
  },
  getMinesAmount(): number {
    let cols = this.getColumnsAmount();
    let rows = this.getRowsAmount();
    return Math.ceil(cols * rows * params.difficultLevel);
  },
  getInitialBoard(minesAmount: number): Board[][] {
    let cols = this.getColumnsAmount();
    let rows = this.getRowsAmount();
    return createMinedBoard(rows, cols, minesAmount);
  }
};


export default params;

import { FC } from "react";
import { Board } from "../lifeGame";

export type RenderType = "normal" | "party";
export type GameBoardProps = {
  board: Board;
  renderType: RenderType;
};

// 盤面のレンダリング
const renderer =
  (newCell: (isAlive: boolean) => JSX.Element) => (board: Board) =>
    (
      <div id="game">
        {board.map((row, i) => row.map((isAlive, j) => newCell(isAlive)))}
      </div>
    );

// ノーマルモードのレンダラ
const normalCell = (isAlive: boolean) => (
  <div className={`cell ${isAlive ? "alive" : "dead"}`}></div>
);

// パーティーモードのレンダラ
const partyCell = (isAlive: boolean) =>
  isAlive ? (
    <img
      src="https://cultofthepartyparrot.com/parrots/hd/parrot.gif"
      alt="alive"
      className="cell"
    />
  ) : (
    <div className="cell dead"></div>
  );

export const GameBoard: FC<GameBoardProps> = ({ board, renderType }) =>
  renderer(renderType === "normal" ? normalCell : partyCell)(board);

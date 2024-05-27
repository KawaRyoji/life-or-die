import { match } from "ts-pattern";
import { mod, range } from "./utils";

export type Board = boolean[][];

type CellState = "birth" | "stay" | "dead";

// 盤面
export const board = (h: number) => (w: number) => (init: () => boolean) =>
  range(0, h).map((_) => range(0, w).map((_) => init()));

// ボードを次の盤面へ
export const nextBoard: (board: Board) => Board = (board) =>
  density(board).map((row, ri) =>
    row.map((cell, ci) =>
      match(cell)
        .with("birth", () => true)
        .with("stay", () => board[ri][ci])
        .with("dead", () => false)
        .exhaustive()
    )
  );

export const randomInitBoard = (h: number) => (w: number) => (prob: number) =>
  board(h)(w)(() => Math.random() < prob);

// セルの周りにある生きているセルのカウント
const neighborCount =
  (r: number) => (c: number) => (h: number) => (w: number) => (board: Board) =>
    [-1, 0, 1].reduce(
      (rsum, rs) =>
        [-1, 0, 1].reduce(
          (csum, cs) =>
            rs === 0 && cs === 0
              ? csum
              : csum + (board[mod(r + rs, h)][mod(c + cs, w)] ? 1 : 0),
          0
        ) + rsum,
      0
    );

const cellState: (count: number) => CellState = (count) =>
  count >= 4 ? "dead" : count === 3 ? "birth" : count === 2 ? "stay" : "dead";

// セルの密度
const density = (board: Board) =>
  board.map((row, ri) =>
    row.map((col, ci) =>
      cellState(neighborCount(ri)(ci)(board.length)(row.length)(board))
    )
  );

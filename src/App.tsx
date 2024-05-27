import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Button } from "react-bootstrap";
import "./App.css";
import { GameBoard, RenderType } from "./components/GameBoard";
import GameControl from "./components/GameControls";
import { PlayGuideModal } from "./components/PlayGuideModal";
import { Board, nextBoard, randomInitBoard } from "./lifeGame";
import { useInterval } from "./utils";

function App() {
  const height = 30;
  const width = 50;
  const prob = 0.2;
  const minInterval = 10;
  const maxInterval = 1000;

  const [renderType, setRenderType] = useState<RenderType>("normal");
  const [gameBoard, setGameBoard] = useState<Board>(
    randomInitBoard(height)(width)(prob)
  );
  const [gameSpeed, setGameSpeed] = useState<number>(0.5);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const [modalShow, setModalShow] = useState<boolean>(false);

  useInterval(
    () => setGameBoard(nextBoard(gameBoard)),
    isRunning ? (1 - gameSpeed) * maxInterval + minInterval : null
  );

  return (
    <div className="App">
      <div id="game-container">
        <PlayGuideModal
          show={modalShow}
          handleClose={() => setModalShow(false)}
        ></PlayGuideModal>
        <div id="controls">
          <GameControl
            isRunning={isRunning}
            gameSpeed={gameSpeed}
            on_start_button_clicked={() => setIsRunning(true)}
            on_stop_button_clicked={() => setIsRunning(false)}
            on_init_button_clicked={() =>
              setGameBoard(randomInitBoard(height)(width)(prob))
            }
            on_party_button_clicked={() =>
              setRenderType(renderType === "normal" ? "party" : "normal")
            }
            on_speed_range_changed={(event) =>
              setGameSpeed(Number.parseFloat(event.target.value))
            }
          ></GameControl>
          <Button
            id="play-guide"
            type="button"
            variant="outline-info"
            onClick={() => setModalShow(true)}
          >
            Play Guide
          </Button>
          <div id="party-time" hidden={renderType !== "party"}>
            PARTY TIME!!!
          </div>
        </div>
        <GameBoard board={gameBoard} renderType={renderType}></GameBoard>
      </div>
    </div>
  );
}

export default App;

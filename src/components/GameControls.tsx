import { FC } from "react";
import { Button, Form } from "react-bootstrap";

export type GameControlProps = {
  isRunning: boolean;
  gameSpeed: number;
  on_start_button_clicked: () => void;
  on_stop_button_clicked: () => void;
  on_init_button_clicked: () => void;
  on_party_button_clicked: () => void;
  on_speed_range_changed: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const GameControl: FC<GameControlProps> = ({
  isRunning,
  gameSpeed,
  on_start_button_clicked,
  on_stop_button_clicked,
  on_init_button_clicked,
  on_party_button_clicked,
  on_speed_range_changed,
}) => (
  <div id="button-container">
    <Button
      id="start"
      variant="outline-primary"
      type="button"
      size="sm"
      disabled={isRunning}
      onClick={on_start_button_clicked}
    >
      start
    </Button>
    <Button
      id="stop"
      variant="outline-danger"
      type="button"
      size="sm"
      disabled={!isRunning}
      onClick={on_stop_button_clicked}
    >
      stop
    </Button>
    <Button
      id="init"
      variant="outline-secondary"
      type="button"
      size="sm"
      disabled={isRunning}
      onClick={on_init_button_clicked}
    >
      init
    </Button>
    <Button
      id="party"
      variant="outline-warning"
      type="button"
      disabled={isRunning}
      onClick={on_party_button_clicked}
    >
      PARTY
    </Button>
    <div id="speed-control-container">
      <span>slow</span>
      <Form.Range
        id="speed"
        min={0}
        max={1}
        step={0.05}
        value={gameSpeed}
        name="speed"
        onChange={on_speed_range_changed}
      ></Form.Range>
      <span>fast</span>
    </div>
  </div>
);

export default GameControl;

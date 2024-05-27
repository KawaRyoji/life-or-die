import { FC } from "react";
import { Button, Modal } from "react-bootstrap";

export type PlayGuideModalProps = {
  show: boolean;
  handleClose: () => void;
};

export const PlayGuideModal: FC<PlayGuideModalProps> = ({
  show,
  handleClose,
}) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>遊び方</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <p>スタートボタンを押して眺める。以上。</p>
    </Modal.Body>

    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        閉じる
      </Button>
    </Modal.Footer>
  </Modal>
);

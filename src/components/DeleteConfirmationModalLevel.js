import React, { useEffect } from "react";
// import AddBtn from "../../../assets/images/MenuButton.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Col,
  Row,
  Table,
  Button,
  Form as BootForm,
  Modal,
} from "react-bootstrap";

const DeleteConfirmationModalLevel = ({
  DeleteConfirmationModalLevel,
  text,
  onRequestClose,
  onConfirm,
  children,
}) => {
  return (
    <Modal
      // {...props}
      aria-labelledby="contained-modal-title-vcenter"
      show={DeleteConfirmationModalLevel}
      onHide={onRequestClose}
      centered
      //   onHide={false}
    >
      <Modal.Body className="modBody">
        <div
          style={{
            width: "34px",
            height: "59px",
            flexShrink: "0",
            fill: "#0E56AF",
            marginBottom: "10px", // Add margin for separation
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="59"
            viewBox="0 0 34 59"
            fill="none"
          >
            <path
              d="M14.1013 30.5868C16.4982 26.2705 21.1052 23.7242 23.7823 19.9047C26.615 15.8989 25.0274 8.41526 16.9962 8.41526C11.7355 8.41526 9.15181 12.39 8.06231 15.6816L0 12.2968C2.21013 5.68263 8.21795 0 16.9651 0C24.2803 0 29.292 3.32263 31.8446 7.48368C34.0236 11.0547 35.2998 17.7311 31.9379 22.6995C28.2025 28.1958 24.6227 29.8726 22.6928 33.4126C21.9145 34.8411 21.6033 35.7726 21.6033 40.3684H12.6071C12.576 37.9463 12.2024 34.0026 14.1013 30.5868ZM23.2219 52.7895C23.2219 56.2053 20.4204 59 16.9962 59C13.5721 59 10.7705 56.2053 10.7705 52.7895C10.7705 49.3737 13.5721 46.5789 16.9962 46.5789C20.4204 46.5789 23.2219 49.3737 23.2219 52.7895Z"
              fill="#0E56AF"
            />
          </svg>
        </div>
        <div id="res">{text}</div>

        <div className="row mt-4">
          <div className="col-lg-6">
            <Button
              className="sub-modal-cancel-btn"
              type="submit"
              onClick={onRequestClose}
            >
              Cancel
            </Button>
          </div>
          <div className="col-lg-6">
            <Button
              className="sub-modal-submit-btn"
              type="submit"
              onClick={onConfirm}
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteConfirmationModalLevel;

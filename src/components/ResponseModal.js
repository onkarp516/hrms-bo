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
import images from "../utils/imageLoader";

const ResponseModal = ({
  isOpen,
  text,
  onRequestClose,
  onConfirm,
  children,
  LogoType,
}) => {
  // const handleKeyPress = (event) => {
  //   if (event.key === "Enter") {
  //     onConfirm();
  //   }
  // };
  return (
    <Modal
      // {...props}
      aria-labelledby="contained-modal-title-vcenter"
      show={isOpen}
      onHide={onRequestClose}
      centered
      //   onHide={false}
    >
      <Modal.Body className="modBody">
        {LogoType === "cnf" && (
          <div
          // style={{
          //   width: "34px",
          //   height: "59px",
          //   flexShrink: "0",
          //   fill: "#0E56AF",
          //   marginBottom: "10px", // Add margin for separation
          // }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="101"
              height="83"
              viewBox="0 0 101 83"
              fill="none"
            >
              <circle cx="38.5" cy="44.5" r="38.5" fill="#94E1FF" />
              <path
                d="M49.4045 48.7427L35.9587 36.1013C35.3469 35.5262 35 34.7238 35 33.8842C35 31.3344 37.9477 29.9151 39.941 31.5052L49.461 39.0996C51.414 40.6575 54.2171 40.5349 56.0265 38.8124L95.0743 1.64093C97.3075 -0.484963 101 1.09802 101 4.1813C101 5.1343 100.612 6.04626 99.9258 6.70739L81.9732 24L56.2959 48.7031C54.3761 50.5501 51.3453 50.5675 49.4045 48.7427Z"
                fill="#3EB72B"
              />
              <path
                d="M49.8339 62.0711L36.227 50.348C35.448 49.6768 35 48.6995 35 47.6712C35 44.6484 38.5493 43.0214 40.8394 44.9945L49.8331 52.7429C51.7675 54.4096 54.647 54.3509 56.5119 52.6067L95.8402 15.8256C97.7991 13.9936 101 15.3826 101 18.0647C101 18.8842 100.672 19.6697 100.089 20.2456L82.1174 37.9999L56.5119 61.9357C54.6469 63.6791 51.768 63.7375 49.8339 62.0711Z"
                fill="#3EB72B"
              />
            </svg>
          </div>
        )}
        {LogoType === "" && (
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
        )}
        {LogoType == "error" && (
          <div>
            <img
              src={images["./Cross.png"]}
              alt=""
              className="sidebar-nested-logo-pop-up"
            />
          </div>
        )}
        <div id="res">{text}</div>

        <div className="row mt-4">
          <div className="col-lg-6">
            <Button
              className="sub-modal-submit-btn"
              type="submit"
              onClick={onConfirm}
              // onKeyDown={handleKeyPress}
            >
              Ok
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ResponseModal;

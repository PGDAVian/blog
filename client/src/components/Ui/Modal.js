import React from "react";
import { createPortal } from "react-dom";

const Backdrop = (props) => {
  return <div className="backdrop w-full h-screen"></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className="modal">
      <div className="content">{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <>
      {createPortal(<Backdrop />, portalElement)}
      {createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
      {/* <div className="backdrop"></div>
        <div className="modal">
            <div className="content">
                {props.children}
            </div>
        </div> */}
    </>
  );
};

export default Modal;

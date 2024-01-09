import React from "react";
import { Close, Cancel } from "@mui/icons-material";

import "./Dialog.scss";
import { useOrderStore } from "@/pages/Orders/Orders";

interface DialogProps {
  title?: string;
  children: React.ReactNode;
}

const Dialog = ({ title, children }: DialogProps) => {
  const { cancelModal, setCancelModal } = useOrderStore();

  const handleOpen = () => {
    setCancelModal(true);
  };

  const handleClose = () => {
    setCancelModal(false);
  };

  return (
    <>
      <button className="dialog-trigger-button" onClick={handleOpen}>
        <Cancel />
        Отмена
      </button>

      {cancelModal ? (
        <div className="dialog">
          <div className="dialog-overlay" onClick={handleClose} />
          <div className="dialog-content">
            <h2 className="dialog-title">{title}</h2>
            <div className="dialog-body">{children}</div>
            <button className="dialog-close-button" onClick={handleClose}>
              <Close className="x-icon" />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Dialog;

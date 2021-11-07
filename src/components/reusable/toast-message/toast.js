import React, { useContext } from "react";
import { ToastContext } from "../../context/toastMessage";
import "./toast.css";
const Toast = ({ position, autoClose }) => {
  const { state, dispatch } = useContext(ToastContext);
  return (
    <div className={`notification-container ${position}`}>
      {state.map((notification) => {
        if (autoClose) {
          setTimeout(() => {
            dispatch({
              type: "DELETE_NOTIFICATION",
              payload: notification.id,
            });
          }, autoClose);
        }
        return (
          <div key={notification.id} className="notification toast">
            <div className="notification-image">{notification.icon}</div>
            <div>
              <p className="notification-title">{notification.title}</p>
              <p className="notification-message">{notification.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;

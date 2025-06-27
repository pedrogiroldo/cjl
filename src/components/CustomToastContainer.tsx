import {
  Info,
  Warning,
  WarningCircle,
  CheckCircle,
} from "@phosphor-icons/react";
import { ToastContainer } from "react-toastify";

function CustomToastContainer() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={2500}
      closeButton={false}
      pauseOnFocusLoss={false}
      pauseOnHover={false}
      hideProgressBar
      closeOnClick
      theme="dark"
      icon={({ type }) => {
        switch (type) {
          case "info":
            return <Info className="text-blue-400" size={32} weight="bold" />;
          case "error":
            return (
              <WarningCircle className="text-red-500" size={32} weight="bold" />
            );
          case "success":
            return (
              <CheckCircle className="text-white" size={32} weight="bold" />
            );
          case "warning":
            return (
              <Warning className="text-yellow-400" size={32} weight="bold" />
            );
          default:
            return null;
        }
      }}
    />
  );
}

export default CustomToastContainer;

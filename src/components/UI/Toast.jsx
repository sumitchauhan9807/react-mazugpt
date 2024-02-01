import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Toast({text,showToast}) {
  return (
    <div>
      <ToastContainer />
    </div>
  );
}

export default Toast

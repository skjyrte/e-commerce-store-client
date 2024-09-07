import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NotReadyYet() {
  toast.error("Feature not ready yet", {
    position: "top-right",
  });
}

export default NotReadyYet;

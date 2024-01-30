import {createPortal} from "react-dom";
import css from "./PortalModal.module.scss";

const PortalModal = ({visible, children}) => {
  if (!visible) {
    return null;
  }

  return createPortal(
    <div className={css.portal}>{children}</div>,
    document.getElementById("root") as HTMLDivElement
  );
};

export default PortalModal;

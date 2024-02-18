import {createPortal} from "react-dom";
import css from "./PortalModal.module.scss";
import {FC, useEffect} from "react";

type Props = {
  visible: boolean;
  children: any;
  lockBodyScroll?: boolean;
};

const PortalModal: FC<Props> = ({
  visible,
  children,
  lockBodyScroll = false,
}) => {
  if (!visible) {
    return null;
  }
  /* 
  useEffect(() => {
    if (lockBodyScroll === true) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      if (lockBodyScroll === true) {
        document.body.style.overflow = "unset";
      } else {
      }
    };
  });
 */
  return createPortal(
    <div className={css.portal}>{children}</div>,
    document.getElementById("root") as HTMLDivElement
  );
};

export default PortalModal;

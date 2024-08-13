import {createPortal} from "react-dom";
import css from "./PortalModal.module.scss";
import {FC, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";

interface Props {
  visible: boolean;
  children: any;
  lockBodyScroll?: boolean;
}

const PortalModal: FC<Props> = ({
  visible,
  children,
  lockBodyScroll = false,
}) => {
  useEffect(() => {
    if (lockBodyScroll) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      if (lockBodyScroll) {
        document.body.style.overflow = "unset";
      }
    };
  }, [lockBodyScroll]);

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          className={css.portal}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.2}}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("root") as HTMLDivElement
  );
};

export default PortalModal;

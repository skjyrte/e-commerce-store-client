import React from "react";
import {motion} from "framer-motion";
import {useLocation} from "react-router-dom";

interface Props {
  children: React.ReactNode;
  duration?: number;
}

const pageVariants = {
  initial: {opacity: 0, x: 0},
  in: {opacity: 1, x: 0},
  out: {opacity: 0, x: 0},
};

const PageTransition: React.FC<Props> = (props) => {
  const {children, duration = 0.5} = props;
  const thisLocation = useLocation();

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: duration,
  };

  return (
    <motion.div
      key={thisLocation.pathname}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      style={{width: "100%", height: "100%", marginTop: "10px"}}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;

import {useEffect, useRef} from "react";
import {toast, Id, Bounce} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function useSpinUpNotify(displayNotice: boolean) {
  const toastId = useRef<Id | null>(null);
  const counter = useRef(60);
  const elapsed = useRef(0);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (displayNotice) {
      toastId.current = toast.warning(
        <div>
          API is being hosted on a free instance of render.com. Because of that,
          the server spins down after inactivity and needs around 60 seconds to
          spin up again.
          <br />
          Please wait.
          <br />
          <span>API spinup estimate: {counter.current} seconds</span>
        </div>,
        {
          position: "top-right",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: "light",
          transition: Bounce,
        }
      );

      intervalId.current = setInterval(() => {
        if (counter.current > 0) {
          counter.current--;
          elapsed.current++;

          if (toastId.current !== null) {
            const progressValue = elapsed.current / 60;

            toast.update(toastId.current, {
              render: (
                <div>
                  API is being hosted on a free instance of render.com. Because
                  of that, the server spins down after inactivity and needs
                  around 60 seconds to spin up again.
                  <br />
                  Please wait.
                  <br />
                  <span>API spinup estimate: {counter.current} seconds</span>
                </div>
              ),
              progress: progressValue,
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
              transition: Bounce,
            });
          }
        } else {
          if (intervalId.current) {
            clearInterval(intervalId.current);
          }
        }
      }, 1000);
    } else {
      if (toastId.current !== null) {
        toast.dismiss(toastId.current);
        toastId.current = null;
      }
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
      counter.current = 60;
      elapsed.current = 0;
    }

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [displayNotice]);

  return null;
}

export default useSpinUpNotify;

import {useEffect, useRef} from "react";
import {toast, Id} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NotReadyYet() {
  const toastId = useRef<Id | null>(null);
  const counter = useRef(0);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    toastId.current = toast.warning(
      <div>
        API is being hosted on a free instance of render.com. Because of that,
        the server spins down after inactivity and needs around 60 seconds to
        spin up again.
        <br />
        Please wait, page reload is not required.
        <br />
        <strong>Time Elapsed: {counter.current} seconds</strong>
      </div>,
      {autoClose: false}
    );

    intervalId.current = setInterval(() => {
      if (counter.current < 60) {
        counter.current++;
        if (toastId.current !== null) {
          toast.update(toastId.current, {
            render: (
              <div>
                API is being hosted on a free instance of render.com. Because of
                that, the server spins down after inactivity and needs around 60
                seconds to spin up again.
                <br />
                Please wait, page reload is not required.
                <br />
                <strong>Time Elapsed: {counter.current} seconds</strong>
              </div>
            ),
          });
        }
      } else {
        if (intervalId.current) {
          clearInterval(intervalId.current);
        }
      }
    }, 1000);

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, []);

  return null;
}

export default NotReadyYet;

import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [trackingPos, setTrackingPos] = useState({
    currentOffsetX: 0,
    currentOffsetY: 0,
    mouseDownX: 0,
    mouseDownY: 0,
    mouseCurrentX: 0,
    mouseCurrentY: 0,
  });

  const draggingRef = useRef(false);

  useEffect(() => {
    const mouseMoveHandler = (e: MouseEvent) => {
      if (draggingRef.current === true) {
        // TODO: Add Throttle.
        setTrackingPos((prev) => ({
          ...prev,
          mouseCurrentX: e.clientX,
          mouseCurrentY: e.clientY,
        }));
      }
    };

    const mouseUpHandler = (e: MouseEvent) => {
      if (draggingRef.current) {
        draggingRef.current = false;
        setTrackingPos((prev) => ({
          currentOffsetX: prev.currentOffsetX - (prev.mouseDownX - e.clientX),
          currentOffsetY: prev.currentOffsetY - (prev.mouseDownY - e.clientY),
          mouseCurrentX: 0,
          mouseCurrentY: 0,
          mouseDownX: 0,
          mouseDownY: 0,
        }));
      }
    };

    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("mouseup", mouseUpHandler);

    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
    };
  }, []);

  const deltaX = trackingPos.mouseDownX - trackingPos.mouseCurrentX;
  const deltaY = trackingPos.mouseDownY - trackingPos.mouseCurrentY;
  const x = trackingPos.currentOffsetX - deltaX;
  const y = trackingPos.currentOffsetY - deltaY;

  return (
    <>
      <div className="App">
        <div
          className="Modal"
          onMouseDown={(e) => {
            draggingRef.current = true;
            setTrackingPos((prev) => ({
              ...prev,
              mouseDownX: e.clientX,
              mouseDownY: e.clientY,
              mouseCurrentX: e.clientX,
              mouseCurrentY: e.clientY,
            }));
          }}
          style={{
            transform: `translate(${x}px, ${y}px)`,
          }}
        >
          <h1>Hello World </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae
            nisi, fugit necessitatibus unde odio enim! Natus placeat eligendi,
            recusandae, rerum quibusdam unde quasi ullam dolorum, illum nostrum
            commodi animi repellendus!
          </p>
          <div className="ModalFooter">
            <button>Confirm</button>
            <button>Close</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

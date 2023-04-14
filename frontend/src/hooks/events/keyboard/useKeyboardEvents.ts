import {RefObject, useEffect} from "react";

const useKeyboardEvents = (ref: RefObject<HTMLInputElement>, onKeyDown: (event: KeyboardEvent) => void) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      onKeyDown(e);
    };

    if (ref.current) {
      ref.current.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [ref, onKeyDown]);
};

export default useKeyboardEvents;

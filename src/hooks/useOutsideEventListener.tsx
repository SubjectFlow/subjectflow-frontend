import React, { useEffect } from "react";

export function useOutsideEventListener(ref: React.RefObject<HTMLElement>, cb: (x: Event) => void) {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (ref.current && event.target instanceof Element && !ref.current.contains(event.target)) {
        cb(event);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, cb]);
}
import { useEffect } from "react";

export function useOutSideClick(ref, cb,exceptionId) {
  useEffect(() => {
    function handleClick(e) {
      if (
        ref.current &&
        !ref.current.contains(e.target) &&
        e.target.id !== exceptionId
      ) {
        cb();
        
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, cb]);
}

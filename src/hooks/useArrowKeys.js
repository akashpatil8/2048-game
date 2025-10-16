import { useEffect } from "react";

export const useArrowKeys = (handlers) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          handlers.left && handlers.left();
          break;
        case "ArrowRight":
          e.preventDefault();
          handlers.right && handlers.right();
          break;
        case "ArrowUp":
          e.preventDefault();
          handlers.up && handlers.up();
          break;
        case "ArrowDown":
          e.preventDefault();
          handlers.down && handlers.down();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlers]);
};

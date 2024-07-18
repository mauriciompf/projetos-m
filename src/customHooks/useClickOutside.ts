import { RefObject, useCallback, useEffect } from "react";

const useClickOutside = (
  ref: RefObject<HTMLElement>,
  refButton: RefObject<HTMLButtonElement>,
  callback: () => void,
) => {
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (
        ref.current &&
        !ref.current.contains(target) &&
        refButton.current !== target
      ) {
        callback();
      }
    },
    [ref, refButton, callback],
  );

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);
};

export default useClickOutside;

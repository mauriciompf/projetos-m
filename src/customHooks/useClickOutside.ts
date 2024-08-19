import { RefObject, useCallback, useEffect } from "react";

const useClickOutside = (
  refs: RefObject<HTMLElement>[],
  callback: () => void,
) => {
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      const elementTarget = e.target as HTMLElement;
      const asideElement = document.querySelector("aside") as HTMLElement;

      const isClickOutside = refs.every(
        (ref) => ref.current && !ref.current.contains(elementTarget),
      );

      if (isClickOutside && !asideElement.contains(elementTarget)) {
        callback();
      }
    },
    [refs, callback],
  );

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);
};

export default useClickOutside;

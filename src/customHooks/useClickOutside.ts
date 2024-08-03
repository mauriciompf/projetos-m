import { RefObject, useCallback, useEffect } from "react";

const useClickOutside = (
  ref: RefObject<HTMLElement>,
  refButton: RefObject<HTMLButtonElement>,
  callback: () => void,
) => {
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      const ElementTarget = e.target as HTMLElement; // Get the element that was clicked

      // Check if the clicked element is outside of the ref element and not the ref button
      if (
        ref.current && // Ensure ref element exists
        !ref.current.contains(ElementTarget) &&
        refButton.current &&
        !refButton.current.contains(ElementTarget)
      ) {
        callback(); // Call the callback function if click is outside
      }
    },
    [ref, refButton, callback],
  );

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside); // Use mousedown to handle clicks before they are processed by other elements

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);
};

export default useClickOutside;

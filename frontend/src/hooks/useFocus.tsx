import { useRef, useState } from 'react';
import useClickOutside from './useClickOutside';

/**
 * Detect if in focus or if user clicked outside wrapperRef
 */
function useFocus() {
  const [focused, setFocused] = useState(false);
  const wrapperRef = useRef(null); // using onBlur doesn't work when clicking on a dropdown item
  useClickOutside(wrapperRef, () => setFocused(false));

  function onFocus() {
    setFocused(true);
  }
  return { focused, onFocus, wrapperRef };
}

export default useFocus;

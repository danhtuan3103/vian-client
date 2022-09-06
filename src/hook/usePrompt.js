import useBlocker from "./useBlocker";
import { useCallback } from "react";
function usePrompt(message, when = true) {

  const blocker = useCallback(
    (tx) => {
      // eslint-disable-next-line no-alert
      if (window.confirm(message)) tx.retry();
    },
    [message]
  );

  useBlocker(blocker, when);
}

export default usePrompt;

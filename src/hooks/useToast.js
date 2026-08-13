import { useCallback, useEffect, useRef, useState } from "react";

export function useToast(duration = 2500) {
  const [message, setMessage] = useState("");
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const showToast = useCallback(
    (text) => {
      setMessage(text);

      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => setMessage(""), duration);
    },
    [duration],
  );

  return { message, showToast };
}
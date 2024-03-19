import { useCallback, useReducer, useRef } from "react";
import useSafeDispatch from "./useSafeDispatch";

const defaultState = {
  data: null,
  status: "Idle",
  error: null,
};

export default function useAsync(initialState) {
  const initialStateRef = useRef({
    ...defaultState,
    ...initialState,
  });

  const [{ data, status, error }, setState] = useReducer((state, action) => {
    return { ...state, ...action };
  }, initialStateRef);

  const safeSetState = useSafeDispatch(setState);

  const run = useCallback(
    (promise) => {
      if (!promise || !promise.then) throw new Error("It's not a promise");
      safeSetState({ status: "Pending" });
      return promise.then(
        (data) => {
          safeSetState({ data, status: "Resolved" });
          return data;
        },
        (error) => {
          safeSetState({
            status: "Rejected",
            error: JSON.parse(error.message),
          });
        }
      );
    },
    [safeSetState]
  );

  const setData = useCallback(
    (data) => {
      safeSetState({ data });
    },
    [safeSetState]
  );

  const setError = useCallback(
    (error) => {
      safeSetState({ error });
    },
    [safeSetState]
  );

  const reset = useCallback(() => {
    safeSetState(initialStateRef.current);
  }, [safeSetState]);

  return {
    data,
    error,
    status,
    run,
    setData,
    setError,
    reset,
    isIdle: status === "Idle",
    isLoading: status === "Idle" || status === "Pending",
    isError: status === "Rejected",
    isSuccess: status === "Resolved",
  };
}

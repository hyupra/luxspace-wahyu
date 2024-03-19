import React, { useState } from "react";

function useForm(initialState) {
  const [state, setState] = useState(initialState);

  function fnUpdateState(event) {
    setState((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  return { state, fnUpdateState };
}

export default useForm;

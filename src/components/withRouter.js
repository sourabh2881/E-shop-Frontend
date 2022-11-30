import React from "react";
import { useNavigate } from "react-router-dom";

const WithRouter = (WrappedComponent) => {
  function NewComponent() {
    const navigate = useNavigate();

    return <WrappedComponent navigate={navigate} />;
  }
  return NewComponent;
};

export default WithRouter;

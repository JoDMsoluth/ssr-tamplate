import React from "react";
import RactDOM from "react-dom";
import App from "./App";
const initialData = window.__INITIAL_DATA__;
RactDOM.hydrate(
  <App page={initialData.page} />,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import STORE from "./STORE";

ReactDOM.render(
  <React.StrictMode>
    <App store={STORE} />
  </React.StrictMode>,
  document.getElementById("root")
);

import { StrictMode } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import ReactDOM from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Provider store={store}> 
    <App />
    </Provider>
  </StrictMode>,
  rootElement
);

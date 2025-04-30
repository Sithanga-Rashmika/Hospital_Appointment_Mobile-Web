import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

//custom imports
import store from "./stores/index";
import { Provider } from "react-redux";

window.store = store;

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);

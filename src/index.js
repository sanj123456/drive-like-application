import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./styles/app.scss";
import { BrowserRouter } from "react-router-dom";
import { App } from "App";
import { Loader } from "components/common/Loader";
import { AppContextProvider } from "Context";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Suspense fallback={<Loader />}>
      <AppContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </AppContextProvider>
    </Suspense>
  </React.StrictMode>
);

reportWebVitals();

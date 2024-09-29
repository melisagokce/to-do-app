import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import i18n from "./localization/i18n.ts";
import { I18nextProvider } from "react-i18next";
import "./config/MkeConfig.ts";
import { Provider } from "react-redux";
import store from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider>
);

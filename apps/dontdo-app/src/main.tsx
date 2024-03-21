import { store } from "@/app/store.ts";
import { router } from "@/router";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "@fontsource-variable/inter";
import "./styles/index.scss";

const root = createRoot(document.querySelector("#root")!);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);

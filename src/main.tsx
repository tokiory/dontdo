import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "@fontsource-variable/inter";
import "./styles/index.scss";

createRoot(document.querySelector("#root")!).render(<App />);

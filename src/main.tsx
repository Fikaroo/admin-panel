import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/main.scss";
import { LocalizationProvider } from "./hooks/customLangHook.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <LocalizationProvider>
        <App />
    </LocalizationProvider>

);

import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";

import "@fontsource/space-grotesk";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/google-sans-code";

createRoot(document.getElementById("root")).render(
  <Router>
    <App />
  </Router>,
);

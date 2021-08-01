import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./hooks/auth";
import { Routes } from "./routes/index";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  );
}

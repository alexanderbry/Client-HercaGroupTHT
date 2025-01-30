import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import RegisterPage from "./pages/registerPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import RegisterPage from "./pages/registerPage";
import LoginPage from "./pages/LoginPage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          {/* <Route index element={<Home />} /> */}
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
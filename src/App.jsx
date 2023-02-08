import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import About from "./pages/castomer/About";
import NotFoundPage from "./pages/error/NotFoundPage";
import CreateOrder from "./pages/castomer/CreateOrder";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/сreateOrder" element={<CreateOrder />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

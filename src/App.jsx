import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";

// Pages
import About from "./pages/castomer/About";
import NotFoundPage from "./pages/error/NotFoundPage";
import CreateOrder from "./pages/castomer/CreateOrder";
import LogIn from "./pages/LogIn";
import ConfirmOrders from "./pages/maneger/ConfirmOrders";
import ActiveOrders from "./pages/maneger/ActiveOrders";
import Workers from "./pages/maneger/Workers";
import Statistics from "./pages/maneger/Statistics";
import CreateWorker from "./pages/maneger/CreateWorker";
import CreateLoss from "./pages/maneger/CreateLoss";

function App() {
  return (
    <div className="">
      <Toaster position="top-right" theme="dark" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/manager/confirmOrders/:id"
            element={<Layout child={<ConfirmOrders />} />}
          />
          <Route
            path="/manager/activeOrders/:id"
            element={<Layout child={<ActiveOrders />} />}
          />
          <Route
            path="/manager/workers/:id"
            element={<Layout child={<Workers />} />}
          />
          <Route
            path="/manager/statistics/:id"
            element={<Layout child={<Statistics />} />}
          />
          <Route path="/" element={<About />} />
          <Route path="/сreateOrder" element={<CreateOrder />} />
          <Route path="/сreateWorker" element={<CreateWorker />} />
          <Route path="/сreateLoss" element={<CreateLoss />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

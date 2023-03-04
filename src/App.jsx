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
import Sidebar from "./components/sidebar/Sidebar";
import TodayOrders from "./pages/technician/TodayOrders";
import SidebarTechnician from "./components/sidebarTechnician/SidebarTechnician";
import ViewOrder from "./components/technician/ViewOrder";
import ContinueOrder from "./pages/technician/ContinueOrder";
import TechnicianSidebar from "./pages/technician/TechnicianSidebar";
import FutureOrders from "./pages/technician/FutureOrders";
import TechnicianStatistics from "./pages/technician/TechnicianStatistics";
import OrderView from "./pages/technician/OrderView";

function App() {
  return (
    <div className="overflow-x-hidden">
      <Toaster position="top-right" theme="dark" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/manager/confirmOrders/:id"
            element={<Layout child={<ConfirmOrders />} sidebar={<Sidebar />} />}
          />
          <Route
            path="/manager/activeOrders/:id"
            element={<Layout child={<ActiveOrders />} sidebar={<Sidebar />} />}
          />
          <Route
            path="/manager/workers/:id"
            element={<Layout child={<Workers />} sidebar={<Sidebar />} />}
          />
          <Route
            path="/manager/statistics/:id"
            element={<Layout child={<Statistics />} sidebar={<Sidebar />} />}
          />

          <Route
            path="/technician/sidebar"
            element={<Layout sidebar={<TechnicianSidebar />} />}
          />
          <Route
            path="/technician/todayOrders/:id"
            element={
              <Layout child={<TodayOrders sidebar={<SidebarTechnician />} />} />
            }
          />
          <Route
            path="/technician/viewOrder/:id"
            element={<Layout child={<ViewOrder />} />}
          />
          <Route
            path="/technician/continue/order/:id"
            element={
              <Layout
                child={<ContinueOrder sidebar={<SidebarTechnician />} />}
              />
            }
          />
          <Route
            path="/technician/future/orders/:id"
            element={
              <Layout
                child={<FutureOrders sidebar={<SidebarTechnician />} />}
              />
            }
          />
          <Route
            path="/technician/statistics/:id"
            element={
              <Layout
                child={<TechnicianStatistics sidebar={<SidebarTechnician />} />}
              />
            }
          />
          <Route
            path="/view/order/:id"
            element={
              <Layout child={<OrderView sidebar={<SidebarTechnician />} />} />
            }
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

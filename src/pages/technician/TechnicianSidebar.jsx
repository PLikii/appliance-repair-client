import React, { useEffect } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useNavigate, useParams } from "react-router-dom";
import SidebarTechnician from "../../components/sidebarTechnician/SidebarTechnician";

function TechnicianSidebar() {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width > 1500) {
      navigate(`/technician/todayOrders/0`);
    }
  }, [width]);

  return (
    <div className=" w-96">
      <SidebarTechnician />
    </div>
  );
}

export default TechnicianSidebar;

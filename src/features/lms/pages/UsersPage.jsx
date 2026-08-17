import { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Navbar";
import KPICards from "../../../components/KPICards";
import Users from "../components/Users";
import { lmsMenus } from "../data/LMSMenu";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const kpiData = [
  {
    title: "Total Users",
    value: 120,
    color: "blue",
    icon: <GroupOutlinedIcon sx={{ fontSize: 24 }} />,
  },
  {
    title: "Active Users",
    value: 98,
    color: "green",
    icon: <VerifiedUserOutlinedIcon sx={{ fontSize: 24 }} />,
  },
  {
    title: "Pending Verification",
    value: 8,
    color: "orange",
    icon: <PersonOutlineOutlinedIcon sx={{ fontSize: 24 }} />,
  },
  {
    title: "Locked",
    value: 6,
    color: "red",
    icon: <LockOutlinedIcon sx={{ fontSize: 24 }} />,
  },
  {
    title: "Admin",
    value: 7,
    color: "blue",
    icon: <LockOutlinedIcon sx={{ fontSize: 24 }} />,
  },
];

const UsersPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Users");

  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F7FB]">
      {/* SIDEBAR */}
      <Sidebar
        menuItems={lmsMenus}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      {/* MAIN CONTENT */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* NAVBAR */}
        <div className="sticky top-0 z-30 bg-white shadow-sm">
          <Navbar setMobileOpen={setMobileOpen} activeMenu={activeMenu} />
        </div>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto px-6 pt-4 pb-6">
          {/* KPI CARDS */}
          <KPICards
            gridClass="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
            data={kpiData}
          />

          {/* TABLE */}
          <Users />
        </main>
      </div>
    </div>
  );
};

export default UsersPage;

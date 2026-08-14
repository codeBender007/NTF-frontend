import { useState } from "react";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import SignalCellularAltRoundedIcon from "@mui/icons-material/SignalCellularAltRounded";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Navbar";
import KPICards from "../../../components/KPICards";
import LMSTabs from "../components/LMSTabs";
import { lmsMenus } from "../data/LMSMenu";
import Operators from "../components/Operators";
import OperatorLevels from "../components/OperatorLevels";

const kpiData = [
  {
    title: "Total Operators",
    value: 250,
    color: "blue",
    icon: <PeopleAltOutlinedIcon sx={{ fontSize: 24 }} />,
  },
  {
    title: "Present Operators",
    value: 210,
    color: "green",
    icon: <PersonOutlinedIcon sx={{ fontSize: 24 }} />,
  },
  {
    title: "On Leave",
    value: 40,
    color: "orange",
    icon: <SchoolOutlinedIcon sx={{ fontSize: 24 }} />,
  },
  {
    title: "Left Operators",
    value: "88",
    color: "purple",
    icon: <SignalCellularAltRoundedIcon sx={{ fontSize: 24 }} />,
  },
];

const OperatorsPage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Operators");
  const [activeTab, setActiveTab] = useState("Operators");

  return (
    <div className="flex h-screen bg-[#F5F7FB] overflow-hidden">
      <Sidebar
        menuItems={lmsMenus}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="sticky top-0 z-30 bg-white shadow-sm">
          <Navbar setMobileOpen={setMobileOpen} activeMenu={activeMenu} />
        </div>

        <div className="sticky top-[64px] z-20">
          <LMSTabs
            tabs={["Operators", "Operator Levels"]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        <main className="flex-1 overflow-y-auto px-6 pt-4 pb-6">
          {activeTab === "Operators" && (
            <>
              <KPICards data={kpiData} />
              <Operators />
            </>
          )}

          {activeTab === "Operator Levels" && <OperatorLevels />}
        </main>
      </div>
    </div>
  );
};

export default OperatorsPage;

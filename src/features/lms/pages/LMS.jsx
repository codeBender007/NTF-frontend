import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Navbar";
import QuestionPaperTable from "../components/QuestionPaperTable";
import LMSTabs from "../components/LMSTabs";
import { lmsMenus } from "../data/LMSMenu";

const LMS = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("LMS");

  const [activeTab, setActiveTab] = useState("Test Papers");

  const handleCreatePaper = () => {
    console.log("Create Test Paper");
  };

  const handleViewPaper = (paper) => {
    console.log("View paper:", paper);
  };

  const handleRefresh = () => {
    console.log("Refresh");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);

    if (tab === "Day 1") {
      navigate("/lms/l0");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        menuItems={lmsMenus}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div className="sticky top-0 z-30 bg-white shadow-sm">
          <Navbar setMobileOpen={setMobileOpen} activeMenu={activeMenu} />
        </div>

        <div className="sticky top-[64px] z-20">
          <LMSTabs activeTab={activeTab} onTabChange={handleTabChange} />
        </div>

        <main className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
          {activeTab === "Test Papers" && (
            <QuestionPaperTable
              onCreate={handleCreatePaper}
              onView={handleViewPaper}
              onRefresh={handleRefresh}
            />
          )}

          {activeTab === "Day 1" && (
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              Day 1
            </div>
          )}

          {activeTab === "Day 2" && (
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              Day 2
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default LMS;

import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Navbar";
import OperatorProfileDetails from "../components/OperatorProfileDetails";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { lmsMenus } from "../data/LMSMenu";
import { OPERATORS_STORAGE_KEY, SEED_OPERATORS } from "../utils/operatorUtils";

const OperatorProfile = () => {
  const { id } = useParams();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Operators");

  const [operators] = useLocalStorage(OPERATORS_STORAGE_KEY, SEED_OPERATORS);

  const operator = useMemo(() => {
    const found = operators.find((item) => item.id === id);

    if (!found) return undefined;

    return {
      name: found.name,
      employeeId: found.empCode,
      department: found.department,
      status: found.status,
      level: found.level,
      phone: found.contact,
    };
  }, [operators, id]);

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
          <Navbar setMobileOpen={setMobileOpen} activeMenu="Operators" />
        </div>

        {/* PROFILE CONTENT */}

        <main className="flex-1 overflow-y-auto">
          <OperatorProfileDetails operator={operator} />
        </main>
      </div>
    </div>
  );
};

export default OperatorProfile;
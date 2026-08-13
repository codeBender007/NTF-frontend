import logo from "../assets/images/NTF_logo_black.png";
import { Menu, ChevronsLeft, ChevronsRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({
  mobileOpen,
  setMobileOpen,
  collapsed,
  setCollapsed,
  activeMenu,
  setActiveMenu,
  menuItems = [],
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {mobileOpen && !collapsed && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => {
            setCollapsed(true);
            setMobileOpen(false);
          }}
        />
      )}

      <aside
        className={`relative h-screen bg-gradient-to-b from-white via-white to-primary/5 border-r border-gray-200 shadow-xl transition-all duration-300 flex flex-col ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div
          className={`h-16 border-b border-gray-100 flex items-center ${
            collapsed ? "justify-center px-2" : "justify-between px-4"
          }`}
        >
          {!collapsed ? (
            <div className="flex items-center gap-2">
              <img
                src={logo}
                alt="logo"
                className="h-16 object-contain drop-shadow-sm"
              />
            </div>
          ) : (
            <img
              src={logo}
              alt="logo"
              className="h-12 w-12 object-contain rounded-lg"
            />
          )}

          <button
            onClick={() => {
              setCollapsed(!collapsed);
              setMobileOpen(true);
            }}
            className="p-2 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-all"
            title={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? (
              <ChevronsRight size={20} />
            ) : (
              <ChevronsLeft size={20} />
            )}
          </button>
        </div>

        <nav className="flex-1 mt-4 px-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const active =
              activeMenu === item.name ||
              (item.path && location.pathname === item.path);

            return (
              <div key={item.name} className="relative group">
                {active && !collapsed && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full bg-gradient-to-b from-primary-light to-primary-dark" />
                )}

                <button
                  onClick={() => {
                    setActiveMenu(item.name);
                    if (item.path) navigate(item.path);
                    if (window.innerWidth < 1024) setCollapsed(true);
                  }}
                  className={`w-full flex items-center rounded-xl py-2.5 transition-all duration-200
                    ${collapsed ? "justify-center" : "gap-3 px-3"}
                    ${
                      active
                        ? "bg-gradient-to-r from-primary/15 to-primary/5 text-primary font-semibold shadow-[inset_0_0_0_1px_rgba(111,74,231,0.15)]"
                        : "text-gray-500 hover:bg-primary/5 hover:text-primary"
                    }`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-200
                      ${
                        active
                          ? "bg-gradient-to-br from-primary-light to-primary-dark text-white shadow-md shadow-primary/30"
                          : "bg-gray-100 text-gray-500 group-hover:bg-primary/10 group-hover:text-primary"
                      }
                      ${collapsed ? "mx-auto" : ""}`}
                  >
                    {item.icon}
                  </div>

                  {!collapsed && (
                    <span className="text-sm whitespace-nowrap">
                      {item.name}
                    </span>
                  )}

                  {!active && !collapsed && item.name && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-gray-200 group-hover:bg-primary/40 transition-colors" />
                  )}
                </button>

                {collapsed && (
                  <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">
                    <div className="px-3 py-1.5 rounded-lg bg-dark text-white text-xs font-medium whitespace-nowrap shadow-lg">
                      {item.name}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

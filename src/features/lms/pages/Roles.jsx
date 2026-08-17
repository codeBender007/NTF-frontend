import { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Navbar";
import { lmsMenus } from "../data/LMSMenu";

import {
  ShieldCheck,
  Plus,
  Search,
  ChevronRight,
  LayoutDashboard,
  BookOpen,
  Building2,
  Users,
  FileText,
  UserCog,
  Edit3,
  Eye,
  Trash2,
} from "lucide-react";

const permissionActions = ["View", "Create", "Edit", "Delete"];

const rolesData = [
  {
    id: 1,
    name: "Admin",
    shortName: "AD",
    icon: ShieldCheck,
    color: "#f59e0b",
    users: 4,
    type: "System",
    description: "Full system access with complete management capabilities",
  },
  {
    id: 2,
    name: "HR & Admin",
    shortName: "HR",
    icon: Users,
    color: "#10b981",
    users: 6,
    type: "Custom",
    description: "Manage employees, departments and HR operations",
  },
];

const moduleData = [
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Access to dashboard and analytics",
    icon: LayoutDashboard,
    color: "#3b82f6",
    permissions: ["Access"],
  },
  {
    id: "courses",
    title: "Courses",
    description: "Manage courses and learning content",
    icon: BookOpen,
    color: "#10b981",
    permissions: ["Access"],
  },
  {
    id: "department",
    title: "Department",
    description: "Manage department hierarchy",
    icon: Building2,
    color: "#f59e0b",
    permissions: ["Access"],
  },
  {
    id: "employees",
    title: "Employees",
    description: "Employee information management",
    icon: Users,
    color: "#f43f5e",
    permissions: ["Access"],
  },
  {
    id: "operators",
    title: "Operators",
    description: "Manage operational users",
    icon: UserCog,
    color: "#06b6d4",
    permissions: ["Access"],
  },
  {
    id: "test-paper",
    title: "Test Paper",
    description: "Create and manage test papers",
    icon: FileText,
    color: "#f97316",
    permissions: ["Access"],
  },
];

const defaultPageAccess = moduleData.reduce((acc, module) => {
  acc[module.id] = true;

  return acc;
}, {});

const defaultPermissions = {
  View: true,
  Create: true,
  Edit: true,
  Delete: true,
};

const actionMeta = {
  View: {
    icon: Eye,
    color: "#3b82f6",
    description: "Can view and read data",
  },
  Create: {
    icon: Plus,
    color: "#10b981",
    description: "Can create new records",
  },
  Edit: {
    icon: Edit3,
    color: "#f59e0b",
    description: "Can edit existing records",
  },
  Delete: {
    icon: Trash2,
    color: "#ef4444",
    description: "Can delete existing records",
  },
};

const Roles = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const [activeMenu, setActiveMenu] = useState("Roles & Permissions");

  const [selectedRoleId, setSelectedRoleId] = useState(null);

  const [searchRole, setSearchRole] = useState("");

  const [activeTab, setActiveTab] = useState("Permissions");

  const [pageAccess, setPageAccess] = useState(defaultPageAccess);

  const [permissions, setPermissions] = useState(defaultPermissions);

  const [searchPermission, setSearchPermission] = useState("");

  const [roleStatus, setRoleStatus] = useState(true);

  const selectedRole =
    rolesData.find((role) => role.id === selectedRoleId) || null;

  const filteredRoles = rolesData.filter((role) =>
    role.name.toLowerCase().includes(searchRole.toLowerCase()),
  );

  const filteredModules = moduleData.filter((module) => {
    const value = searchPermission.toLowerCase();

    return (
      module.title.toLowerCase().includes(value) ||
      module.description.toLowerCase().includes(value)
    );
  });

  const togglePage = (moduleId) => {
    setPageAccess((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const setAllPages = (value) => {
    const updated = {};

    moduleData.forEach((module) => {
      updated[module.id] = value;
    });

    setPageAccess(updated);
  };

  const togglePermission = (action) => {
    setPermissions((prev) => ({
      ...prev,
      [action]: !prev[action],
    }));
  };

  const setAllPermissions = (value) => {
    const updated = {};

    permissionActions.forEach((action) => {
      updated[action] = value;
    });

    setPermissions(updated);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-800">
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

      {/* MAIN */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* NAVBAR */}
        <div className="sticky top-0 z-30 bg-white shadow-sm">
          <Navbar setMobileOpen={setMobileOpen} activeMenu={activeMenu} />
        </div>

        <main className="flex-1 overflow-y-auto">
          <div className="p-3 sm:p-5 md:p-6">
            {/* PAGE HEADER */}
            <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-600">
                  <ShieldCheck size={22} />
                </div>

                <div>
                  <h1 className="text-base font-bold text-slate-900 sm:text-lg">
                    Roles & Permissions
                  </h1>

                  <p className="mt-0.5 text-xs text-slate-500">
                    Manage roles and control access to features and modules
                  </p>
                </div>
              </div>

              <button
                className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#6F4AE7] to-[#7A5AF8] px-4 text-xs font-semibold text-white shadow-sm shadow-[#6F4AE7]/20 transition-all hover:-translate-y-0.5 hover:shadow-md sm:w-auto"
                onClick={() => alert("Create New Role")}
              >
                <Plus size={16} />
                Create New Role
              </button>
            </div>

            {/* MAIN ROLE WORKSPACE */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-5">
              {/* LEFT ROLE LIST */}
              <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* ROLE HEADER */}
                <div className="border-b border-slate-100 px-4 py-4 sm:px-5 sm:py-[18px]">
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-600">
                        <ShieldCheck size={18} />
                      </div>

                      <div>
                        <h2 className="text-[15px] font-bold text-slate-900">
                          Roles
                        </h2>
                      </div>
                    </div>

                    <button
                      onClick={() => alert("Create New Role")}
                      className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-[11px] font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                    >
                      <Plus size={13} />
                      New Role
                    </button>
                  </div>

                  {/* SEARCH */}
                  <div className="relative">
                    <Search
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      value={searchRole}
                      onChange={(e) => setSearchRole(e.target.value)}
                      placeholder="Search roles..."
                      className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-[13px] text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:bg-white"
                    />
                  </div>
                </div>

                {/* ROLE ITEMS */}
                <div className="max-h-[320px] flex-1 space-y-2 overflow-y-auto p-3 lg:max-h-none">
                  {filteredRoles.map((role) => {
                    const active = role.id === selectedRoleId;

                    return (
                      <button
                        key={role.id}
                        onClick={() => setSelectedRoleId(role.id)}
                        className={`group flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all duration-300 ${
                          active
                            ? "border-slate-300 bg-slate-50 shadow-sm"
                            : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        {/* ROLE ICON */}
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                          style={{
                            backgroundColor: `${role.color}1f`,
                            color: role.color,
                          }}
                        >
                          <role.icon size={19} strokeWidth={2.5} />
                        </div>

                        {/* DETAILS */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <p className="truncate text-[13px] font-bold text-slate-900">
                              {role.name}
                            </p>

                            {role.type === "System" && (
                              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500">
                                System
                              </span>
                            )}
                          </div>

                          <p className="mt-0.5 text-xs text-slate-500">
                            {role.users} users
                          </p>
                        </div>

                        <ChevronRight
                          size={16}
                          className="text-slate-300 transition-colors group-hover:text-slate-500"
                        />
                      </button>
                    );
                  })}

                  {filteredRoles.length === 0 && (
                    <div className="py-10 text-center text-xs text-slate-400">
                      No roles found
                    </div>
                  )}
                </div>

                {/* FOOTER */}
                <div className="border-t border-slate-100 px-5 py-3">
                  <p className="text-xs text-slate-500">
                    Showing{" "}
                    <span className="font-semibold text-slate-900">
                      {filteredRoles.length}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-slate-900">
                      {rolesData.length}
                    </span>{" "}
                    roles
                  </p>
                </div>
              </div>

              {/* RIGHT ROLE DETAILS */}
              <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* EMPTY STATE */}
                {!selectedRole && (
                  <div className="flex min-h-[320px] flex-col items-center justify-center p-8 text-center lg:min-h-[650px]">
                    <div className="mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-slate-500">
                      <ShieldCheck size={34} />
                    </div>

                    <h3 className="text-base font-bold text-slate-900">
                      Select a role to configure
                    </h3>

                    <p className="mt-1 max-w-[280px] text-xs leading-5 text-slate-500">
                      Choose a role from the left panel to view and manage its
                      pages and permissions
                    </p>
                  </div>
                )}

                {/* ROLE TOP */}

                {selectedRole && (
                  <>
                    <div className="border-b border-slate-100 px-4 py-4 sm:px-5 sm:py-[18px]">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex min-w-0 items-center gap-3">
                          <div
                            className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-xl text-white shadow-sm"
                            style={{
                              background: `linear-gradient(to bottom right, ${selectedRole.color}, ${selectedRole.color}cc)`,
                            }}
                          >
                            <selectedRole.icon size={21} strokeWidth={2.5} />
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h2 className="truncate text-[16px] font-bold text-slate-900">
                                {selectedRole.name}
                              </h2>

                              {selectedRole.type === "System" && (
                                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-500">
                                  System Role
                                </span>
                              )}
                            </div>

                            <p className="mt-0.5 text-xs text-slate-500">
                              {selectedRole.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 sm:flex-none">
                            <Edit3 size={14} />
                            Edit Role
                          </button>

                          <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-600">
                            •••
                          </button>
                        </div>
                      </div>

                      {/* ROLE META */}
                      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
                        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                            Role Type
                          </p>
                          <p className="mt-1 text-sm font-bold text-slate-900">
                            {selectedRole.type} Role
                          </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                            Users
                          </p>
                          <p className="mt-1 text-sm font-bold text-slate-900">
                            {selectedRole.users} Users
                          </p>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                            Status
                          </p>

                          <button
                            onClick={() => setRoleStatus(!roleStatus)}
                            className="mt-1 flex items-center gap-1.5"
                          >
                            <span
                              className={`h-2 w-2 rounded-full ${
                                roleStatus ? "bg-emerald-500" : "bg-slate-300"
                              }`}
                            />
                            <span className="text-xs font-semibold text-slate-900">
                              {roleStatus ? "Active" : "Inactive"}
                            </span>
                          </button>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                            Permission Access
                          </p>
                          <p className="mt-1 text-sm font-bold text-slate-900">
                            Full Access
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* TABS */}
                    <div className="border-b border-slate-100 px-4 sm:px-5">
                      <div className="flex gap-6 overflow-x-auto">
                        {["Pages", "Permissions"].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`relative py-3 text-xs font-semibold transition ${
                              activeTab === tab
                                ? "text-slate-900"
                                : "text-slate-400 hover:text-slate-700"
                            }`}
                          >
                            {tab}

                            {activeTab === tab && (
                              <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-slate-900" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-4 sm:p-5">
                      {activeTab === "Pages" && (
                        <>
                          {/* TOOLBAR */}
                          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div className="relative flex-1 md:max-w-[350px]">
                              <Search
                                size={14}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                              />

                              <input
                                value={searchPermission}
                                onChange={(e) =>
                                  setSearchPermission(e.target.value)
                                }
                                placeholder="Search pages..."
                                className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-[13px] text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:bg-white"
                              />
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setAllPages(true)}
                                className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 sm:flex-none"
                              >
                                Enable All
                              </button>

                              <button
                                onClick={() => setAllPages(false)}
                                className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 sm:flex-none"
                              >
                                Disable All
                              </button>
                            </div>
                          </div>

                          {/* MODULE GRID */}
                          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-3">
                            {filteredModules.map((module) => {
                              const Icon = module.icon;

                              const enabled = pageAccess[module.id];

                              return (
                                <div
                                  key={module.id}
                                  className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
                                >
                                  {/* MODULE HEADER */}
                                  <div className="flex items-center justify-between gap-2 px-4 py-3.5">
                                    <div className="flex min-w-0 items-center gap-2.5">
                                      <div
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                                        style={{
                                          backgroundColor: `${module.color}1f`,
                                          color: module.color,
                                        }}
                                      >
                                        <Icon size={16} />
                                      </div>

                                      <div className="min-w-0">
                                        <h3 className="truncate text-xs font-bold text-slate-900">
                                          {module.title}
                                        </h3>

                                        <p className="truncate text-[11px] text-slate-500">
                                          {module.description}
                                        </p>
                                      </div>
                                    </div>

                                    {/* TOGGLE */}
                                    <button
                                      onClick={() => togglePage(module.id)}
                                      className="relative h-6 w-11 shrink-0 rounded-full transition-colors"
                                      style={{
                                        backgroundColor: enabled
                                          ? module.color
                                          : "#cbd5e1",
                                      }}
                                      aria-pressed={enabled}
                                    >
                                      <span
                                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
                                          enabled ? "left-[22px]" : "left-0.5"
                                        }`}
                                      />
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {filteredModules.length === 0 && (
                            <div className="rounded-xl border border-dashed border-slate-200 py-12 text-center">
                              <Search
                                size={28}
                                className="mx-auto mb-2 text-slate-300"
                              />

                              <p className="text-sm font-semibold text-slate-900">
                                No pages found
                              </p>

                              <p className="mt-1 text-xs text-slate-500">
                                Try searching for another page
                              </p>
                            </div>
                          )}
                        </>
                      )}

                      {activeTab === "Permissions" && (
                        <>
                          {/* TOOLBAR */}
                          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div className="relative flex-1 md:max-w-[350px]">
                              <Search
                                size={14}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                              />

                              <input
                                value={searchPermission}
                                onChange={(e) =>
                                  setSearchPermission(e.target.value)
                                }
                                placeholder="Search permissions..."
                                className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-[13px] text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:bg-white"
                              />
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setAllPermissions(true)}
                                className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 sm:flex-none"
                              >
                                Enable All
                              </button>

                              <button
                                onClick={() => setAllPermissions(false)}
                                className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 sm:flex-none"
                              >
                                Disable All
                              </button>
                            </div>
                          </div>

                          {/* FUNCTIONALITY BOXES */}
                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {permissionActions.map((action) => {
                              const meta = actionMeta[action];

                              const Icon = meta.icon;

                              const enabled = permissions[action];

                              return (
                                <div
                                  key={action}
                                  className={`flex items-center justify-between gap-3 rounded-xl border bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                                    enabled
                                      ? "border-slate-200"
                                      : "border-dashed border-slate-300"
                                  }`}
                                >
                                  <div className="flex min-w-0 items-center gap-3">
                                    <div
                                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                                      style={{
                                        backgroundColor: `${meta.color}1f`,
                                        color: meta.color,
                                      }}
                                    >
                                      <Icon size={20} strokeWidth={2.5} />
                                    </div>

                                    <h3 className="truncate text-sm font-bold text-slate-900">
                                      {action}
                                    </h3>
                                  </div>

                                  <button
                                    onClick={() => togglePermission(action)}
                                    aria-pressed={enabled}
                                    className={`relative h-6 w-11 shrink-0 rounded-full transition-colors`}
                                    style={{
                                      backgroundColor: enabled
                                        ? meta.color
                                        : "#e2e8f0",
                                    }}
                                    title={enabled ? "Disable" : "Enable"}
                                  >
                                    <span
                                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
                                        enabled ? "left-[22px]" : "left-0.5"
                                      }`}
                                    />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>

                    {/* FOOTER */}
                    {(activeTab === "Pages" || activeTab === "Permissions") && (
                      <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-500">
                            <ShieldCheck size={14} />
                          </div>

                          <p className="text-xs text-slate-500">
                            Permission changes are applied to this role.
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <button className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 sm:flex-none">
                            Cancel
                          </button>

                          <button className="flex-1 rounded-lg bg-gradient-to-r from-[#6F4AE7] to-[#7A5AF8] px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-[#6F4AE7]/20 transition-all hover:-translate-y-0.5 hover:shadow-md sm:flex-none">
                            Update Role
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Roles;

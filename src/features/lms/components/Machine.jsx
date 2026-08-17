import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Cpu,
  Users,
  Activity,
  Search,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import KPICards from "../../../components/KPICards";
import Filters from "../../../components/Filters";

const STORAGE_KEY = "lms_departments";

const createId = (prefix) =>
  `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

const loadDepartments = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

const Machine = () => {
  const navigate = useNavigate();
  const { deptId, sectionId, lineId } = useParams();

  const [departments, setDepartments] = useState(loadDepartments);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingMachine, setEditingMachine] = useState(null);
  const [toast, setToast] = useState("");

  const [filterValues, setFilterValues] = useState({
    department: "",
    subDepartment: "",
    line: "",
    machine: "",
  });

  const [form, setForm] = useState({
    name: "",
    code: "",
    type: "Loader",
    operators: 1,
    status: "Active",
  });

  /* =========================================================
     PREPARE DATA
  ========================================================= */

  // The line opened by the URL (/lms/machine/:deptId/:sectionId/:lineId)
  const department = departments.find(
    (dept) => String(dept.id) === String(deptId),
  );

  const section = department?.sections?.find(
    (currentSection) => String(currentSection.id) === String(sectionId),
  );

  const line =
    section?.lines?.find(
      (currentLine) =>
        String(currentLine.id) === String(lineId) ||
        String(currentLine.code) === String(lineId),
    ) || null;

  const machines = line?.machines || [];

  const filteredMachines = machines.filter((machine) => {
    const value = search.trim().toLowerCase();

    const matchesSearch =
      !value ||
      [machine.name, machine.code, machine.type, machine.status].some(
        (field) =>
          String(field || "")
            .toLowerCase()
            .includes(value),
      );

    const matchesType =
      !filterValues.machine || machine.type === filterValues.machine;

    return matchesSearch && matchesType;
  });

  const unique = (list) => [...new Set(list.filter(Boolean))];

  const filterOptions = {
    types: unique(machines.map((machine) => machine.type)),
  };

  const activeMachines = machines.filter(
    (machine) => machine.status === "Active",
  ).length;

  const totalOperators = machines.reduce(
    (total, machine) => total + (Number(machine.operators) || 0),
    0,
  );

  const stats = {
    total: machines.length,
    active: activeMachines,
    inactive: machines.length - activeMachines,
    operators: totalOperators,
  };

  const kpiData = [
    {
      title: "Total Machines",
      value: stats.total,
      color: "purple",
      icon: <Cpu size={20} />,
    },
    {
      title: "Active Machines",
      value: stats.active,
      color: "green",
      icon: <Activity size={20} />,
    },
    {
      title: "Inactive Machines",
      value: stats.inactive,
      color: "red",
      icon: <Cpu size={20} />,
    },
    {
      title: "Operators",
      value: stats.operators,
      color: "indigo",
      icon: <Users size={20} />,
    },
  ];

  /* =========================================================
     TOAST
  ========================================================= */

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  /* =========================================================
     ADD / EDIT MODAL
  ========================================================= */

  const openAddModal = () => {
    setEditingMachine(null);

    setForm({
      name: "",
      code: "",
      type: "Loader",
      operators: 1,
      status: "Active",
    });

    setShowModal(true);
  };

  const openEditModal = (machine) => {
    setEditingMachine(machine);

    setForm({
      name: machine.name || "",
      code: machine.code || "",
      type: machine.type || "Loader",
      operators: machine.operators || 1,
      status: machine.status || "Active",
    });

    setShowModal(true);
  };

  const saveMachine = () => {
    if (!line) return;

    const name = form.name.trim();
    const code = form.code.trim();

    if (!name) {
      showToast("Please enter machine name.");
      return;
    }

    if (!code) {
      showToast("Please enter machine code.");
      return;
    }

    const duplicate = departments.some((dept) =>
      (dept.sections || []).some((currentSection) =>
        (currentSection.lines || []).some((currentLine) =>
          (currentLine.machines || []).some(
            (machine) =>
              String(machine.code || "").toLowerCase() === code.toLowerCase(),
          ),
        ),
      ),
    );

    if (duplicate) {
      showToast("Machine code already exists.");
      return;
    }

    const machine = {
      id: createId("machine"),
      name,
      code,
      type: form.type,
      operators: Number(form.operators) || 0,
      status: form.status,
    };

    const next = departments.map((dept) =>
      String(dept.id) !== String(deptId)
        ? dept
        : {
            ...dept,
            sections: (dept.sections || []).map((currentSection) =>
              String(currentSection.id) !== String(sectionId)
                ? currentSection
                : {
                    ...currentSection,
                    lines: (currentSection.lines || []).map((currentLine) => {
                      const isTarget =
                        String(currentLine.id) === String(lineId) ||
                        String(currentLine.code) === String(lineId);

                      if (!isTarget) return currentLine;

                      if (editingMachine) {
                        return {
                          ...currentLine,
                          machines: (currentLine.machines || []).map((m) =>
                            m.id === editingMachine.id
                              ? { ...m, ...machine }
                              : m,
                          ),
                        };
                      }

                      return {
                        ...currentLine,
                        machines: [...(currentLine.machines || []), machine],
                      };
                    }),
                  },
            ),
          },
    );

    setDepartments(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setShowModal(false);

    showToast(
      editingMachine
        ? "Machine updated successfully."
        : "Machine created successfully.",
    );
  };

  /* =========================================================
     DELETE MACHINE
  ========================================================= */

  const handleDelete = (machine) => {
    if (!line) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${machine.name}"?`,
    );

    if (!confirmed) return;

    const next = departments.map((dept) =>
      String(dept.id) !== String(deptId)
        ? dept
        : {
            ...dept,
            sections: (dept.sections || []).map((currentSection) =>
              String(currentSection.id) !== String(sectionId)
                ? currentSection
                : {
                    ...currentSection,
                    lines: (currentSection.lines || []).map((currentLine) => {
                      const isTarget =
                        String(currentLine.id) === String(lineId) ||
                        String(currentLine.code) === String(lineId);

                      if (!isTarget) return currentLine;

                      return {
                        ...currentLine,
                        machines: (currentLine.machines || []).filter(
                          (m) => String(m.id) !== String(machine.id),
                        ),
                      };
                    }),
                  },
            ),
          },
    );

    setDepartments(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  /* =========================================================
     LINE NOT FOUND
  ========================================================= */

  if (!line) {
    return (
      <div className="flex min-h-[calc(100vh-70px)] items-center justify-center bg-[#F5F7FB] text-[#26364d]">
        <div className="text-center">
          <h2 className="text-[15px] font-bold text-[#26364d]">
            Line not found
          </h2>

          <p className="mt-1 text-xs text-[#718096]">
            The selected line could not be found.
          </p>

          <button
            onClick={() => navigate(`/lms/section/${deptId}`)}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#6c4ce8] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#5937d1]"
          >
            <ArrowLeft size={16} />
            Back to Section
          </button>
        </div>
      </div>
    );
  }

  /* =========================================================
     MAIN UI
  ========================================================= */

  return (
    <div className="text-[#26364d]">
      <section className="p-[30px_25px]">
        <div className="overflow-hidden rounded-[17px] border border-[#e3e6eb] bg-white shadow-sm">
          {/* HEADER */}

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#edf0f3] px-5 py-[18px]">
            <div className="flex items-center gap-3">
              <div className="flex h-[45px] w-[45px] items-center justify-center rounded-xl bg-gradient-to-br from-[#6c4ce8] to-[#8b6ffe] text-white shadow-md shadow-[#6c4ce8]/30">
                <Cpu size={21} />
              </div>

              <div>
                <h1 className="mt-0.5 text-[18px] font-bold leading-5 text-[#26364d]">
                  {line.name}
                </h1>

                <p className="mt-0.5 text-xs text-[#718096]">
                  Manage machines within this line
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(`/lms/section/${deptId}`)}
                className="flex h-[38px] items-center gap-1.5 rounded-lg border border-[#e3e6eb] bg-white px-4 text-xs font-semibold text-[#718096] transition hover:bg-[#f7f8fa]"
              >
                <ArrowLeft size={15} />
                Back to Section
              </button>

              <button
                onClick={openAddModal}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#6c4ce8] to-[#8b6ffe] px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-[#6c4ce8]/20 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#6c4ce8]/30"
              >
                <Plus size={15} />
                Add Machine
              </button>
            </div>
          </div>

          {/* FILTERS */}

          <div className="m-5">
            <Filters
              values={filterValues}
              onChange={setFilterValues}
              departmentOptions={[]}
              subDepartmentOptions={[]}
              lineOptions={[]}
              machineOptions={filterOptions.types}
              machineLabel="Machine Type"
              showDates={true}
            />
          </div>

          {/* KPI CARDS */}

          <div className="mx-5 mb-5">
            <KPICards data={kpiData} />
          </div>

          {/* MACHINE TABLE */}

          <div className="mx-5 mb-5 overflow-hidden rounded-[14px] border border-[#e3e6eb]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#edf0f3] px-5 py-[18px]">
              <div>
                <h2 className="text-[18px] font-bold text-[#26364d]">
                  Machines in this Line
                </h2>
              </div>

              <div className="relative w-full sm:w-[260px]">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aa3af]"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search machines..."
                  className="h-9 w-full rounded-lg border border-[#d5d9df] bg-[#f7f8fa] pl-9 pr-3 text-[13px] text-[#26364d] outline-none transition placeholder:text-[#9aa3af] focus:border-[#6c4ce8] focus:bg-white"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] border-collapse">
                <thead>
                  <tr className="bg-[#f5f6f8]">
                    <th className="border-r border-[#e1e4e8] px-4 py-3 text-left text-[12px] font-bold uppercase text-[#3b4b62] last:border-r-0">
                      Machine Name
                    </th>
                    <th className="border-r border-[#e1e4e8] px-4 py-3 text-left text-[12px] font-bold uppercase text-[#3b4b62] last:border-r-0">
                      Code
                    </th>
                    <th className="border-r border-[#e1e4e8] px-4 py-3 text-left text-[12px] font-bold uppercase text-[#3b4b62] last:border-r-0">
                      Type
                    </th>
                    <th className="border-r border-[#e1e4e8] px-4 py-3 text-left text-[12px] font-bold uppercase text-[#3b4b62] last:border-r-0">
                      Operators
                    </th>
                    <th className="border-r border-[#e1e4e8] px-4 py-3 text-left text-[12px] font-bold uppercase text-[#3b4b62] last:border-r-0">
                      Status
                    </th>
                    <th className="border-r border-[#e1e4e8] px-4 py-3 text-left text-[12px] font-bold uppercase text-[#3b4b62] last:border-r-0">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredMachines.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-0">
                        <div className="flex flex-col items-center justify-center py-16 text-[#9aa3af]">
                          <p className="text-[14px] font-semibold text-[#26364d]">
                            No machines found
                          </p>

                          <p className="mt-1 text-[13px] text-[#718096]">
                            Try changing your search or filter.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredMachines.map((machine, index) => {
                      const isActive =
                        machine.status?.toLowerCase() === "active";
                      const isLoader = machine.type?.toLowerCase() === "loader";

                      return (
                        <tr
                          key={`${machine.id}-${index}`}
                          className="group border-b border-[#edf0f2] last:border-0 hover:bg-[#fafaff]"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div>
                                <p className="text-[14px] text-[#344760]">
                                  {machine.name}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="border-r border-[#edf0f2] px-4 py-3 text-[14px] text-[#44556c] last:border-r-0">
                            {machine.code || "—"}
                          </td>

                          <td className="border-r border-[#edf0f2] px-4 py-3 text-[14px] text-[#44556c] last:border-r-0">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${
                                isLoader
                                  ? "bg-[#f0ecff] text-[#6c4ce8]"
                                  : "bg-[#eef7ff] text-[#3182ce]"
                              }`}
                            >
                              {machine.type}
                            </span>
                          </td>

                          <td className="border-r border-[#edf0f2] px-4 py-3 text-[14px] text-[#44556c] last:border-r-0">
                            {machine.operators || 0}
                          </td>

                          <td className="border-r border-[#edf0f2] px-4 py-3 text-[14px] text-[#44556c] last:border-r-0">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold ${
                                isActive
                                  ? "bg-green-100 text-green-600"
                                  : "bg-[#f5f6f8] text-[#718096]"
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  isActive ? "bg-green-600" : "bg-[#9aa3af]"
                                }`}
                              />

                              {isActive ? "Active" : "Inactive"}
                            </span>
                          </td>

                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => openEditModal(machine)}
                                className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-[#f0ecff] text-[#6c4ce8] transition hover:bg-[#e6dfff]"
                                title="Edit machine"
                              >
                                <Pencil size={15} />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDelete(machine)}
                                className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-[#fff0ee] text-[#e74c3c] transition hover:bg-[#ffe3df]"
                                title="Delete machine"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ADD / EDIT MACHINE MODAL */}

      {showModal && (
        <div
          className="fixed inset-0 z-[500] flex items-center justify-center bg-[#141928]/50 p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowModal(false);
            }
          }}
        >
          <div className="w-full max-w-[520px] overflow-hidden rounded-[17px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#e3e6eb] px-5 py-[18px]">
              <div>
                <h2 className="text-[15px] font-bold text-[#26364d]">
                  {editingMachine ? "Edit Machine" : "Add Machine"}
                </h2>

                <p className="mt-0.5 text-xs text-[#718096]">
                  {editingMachine
                    ? "Update machine details."
                    : "Add a new machine to this line."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#718096] transition hover:bg-[#f5f6f8] hover:text-[#344760]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto p-5">
              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#26364d]">
                    Machine Name
                    <span className="ml-1 text-[#e74c3c]">*</span>
                  </label>

                  <input
                    autoFocus
                    type="text"
                    value={form.name}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        name: event.target.value,
                      }))
                    }
                    placeholder="Enter machine name"
                    className="h-11 w-full rounded-lg border border-[#d5d9df] px-3 text-sm text-[#26364d] outline-none transition focus:border-[#6c4ce8]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#26364d]">
                    Machine Code
                    <span className="ml-1 text-[#e74c3c]">*</span>
                  </label>

                  <input
                    type="text"
                    value={form.code}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        code: event.target.value,
                      }))
                    }
                    placeholder="e.g. M-001"
                    className="h-11 w-full rounded-lg border border-[#d5d9df] px-3 text-sm text-[#26364d] outline-none transition focus:border-[#6c4ce8]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-[#26364d]">
                      Machine Type
                    </label>

                    <select
                      value={form.type}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          type: event.target.value,
                        }))
                      }
                      className="h-11 w-full rounded-lg border border-[#d5d9df] px-3 text-sm text-[#26364d] outline-none transition focus:border-[#6c4ce8]"
                    >
                      <option value="Loader">Loader</option>
                      <option value="Monitor">Monitor</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-semibold text-[#26364d]">
                      Operators
                    </label>

                    <input
                      type="number"
                      min="0"
                      value={form.operators}
                      onChange={(event) =>
                        setForm((prev) => ({
                          ...prev,
                          operators: event.target.value,
                        }))
                      }
                      className="h-11 w-full rounded-lg border border-[#d5d9df] px-3 text-sm text-[#26364d] outline-none transition focus:border-[#6c4ce8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-[#26364d]">
                    Status
                  </label>

                  <select
                    value={form.status}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        status: event.target.value,
                      }))
                    }
                    className="h-11 w-full rounded-lg border border-[#d5d9df] px-3 text-sm text-[#26364d] outline-none transition focus:border-[#6c4ce8]"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2 border-t border-[#e3e6eb] pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg bg-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-200"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={saveMachine}
                  className="rounded-lg bg-[#6c4ce8] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#5937d1]"
                >
                  {editingMachine ? "Save Changes" : "Create Machine"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}

      {toast && (
        <div className="fixed bottom-6 right-6 z-[1000] rounded-lg border-l-4 border-[#10b981] bg-[#202938] px-5 py-3 text-xs font-medium text-white shadow-xl">
          {toast}
        </div>
      )}
    </div>
  );
};

export default Machine;
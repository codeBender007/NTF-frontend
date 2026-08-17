import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, CirclePlus, Pencil, Search, Trash2, X } from "lucide-react";
import Filters from "../../../components/Filters";
import {
  OPERATORS_STORAGE_KEY,
  SEED_OPERATORS,
  createId,
  filterOperators,
  getDepartmentOptions,
  formatDate,
  EMPTY_OPERATOR_FORM,
  LEVEL_OPTIONS,
  STATUS_OPTIONS,
  JOINING_LEAVING_OPTIONS,
} from "../utils/operatorUtils";

const EMPTY_FILTERS = {
  department: "",
  subDepartment: "",
  line: "",
  machine: "",
  fromDate: "",
  toDate: "",
};

const inputClass =
  "h-11 w-full rounded-lg border border-[#d5d9df] px-3 text-sm outline-none transition focus:border-[#6F4AE7]";

const loadOperators = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(OPERATORS_STORAGE_KEY));

    if (Array.isArray(stored)) return stored;

    return SEED_OPERATORS;
  } catch {
    return SEED_OPERATORS;
  }
};

export default function Operators() {
  const navigate = useNavigate();

  const [operators, setOperators] = useState(loadOperators);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingOperator, setEditingOperator] = useState(null);
  const [form, setForm] = useState(EMPTY_OPERATOR_FORM);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  /* ===================== TABLE DATA ===================== */

  const departmentOptions = getDepartmentOptions(operators);
  const tableRows = filterOperators(operators, { search, ...filters });

  /* ===================== FORM MODAL ===================== */

  const setFormField = (key) => (event) => {
    setForm((previous) => ({
      ...previous,
      [key]: event.target.value,
    }));
  };

  const openAddModal = () => {
    setEditingOperator(null);
    setForm(EMPTY_OPERATOR_FORM);
    setFormModalOpen(true);
  };

  const openEditModal = (operator) => {
    setEditingOperator(operator);
    setForm(operator);
    setFormModalOpen(true);
  };

  const handleViewOperator = (operator) => {
    navigate(`/lms/operator/${operator.id}`);
  };

  const handleSubmit = () => {
    const name = form.name?.trim();
    const empCode = form.empCode?.trim();

    if (!name) {
      showToast("Please enter operator name.");
      return;
    }

    if (!empCode) {
      showToast("Please enter employee code.");
      return;
    }

    const duplicate = operators.some(
      (operator) =>
        operator.empCode.toLowerCase() === empCode.toLowerCase() &&
        operator.id !== editingOperator?.id,
    );

    if (duplicate) {
      showToast("Employee code already exists.");
      return;
    }

    if (editingOperator) {
      const next = operators.map((operator) =>
        operator.id === editingOperator.id
          ? { ...operator, ...form, name, empCode }
          : operator,
      );

      setOperators(next);
      localStorage.setItem(OPERATORS_STORAGE_KEY, JSON.stringify(next));
      showToast("Operator updated successfully.");
    } else {
      const next = [
        ...operators,
        { id: createId("operator"), ...form, name, empCode },
      ];

      setOperators(next);
      localStorage.setItem(OPERATORS_STORAGE_KEY, JSON.stringify(next));
      showToast("Operator added successfully.");
    }

    setFormModalOpen(false);
  };

  /* ===================== DELETE ===================== */

  const openDeleteModal = (operator) => {
    setDeleteTarget(operator);
    setDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;

    const next = operators.filter(
      (operator) => operator.id !== deleteTarget.id,
    );

    setOperators(next);
    localStorage.setItem(OPERATORS_STORAGE_KEY, JSON.stringify(next));
    showToast("Operator deleted successfully.");

    setDeleteModalOpen(false);
    setDeleteTarget(null);
  };

  /* ===================== RENDER ===================== */

  return (
    <div className="text-[#26364d]">
      <section className="py-4">
        <div className="overflow-hidden rounded-[17px] border border-[#e3e6eb] bg-white shadow-sm">
          {/* PAGE HEADER */}

          <div className="flex flex-col gap-4 border-b border-[#edf0f3] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-[18px]">
            <div className="flex items-center gap-3">
              <div className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-xl bg-[#6F4AE7] text-white">
                <Building2 size={21} />
              </div>

              <div className="min-w-0">
                <h1 className="text-[15px] font-bold">Operators</h1>

                <p className="mt-0.5 text-xs text-[#718096]">
                  Manage operators and their details
                </p>
              </div>
            </div>

            <button
              onClick={openAddModal}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#6F4AE7] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#5A38D6] sm:w-auto"
            >
              <CirclePlus size={16} />
              Add Operator
            </button>
          </div>

          {/* FILTERS */}

          <div className="m-4 sm:m-5">
            <Filters
              values={filters}
              onChange={setFilters}
              departmentOptions={departmentOptions}
              subDepartmentOptions={[]}
              lineOptions={[]}
              machineOptions={[]}
              machineLabel="Machine"
              showDates
            />
          </div>

          {/* TABLE */}

          <div className="mx-4 mb-4 overflow-hidden rounded-[14px] border border-[#e3e6eb] sm:mx-5 sm:mb-5">
            {/* TABLE TOOLBAR */}

            <div className="flex flex-col gap-3 border-b border-[#edf0f3] px-4 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <div>
                <h3 className="text-[15px] font-bold text-[#26364d]">
                  Operators
                </h3>
              </div>

              <div className="relative w-full sm:w-auto sm:max-w-[300px]">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search..."
                  className="h-9 w-full rounded-lg border border-[#d5d9df] bg-[#f7f8fa] pl-9 pr-3 text-[13px] outline-none transition focus:border-[#6F4AE7] focus:bg-white"
                />
              </div>
            </div>

            {/* TABLE BODY */}

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px] border-collapse">
                <thead>
                  <tr className="bg-[#f5f6f8]">
                    <th className="border-r border-[#e1e4e8] px-3 py-3 text-left text-[12px] font-bold uppercase text-[#3b4b62] last:border-r-0 sm:px-4">
                      Operator Name
                    </th>
                    <th className="border-r border-[#e1e4e8] px-3 py-3 text-left text-[12px] font-bold uppercase text-[#3b4b62] last:border-r-0 sm:px-4">
                      Emp Code
                    </th>
                    <th className="border-r border-[#e1e4e8] px-3 py-3 text-left text-[12px] font-bold uppercase text-[#3b4b62] last:border-r-0 sm:px-4">
                      Primary Level
                    </th>
                    <th className="border-r border-[#e1e4e8] px-3 py-3 text-left text-[12px] font-bold uppercase text-[#3b4b62] last:border-r-0 sm:px-4">
                      Date
                    </th>
                    <th className="border-r border-[#e1e4e8] px-3 py-3 text-left text-[12px] font-bold uppercase text-[#3b4b62] last:border-r-0 sm:px-4">
                      Contact
                    </th>
                    <th className="border-r border-[#e1e4e8] px-3 py-3 text-left text-[12px] font-bold uppercase text-[#3b4b62] last:border-r-0 sm:px-4">
                      Status
                    </th>
                    <th className="border-r border-[#e1e4e8] px-3 py-3 text-left text-[12px] font-bold uppercase text-[#3b4b62] last:border-r-0 sm:px-4">
                      Department
                    </th>
                    <th className="border-r border-[#e1e4e8] px-3 py-3 text-left text-[12px] font-bold uppercase text-[#3b4b62] last:border-r-0 sm:px-4">
                      Joining/Leaving
                    </th>
                    <th className="border-r border-[#e1e4e8] px-3 py-3 text-left text-[12px] font-bold uppercase text-[#3b4b62] last:border-r-0 sm:px-4">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {tableRows.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="p-0">
                        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                          <Building2 size={42} className="mb-3 opacity-40" />

                          <p className="mb-4 text-sm">No operators found.</p>

                          <button
                            onClick={openAddModal}
                            className="flex items-center gap-2 rounded-lg bg-[#6F4AE7] px-4 py-2 text-xs font-semibold text-white"
                          >
                            <CirclePlus size={15} />
                            Add Operator
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    tableRows.map((operator) => (
                      <tr
                        key={operator.id}
                        className="group border-b border-[#edf0f2] last:border-0 hover:bg-[#fafaff]"
                      >
                        <td className="border-r border-[#edf0f2] px-3 py-3 text-[14px] font-semibold text-[#344760] last:border-r-0 sm:px-4">
                          <button
                            type="button"
                            onClick={() => handleViewOperator(operator)}
                            className="font-semibold text-[#344760] transition hover:text-[#6F4AE7] hover:underline"
                          >
                            {operator.name}
                          </button>
                        </td>

                        <td className="border-r border-[#edf0f2] px-3 py-3 text-[14px] text-[#44556c] last:border-r-0 sm:px-4">
                          {operator.empCode}
                        </td>

                        <td className="border-r border-[#edf0f2] px-3 py-3 text-[14px] text-[#44556c] last:border-r-0 sm:px-4">
                          {operator.level}
                        </td>

                        <td className="border-r border-[#edf0f2] px-3 py-3 text-[14px] text-[#44556c] last:border-r-0 sm:px-4">
                          {formatDate(operator.date)}
                        </td>

                        <td className="border-r border-[#edf0f2] px-3 py-3 text-[14px] text-[#44556c] last:border-r-0 sm:px-4">
                          {operator.contact}
                        </td>

                        <td className="border-r border-[#edf0f2] px-3 py-3 text-[14px] text-[#44556c] last:border-r-0 sm:px-4">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                              operator.status === "Active"
                                ? "bg-[#e6f7ef] text-[#0f9d58]"
                                : operator.status === "On Leave"
                                  ? "bg-[#fff4e0] text-[#e6920b]"
                                  : operator.status === "Left"
                                    ? "bg-[#fff0ee] text-[#e74c3c]"
                                    : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {operator.status || "-"}
                          </span>
                        </td>

                        <td className="border-r border-[#edf0f2] px-3 py-3 text-[14px] text-[#44556c] last:border-r-0 sm:px-4">
                          {operator.department}
                        </td>

                        <td className="border-r border-[#edf0f2] px-3 py-3 text-[14px] text-[#44556c] last:border-r-0 sm:px-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                              operator.joiningLeaving === "Joined"
                                ? "bg-[#e6f7ef] text-[#0f9d58]"
                                : "bg-[#fff0ee] text-[#e74c3c]"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                operator.joiningLeaving === "Joined"
                                  ? "bg-[#0f9d58]"
                                  : "bg-[#e74c3c]"
                              }`}
                            />
                            {operator.joiningLeaving || "-"}
                          </span>
                        </td>

                        <td className="border-r border-[#edf0f2] px-3 py-3 text-[14px] text-[#44556c] last:border-r-0 sm:px-4">
                          <div className="flex gap-2">
                            <button
                              title="Edit operator"
                              onClick={() => openEditModal(operator)}
                              className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-[#f0ecff] text-[#6F4AE7] transition hover:bg-[#e6dfff]"
                            >
                              <Pencil size={15} />
                            </button>

                            <button
                              title="Delete operator"
                              onClick={() => openDeleteModal(operator)}
                              className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-[#fff0ee] text-[#e74c3c] transition hover:bg-[#ffe3df]"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ADD / EDIT MODAL */}

      {formModalOpen && (
        <div
          className="fixed inset-0 z-[500] flex items-center justify-center bg-[#141928]/50 p-3 sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setFormModalOpen(false);
            }
          }}
        >
          <div className="max-h-full w-full max-w-[520px] overflow-hidden rounded-[17px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#e3e6eb] px-5 py-[18px]">
              <h2 className="text-base font-bold">
                {editingOperator ? "Edit Operator" : "Add Operator"}
              </h2>

              <button
                onClick={() => setFormModalOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <X size={21} />
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto p-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold">
                    Operator Name
                    <span className="ml-0.5 text-[#e74c3c]">*</span>
                  </label>

                  <input
                    autoFocus
                    value={form.name || ""}
                    onChange={setFormField("name")}
                    placeholder="Enter operator name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold">
                    Emp Code
                    <span className="ml-0.5 text-[#e74c3c]">*</span>
                  </label>

                  <input
                    value={form.empCode || ""}
                    onChange={setFormField("empCode")}
                    placeholder="Enter employee code"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold">
                    Primary Level
                  </label>

                  <select
                    value={form.level || ""}
                    onChange={setFormField("level")}
                    className={inputClass}
                  >
                    <option value="">Select level</option>

                    {LEVEL_OPTIONS.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold">
                    Date
                  </label>

                  <input
                    type="date"
                    value={form.date || ""}
                    onChange={setFormField("date")}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold">
                    Contact
                  </label>

                  <input
                    value={form.contact || ""}
                    onChange={setFormField("contact")}
                    placeholder="Enter contact number"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold">
                    Status
                  </label>

                  <select
                    value={form.status || "Active"}
                    onChange={setFormField("status")}
                    className={inputClass}
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold">
                    Department
                  </label>

                  <select
                    value={form.department || ""}
                    onChange={setFormField("department")}
                    className={inputClass}
                  >
                    <option value="">Select department</option>

                    {departmentOptions.map((department) => (
                      <option key={department} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold">
                    Joining/Leaving
                  </label>

                  <select
                    value={form.joiningLeaving || "Joined"}
                    onChange={setFormField("joiningLeaving")}
                    className={inputClass}
                  >
                    {JOINING_LEAVING_OPTIONS.map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-2 border-t border-[#e3e6eb] pt-4 sm:flex-row sm:justify-end">
                <button
                  onClick={() => setFormModalOpen(false)}
                  className="rounded-lg bg-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-600"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  className="rounded-lg bg-[#6F4AE7] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#5A38D6]"
                >
                  {editingOperator ? "Save Changes" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}

      {deleteModalOpen && (
        <div
          className="fixed inset-0 z-[500] flex items-center justify-center bg-[#141928]/50 p-3 sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setDeleteModalOpen(false);
            }
          }}
        >
          <div className="max-h-full w-full max-w-[520px] overflow-hidden rounded-[17px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#e3e6eb] px-5 py-[18px]">
              <h2 className="text-base font-bold">Confirm Delete</h2>

              <button
                onClick={() => setDeleteModalOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <X size={21} />
              </button>
            </div>

            <div className="max-h-[65vh] overflow-y-auto p-5">
              <div className="text-sm leading-6 text-gray-600">
                Are you sure you want to delete{" "}
                <strong className="text-gray-900">"{deleteTarget?.name}"</strong>
                ?
              </div>

              <div className="mt-6 flex flex-col-reverse gap-2 border-t border-[#e3e6eb] pt-4 sm:flex-row sm:justify-end">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="rounded-lg bg-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-600"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  className="rounded-lg bg-[#fff0ee] px-4 py-2.5 text-xs font-semibold text-[#e74c3c]"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}

      {toast && (
        <div className="fixed bottom-4 right-4 z-[1000] max-w-[calc(100vw-2rem)] rounded-lg border-l-4 border-[#5A38D6] bg-[#6F4AE7] px-5 py-3 text-xs font-medium text-white shadow-xl sm:bottom-6 sm:right-6">
          {toast}
        </div>
      )}
    </div>
  );
}
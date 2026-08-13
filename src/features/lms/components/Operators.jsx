import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, CirclePlus, Pencil, Search, Trash2, X } from "lucide-react";
import Filters from "../../../components/Filters";

/* ============================================================
   CONSTANTS
============================================================ */

const STORAGE_KEY = "lms_departments";

/* ============================================================
   HELPERS
============================================================ */

const createId = (prefix) =>
  `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

const getInitialData = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

const collectNames = (node, field, acc = []) => {
  for (const item of node[field] || []) {
    acc.push(item.name);
    collectNames(item, field, acc);
  }

  return acc;
};

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function Operators() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState(getInitialData);
  const [search, setSearch] = useState("");
  const [filterValues, setFilterValues] = useState({
    department: "",
    subDepartment: "",
    line: "",
    machine: "",
  });

  const [departmentModal, setDepartmentModal] = useState(false);
  const [departmentName, setDepartmentName] = useState("");
  const [editRowModal, setEditRowModal] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [editStepMap, setEditStepMap] = useState({});
  const [currentEditValue, setCurrentEditValue] = useState("");
  const [editSessionIds, setEditSessionIds] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState("");

  /* ============================================================
     SAVE TO LOCAL STORAGE
  ============================================================ */

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(departments));
  }, [departments]);

  /* ============================================================
     TOAST
  ============================================================ */

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  /* ============================================================
     ADD DEPARTMENT
  ============================================================ */

  const openAddDepartment = () => {
    setDepartmentName("");
    setDepartmentModal(true);
  };

  /* ============================================================
     EDIT STEPS
  ============================================================ */

  const ALL_STEPS = [
    { key: "department", label: "Department" },
    { key: "section", label: "Section" },
    { key: "line", label: "Line" },
    { key: "subSection", label: "Sub-section" },
    { key: "machine", label: "Machine" },
  ];

  const getRowId = (row) =>
    [
      row.department?.id,
      row.section?.id || "",
      row.line?.id || "",
      row.subSection?.id || "",
      row.machine?.id || "",
    ].join("-");

  const getStepCurrentValue = (session, stepIndex) => {
    const step = ALL_STEPS[stepIndex];

    const dept = departments.find((d) => d.id === session.deptId);
    if (!dept) return "";

    if (step.key === "department") {
      return dept.name;
    }

    const sec = dept.sections?.find((s) => s.id === session.sectionId);
    if (step.key === "section") {
      return sec?.name || "";
    }

    const ln = sec?.lines?.find((l) => l.id === session.lineId);
    if (step.key === "line") {
      return ln?.name || "";
    }

    const sub = ln?.subSections?.find((s) => s.id === session.subSectionId);
    if (step.key === "subSection") {
      return sub?.name || "";
    }

    const mac = sub?.machines?.find((m) => m.id === session.machineId);
    if (step.key === "machine") {
      return mac?.name || "";
    }

    return "";
  };

  const openEditRow = (row) => {
    const rowId = getRowId(row);

    const session = editSessionIds[rowId] || {
      rowId,
      deptId: row.department?.id,
      sectionId: row.section?.id || null,
      lineId: row.line?.id || null,
      subSectionId: row.subSection?.id || null,
      machineId: row.machine?.id || null,
    };

    if (!editSessionIds[rowId]) {
      setEditSessionIds((prev) => ({
        ...prev,
        [rowId]: session,
      }));
    }

    let currentStep = editStepMap[rowId];

    if (currentStep === undefined) {
      if (!row.section) currentStep = 1;
      else if (!row.line) currentStep = 2;
      else if (!row.subSection) currentStep = 3;
      else if (!row.machine) currentStep = 4;
      else currentStep = 0;

      setEditStepMap((prev) => ({
        ...prev,
        [rowId]: currentStep,
      }));
    }

    setEditingRow(row);
    setCurrentEditValue(getStepCurrentValue(session, currentStep));
    setEditRowModal(true);
  };

  const saveEditRow = () => {
    const row = editingRow;

    if (!row) return;

    const rowId = getRowId(row);

    const currentStep = editStepMap[rowId] || 0;

    const step = ALL_STEPS[currentStep];

    const value = currentEditValue.trim();

    if (!value) {
      showToast(`Please enter ${step.label.toLowerCase()} name.`);
      return;
    }

    const session = editSessionIds[rowId] || {
      rowId,
      deptId: row.department?.id,
      sectionId: row.section?.id || null,
      lineId: row.line?.id || null,
      subSectionId: row.subSection?.id || null,
      machineId: row.machine?.id || null,
    };

    const newSectionId =
      step.key === "section" && !session.sectionId
        ? createId("section")
        : session.sectionId;

    const newLineId =
      step.key === "line" && !session.lineId
        ? createId("line")
        : session.lineId;

    const newSubSectionId =
      step.key === "subSection" && !session.subSectionId
        ? createId("subSection")
        : session.subSectionId;

    const newMachineId =
      step.key === "machine" && !session.machineId
        ? createId("machine")
        : session.machineId;

    setDepartments((previous) => {
      const cloned = structuredClone(previous);

      const dept = cloned.find((d) => d.id === session.deptId);

      if (!dept) return previous;

      if (step.key === "department") {
        dept.name = value;
      }

      if (step.key === "section") {
        if (session.sectionId) {
          const sec = dept.sections?.find((s) => s.id === session.sectionId);

          if (sec) sec.name = value;
        } else {
          dept.sections = [
            ...(dept.sections || []),
            {
              id: newSectionId,
              name: value,
              lines: [],
            },
          ];
        }
      }

      if (step.key === "line") {
        const sec = dept.sections?.find((s) => s.id === session.sectionId);

        if (sec) {
          if (session.lineId) {
            const ln = sec.lines?.find((l) => l.id === session.lineId);

            if (ln) ln.name = value;
          } else {
            sec.lines = [
              ...(sec.lines || []),
              {
                id: newLineId,
                name: value,
                subSections: [],
              },
            ];
          }
        }
      }

      if (step.key === "subSection") {
        const sec = dept.sections?.find((s) => s.id === session.sectionId);

        const ln = sec?.lines?.find((l) => l.id === session.lineId);

        if (ln) {
          if (session.subSectionId) {
            const sub = ln.subSections?.find(
              (s) => s.id === session.subSectionId,
            );

            if (sub) sub.name = value;
          } else {
            ln.subSections = [
              ...(ln.subSections || []),
              {
                id: newSubSectionId,
                name: value,
                machines: [],
              },
            ];
          }
        }
      }

      if (step.key === "machine") {
        const sec = dept.sections?.find((s) => s.id === session.sectionId);

        const ln = sec?.lines?.find((l) => l.id === session.lineId);

        const sub = ln?.subSections?.find((s) => s.id === session.subSectionId);

        if (sub) {
          if (session.machineId) {
            const mac = sub.machines?.find((m) => m.id === session.machineId);

            if (mac) mac.name = value;
          } else {
            sub.machines = [
              ...(sub.machines || []),
              {
                id: newMachineId,
                name: value,
              },
            ];
          }
        }
      }

      return cloned;
    });

    const updatedSession = {
      ...session,
      sectionId: newSectionId,
      lineId: newLineId,
      subSectionId: newSubSectionId,
      machineId: newMachineId,
    };

    setEditSessionIds((prev) => ({
      ...prev,
      [rowId]: updatedSession,
    }));

    const nextStep = Math.min(currentStep + 1, ALL_STEPS.length - 1);

    setEditStepMap((prev) => ({
      ...prev,
      [rowId]: nextStep,
    }));

    showToast(
      `${step.label} ${
        !session[`${step.key}Id`] && step.key !== "department"
          ? "added"
          : "updated"
      } successfully.`,
    );

    setEditRowModal(false);
  };

  /* ============================================================
     SAVE DEPARTMENT
  ============================================================ */

  const saveDepartment = () => {
    const name = departmentName.trim();

    if (!name) {
      showToast("Please enter department name.");
      return;
    }

    const duplicate = departments.some(
      (department) => department.name.toLowerCase() === name.toLowerCase(),
    );

    if (duplicate) {
      showToast("Department already exists.");
      return;
    }

    setDepartments((previous) => [
      ...previous,
      {
        id: createId("department"),
        name,
        sections: [],
      },
    ]);

    showToast("Department added successfully.");
    setDepartmentModal(false);
  };

  /* ============================================================
     DELETE
  ============================================================ */

  const askDeleteDepartment = (department) => {
    setDeleteTarget({
      type: "department",
      item: department,
    });

    setDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;

    setDepartments((previous) =>
      previous.filter((department) => department.id !== deleteTarget.item.id),
    );

    showToast("Department deleted successfully.");

    setDeleteModal(false);
    setDeleteTarget(null);
  };

  /* ============================================================
     FLATTEN HIERARCHY
  ============================================================ */

  const flatten = () => {
    const rows = [];

    departments.forEach((department) => {
      if (!department.sections?.length) {
        rows.push({
          department,
          section: null,
          line: null,
          subSection: null,
          machine: null,
        });

        return;
      }

      department.sections.forEach((section) => {
        if (!section.lines?.length) {
          rows.push({
            department,
            section,
            line: null,
            subSection: null,
            machine: null,
          });

          return;
        }

        section.lines.forEach((line) => {
          if (!line.subSections?.length) {
            rows.push({
              department,
              section,
              line,
              subSection: null,
              machine: null,
            });

            return;
          }

          line.subSections.forEach((subSection) => {
            if (!subSection.machines?.length) {
              rows.push({
                department,
                section,
                line,
                subSection,
                machine: null,
              });

              return;
            }

            subSection.machines.forEach((machine) => {
              rows.push({
                department,
                section,
                line,
                subSection,
                machine,
              });
            });
          });
        });
      });
    });

    return rows;
  };

  /* ============================================================
     TABLE DATA
  ============================================================ */

  const tableRows = useMemo(() => {
    const query = search.toLowerCase();
    const values = filterValues;

    return flatten().filter((row) => {
      const text = [
        row.department?.name,
        row.section?.name,
        row.line?.name,
        row.subSection?.name,
        row.machine?.name,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const textOk = !query || text.includes(query);

      const departmentOk =
        !values.department || row.department?.name === values.department;

      const sectionOk =
        !values.subDepartment || row.section?.name === values.subDepartment;

      const lineOk = !values.line || row.line?.name === values.line;

      const machineOk = !values.machine || row.machine?.name === values.machine;

      return textOk && departmentOk && sectionOk && lineOk && machineOk;
    });
  }, [departments, search, filterValues]);

  /* ============================================================
     FILTER OPTIONS
  ============================================================ */

  const filterOptions = useMemo(() => {
    const unique = (list) => [...new Set(list.filter(Boolean))];

    const sections = [];
    const lines = [];
    const machines = [];

    departments.forEach((department) => {
      (department.sections || []).forEach((section) => {
        sections.push(section.name);

        (section.lines || []).forEach((line) => {
          lines.push(line.name);

          (line.subSections || []).forEach((subSection) => {
            (subSection.machines || []).forEach((machine) => {
              machines.push(machine.name);
            });
          });
        });
      });
    });

    return {
      departments: unique(departments.map((department) => department.name)),
      sections: unique(sections),
      lines: unique(lines),
      machines: unique(machines),
    };
  }, [departments]);

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <div className="text-[#26364d]">
      <section className="py-4">
        <div className="overflow-hidden rounded-[17px] border border-[#e3e6eb] bg-white shadow-sm">
          {/* HEADER */}

          <div className="flex flex-col gap-4 border-b border-[#edf0f3] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-[18px]">
            <div className="flex items-center gap-3">
              <div className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-xl bg-[#6F4AE7] text-white">
                <Building2 size={21} />
              </div>

              <div className="min-w-0">
                <h1 className="text-[15px] font-bold">Operators</h1>

                <p className="mt-0.5 text-xs text-[#718096]">
                  Manage departments and their complete hierarchy
                </p>
              </div>
            </div>

            <button
              onClick={openAddDepartment}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#6F4AE7] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#5A38D6] sm:w-auto"
            >
              <CirclePlus size={16} />
              Add Operator
            </button>
          </div>

          {/* FILTER */}

          <div className="m-4 sm:m-5">
            <Filters
              values={filterValues}
              onChange={setFilterValues}
              departmentOptions={filterOptions.departments}
              subDepartmentOptions={filterOptions.sections}
              lineOptions={filterOptions.lines}
              machineOptions={filterOptions.machines}
              machineLabel="Machine"
              showDates={true}
            />
          </div>

          {/* TABLE */}

          <div className="mx-4 mb-4 overflow-hidden rounded-[14px] border border-[#e3e6eb] sm:mx-5 sm:mb-5">
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
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="h-9 w-full rounded-lg border border-[#d5d9df] bg-[#f7f8fa] pl-9 pr-3 text-[13px] outline-none transition focus:border-[#6F4AE7] focus:bg-white"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px] border-collapse">
                <thead>
                  <tr className="bg-[#f5f6f8]">
                    <TableHeader>Department</TableHeader>

                    <TableHeader>Section</TableHeader>

                    <TableHeader>Line</TableHeader>

                    <TableHeader>Sub-section</TableHeader>

                    <TableHeader>Machine</TableHeader>

                    <TableHeader>Actions</TableHeader>
                  </tr>
                </thead>

                <tbody>
                  {tableRows.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-0">
                        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                          <Building2 size={42} className="mb-3 opacity-40" />

                          <p className="mb-4 text-sm">No departments found.</p>

                          <button
                            onClick={openAddDepartment}
                            className="flex items-center gap-2 rounded-lg bg-[#6F4AE7] px-4 py-2 text-xs font-semibold text-white"
                          >
                            <CirclePlus size={15} />
                            Add Operator
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    tableRows.map((row, index) => (
                      <tr
                        key={`${row.department.id}-${index}`}
                        className="group border-b border-[#edf0f2] last:border-0 hover:bg-[#fafaff]"
                      >
                        {/* DEPARTMENT */}

                        <TableCell bold>
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/lms/section/${row.department.id}`)
                            }
                            className="font-semibold text-[#344760] transition hover:text-[#6F4AE7] hover:underline"
                          >
                            {row.department.name}
                          </button>
                        </TableCell>

                        <TableCell>{row.section?.name || "-"}</TableCell>

                        <TableCell>{row.line?.name || "-"}</TableCell>

                        <TableCell>{row.subSection?.name || "-"}</TableCell>

                        <TableCell>{row.machine?.name || "-"}</TableCell>

                        <TableCell>
                          <div className="flex gap-2">
                            <ActionButton
                              title="Edit department"
                              onClick={() => openEditRow(row)}
                            >
                              <Pencil size={15} />
                            </ActionButton>

                            <ActionButton
                              danger
                              title="Delete department"
                              onClick={() =>
                                askDeleteDepartment(row.department)
                              }
                            >
                              <Trash2 size={15} />
                            </ActionButton>
                          </div>
                        </TableCell>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          DEPARTMENT MODAL
      ===================================================== */}

      <Modal
        open={departmentModal}
        title="Add Department"
        onClose={() => setDepartmentModal(false)}
      >
        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-xs font-semibold">
              Department Name
            </label>

            <input
              autoFocus
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveDepartment();
                }
              }}
              placeholder="Enter department name"
              className="h-11 w-full rounded-lg border border-[#d5d9df] px-3 text-sm outline-none focus:border-[#6F4AE7]"
            />
          </div>
        </div>

        <ModalFooter>
          <button
            onClick={() => setDepartmentModal(false)}
            className="rounded-lg bg-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={saveDepartment}
            className="rounded-lg bg-[#6F4AE7] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#5A38D6]"
          >
            Save
          </button>
        </ModalFooter>
      </Modal>

      {/* =====================================================
          EDIT MODAL
      ===================================================== */}

      <Modal
        open={editRowModal}
        title={(() => {
          if (!editingRow) return "Edit";

          const rowId = getRowId(editingRow);

          const step = ALL_STEPS[editStepMap[rowId] || 0];

          return `Edit ${step?.label || ""} Name`;
        })()}
        onClose={() => setEditRowModal(false)}
      >
        <div className="space-y-5">
          <div>
            {(() => {
              if (!editingRow) return null;

              const rowId = getRowId(editingRow);

              const stepIndex = editStepMap[rowId] || 0;

              const step = ALL_STEPS[stepIndex];

              return (
                <>
                  <label className="mb-2 block text-xs font-semibold">
                    {step?.label} Name
                  </label>

                  <input
                    autoFocus
                    value={currentEditValue}
                    onChange={(e) => setCurrentEditValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        saveEditRow();
                      }
                    }}
                    placeholder={`Enter ${step?.label || ""} name`}
                    className="h-11 w-full rounded-lg border border-[#d5d9df] px-3 text-sm outline-none focus:border-[#6F4AE7]"
                  />
                </>
              );
            })()}
          </div>
        </div>

        <ModalFooter>
          <button
            onClick={() => setEditRowModal(false)}
            className="rounded-lg bg-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={saveEditRow}
            className="rounded-lg bg-[#6F4AE7] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#5A38D6]"
          >
            Save
          </button>
        </ModalFooter>
      </Modal>

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      <Modal
        open={deleteModal}
        title="Confirm Delete"
        onClose={() => setDeleteModal(false)}
      >
        <div className="text-sm leading-6 text-gray-600">
          Are you sure you want to delete{" "}
          <strong className="text-gray-900">
            "{deleteTarget?.item?.name}"
          </strong>
          ?
        </div>

        <ModalFooter>
          <button
            onClick={() => setDeleteModal(false)}
            className="rounded-lg bg-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={confirmDelete}
            className="rounded-lg bg-[#fff0ee] px-4 py-2.5 text-xs font-semibold text-[#e74c3c]"
          >
            Delete
          </button>
        </ModalFooter>
      </Modal>

      {toast && (
        <div className="fixed bottom-4 right-4 z-[1000] max-w-[calc(100vw-2rem)] rounded-lg border-l-4 border-[#10b981] bg-[#202938] px-5 py-3 text-xs font-medium text-white shadow-xl sm:bottom-6 sm:right-6">
          {toast}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   TABLE HEADER
============================================================ */

function TableHeader({ children }) {
  return (
    <th className="border-r border-[#e1e4e8] px-3 py-3 text-left text-[12px] font-bold uppercase text-[#3b4b62] last:border-r-0 sm:px-4">
      {children}
    </th>
  );
}

/* ============================================================
   TABLE CELL
============================================================ */

function TableCell({ children, bold }) {
  return (
    <td
      className={`border-r border-[#edf0f2] px-3 py-3 text-[14px] text-[#44556c] last:border-r-0 sm:px-4 ${
        bold ? "font-semibold text-[#344760]" : ""
      }`}
    >
      {children}
    </td>
  );
}

/* ============================================================
   ACTION BUTTON
============================================================ */

function ActionButton({ children, onClick, danger, title }) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={`flex h-[34px] w-[34px] items-center justify-center rounded-lg transition ${
        danger
          ? "bg-[#fff0ee] text-[#e74c3c] hover:bg-[#ffe3df]"
          : "bg-[#f0ecff] text-[#6F4AE7] hover:bg-[#e6dfff]"
      }`}
    >
      {children}
    </button>
  );
}

/* ============================================================
   MODAL
============================================================ */

function Modal({ open, title, onClose, children, large }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center bg-[#141928]/50 p-3 sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={`max-h-full w-full overflow-hidden rounded-[17px] bg-white shadow-2xl ${
          large ? "max-w-[850px]" : "max-w-[520px]"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#e3e6eb] px-5 py-[18px]">
          <h2 className="text-base font-bold">{title}</h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <X size={21} />
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto p-5">{children}</div>
      </div>
    </div>
  );
}

/* ============================================================
   MODAL FOOTER
============================================================ */

function ModalFooter({ children }) {
  return (
    <div className="mt-6 flex flex-col-reverse gap-2 border-t border-[#e3e6eb] pt-4 sm:flex-row sm:justify-end">
      {children}
    </div>
  );
}

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, CirclePlus } from "lucide-react";
import Filters from "../../../components/Filters";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { useToast } from "../../../hooks/useToast";
import { ConfirmDeleteModal } from "./operators/ConfirmDeleteModal";
import { OperatorFormModal } from "./operators/OperatorFormModal";
import { OperatorsTable } from "./operators/OperatorsTable";
import {
  OPERATORS_STORAGE_KEY,
  SEED_OPERATORS,
  createId,
  filterOperators,
  getDepartmentOptions,
} from "../utils/operatorUtils";

const EMPTY_FILTERS = {
  department: "",
  subDepartment: "",
  line: "",
  machine: "",
  fromDate: "",
  toDate: "",
};

export default function Operators() {
  const navigate = useNavigate();
  const [operators, setOperators] = useLocalStorage(OPERATORS_STORAGE_KEY, SEED_OPERATORS);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingOperator, setEditingOperator] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const { message: toast, showToast } = useToast();

  const departmentOptions = useMemo(
    () => getDepartmentOptions(operators),
    [operators],
  );

  const tableRows = useMemo(
    () => filterOperators(operators, { search, ...filters }),
    [operators, search, filters],
  );

  /* ============================================================
     FORM ACTIONS
  ============================================================ */

  const openAddModal = () => {
    setEditingOperator(null);
    setFormModalOpen(true);
  };

  const openEditModal = (operator) => {
    setEditingOperator(operator);
    setFormModalOpen(true);
  };

  const handleViewOperator = (operator) => {
    navigate(`/lms/operator/${operator.id}`);
  };

  const handleSubmit = (form) => {
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
      setOperators((previous) =>
        previous.map((operator) =>
          operator.id === editingOperator.id
            ? { ...operator, ...form, name, empCode }
            : operator,
        ),
      );

      showToast("Operator updated successfully.");
    } else {
      setOperators((previous) => [
        ...previous,
        { id: createId("operator"), ...form, name, empCode },
      ]);

      showToast("Operator added successfully.");
    }

    setFormModalOpen(false);
  };

  /* ============================================================
     DELETE ACTIONS
  ============================================================ */

  const openDeleteModal = (operator) => {
    setDeleteTarget(operator);
    setDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;

    setOperators((previous) =>
      previous.filter((operator) => operator.id !== deleteTarget.id),
    );

    showToast("Operator deleted successfully.");

    setDeleteModalOpen(false);
    setDeleteTarget(null);
  };

  /* ============================================================
     RENDER
  ============================================================ */

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

          <OperatorsTable
            rows={tableRows}
            search={search}
            onSearchChange={setSearch}
            onAdd={openAddModal}
            onEdit={openEditModal}
            onDelete={openDeleteModal}
            onView={handleViewOperator}
          />
        </div>
      </section>

      {/* ADD / EDIT MODAL */}

      {formModalOpen && (
        <OperatorFormModal
          key={editingOperator?.id || "add"}
          operator={editingOperator}
          departmentOptions={departmentOptions}
          onClose={() => setFormModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}

      {/* DELETE MODAL */}

      <ConfirmDeleteModal
        open={deleteModalOpen}
        name={deleteTarget?.name}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />

      {/* TOAST */}

      {toast && (
        <div className="fixed bottom-4 right-4 z-[1000] max-w-[calc(100vw-2rem)] rounded-lg border-l-4 border-[#5A38D6] bg-[#6F4AE7] px-5 py-3 text-xs font-medium text-white shadow-xl sm:bottom-6 sm:right-6">
          {toast}
        </div>
      )}
    </div>
  );
}
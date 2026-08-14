import { useMemo, useState } from "react";
import { CirclePlus } from "lucide-react";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import Filters from "../../../components/Filters";
import { useToast } from "../../../hooks/useToast";
import { LevelsTable } from "./levels/LevelsTable";
import {
  LOCK_STATUS_OPTIONS,
  SEED_OPERATOR_LEVELS,
  filterOperatorLevels,
} from "../utils/levelUtils";

const OperatorLevels = () => {
  const [filterValues, setFilterValues] = useState({});
  const [search, setSearch] = useState("");
  const { message: toast, showToast } = useToast();

  const tableRows = useMemo(
    () =>
      filterOperatorLevels(SEED_OPERATOR_LEVELS, {
        search,
        lockStatus: filterValues.machine,
      }),
    [search, filterValues],
  );

  const handleAdd = () => showToast("Operator level creation is not available yet.");
  const handleEdit = (row) => showToast(`Editing ${row.operator} is not available yet.`);
  const handleDelete = (row) => showToast(`Deleting ${row.operator} is not available yet.`);

  return (
    <div className="text-[#26364d]">
      <section className="py-4">
        <div className="overflow-hidden rounded-[17px] border border-[#e3e6eb] bg-white shadow-sm">
          {/* PAGE HEADER */}

          <div className="flex flex-col gap-4 border-b border-[#edf0f3] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-[18px]">
            <div className="flex items-center gap-3">
              <div className="flex h-[45px] w-[45px] shrink-0 items-center justify-center rounded-xl bg-[#6F4AE7] text-white">
                <SchoolOutlinedIcon sx={{ fontSize: 21 }} />
              </div>

              <div className="min-w-0">
                <h1 className="text-[15px] font-bold">Operator Levels</h1>

                <p className="mt-0.5 text-xs text-[#718096]">
                  Manage operator levels and training categories
                </p>
              </div>
            </div>

            <button
              onClick={handleAdd}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#6F4AE7] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#5A38D6] sm:w-auto"
            >
              <CirclePlus size={16} />
              Add Level
            </button>
          </div>

          {/* FILTERS */}

          <div className="m-4 sm:m-5">
            <Filters
              values={filterValues}
              onChange={setFilterValues}
              departmentOptions={["Production", "Quality", "HR", "Admin"]}
              subDepartmentOptions={["Sub 1", "Sub 2", "Sub 3"]}
              lineOptions={["Line 1", "Line 2", "Line 3"]}
              machineOptions={LOCK_STATUS_OPTIONS}
              machineLabel="Lock Status"
              showDates={false}
            />
          </div>

          {/* TABLE */}

          <LevelsTable
            rows={tableRows}
            search={search}
            onSearchChange={setSearch}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </section>

      {/* TOAST */}

      {toast && (
        <div className="fixed bottom-4 right-4 z-[1000] max-w-[calc(100vw-2rem)] rounded-lg border-l-4 border-[#5A38D6] bg-[#6F4AE7] px-5 py-3 text-xs font-medium text-white shadow-xl sm:bottom-6 sm:right-6">
          {toast}
        </div>
      )}
    </div>
  );
};

export default OperatorLevels;
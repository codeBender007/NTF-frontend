import { useState } from "react";
import { CirclePlus, Layers, Lock, Pencil, Search, Trash2 } from "lucide-react";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import Filters from "../../../components/Filters";
import { formatDate } from "../utils/operatorUtils";
import {
  LOCK_STATUS_OPTIONS,
  SEED_OPERATOR_LEVELS,
  filterOperatorLevels,
} from "../utils/levelUtils";

const OperatorLevels = () => {
  const [filterValues, setFilterValues] = useState({});
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const tableRows = filterOperatorLevels(SEED_OPERATOR_LEVELS, {
    search,
    lockStatus: filterValues.machine,
  });

  const handleAdd = () =>
    showToast("Operator level creation is not available yet.");

  const handleEdit = (row) =>
    showToast(`Editing ${row.operator} is not available yet.`);

  const handleDelete = (row) =>
    showToast(`Deleting ${row.operator} is not available yet.`);

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

          <div className="mx-4 mb-4 overflow-hidden rounded-[14px] border border-[#e3e6eb] sm:mx-5 sm:mb-5">
            {/* TABLE TOOLBAR */}

            <div className="flex flex-col gap-3 border-b border-[#edf0f3] px-4 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <div>
                <h3 className="text-[15px] font-bold text-[#26364d]">
                  Operator Levels
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
                      Operator
                    </th>
                    <th className="border-r border-[#e1e4e8] px-3 py-3 text-left text-[12px] font-bold uppercase text-[#3b4b62] last:border-r-0 sm:px-4">
                      Primary Level
                    </th>
                    <th className="border-r border-[#e1e4e8] px-3 py-3 text-left text-[12px] font-bold uppercase text-[#3b4b62] last:border-r-0 sm:px-4">
                      Station Kill
                    </th>
                    <th className="border-r border-[#e1e4e8] px-3 py-3 text-left text-[12px] font-bold uppercase text-[#3b4b62] last:border-r-0 sm:px-4">
                      Progress
                    </th>
                    <th className="border-r border-[#e1e4e8] px-3 py-3 text-left text-[12px] font-bold uppercase text-[#3b4b62] last:border-r-0 sm:px-4">
                      Lock Status
                    </th>
                    <th className="border-r border-[#e1e4e8] px-3 py-3 text-left text-[12px] font-bold uppercase text-[#3b4b62] last:border-r-0 sm:px-4">
                      Lock Accessed
                    </th>
                    <th className="border-r border-[#e1e4e8] px-3 py-3 text-left text-[12px] font-bold uppercase text-[#3b4b62] last:border-r-0 sm:px-4">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {tableRows.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-0">
                        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                          <Layers size={42} className="mb-3 opacity-40" />

                          <p className="mb-4 text-sm">
                            No operator levels found.
                          </p>

                          <button
                            onClick={handleAdd}
                            className="flex items-center gap-2 rounded-lg bg-[#6F4AE7] px-4 py-2 text-xs font-semibold text-white"
                          >
                            <CirclePlus size={15} />
                            Add Operator Level
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    tableRows.map((row) => {
                      const progress = Math.max(0, Math.min(100, row.progress));

                      const lockClasses =
                        row.lockStatus === "Locked"
                          ? "bg-[#fff0ee] text-[#e74c3c]"
                          : row.lockStatus === "Unlocked"
                            ? "bg-[#e6f7ef] text-[#0f9d58]"
                            : "bg-gray-100 text-gray-600";

                      return (
                        <tr
                          key={row.id}
                          className="group border-b border-[#edf0f2] last:border-0 hover:bg-[#fafaff]"
                        >
                          <td className="border-r border-[#edf0f2] px-3 py-3 text-[14px] font-semibold text-[#344760] last:border-r-0 sm:px-4">
                            {row.operator}
                          </td>

                          <td className="border-r border-[#edf0f2] px-3 py-3 text-[14px] text-[#44556c] last:border-r-0 sm:px-4">
                            <span className="inline-flex h-8 min-w-[48px] items-center justify-center rounded-lg bg-[#f0ecff] px-2 text-[13px] font-bold text-[#6F4AE7]">
                              {row.primaryLevel}
                            </span>
                          </td>

                          <td className="border-r border-[#edf0f2] px-3 py-3 text-[14px] text-[#44556c] last:border-r-0 sm:px-4">
                            <span className="font-semibold text-[#344760]">
                              {row.stationKill}
                            </span>
                          </td>

                          <td className="border-r border-[#edf0f2] px-3 py-3 text-[14px] text-[#44556c] last:border-r-0 sm:px-4">
                            <div className="flex min-w-[130px] items-center gap-2">
                              <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#eef0f3]">
                                <div
                                  className="h-full rounded-full bg-[#6F4AE7] transition-all"
                                  style={{ width: `${progress}%` }}
                                />
                              </div>

                              <span className="w-9 text-right text-[12px] font-semibold text-[#344760]">
                                {progress}%
                              </span>
                            </div>
                          </td>

                          <td className="border-r border-[#edf0f2] px-3 py-3 text-[14px] text-[#44556c] last:border-r-0 sm:px-4">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${lockClasses}`}
                            >
                              {row.lockStatus || "-"}
                            </span>
                          </td>

                          <td className="border-r border-[#edf0f2] px-3 py-3 text-[14px] text-[#44556c] last:border-r-0 sm:px-4">
                            {row.lockStatus === "Locked" ? (
                              <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#e74c3c]">
                                <Lock size={13} />
                                {formatDate(row.lockAccessed)}
                              </span>
                            ) : (
                              formatDate(row.lockAccessed)
                            )}
                          </td>

                          <td className="border-r border-[#edf0f2] px-3 py-3 text-[14px] text-[#44556c] last:border-r-0 sm:px-4">
                            <div className="flex gap-2">
                              <button
                                title="Edit operator level"
                                onClick={() => handleEdit(row)}
                                className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-[#f0ecff] text-[#6F4AE7] transition hover:bg-[#e6dfff]"
                              >
                                <Pencil size={15} />
                              </button>

                              <button
                                title="Delete operator level"
                                onClick={() => handleDelete(row)}
                                className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-[#fff0ee] text-[#e74c3c] transition hover:bg-[#ffe3df]"
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